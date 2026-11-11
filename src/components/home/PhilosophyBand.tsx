import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";

export function PhilosophyBand({ withLink = true }: { withLink?: boolean }) {
  return (
    <section aria-labelledby="philosophy-title" className="grain relative overflow-hidden bg-forest text-ivory">
      <div className="relative z-[2] grid lg:grid-cols-12">
        <div className="frame flex flex-col justify-center py-24 lg:col-span-6 lg:py-36 lg:pr-16">
          <Reveal>
            <Eyebrow index="§ 04" tone="light">
              Philosophie
            </Eyebrow>
            <h2 id="philosophy-title" className="mt-8 font-display text-display text-ivory-50">
              Mehr als ein <em className="display-italic text-sage-200">Produkt.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 max-w-lg space-y-5 text-[1.05rem] leading-relaxed text-ivory/80">
            <p>
              ELORA steht für durchdachte Produkte, die Menschen im Alltag begleiten. Wir verbinden ausgewählte Inhaltsstoffe, eine bewusste Produktentwicklung und einen klaren
              Anspruch an Qualität.
            </p>
            <p>
              Bewusst entwickeln heißt für uns auch: offen sagen, was feststeht und was noch nicht. Lieber ein Produkt später auf den Markt bringen als mit Versprechen, die wir
              nicht belegen können.
            </p>
          </Reveal>
          {withLink && (
            <Reveal delay={200} className="mt-12">
              <LinkButton href="/philosophie/" variant="light" arrow>
                Unsere Philosophie
              </LinkButton>
            </Reveal>
          )}
        </div>
        <Reveal variant="image" className="relative min-h-[28rem] overflow-hidden lg:col-span-6">
          <div className="absolute inset-0 bg-forest-800">
            <Picture name="glass" alt="Konzeptvisualisierung: ein Glas ELORA DAY mit Eis" width={1600} height={2000} sizes="(min-width: 1024px) 50vw, 100vw" position="50% 55%" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
