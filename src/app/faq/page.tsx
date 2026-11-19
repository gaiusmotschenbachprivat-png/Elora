import type { Metadata } from "next";
import { FaqList, faqJsonLd } from "@/components/commerce/FaqList";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = { title: "FAQ", description: "Frequently asked questions about ELORA DAY – clearly marked as confirmed, preliminary or planned." };

export default function Page() {
  return (
    <>
      <PageIntro eyebrow="FAQ" title={<>Questions <br />&amp; answers.</>} lede="Every answer is marked: confirmed, preliminary or planned." />
      <section className="frame pb-28">
        <div className="lg:ml-[33.333%]">
          <FaqList />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()).replace(/</g, "\\u003c") }} />
    </>
  );
}
