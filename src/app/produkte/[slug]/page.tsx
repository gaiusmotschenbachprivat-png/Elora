import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/product/Gallery";
import { BuyBox } from "@/components/product/BuyBox";
import { FaqList } from "@/components/commerce/FaqList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Tbd } from "@/components/ui/Notice";
import { getProduct, products } from "@/lib/catalog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} – ${p.flavor}`,
    description: `${p.tagline} ${p.flavor}, ${p.variants[0].servings}. Geplanter Launch: ${p.launch}.`,
    openGraph: { images: [{ url: `images/${p.images[0].src}-1024.webp` }] },
  };
}

const ritual = [
  { t: "Abmessen", d: <>Eine Portion ELORA DAY – <Tbd>ca. — g</Tbd>.</> },
  { t: "Auflösen", d: <>In <Tbd>— ml</Tbd> kaltem Wasser.</> },
  { t: "Beginnen", d: <>Umrühren, trinken, in den Tag starten.</> },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "ELORA" },
    image: product.images.map((i) => `${site.url}/images/${i.src}-1024.webp`),
  };

  return (
    <>
      <section className="lg:frame grid gap-10 pt-[4.5rem] lg:grid-cols-12 lg:gap-12 lg:pt-32 lg:pb-24">
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-28">
            <Gallery images={product.images} name={product.name} />
          </div>
        </div>
        <div className="frame pb-16 lg:col-span-5 lg:px-0 lg:pb-0">
          <BuyBox slug={product.slug} />
        </div>
      </section>

      <section aria-labelledby="ritual-title" className="border-t border-line bg-ivory-50 py-24 lg:py-32">
        <div className="frame grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="§ 01">Zubereitung</Eyebrow>
              <h2 id="ritual-title" className="mt-8 font-display text-title">
                Drei Handgriffe. <em className="display-italic text-ink-soft">Ein Ritual.</em>
              </h2>
            </Reveal>
            <ol className="mt-12 border-t border-ink/80">
              {ritual.map((r, i) => (
                <Reveal as="li" key={r.t} delay={i * 80} className="grid grid-cols-[4rem_1fr] items-baseline border-b border-line py-6">
                  <span className="font-display text-[2.6rem] leading-none text-citrus-700">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-none">{r.t}</h3>
                    <p className="mt-2 text-ink-soft">{r.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className="spec mt-4 text-ink-muted">Portionsgröße und Wassermenge folgen mit der finalen Rezeptur</p>
          </div>
          <Reveal variant="image" className="overflow-hidden lg:col-span-6 lg:col-start-7">
            <div className="aspect-[4/5] bg-sand">
              <Picture name="pack-glass" alt={product.images[1].alt} width={1600} height={2000} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pdp-faq" className="py-24 lg:py-32">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="§ 02">Fragen</Eyebrow>
            <h2 id="pdp-faq" className="mt-8 font-display text-title">
              Gut zu <em className="display-italic">wissen.</em>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqList />
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </>
  );
}
