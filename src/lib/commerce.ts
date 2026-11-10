import { shopConfig, type SalesMode } from "@/config/shop";
import type { Product, Variant } from "./catalog";
import { services } from "./services";

/* ------------------------------------------------------------------ */
/*  Preise                                                             */
/* ------------------------------------------------------------------ */
const fmt = new Intl.NumberFormat(shopConfig.locale, { style: "currency", currency: shopConfig.currency });

export function formatPrice(cents: number) {
  return fmt.format(cents / 100);
}

/** Grundpreis gemäß PAngV (€/kg), sofern Preis und Füllmenge bekannt sind. */
export function unitPrice(variant: Variant) {
  if (variant.priceCents == null || !variant.netWeightGrams) return null;
  return `${formatPrice(Math.round((variant.priceCents / variant.netWeightGrams) * 1000))} / kg`;
}

/* ------------------------------------------------------------------ */
/*  Verkaufsmodus                                                      */
/* ------------------------------------------------------------------ */
export type PurchaseState = {
  /** Gewünschter Modus (Datenbank oder Konfiguration) */
  requested: SalesMode;
  /** Tatsächlich wirksamer Modus nach Prüfung aller Voraussetzungen */
  mode: SalesMode;
  canPurchase: boolean;
  /** Fehlende Voraussetzungen (für Betreiber/Dokumentation, nicht für Kund*innen) */
  missing: string[];
};

export function getPurchaseState(product: Product, variant: Variant, requestedMode?: SalesMode | null): PurchaseState {
  const requested: SalesMode = requestedMode ?? product.salesMode ?? shopConfig.salesMode;
  if (requested === "launch") return { requested, mode: "launch", canPurchase: false, missing: [] };

  const missing: string[] = [];
  if (variant.priceCents == null) missing.push("Preis der Variante");
  if (!variant.netWeightGrams) missing.push("Nettofüllmenge (Grundpreis)");
  if (variant.stock != null && variant.stock <= 0) missing.push("Bestand");
  if (!shopConfig.paymentsEnabled) missing.push("Zahlungsanbieter (NEXT_PUBLIC_PAYMENTS_ENABLED)");
  if (!services.supabase) missing.push("Supabase (Bestellungen, Checkout-Funktion)");
  if (shopConfig.shipping.methods.every((m) => m.priceCents == null)) missing.push("Versandkosten");
  for (const [key, ok] of Object.entries(shopConfig.legal)) if (!ok) missing.push(`Rechtstext: ${key}`);
  if (requested === "preorder" && !shopConfig.preorderDeliveryNote) missing.push("Voraussichtlicher Liefertermin");

  const ready = missing.length === 0;
  return { requested, mode: ready ? requested : "launch", canPurchase: ready, missing };
}

export const ctaLabel: Record<SalesMode, string> = {
  launch: "Zum Launch vormerken",
  preorder: "Vorbestellen",
  sale: "In den Warenkorb",
};

export const statusLabel: Record<SalesMode, string> = {
  launch: "In Entwicklung",
  preorder: "Vorbestellung möglich",
  sale: "Verfügbar",
};

/* ------------------------------------------------------------------ */
/*  Summen                                                             */
/* ------------------------------------------------------------------ */
export type CartLine = { variantId: string; qty: number };

export type PricedLine = CartLine & {
  product: Product;
  variant: Variant;
  unitCents: number | null;
  lineCents: number | null;
};

export type Totals = {
  subtotalCents: number | null;
  shippingCents: number | null;
  totalCents: number | null;
  itemCount: number;
};

export function computeTotals(lines: PricedLine[], shippingMethodId = "standard"): Totals {
  const itemCount = lines.reduce((n, l) => n + l.qty, 0);
  if (!lines.length) return { subtotalCents: 0, shippingCents: 0, totalCents: 0, itemCount };
  if (lines.some((l) => l.lineCents == null)) {
    return { subtotalCents: null, shippingCents: null, totalCents: null, itemCount };
  }
  const subtotal = lines.reduce((s, l) => s + (l.lineCents ?? 0), 0);
  const method = shopConfig.shipping.methods.find((m) => m.id === shippingMethodId);
  const threshold = shopConfig.shipping.freeShippingThresholdCents;
  let shipping: number | null = method?.priceCents ?? null;
  if (shipping != null && threshold != null && subtotal >= threshold) shipping = 0;
  return {
    subtotalCents: subtotal,
    shippingCents: shipping,
    totalCents: shipping == null ? null : subtotal + shipping,
    itemCount,
  };
}
