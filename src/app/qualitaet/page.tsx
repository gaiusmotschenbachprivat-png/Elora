import type { Metadata } from "next";
import { Protocol } from "@/components/home/Protocol";
import { Join } from "@/components/home/Join";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Qualität & Transparenz", description: "Unser Transparenzprotokoll: was bei ELORA DAY feststeht und woran wir noch arbeiten." };

const notes = [
  { t: "Keine Zertifikate ohne Nachweis", d: "Wir verwenden keine Siegel oder Zertifizierungen, solange sie nicht vorliegen und überprüfbar sind." },
  { t: "Keine Laborwerte ohne Analyse", d: "Analysen veröffentlichen wir mit Datum und Prüfumfang – erst, wenn sie durchgeführt wurden." },
  { t: "Kennzeichnung nach EU-Recht", d: "Zutatenliste, Nährwerte pro Portion, Verzehrempfehlung und Warnhinweise folgen der Lebensmittelinformations-Verordnung." },
];

export default function Page() {
  return (
    <div className="pt-12 lg:pt-16">
      <Protocol headingLevel={1} />
      <section className="border-t border-line bg-ivory-50 py-24">
        <div className="frame grid gap-10 md:grid-cols-3">
          {notes.map((n, i) => (
            <Reveal key={n.t} delay={i * 80}>
              <p className="spec text-citrus-700">0{i + 1}</p>
              <h2 className="mt-4 font-display text-[1.6rem] leading-tight">{n.t}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{n.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Join />
    </div>
  );
}
