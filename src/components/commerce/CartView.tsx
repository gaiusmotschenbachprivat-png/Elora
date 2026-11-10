"use client";

import Link from "next/link";
import { useShop } from "@/components/providers/ShopProvider";
import { LinkButton } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { getPurchaseState } from "@/lib/commerce";
import { CartLines, CartSummary } from "./CartLines";

export function CartView() {
  const { lines, modes } = useShop();
  const blocked = lines.some((l) => !getPurchaseState(l.product, l.variant, modes[l.product.id]).canPurchase);

  return (
    <div className="frame pt-36 pb-28 lg:pt-44">
      <h1 className="font-display text-display">Warenkorb</h1>
      {lines.length === 0 ? (
        <div className="mt-12 max-w-xl border-t border-ink/80 pt-8">
          <p className="text-lede text-ink-soft">Dein Warenkorb ist leer.</p>
          <p className="mt-2 text-ink-muted">ELORA DAY ist noch in Entwicklung. Merke dich jetzt unverbindlich für den Launch vor.</p>
          <LinkButton href="/produkte/elora-day/" className="mt-8" arrow>
            ELORA DAY ansehen
          </LinkButton>
        </div>
      ) : (
        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <CartLines />
            <Link href="/shop/" className="mt-6 inline-block text-[0.9rem] link-line">
              Weiter einkaufen
            </Link>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Zusammenfassung">
            <div className="border-t border-ink/80 pt-6 lg:sticky lg:top-28">
              <h2 className="spec mb-6 text-ink-muted">Zusammenfassung</h2>
              <CartSummary />
              {blocked ? (
                <div className="mt-8">
                  <Notice tone="inactive" title="Bestellung derzeit nicht möglich">
                    Mindestens ein Artikel ist aktuell nicht bestellbar. Sobald Vorbestellung oder Verkauf starten, kannst du hier fortfahren.
                  </Notice>
                </div>
              ) : (
                <LinkButton href="/kasse/" size="lg" className="mt-8 w-full" arrow>
                  Zur Kasse
                </LinkButton>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
