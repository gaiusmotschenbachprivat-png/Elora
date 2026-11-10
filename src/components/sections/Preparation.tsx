import { CitrusMini } from "@/components/art/CitrusMini";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconGlass, IconSpoon, IconStir } from "@/components/ui/Icons";

const steps = [
  {
    title: "Portion vorbereiten",
    text: (
      <>
        Eine Portion ELORA DAY abmessen – <Placeholder>ca. — g</Placeholder>.
      </>
    ),
    Icon: IconSpoon,
  },
  {
    title: "Mit Wasser vermischen",
    text: (
      <>
        In <Placeholder>— ml</Placeholder> kaltem Wasser auflösen.
      </>
    ),
    Icon: IconGlass,
  },
  {
    title: "Umrühren & genießen",
    text: <>Kurz umrühren und bewusst in den Tag starten.</>,
    Icon: IconStir,
  },
];

export function Preparation() {
  return (
    <section
      id="zubereitung"
      aria-labelledby="prep-title"
      className="relative overflow-hidden bg-sand/45 py-24 sm:py-28 lg:py-32"
    >
      <div className="container-elora">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="prep-title"
            eyebrow="Zubereitung"
            title="Drei Schritte. Ein Ritual."
            intro="Kein Shaker, kein Aufwand. ELORA DAY passt in jeden Morgen – zu Hause, im Büro oder unterwegs."
          />
          <p className="max-w-xs text-[0.85rem] leading-relaxed text-ink-muted lg:text-right">
            Portionsgröße und Wassermenge werden mit der finalen Rezeptur festgelegt.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Verbindungslinie */}
          <div aria-hidden="true" className="pointer-events-none absolute top-[3.25rem] right-[16%] left-[16%] hidden h-px bg-[repeating-linear-gradient(90deg,var(--color-sage)_0_6px,transparent_6px_12px)] opacity-60 md:block" />
        <ol className="relative grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map(({ title, text, Icon }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 120}
              className="relative flex flex-col items-start rounded-[1.5rem] border border-line/80 bg-cream-50/80 p-7 backdrop-blur-sm md:items-center md:bg-transparent md:border-0 md:p-0 md:text-center md:backdrop-blur-none"
            >
              <span className="relative inline-flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full bg-cream-50 text-forest shadow-[var(--shadow-soft)] ring-1 ring-line/80">
                <Icon size={34} strokeWidth={1.1} />
                <span className="absolute -top-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest font-display text-[0.85rem] text-cream-50">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-7 font-display text-[1.3rem] font-normal text-forest-900">{title}</h3>
              <p className="mt-2 max-w-[17rem] text-[0.95rem] leading-relaxed text-ink-soft">{text}</p>
            </Reveal>
          ))}
        </ol>
        </div>

        {/* Geschmack */}
        <Reveal className="mt-20">
          <div className="relative grid items-center gap-8 overflow-hidden rounded-[2rem] bg-cream-50 p-8 shadow-[var(--shadow-soft)] ring-1 ring-line/70 sm:p-12 md:grid-cols-[1fr_auto] lg:px-16">
            <div className="relative z-10 max-w-xl">
              <p className="eyebrow text-citrus-700">Geschmack</p>
              <h3 className="mt-4 font-display text-[1.9rem] leading-tight font-light text-forest-900 sm:text-[2.3rem]">
                Citrus, frisch – mit einer dezenten Note Ingwer.
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Ausgewogen, klar und angenehm belebend im Geschmack – ohne aufdringliche Süße. Die
                Aromen sollen möglichst aus natürlichen Quellen stammen; die finale Geschmacksrezeptur
                wird derzeit entwickelt.
              </p>
            </div>
            <CitrusMini className="mx-auto h-40 w-56 sm:h-48 sm:w-64" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
