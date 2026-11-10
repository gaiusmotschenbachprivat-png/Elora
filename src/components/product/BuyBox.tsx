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

  /* Sticky-Leiste (mobil), sobald der Kaufbereich aus dem Bild scrollt */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const details = [
    {
      title: "Zubereitung",
      content: (
        <ol className="space-y-2">
          <li>1. Eine Portion ELORA DAY abmessen – <Tbd>ca. — g</Tbd>.</li>
          <li>2. In <Tbd>— ml</Tbd> kaltem Wasser auflösen.</li>
          <li>3. Kurz umrühren und genießen. Am besten morgens.</li>
        </ol>
      ),
    },
    {
      title: "Inhaltsstoffe",
      content: (
        <>
          <p>Geplant: {ingredients.map((i) => `${i.name}${i.optional ? " (optional)" : ""}`).join(", ")}. Natürliche Citrus- und Ingweraromen.</p>
          <p className="mt-3">
            Zutatenliste und Nährwerte pro Portion: <Tbd>folgen mit der finalen Rezeptur</Tbd>.{" "}
            <Link href="/inhaltsstoffe/" className="link-line text-ink">
              Mehr zu den Inhaltsstoffen
            </Link>
          </p>
        </>
      ),
    },
    {
      title: "Produktdetails & Kennzeichnung",
      content: (
        <dl className="grid grid-cols-[9rem_1fr] gap-y-2">
          <dt className="text-ink-muted">Produktart</dt>
          <dd>Nahrungsergänzungsmittel (geplant)</dd>
          <dt className="text-ink-muted">Nettofüllmenge</dt>
          <dd>{variant.netWeightGrams ? `${variant.netWeightGrams} g` : <Tbd>— g</Tbd>}</dd>
          <dt className="text-ink-muted">Portionen</dt>
          <dd>{variant.servings}</dd>
          <dt className="text-ink-muted">Verzehrempfehlung</dt>
          <dd><Tbd>folgt</Tbd></dd>
          <dt className="text-ink-muted">Warnhinweise</dt>
          <dd><Tbd>gemäß NemV, folgen</Tbd></dd>
          <dt className="text-ink-muted">Hersteller</dt>
          <dd><Tbd>Name und Anschrift folgen</Tbd></dd>
        </dl>
      ),
    },
    {
      title: "Versand & Rückgabe",
      content: (
        <p>
          Versandkosten und Lieferzeiten werden vor dem Verkaufsstart festgelegt. Details unter{" "}
          <Link href="/versand/" className="link-line text-ink">Versand &amp; Zahlung</Link> und in der{" "}
          <Link href="/widerruf/" className="link-line text-ink">Widerrufsbelehrung</Link>.
        </p>
      ),
    },
  ];

  return (
    <div>
      <nav aria-label="Brotkrumen" className="spec text-ink-muted">
        <Link href="/shop/" className="hover:text-ink">Shop</Link> <span aria-hidden="true">/</span> {product.name}
      </nav>
      <p className="spec mt-8 text-citrus-700">{product.line} · {product.flavor}</p>
      <h1 className="mt-3 font-display text-[clamp(3rem,2rem+3.5vw,5rem)] leading-[0.92] tracking-[-0.03em]">
        ELORA <em className="display-italic text-citrus-700">Day</em>
      </h1>
      <p className="mt-5 text-lede text-ink-soft">{product.tagline}</p>

      <div className="mt-8">
        <PriceBlock slug={slug} size="lg" />
      </div>

      <fieldset className="mt-8">
        <legend className="spec text-ink-muted">Variante</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <label key={v.id} className="cursor-default">
              <input type="radio" name="variant" value={v.id} defaultChecked className="peer sr-only" readOnly />
              <span className="inline-flex h-11 items-center border border-ink px-4 text-[0.88rem] peer-focus-visible:outline peer-focus-visible:outline-1">
                {v.name} · {v.servings}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div ref={ctaRef} className="mt-8">
        <BuyAction slug={slug} withQty signupHref="#vormerken" full />
        {state.mode === "preorder" && shopConfig.preorderDeliveryNote && (
          <p className="mt-3 text-[0.85rem] text-ink-soft">Vorbestellung · {shopConfig.preorderDeliveryNote}</p>
        )}
      </div>

      {!state.canPurchase && (
        <section id="vormerken" aria-labelledby="vormerken-title" className="mt-12 scroll-mt-28 border-t border-ink/80 pt-8">
          <h2 id="vormerken-title" className="font-display text-[1.8rem] leading-tight">Zum Launch vormerken</h2>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
            ELORA DAY ist noch nicht bestellbar. Trag dich unverbindlich ein – wir informieren dich, sobald Vorbestellung oder Verkauf starten.
          </p>
          <div className="mt-6">
            <SignupForm list="launch" />
          </div>
        </section>
      )}

      <div className="mt-12">
        <Accordion items={details} size="sm" />
      </div>

      {/* Sticky-Kaufleiste (mobil) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md transition-transform duration-500 ease-[var(--ease-soft)] lg:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showSticky}
        inert={!showSticky}
      >
        <div className="frame flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-display text-[1.15rem] leading-tight">{product.name}</p>
            <p className="spec text-ink-muted">{variant.priceCents != null ? formatPrice(variant.priceCents) : statusLabel[state.mode]}</p>
          </div>
          {state.canPurchase ? (
            <div className="shrink-0">
              <BuyAction slug={slug} signupHref="#vormerken" />
            </div>
          ) : (
            <a href="#vormerken" className="group inline-flex h-12 shrink-0 items-center gap-3 bg-forest px-5 text-[0.88rem] text-ivory-50">
              Vormerken <Arrow />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
