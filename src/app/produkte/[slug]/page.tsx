import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/product/Gallery";
import { BuyBox } from "@/components/product/BuyBox";
import { FaqList } from "@/components/commerce/FaqList";
import { Ritual } from "@/components/home/Ritual";
import { Enso } from "@/components/brand/Enso";
import { Botanical } from "@/components/brand/Botanical";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { getProduct, products } from "@/lib/catalog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} – ${p.flavor} daily drink`,
    description: `${p.tagline} With selected electrolytes and micronutrients. Planned launch: ${p.launch}.`,
    openGraph: { images: [{ url: `images/${p.images[0].src}-1024.webp`, alt: p.images[0].alt }] },
  };
}

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
      <section className="lg:frame grid gap-10 pt-20 lg:grid-cols-12 lg:gap-14 lg:pt-36 lg:pb-28">
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-28">
            <Gallery images={product.images} name={product.name} />
          </div>
        </div>
        <div className="frame pb-20 lg:col-span-5 lg:px-0 lg:pb-0">
          <BuyBox slug={product.slug} />
        </div>
      </section>

      {/* Story */}
      <section aria-labelledby="story-title" className="grain relative overflow-hidden bg-sand-100/70 py-28 lg:py-40">
        <div className="frame relative z-[2] grid items-center gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <Enso className="absolute -top-12 -left-12 h-56 w-56" />
            <Reveal variant="image" className="relative overflow-hidden">
              <div className="aspect-[4/5] bg-sand-100">
                <Picture name="macro" alt={product.images[2].alt} width={1600} height={2000} sizes="(min-width: 1024px) 38vw, 100vw" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow>The story</Eyebrow>
              <h2 id="story-title" className="caps mt-10 font-display text-title text-forest">
                A little more
                <br />
                intentional.
              </h2>
            </Reveal>
            <Reveal delay={140} className="mt-10 max-w-lg space-y-6">
              <p className="font-display text-[1.7rem] leading-snug text-ink italic">
                ELORA DAY was created around a simple idea: making the beginning of each day a little more intentional.
              </p>
              <p className="text-lede text-ink-soft">A refreshing citrus ginger drink, thoughtfully formulated for your daily routine.</p>
            </Reveal>
            <Botanical className="mt-14 h-40 w-auto text-sage" />
          </div>
        </div>
      </section>

      <Ritual />

      <section aria-labelledby="pdp-faq" className="border-t border-line py-28 lg:py-36">
        <div className="frame grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="pdp-faq" className="caps mt-10 font-display text-title text-forest">
              Good to
              <br />
              know.
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
