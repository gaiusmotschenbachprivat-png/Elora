import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { faq } from "@/lib/content";
import { signupHref } from "@/lib/site";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative pb-24 sm:pb-28 lg:pb-36">
      <div className="container-elora grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="faq-title"
              eyebrow="FAQ"
              title="Häufige Fragen zu ELORA DAY"
              intro="Wir unterscheiden klar zwischen dem, was bereits feststeht, und dem, was sich noch in Entwicklung befindet."
            />
            <dl className="mt-8 space-y-3 text-[0.85rem] text-ink-muted">
              <div className="flex items-center gap-3">
                <dt>
                  <span className="inline-flex rounded-full bg-forest px-2.5 py-0.5 text-[0.66rem] font-semibold tracking-[0.14em] text-cream-50 uppercase">
                    Festgelegt
                  </span>
                </dt>
                <dd>Konzeptgrundsatz, der feststeht</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt>
                  <span className="inline-flex rounded-full border border-dashed border-citrus/60 px-2.5 py-0.5 text-[0.66rem] font-semibold tracking-[0.14em] text-citrus-700 uppercase">
                    Vorläufig
                  </span>
                </dt>
                <dd>Konzeptinformation, kann sich ändern</dd>
              </div>
            </dl>
            <div className="mt-10 hidden lg:block">
              <LinkButton href={signupHref} arrow>
                Jetzt vormerken
              </LinkButton>
            </div>
          </div>
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion items={faq} />
        </Reveal>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
