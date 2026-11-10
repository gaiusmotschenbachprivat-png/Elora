import { Accordion } from "@/components/ui/Accordion";
import { StatusTag } from "@/components/ui/Notice";
import { faq, faqStatusLabel } from "@/lib/content";

export function FaqList({ limit }: { limit?: number }) {
  const items = (limit ? faq.slice(0, limit) : faq).map((f) => ({
    title: f.q,
    meta: (
      <p className="mb-3">
        <StatusTag tone={f.status === "fixed" ? "live" : "pending"}>{faqStatusLabel[f.status]}</StatusTag>
      </p>
    ),
    content: f.a.map((p) => (
      <p key={p} className="mt-2 first:mt-0">
        {p}
      </p>
    )),
  }));
  return <Accordion items={items} defaultOpen={0} />;
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
  };
}
