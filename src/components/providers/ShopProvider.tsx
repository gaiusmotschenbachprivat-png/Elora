"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { shopConfig, type SalesMode } from "@/config/shop";
import { products as staticProducts, type Product } from "@/lib/catalog";
import { computeTotals, getPurchaseState, type CartLine, type PricedLine } from "@/lib/commerce";
import { getSupabase } from "@/lib/supabase";

const STORAGE_KEY = "elora-cart-v1";

type ProductRow = { id: string; sales_mode: SalesMode; active: boolean };
type VariantRow = { id: string; product_id: string; price_cents: number | null; stock: number | null; net_weight_grams: number | null; sku: string | null };

type ShopContextValue = {
  products: Product[];
  modes: Record<string, SalesMode | null>;
  catalogReady: boolean;
  lines: PricedLine[];
  totals: ReturnType<typeof computeTotals>;
  add: (variantId: string, qty?: number) => void;
  setQty: (variantId: string, qty: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  session: Session | null;
  authReady: boolean;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function readCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed)
      ? parsed.filter((l) => typeof l.variantId === "string" && Number.isInteger(l.qty) && l.qty > 0)
      : [];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* Speicher nicht verfügbar (z. B. privater Modus) – Warenkorb bleibt für diese Sitzung erhalten */
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [modes, setModes] = useState<Record<string, SalesMode | null>>({});
  const [catalogReady, setCatalogReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);

  /* Warenkorb laden + tabübergreifend synchronisieren */
  useEffect(() => {
    const sync = () => setCart(readCart());
    sync();
    const onStorage = (e: StorageEvent) => e.key === STORAGE_KEY && sync();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* Kaufmännische Produktdaten aus Supabase */
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      queueMicrotask(() => setCatalogReady(true));
      return;
    }
    let active = true;
    (async () => {
      const [{ data: prodRows }, { data: varRows }] = await Promise.all([
        supabase.from("products").select("id, sales_mode, active"),
        supabase.from("product_variants").select("id, product_id, price_cents, stock, net_weight_grams, sku"),
      ]);
      if (!active) return;
      const pr = (prodRows ?? []) as ProductRow[];
      const vr = (varRows ?? []) as VariantRow[];
      setModes(Object.fromEntries(pr.map((p) => [p.id, p.sales_mode])));
      setProducts(
        staticProducts.map((p) => ({
          ...p,
          variants: p.variants.map((v) => {
            const row = vr.find((r) => r.id === v.id);
            return row
              ? { ...v, priceCents: row.price_cents, stock: row.stock, netWeightGrams: row.net_weight_grams, sku: row.sku }
              : v;
          }),
        })),
      );
      setCatalogReady(true);
    })().catch(() => setCatalogReady(true));
    return () => {
      active = false;
    };
  }, []);

  /* Anmeldung */
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      queueMicrotask(() => setAuthReady(true));
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const update = useCallback((fn: (prev: CartLine[]) => CartLine[]) => {
    setCart((prev) => {
      const raw = fn(prev);
      if (raw === prev) return prev;
      const next = raw.filter((l) => l.qty > 0);
      writeCart(next);
      return next;
    });
  }, []);

  const lines = useMemo<PricedLine[]>(() => {
    const out: PricedLine[] = [];
    for (const l of cart) {
      for (const product of products) {
        const variant = product.variants.find((v) => v.id === l.variantId);
        if (!variant) continue;
        out.push({
          ...l,
          product,
          variant,
          unitCents: variant.priceCents,
          lineCents: variant.priceCents == null ? null : variant.priceCents * l.qty,
        });
      }
    }
    return out;
  }, [cart, products]);

  const add = useCallback(
    (variantId: string, qty = 1) => {
      // Nur kaufbare Varianten dürfen in den Warenkorb
      const product = products.find((p) => p.variants.some((v) => v.id === variantId));
      const variant = product?.variants.find((v) => v.id === variantId);
      if (!product || !variant || !getPurchaseState(product, variant, modes[product.id]).canPurchase) return;
      update((prev) => {
        const existing = prev.find((l) => l.variantId === variantId);
        const max = Math.min(shopConfig.maxQuantityPerLine, variant.stock ?? Infinity);
        if (existing) return prev.map((l) => (l.variantId === variantId ? { ...l, qty: Math.min(max, l.qty + qty) } : l));
        return [...prev, { variantId, qty: Math.min(max, qty) }];
      });
      setDrawerOpen(true);
    },
    [products, modes, update],
  );
  const setQty = useCallback(
    (variantId: string, qty: number) =>
      update((prev) =>
        prev.map((l) => (l.variantId === variantId ? { ...l, qty: Math.max(0, Math.min(shopConfig.maxQuantityPerLine, Math.round(qty))) } : l)),
      ),
    [update],
  );
  const remove = useCallback((variantId: string) => update((prev) => prev.filter((l) => l.variantId !== variantId)), [update]);
  const clear = useCallback(() => update((prev) => (prev.length ? [] : prev)), [update]);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<ShopContextValue>(
    () => ({
      products,
      modes,
      catalogReady,
      lines,
      totals: computeTotals(lines),
      add,
      setQty,
      remove,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
      session,
      authReady,
    }),
    [products, modes, catalogReady, lines, add, setQty, remove, clear, drawerOpen, openDrawer, closeDrawer, session, authReady],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

/** Produkt inkl. Live-Daten und wirksamem Verkaufsstatus */
export function useProduct(slug: string) {
  const { products, modes, catalogReady } = useShop();
  const product = products.find((p) => p.slug === slug)!;
  const variant = product.variants[0];
  const state = getPurchaseState(product, variant, modes[product.id]);
  return { product, variant, state, ready: catalogReady };
}
