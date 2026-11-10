import { Hero } from "@/components/home/Hero";
import { Opening } from "@/components/home/Opening";
import { ProductFeature } from "@/components/home/ProductFeature";
import { IngredientIndex } from "@/components/home/IngredientIndex";
import { PhilosophyBand } from "@/components/home/PhilosophyBand";
import { Protocol } from "@/components/home/Protocol";
import { Join } from "@/components/home/Join";
import { site } from "@/lib/site";

export default function HomePage() {
  const ld = { "@context": "https://schema.org", "@type": "Organization", name: "ELORA", url: site.url, slogan: site.category };
  return (
    <>
      <Hero />
      <Opening />
      <ProductFeature />
      <IngredientIndex />
      <PhilosophyBand />
      <Protocol />
      <Join />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </>
  );
}
