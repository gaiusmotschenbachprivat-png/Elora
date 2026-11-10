"use client";

import Link from "next/link";
import { shopConfig } from "@/config/shop";
import { formatPrice } from "@/lib/commerce";
import { useShop } from "@/components/providers/ShopProvider";
import { Picture } from "@/components/ui/Picture";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { Tbd } from "@/components/ui/Notice";

export function CartLines({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const { lines, setQty, remove } = useShop();
  return (
    <ul className="divide-y divide-line border-y border-line">
      {lines.map((l) => (
        <li key={l.variantId} className={`grid grid-cols-[5.5rem_1fr] gap-5 py-6 ${compact ? "" : "sm:grid-cols-[8rem_1fr] sm:gap-8"}`}>
          <Link href={`/produkte/${l.product.slug}/`} onClick={onNavigate} className="block aspect-[4/5] overflow-hidden bg-sand">
            <Picture name={l.product.images[0].src} alt={l.product.images[0].alt} width={1600} height={2000} sizes="140px" />
          </Link>
          <div className="flex min-w-0 flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link href={`/produkte/${l.product.slug}/`} onClick={onNavigate} className="font-display text-[1.35rem] leading-tight">
                  {l.product.name}
                </Link>
                <p className="mt-1 text-[0.85rem] text-ink-muted">
                  {l.product.flavor} · {l.variant.servings}
                </p>
              </div>
              <p className="font-mono text-[0.88rem] tabular-nums">{l.lineCents != null ? formatPrice(l.lineCents) : <Tbd>Preis folgt</Tbd>}</p>
            </div>
            <div className="mt-auto flex items-center justify-between pt-4">
              <QtyStepper
                size="sm"
                value={l.qty}
                max={Math.min(shopConfig.maxQuantityPerLine, l.variant.stock ?? Infinity)}
                onChange={(v) => setQty(l.variantId, v)}
                label={`Menge ${l.product.name}`}
              />
              <button type="button" onClick={() => remove(l.variantId)} className="text-[0.82rem] text-ink-muted link-line hover:text-ink">
                Entfernen
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CartSummary() {
  const { totals } = useShop();
  const row = (label: string, value: React.ReactNode, strong = false) => (
    <div className={`flex items-baseline justify-between ${strong ? "pt-4 text-[1.05rem]" : "text-[0.92rem] text-ink-soft"}`}>
      <dt>{label}</dt>
      <dd className="font-mono tabular-nums">{value}</dd>
    </div>
  );
  return (
    <dl className="space-y-3">
      {row("Zwischensumme", totals.subtotalCents != null ? formatPrice(totals.subtotalCents) : <Tbd>folgt</Tbd>)}
      {row(
        "Versand",
        totals.shippingCents == null ? <Tbd>wird festgelegt</Tbd> : totals.shippingCents === 0 ? "kostenlos" : formatPrice(totals.shippingCents),
      )}
      <div className="border-t border-line" />
      {row("Gesamt", totals.totalCents != null ? formatPrice(totals.totalCents) : <Tbd>folgt</Tbd>, true)}
      <p className="text-[0.75rem] text-ink-muted">inkl. gesetzlicher MwSt.</p>
    </dl>
  );
}
