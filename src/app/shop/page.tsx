import type { Metadata } from "next";
import Link from "next/link";
import { PriceBlock } from "@/components/commerce/ProductFacts";
import { PageIntro } from "@/components/ui/PageIntro";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/catalog";

export const metadata: Metadata = { title: "Shop", description: "Products by ELORA – thoughtfully made for your daily ritual. Beginning with ELORA DAY." };

export default function ShopPage() {
  return (
    <>
      <PageIntro
        eyebrow="Shop"
        title={
          <>
            A daily ritual.
            <br />
            <span className="display-italic text-ink">Thoughtfully made.</span>
          </>
        }
        lede="Few products, carefully developed. ELORA begins with ELORA DAY."
      />
      <section className="frame pb-32">
        <ul className="grid gap-20">
          {products.map((p) => (
            <li key={p.id}>
              <Reveal className="grid items-end gap-10 lg:grid-cols-12">
                <Link href={`/produkte/${p.slug}/`} className="group block overflow-hidden bg-sand-100 lg:col-span-7" aria-label={`View ${p.name}`}>
                  <div className="aspect-[4/5] sm:aspect-[5/4]">
                    <Picture
                      name={p.images[1].src}
                      alt={p.images[1].alt}
                      width={1600}
                      height={2000}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      position="50% 60%"
                      className="transition-transform duration-[2200ms] ease-[var(--ease-soft)] group-hover:scale-[1.025]"
                    />
                  </div>
                </Link>
                <div className="lg:col-span-4 lg:col-start-9 lg:pb-4">
                  <p className="spec text-gold-700">{p.flavor}</p>
                  <h2 className="caps mt-4 font-display text-[3.2rem] leading-none text-forest">{p.name}</h2>
                  <p className="mt-5 leading-relaxed text-ink-soft">{p.tagline}</p>
                  <div className="mt-8">
                    <PriceBlock slug={p.slug} />
                  </div>
                  <Link href={`/produkte/${p.slug}/`} className="mt-10 inline-block text-[0.72rem] tracking-[0.2em] text-forest uppercase link-line">
                    Discover the product
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="spec mt-24 border-t border-line pt-6 text-ink-muted">Further products are planned. We will announce them once they are confirmed.</p>
      </section>
    </>
  );
}
