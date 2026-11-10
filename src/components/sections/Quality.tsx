import { LinkButton } from "@/components/ui/Button";
import {
  IconBalance,
  IconDocument,
  IconHands,
  IconMicroscope,
  IconSeed,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { signupHref } from "@/lib/site";

const principles = [
  {
    title: "Ausgewählte Rohstoffe",
    text: "Wir wählen Rohstoffe und deren Formen gezielt aus – mit Blick auf Qualität, Herkunft und Eignung für das Produkt.",
    Icon: IconSeed,
  },
  {
    title: "Durchdachte Rezepturen",
    text: "Jede Zutat muss ihren Platz begründen. Was keinen klaren Zweck erfüllt, kommt nicht in die Rezeptur.",
    Icon: IconBalance,
  },
  {
    title: "Transparente Produktinformationen",
    text: "Zutaten, Mengen und Herkunft legen wir offen, sobald sie final feststehen – verständlich und vollständig.",
    Icon: IconDocument,
  },
  {
    title: "Qualitätsorientierte Herstellung",
    text: "Wir suchen Herstellungspartner, die hohe Standards an Hygiene, Dokumentation und Kontrolle erfüllen.",
    Icon: IconHands,
  },
  {
    title: "Wissenschaftlich fundierte Entwicklung",
    text: "Die Produktentwicklung orientiert sich am aktuellen Stand der Ernährungswissenschaft und am geltenden Lebensmittelrecht.",
    Icon: IconMicroscope,
  },
];

export function Quality() {
  return (
    <section
      id="qualitaet"
      aria-labelledby="quality-title"
      className="grain relative overflow-hidden bg-forest py-24 text-cream sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(199,139,67,0.18),transparent_65%)]"
      />
      <div className="container-elora relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="quality-title"
              tone="light"
              eyebrow="Wissenschaft & Qualität"
              title="Ein Anspruch, kein Versprechen."
              intro="Qualität beginnt lange vor dem fertigen Produkt. Diese Grundsätze leiten die Entwicklung von ELORA DAY – vom ersten Rohstoff bis zur fertigen Dose."
            />

            <Reveal className="mt-10 rounded-2xl border border-cream/15 bg-forest-900/40 p-6 sm:p-7">
              <p className="eyebrow text-citrus">Transparenz</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/80">
                Zertifizierungen, Analysen oder Prüfsiegel nennen wir erst, wenn sie tatsächlich
                vorliegen. Bis dahin zeigen wir dir offen, woran wir arbeiten.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="border-t border-cream/15">
            {principles.map(({ title, text, Icon }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 70}
                className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-b border-cream/15 py-8 sm:grid-cols-[3.5rem_auto_1fr] sm:gap-x-7 sm:py-10"
              >
                <span className="hidden pt-1 font-display text-[0.95rem] text-cream/40 tabular-nums sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-citrus transition-colors duration-500 group-hover:border-citrus/60">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-[1.3rem] font-normal text-cream-50">{title}</h3>
                  <p className="mt-2 max-w-lg leading-relaxed text-cream/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <LinkButton href={signupHref} variant="light" arrow>
              Jetzt vormerken
            </LinkButton>
            <p className="text-[0.88rem] text-cream/60">
              Wir informieren dich, sobald Rezeptur und Analysen feststehen.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
