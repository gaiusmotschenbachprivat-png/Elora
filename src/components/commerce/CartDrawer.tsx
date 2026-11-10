"use client";

import Link from "next/link";
import { useRef } from "react";
import { useShop } from "@/components/providers/ShopProvider";
import { useDialog } from "@/lib/hooks/useDialog";
import { IconClose } from "@/components/ui/Icons";
import { LinkButton } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { CartLines, CartSummary } from "./CartLines";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, totals } = useShop();
  const ref = useRef<HTMLDivElement>(null);
  useDialog(drawerOpen, closeDrawer, ref);

  return (
    <div className={`fixed inset-0 z-[60] ${drawerOpen ? "" : "pointer-events-none"}`} aria-hidden={!drawerOpen}>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Warenkorb schließen"
        onClick={closeDrawer}
        className={`absolute inset-0 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-500 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        inert={!drawerOpen}
        className={`absolute top-0 right-0 flex h-full w-full max-w-[30rem] flex-col bg-ivory pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] transition-[transform,visibility] duration-700 ease-[var(--ease-soft)] ${
          drawerOpen ? "visible translate-x-0 shadow-[-30px_0_60px_-30px_rgb(41_43_40/0.25)]" : "invisible translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8">
          <h2 id="drawer-title" className="font-display text-[1.6rem] leading-none">
            Warenkorb <span className="font-mono text-[0.8rem] align-middle text-ink-muted">({totals.itemCount})</span>
          </h2>
          <button type="button" onClick={closeDrawer} className="-mr-2 flex h-11 w-11 items-center justify-center" aria-label="Warenkorb schließen">
            <IconClose />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8 sm:px-8">
            <p className="font-display text-[1.9rem] leading-tight">Noch leer.</p>
            <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">
              ELORA DAY befindet sich in der Entwicklung. Du kannst dich jetzt für den Launch vormerken.
            </p>
            <Link href="/produkte/elora-day/" onClick={closeDrawer} className="group mt-8 block">
              <div className="aspect-[4/5] overflow-hidden bg-sand">
                <Picture name="pack-glass" alt="" width={1600} height={2000} sizes="420px" className="transition-transform duration-[1500ms] ease-[var(--ease-soft)] group-hover:scale-[1.03]" />
              </div>
              <p className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-[1.4rem]">ELORA DAY</span>
                <span className="text-[0.85rem] link-line">Entdecken</span>
              </p>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 sm:px-8">
              <CartLines compact onNavigate={closeDrawer} />
            </div>
            <div className="border-t border-line bg-ivory-50 px-6 py-6 sm:px-8">
              <CartSummary />
              <div className="mt-6 grid gap-3">
                <LinkButton href="/kasse/" size="lg" arrow onClick={closeDrawer}>
                  Zur Kasse
                </LinkButton>
                <Link href="/warenkorb/" onClick={closeDrawer} className="text-center text-[0.85rem] text-ink-soft link-line mx-auto">
                  Warenkorb ansehen
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
