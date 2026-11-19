import { Hero } from "@/components/home/Hero";
import { LessButBetter } from "@/components/home/LessButBetter";
import { MeetElora } from "@/components/home/MeetElora";
import { Ritual } from "@/components/home/Ritual";
import { Principles } from "@/components/home/Principles";
import { Statement } from "@/components/home/Statement";
import { Newsletter } from "@/components/home/Newsletter";
import { site } from "@/lib/site";

export default function HomePage() {
  const ld = { "@context": "https://schema.org", "@type": "Organization", name: "ELORA", url: site.url, slogan: site.slogan };
  return (
    <>
      <Hero />
      <LessButBetter />
      <MeetElora />
      <Ritual />
      <Principles />
      <Statement />
      <Newsletter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </>
  );
}
