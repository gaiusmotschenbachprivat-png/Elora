"use client";

import { formatPrice, statusLabel, unitPrice } from "@/lib/commerce";
import { useProduct } from "@/components/providers/ShopProvider";
import { StatusTag, Tbd } from "@/components/ui/Notice";

/** Preis-/Statusblock inkl. Grundpreis und Pflichthinweisen (PAngV). */
export function PriceBlock({ slug, size = "md" }: { slug: string; size?: "md" | "lg" }) {
  const { variant, state } = useProduct(slug);
  const unit = unitPrice(variant);
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <p className={`font-display ${size === "lg" ? "text-[2.2rem]" : "text-[1.7rem]"} leading-none tabular-nums`}>
          {variant.priceCents != null ? formatPrice(variant.priceCents) : <span className="text-[0.55em]"><Tbd>Preis wird vor dem Launch festgelegt</Tbd></span>}
        </p>
        <StatusTag tone={state.mode === "sale" ? "live" : "pending"}>{statusLabel[state.mode]}</StatusTag>
      </div>
      {variant.priceCents != null && (
        <p className="mt-2 text-[0.78rem] text-ink-muted">
          inkl. MwSt., zzgl. Versand{unit ? ` · Grundpreis ${unit}` : ""}
        </p>
      )}
    </div>
  );
}

export function ProductSpecs({ slug }: { slug: string }) {
  const { product, variant, state } = useProduct(slug);
  const rows: [string, React.ReactNode][] = [
    ["Geschmack", product.flavor],
    ["Format", `${variant.name}, ${variant.servings} (geplant)`],
    ["Anwendung", "Morgens, in kaltem Wasser"],
    ["Ohne", "Koffein · Taurin"],
    ["Status", state.mode === "launch" ? `In Entwicklung · Launch ${product.launch}` : statusLabel[state.mode]],
  ];
  return (
    <dl className="border-t border-line">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3.5 text-[0.92rem]">
          <dt className="spec pt-0.5 text-ink-muted">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
