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
      <h1 className="font-display text-display">Cart</h1>
      {lines.length === 0 ? (
        <div className="mt-12 max-w-xl border-t border-ink/80 pt-8">
          <p className="text-lede text-ink-soft">Your cart is empty.</p>
          <p className="mt-2 text-ink-muted">ELORA DAY is still in development. Join the launch list – with no obligation.</p>
          <LinkButton href="/produkte/elora-day/" className="mt-8" arrow>
            View ELORA DAY
          </LinkButton>
        </div>
      ) : (
        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <CartLines />
            <Link href="/shop/" className="mt-6 inline-block text-[0.9rem] link-line">
              Continue shopping
            </Link>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Summary">
            <div className="border-t border-ink/80 pt-6 lg:sticky lg:top-28">
              <h2 className="spec mb-6 text-ink-muted">Summary</h2>
              <CartSummary />
              {blocked ? (
                <div className="mt-8">
                  <Notice tone="inactive" title="Ordering is not possible yet">
                    At least one item cannot be ordered yet. As soon as pre-orders or sales open, you can continue here.
                  </Notice>
                </div>
              ) : (
                <LinkButton href="/kasse/" size="lg" className="mt-8 w-full" arrow>
                  Checkout
                </LinkButton>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
