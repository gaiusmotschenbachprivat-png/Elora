"use client";

import Link from "next/link";
import { useState } from "react";
import { shopConfig } from "@/config/shop";
import { ctaLabel } from "@/lib/commerce";
import { useProduct, useShop } from "@/components/providers/ShopProvider";
import { Arrow, buttonClasses } from "@/components/ui/Button";
import { QtyStepper } from "@/components/ui/QtyStepper";

/**
 * Purchase CTA depending on the effective sales mode:
 * launch → join the launch list, preorder → pre-order, sale → add to cart.
 */
export function BuyAction({
  slug,
  withQty = false,
  signupHref,
  full = false,
  variant = "solid",
}: {
  slug: string;
  withQty?: boolean;
  signupHref: string;
  full?: boolean;
  variant?: "solid" | "text";
}) {
  const { variant: v, state } = useProduct(slug);
  const { add } = useShop();
  const [qty, setQty] = useState(1);
  const max = Math.min(shopConfig.maxQuantityPerLine, v.stock ?? Infinity);

  if (!state.canPurchase) {
    if (variant === "text")
      return (
        <Link href={signupHref} className="self-start text-[0.72rem] tracking-[0.2em] text-forest uppercase link-line sm:self-auto">
          {ctaLabel.launch}
        </Link>
      );
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
      <button type="button" onClick={() => add(v.id, qty)} className={buttonClasses(variant === "text" ? "outline" : "solid", "lg", "flex-1")}>
        <span>{ctaLabel[state.mode]}</span>
        <Arrow />
      </button>
    </div>
  );
}
