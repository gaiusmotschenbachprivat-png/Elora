import type { Metadata } from "next";
import { Protocol } from "@/components/home/Protocol";
import { Newsletter } from "@/components/home/Newsletter";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Quality & Transparency", description: "Our transparency record: what is confirmed for ELORA DAY and what we are still working on." };

const notes = [
  { t: "No certificates without proof", d: "We do not use seals or certifications unless they exist and can be verified." },
  { t: "No lab values without analysis", d: "Analyses will be published with date and scope – only once they have been carried out." },
  { t: "Labelling under EU law", d: "Ingredient list, nutrition per serving, recommended use and warnings follow the EU Food Information Regulation." },
];

export default function Page() {
  return (
    <div className="pt-16 lg:pt-20">
      <Protocol headingLevel={1} />
      <section className="border-t border-line bg-sand-100/60 py-28">
        <div className="frame grid gap-12 md:grid-cols-3">
          {notes.map((n, i) => (
            <Reveal key={n.t} delay={i * 100}>
              <p className="font-display text-[1.6rem] text-gold-700">0{i + 1}</p>
              <h2 className="mt-5 font-display text-[1.75rem] leading-tight text-forest">{n.t}</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{n.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Newsletter />
    </div>
  );
}
