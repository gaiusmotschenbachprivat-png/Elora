import { RitualStill } from "@/components/art/compositions";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  {
    title: "Bewusst",
    text: "Wir nehmen nur auf, was zum Produkt passt – und lassen weg, was es nicht braucht.",
  },
  {
    title: "Ehrlich",
    text: "Wir kommunizieren offen, was feststeht und was sich noch in Entwicklung befindet.",
  },
  {
    title: "Beständig",
    text: "Wir bauen eine Marke, der man langfristig vertrauen kann – Schritt für Schritt.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophie" aria-labelledby="philosophy-title" className="relative py-24 sm:py-28 lg:py-36">
      <div className="container-elora grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="order-2 lg:order-1 lg:col-span-6">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
              <RitualStill className="aspect-[8/7] h-auto w-full" />
            </div>
            <figure className="absolute -bottom-8 left-6 hidden max-w-[16rem] rounded-2xl bg-cream-50/95 p-5 shadow-[var(--shadow-soft)] ring-1 ring-line/70 backdrop-blur sm:block lg:-right-10 lg:left-auto">
              <blockquote className="font-display text-[1.05rem] leading-snug font-light text-forest-900">
                „Gute Gewohnheiten beginnen mit kleinen, klaren Entscheidungen.“
              </blockquote>
              <figcaption className="eyebrow mt-3 text-[0.62rem] text-citrus-700">Die ELORA Idee</figcaption>
            </figure>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-citrus-700">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
              Unsere Philosophie
            </p>
            <h2 id="philosophy-title" className="mt-5 text-h2 font-light text-forest-900">
              Mehr als ein Produkt.
            </h2>
            <p className="mt-6 text-[1.08rem] leading-relaxed text-ink-soft">
              ELORA steht für durchdachte Produkte, die Menschen im Alltag begleiten. Wir verbinden
              ausgewählte Inhaltsstoffe, eine bewusste Produktentwicklung und einen klaren Anspruch an
              Qualität.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Natural Daily Nutrition bedeutet für uns: keine lauten Versprechen, keine überladenen
              Rezepturen – sondern Produkte, die sich selbstverständlich in deinen Tag einfügen.
            </p>
          </Reveal>

          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <dt className="font-display text-[1.15rem] text-forest-900">{v.title}</dt>
                <dd className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{v.text}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-10">
            <LinkButton href="/#qualitaet" variant="outline" arrow>
              Unser Qualitätsanspruch
            </LinkButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
