import type { Metadata } from "next";
import { FaqList, faqJsonLd } from "@/components/commerce/FaqList";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = { title: "FAQ", description: "Häufige Fragen zu ELORA DAY – mit klarer Kennzeichnung, was feststeht und was vorläufig ist." };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="FAQ" title={<>Häufige <em className="display-italic">Fragen.</em></>} lede="Jede Antwort ist gekennzeichnet: festgelegt, vorläufig oder geplant." />
      <section className="frame pb-28">
        <div className="lg:ml-[33.333%]">
          <FaqList />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()).replace(/</g, "\\u003c") }} />
    </>
  );
}
