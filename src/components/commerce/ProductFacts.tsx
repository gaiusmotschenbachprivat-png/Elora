"use client";

import { availabilityLabel, formatPrice, statusLabel, unitPrice } from "@/lib/commerce";
import { useProduct } from "@/components/providers/ShopProvider";
import { StatusTag, Tbd } from "@/components/ui/Notice";

/** Price / status block incl. unit price and mandatory notes (PAngV). */
export function PriceBlock({ slug, size = "md" }: { slug: string; size?: "md" | "lg" }) {
  const { variant, state } = useProduct(slug);
  const unit = unitPrice(variant);
  const availability = availabilityLabel(variant, state.mode);
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <p className={`font-display ${size === "lg" ? "text-[2.4rem]" : "text-[1.9rem]"} leading-none tabular-nums`}>
          {variant.priceCents != null ? formatPrice(variant.priceCents) : <span className="text-[0.5em]"><Tbd>Price to be announced before launch</Tbd></span>}
        </p>
        <StatusTag tone={state.mode === "sale" ? "live" : "pending"}>{statusLabel[state.mode]}</StatusTag>
        {availability && <StatusTag tone={variant.stock ? "live" : "neutral"}>{availability}</StatusTag>}
      </div>
      {variant.priceCents != null && (
        <p className="mt-2 text-[0.76rem] text-ink-muted">
          Incl. VAT, plus shipping{unit ? ` · Unit price ${unit}` : ""}
        </p>
      )}
    </div>
  );
}

export function ProductSpecs({ slug }: { slug: string }) {
  const { product, variant, state } = useProduct(slug);
  const rows: [string, React.ReactNode][] = [
    ["Flavour", product.flavor],
    ["Format", `${variant.name}, ${variant.servings}`],
    ["Use", "Mornings, mixed with cold water"],
    ["Without", "Caffeine · Taurine"],
    ["Status", state.mode === "launch" ? `In development · Planned launch ${product.launch}` : statusLabel[state.mode]],
  ];
  return (
    <dl className="border-t border-line">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4 text-[0.92rem]">
          <dt className="spec pt-0.5 text-ink-muted">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
