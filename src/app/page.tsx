import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { Ingredients } from "@/components/sections/Ingredients";
import { Preparation } from "@/components/sections/Preparation";
import { Philosophy } from "@/components/sections/Philosophy";
import { Quality } from "@/components/sections/Quality";
import { Newsletter } from "@/components/sections/Newsletter";
import { Faq } from "@/components/sections/Faq";
import { site } from "@/lib/site";

export default function HomePage() {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ELORA",
    url: site.url,
    slogan: site.category,
  };

  return (
    <>
      <Hero />
      <Benefits />
      <Ingredients />
      <Preparation />
      <Philosophy />
      <Quality />
      <Newsletter />
      <Faq />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
