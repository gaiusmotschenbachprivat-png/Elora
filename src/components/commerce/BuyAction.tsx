"use client";

import Link from "next/link";
import { useState } from "react";
import { shopConfig } from "@/config/shop";
import { ctaLabel } from "@/lib/commerce";
import { useProduct, useShop } from "@/components/providers/ShopProvider";
import { Arrow, buttonClasses } from "@/components/ui/Button";
import { QtyStepper } from "@/components/ui/QtyStepper";

/**
 * Kauf-CTA abhängig vom wirksamen Verkaufsmodus:
 * launch → Vormerken (Formular), preorder → Vorbestellen, sale → In den Warenkorb.
 */
export function BuyAction({ slug, withQty = false, signupHref, full = false }: { slug: string; withQty?: boolean; signupHref: string; full?: boolean }) {
  const { variant, state } = useProduct(slug);
  const { add } = useShop();
  const [qty, setQty] = useState(1);
  const max = Math.min(shopConfig.maxQuantityPerLine, variant.stock ?? Infinity);

  if (!state.canPurchase) {
    return (
      <Link href={signupHref} className={buttonClasses("solid", "lg", full ? "w-full" : "")}>
        <span>{ctaLabel.launch}</span>
        <Arrow />
      </Link>
    );
  }

  return (
    <div className={`flex gap-3 ${full ? "w-full" : ""}`}>
      {withQty && <QtyStepper value={qty} onChange={setQty} max={max} />}
      <button type="button" onClick={() => add(variant.id, qty)} className={buttonClasses("solid", "lg", "flex-1")}>
        <span>{ctaLabel[state.mode]}</span>
        <Arrow />
      </button>
    </div>
  );
}
