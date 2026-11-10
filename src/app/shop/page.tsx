import type { Metadata } from "next";
import Link from "next/link";
import { PriceBlock } from "@/components/commerce/ProductFacts";
import { PageIntro } from "@/components/ui/PageIntro";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/catalog";

export const metadata: Metadata = { title: "Shop", description: "Die Produkte von ELORA. Den Anfang macht ELORA DAY." };

export default function ShopPage() {
  return (
    <>
      <PageIntro
        eyebrow="Shop"
        title={
          <>
            Natural Daily <em className="display-italic">Nutrition.</em>
          </>
        }
        lede="Wenige Produkte, sorgfältig entwickelt. Den Anfang macht ELORA DAY."
      />
      <section className="frame pb-28">
        <ul className="grid gap-16">
          {products.map((p) => (
            <li key={p.id}>
              <Reveal className="grid items-end gap-8 lg:grid-cols-12">
                <Link href={`/produkte/${p.slug}/`} className="group block overflow-hidden bg-sand lg:col-span-7" aria-label={`${p.name} ansehen`}>
                  <div className="aspect-[4/5] sm:aspect-[5/4]">
                    <Picture
                      name={p.images[1].src}
                      alt={p.images[1].alt}
                      width={1600}
                      height={2000}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      position="50% 60%"
                      className="transition-transform duration-[1600ms] ease-[var(--ease-soft)] group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
                <div className="lg:col-span-4 lg:col-start-9 lg:pb-4">
                  <p className="spec text-citrus-700">
                    {p.line} · {p.flavor}
                  </p>
                  <h2 className="mt-3 font-display text-[3rem] leading-none">{p.name}</h2>
                  <p className="mt-4 leading-relaxed text-ink-soft">{p.tagline}</p>
                  <div className="mt-6">
                    <PriceBlock slug={p.slug} />
                  </div>
                  <Link href={`/produkte/${p.slug}/`} className="mt-8 inline-block text-[0.95rem] link-line">
                    Zum Produkt
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="spec mt-20 border-t border-line pt-6 text-ink-muted">Weitere Produkte sind in Planung. Wir kündigen sie an, sobald sie feststehen.</p>
      </section>
    </>
  );
}
