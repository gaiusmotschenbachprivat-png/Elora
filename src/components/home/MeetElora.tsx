import Link from "next/link";
import { BuyAction } from "@/components/commerce/BuyAction";
import { PriceBlock } from "@/components/commerce/ProductFacts";
import { Enso } from "@/components/brand/Enso";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct } from "@/lib/catalog";

/** Nur bestätigte Merkmale – Packungsgröße erst nach Festlegung. */
const features = [
  { k: "Flavour", v: "Citrus & Ginger" },
  { k: "Electrolytes", v: "Selected electrolytes" },
  { k: "Micronutrients", v: "Selected micronutrients" },
  { k: "Pack size", v: "To be confirmed" },
];

export function MeetElora() {
  const p = getProduct("elora-day")!;
  return (
    <section id="product" aria-labelledby="product-title" className="relative bg-sand-100/60 py-28 lg:py-44">
      <div className="frame grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6">
          <Enso className="absolute -top-10 -right-10 hidden h-64 w-64 lg:block" />
          <Reveal variant="image" className="relative overflow-hidden">
            <Link href={`/produkte/${p.slug}/`} className="block aspect-[4/5] bg-sand-100" aria-label="View ELORA DAY">
              <Picture name="pack-front" alt={p.images[0].alt} width={1600} height={2000} sizes="(min-width: 1024px) 46vw, 100vw" />
            </Link>
          </Reveal>
          <p className="spec mt-4 text-ink-muted">Concept visualisation – not the final packaging</p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow index="02">Introducing</Eyebrow>
            <h2 id="product-title" className="caps mt-10 font-display text-title text-forest">
              Meet
              <br />
              ELORA DAY.
            </h2>
            <p className="mt-8 font-display text-[1.65rem] leading-snug text-ink italic">{p.tagline}</p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <dl className="grid grid-cols-2 border-t border-line">
              {features.map((f) => (
                <div key={f.k} className="border-b border-line py-5 pr-4 odd:border-r odd:pr-6 even:pl-6">
                  <dt className="spec text-ink-muted">{f.k}</dt>
                  <dd className="mt-2 text-[0.95rem]">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={180} className="mt-10">
            <PriceBlock slug={p.slug} />
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Link
              href={`/produkte/${p.slug}/`}
              className="group relative inline-flex h-14 items-center justify-center gap-4 overflow-hidden bg-forest px-9 text-[0.72rem] tracking-[0.2em] text-ivory uppercase before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-forest-900 before:transition-transform before:duration-700 before:ease-[var(--ease-soft)] hover:before:scale-y-100 [&>*]:relative"
            >
              <span>Discover the product</span>
            </Link>
            <BuyAction slug={p.slug} signupHref="/produkte/elora-day/#launch-list" variant="text" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
