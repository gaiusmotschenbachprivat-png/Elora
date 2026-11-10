import Link from "next/link";
import { BuyAction } from "@/components/commerce/BuyAction";
import { PriceBlock, ProductSpecs } from "@/components/commerce/ProductFacts";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct } from "@/lib/catalog";

export function ProductFeature() {
  const p = getProduct("elora-day")!;
  return (
    <section aria-labelledby="product-title" className="relative border-t border-line bg-ivory-50 py-24 lg:py-36">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6">
          <Reveal variant="image" className="overflow-hidden">
            <Link href={`/produkte/${p.slug}/`} className="block aspect-[4/5] bg-sand" aria-label="Zur Produktseite ELORA DAY">
              <Picture name="pack-front" alt={p.images[0].alt} width={1600} height={2000} sizes="(min-width: 1024px) 48vw, 100vw" />
            </Link>
          </Reveal>
          <p className="spec mt-3 text-ink-muted">Abbildung: Konzeptvisualisierung, nicht die finale Verpackung</p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow index="§ 02">Das erste Produkt</Eyebrow>
            <h2 id="product-title" className="mt-8 font-display text-display leading-[0.9]">
              ELORA <span className="display-italic text-citrus-700">Day</span>
            </h2>
            <p className="mt-6 text-lede text-ink-soft">{p.description}</p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <PriceBlock slug={p.slug} />
          </Reveal>
          <Reveal delay={160} className="mt-8">
            <ProductSpecs slug={p.slug} />
          </Reveal>
          <Reveal delay={220} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <BuyAction slug={p.slug} signupHref="/produkte/elora-day/#vormerken" />
            <Link href={`/produkte/${p.slug}/`} className="text-[0.92rem] link-line self-start sm:self-auto">
              Zum Produkt
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
