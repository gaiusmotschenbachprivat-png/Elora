"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BuyAction } from "@/components/commerce/BuyAction";
import { PriceBlock } from "@/components/commerce/ProductFacts";
import { SignupForm } from "@/components/commerce/SignupForm";
import { useProduct } from "@/components/providers/ShopProvider";
import { Accordion } from "@/components/ui/Accordion";
import { Arrow } from "@/components/ui/Button";
import { Tbd } from "@/components/ui/Notice";
import { formatPrice, statusLabel } from "@/lib/commerce";
import { ingredients } from "@/lib/content";
import { shopConfig } from "@/config/shop";

export function BuyBox({ slug }: { slug: string }) {
  const { product, variant, state } = useProduct(slug);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  /* Sticky purchase bar (mobile) once the buy area has scrolled out of view */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shipping = shopConfig.shipping.methods[0];
  const details = [
    {
      title: "Preparation",
      content: (
        <ol className="space-y-2">
          <li>01 — Prepare a glass of cold water: <Tbd>— ml</Tbd>.</li>
          <li>02 — Add one serving of ELORA DAY: <Tbd>approx. — g</Tbd>, and stir.</li>
          <li>03 — Enjoy your daily morning ritual.</li>
        </ol>
      ),
    },
    {
      title: "Ingredients & nutrition",
      content: (
        <>
          <p>Planned: {ingredients.map((i) => `${i.name.toLowerCase()}${i.optional ? " (optional)" : ""}`).join(", ")}. Natural citrus and ginger flavours.</p>
          <p className="mt-3">
            Ingredient list and nutrition per serving: <Tbd>published with the final formulation</Tbd>.{" "}
            <Link href="/inhaltsstoffe/" className="link-line text-ink">
              About the ingredients
            </Link>
          </p>
        </>
      ),
    },
    {
      title: "Packaging & product details",
      content: (
        <dl className="grid grid-cols-[9.5rem_1fr] gap-y-2">
          <dt className="text-ink-muted">Product type</dt>
          <dd>Food supplement (planned)</dd>
          <dt className="text-ink-muted">Packaging</dt>
          <dd>Tin – concept design, <Tbd>final packaging to be confirmed</Tbd></dd>
          <dt className="text-ink-muted">Net weight</dt>
          <dd>{variant.netWeightGrams ? `${variant.netWeightGrams} g` : <Tbd>— g</Tbd>}</dd>
          <dt className="text-ink-muted">Servings</dt>
          <dd><Tbd>to be confirmed</Tbd></dd>
          <dt className="text-ink-muted">Recommended use</dt>
          <dd><Tbd>to follow</Tbd></dd>
          <dt className="text-ink-muted">Warnings</dt>
          <dd><Tbd>per NemV, to follow</Tbd></dd>
          <dt className="text-ink-muted">Manufacturer</dt>
          <dd><Tbd>name and address to follow</Tbd></dd>
        </dl>
      ),
    },
    {
      title: "Shipping",
      content: (
        <p>
          {shipping.label}: {shipping.priceCents != null ? formatPrice(shipping.priceCents) : <Tbd>cost to be confirmed</Tbd>} · {shipping.deliveryNote}. Delivery to{" "}
          {shopConfig.shipping.countries.map((c) => c.label).join(" and ")}. Details in{" "}
          <Link href="/versand/" className="link-line text-ink">Versandinformationen</Link> and the{" "}
          <Link href="/widerruf/" className="link-line text-ink">Widerrufsbelehrung</Link>.
        </p>
      ),
    },
  ];

  return (
    <div>
      <nav aria-label="Breadcrumb" className="spec text-ink-muted">
        <Link href="/shop/" className="hover:text-forest">Shop</Link> <span aria-hidden="true">/</span> {product.name}
      </nav>
      <p className="spec mt-10 text-gold-700">{product.flavor}</p>
      <h1 className="caps mt-4 font-display text-[clamp(3rem,2rem+3.2vw,5rem)] leading-[0.95] text-forest">ELORA DAY</h1>
      <p className="mt-6 font-display text-[1.6rem] leading-snug text-ink italic">{product.tagline}</p>
      <p className="mt-4 leading-relaxed text-ink-soft">{product.description}</p>

      <div className="mt-10">
        <PriceBlock slug={slug} size="lg" />
      </div>

      <fieldset className="mt-9">
        <legend className="spec text-ink-muted">Format</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <label key={v.id} className="cursor-default">
              <input type="radio" name="variant" value={v.id} defaultChecked className="peer sr-only" readOnly />
              <span className="inline-flex h-11 items-center border border-forest/60 px-5 text-[0.85rem] peer-focus-visible:outline peer-focus-visible:outline-1">
                {v.name} · {v.servings}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div ref={ctaRef} className="mt-9">
        <BuyAction slug={slug} withQty signupHref="#launch-list" full />
        {state.mode === "preorder" && shopConfig.preorderDeliveryNote && <p className="mt-3 text-[0.85rem] text-ink-soft">Pre-order · {shopConfig.preorderDeliveryNote}</p>}
      </div>

      {!state.canPurchase && (
        <section id="launch-list" aria-labelledby="launch-title" className="mt-14 scroll-mt-28 border-t border-forest/40 pt-9">
          <h2 id="launch-title" className="caps font-display text-[1.9rem] leading-tight text-forest">Join the launch list</h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
            ELORA DAY cannot be ordered yet. Leave your email – we will let you know as soon as pre-orders or sales open. No obligation.
          </p>
          <div className="mt-7">
            <SignupForm list="launch" />
          </div>
        </section>
      )}

      <div className="mt-14">
        <Accordion items={details} size="sm" />
      </div>

      {/* Sticky purchase bar (mobile) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md transition-transform duration-700 ease-[var(--ease-soft)] lg:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showSticky}
        inert={!showSticky}
      >
        <div className="frame flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="caps truncate font-display text-[1.15rem] leading-tight text-forest">{product.name}</p>
            <p className="spec text-ink-muted">{variant.priceCents != null ? formatPrice(variant.priceCents) : statusLabel[state.mode]}</p>
          </div>
          {state.canPurchase ? (
            <div className="shrink-0">
              <BuyAction slug={slug} signupHref="#launch-list" />
            </div>
          ) : (
            <a href="#launch-list" className="group inline-flex h-12 shrink-0 items-center gap-3 bg-forest px-5 text-[0.68rem] tracking-[0.18em] text-ivory uppercase">
              Join the list <Arrow />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
