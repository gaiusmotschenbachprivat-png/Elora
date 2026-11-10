import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { PhilosophyBand } from "@/components/home/PhilosophyBand";
import { Join } from "@/components/home/Join";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";

export const metadata: Metadata = { title: "Unsere Philosophie", description: "Wofür ELORA steht: bewusste Produktentwicklung, ausgewählte Inhaltsstoffe und offene Kommunikation." };

const principles = [
  { k: "Bewusst", t: "Wir nehmen nur auf, was zum Produkt passt, und lassen weg, was es nicht braucht. Weniger Zutaten machen eine Rezeptur nachvollziehbar." },
  { k: "Ehrlich", t: "Wir sagen offen, was feststeht und was sich noch in Entwicklung befindet. Keine Wirkversprechen, keine erfundenen Bewertungen." },
  { k: "Beständig", t: "Wir bauen ELORA für die lange Strecke. Ein Produkt nach dem anderen, jedes mit demselben Anspruch." },
];

export default function Page() {
  return (
    <>
      <PageIntro
        index="§ 04"
        eyebrow="Unsere Philosophie"
        title={
          <>
            Natural Daily <em className="display-italic text-citrus-700">Nutrition.</em>
          </>
        }
        lede="ELORA verbindet die Ruhe guter Gestaltung mit dem Anspruch einer sorgfältigen Produktentwicklung."
      />
      <Reveal variant="image" className="overflow-hidden">
        <div className="aspect-[4/3] bg-sand sm:aspect-[16/7]">
          <Picture name="still" alt="Konzeptvisualisierung: Morgenlicht auf Kalkwand und Travertin" width={2400} height={1350} sizes="100vw" position="50% 55%" />
        </div>
      </Reveal>
      <section className="frame grid gap-14 py-24 lg:grid-cols-12 lg:py-36">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-title">
            Wir glauben an den <em className="display-italic">ersten Moment</em> des Tages.
          </p>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <ol className="border-t border-ink/80">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.k} delay={i * 80} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-8">
                <span className="spec pt-2 text-citrus-700">0{i + 1}</span>
                <div>
                  <h2 className="font-display text-[1.8rem] leading-none">{p.k}</h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.t}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <PhilosophyBand withLink={false} />
      <Join />
    </>
  );
}
