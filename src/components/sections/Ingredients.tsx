import { GlassStill } from "@/components/art/compositions";
import { ConceptBadge, Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ingredients } from "@/lib/content";

export function Ingredients() {
  return (
    <section
      id="inhaltsstoffe"
      aria-labelledby="ingredients-title"
      className="relative py-24 sm:py-28 lg:py-36"
    >
      <div className="container-elora grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="ingredients-title"
              eyebrow="Inhaltsstoffe"
              title="Wenige Zutaten. Klar ausgewählt."
              intro="ELORA DAY setzt auf eine überschaubare Auswahl an Mineralstoffen und Vitaminen – statt auf lange Listen. Jede Zutat hat ihren Platz, weil sie zum Konzept passt."
            />
            <Reveal className="mt-10 overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
              <GlassStill className="aspect-[6/7] h-auto w-full" />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <Reveal className="flex flex-wrap items-center gap-3">
            <ConceptBadge />
            <p className="text-[0.85rem] text-ink-muted">
              Rezeptur in Entwicklung · Mengen folgen mit der finalen Kennzeichnung
            </p>
          </Reveal>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {ingredients.map((ing, i) => (
              <Reveal as="li" key={ing.symbol} delay={i * 60} className="py-8 sm:py-9">
                <article className="grid gap-5 sm:grid-cols-[4.5rem_1fr] sm:gap-7">
                  <div
                    aria-hidden="true"
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-citrus/35 bg-cream-50 font-display text-[1.45rem] font-light text-forest-900 sm:h-[4.5rem] sm:w-[4.5rem]"
                  >
                    {ing.symbol}
                    <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-citrus/70" />
                  </div>
                  <div>
                    <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-[1.4rem] font-normal text-forest-900">
                      {ing.name}
                      {ing.optional && (
                        <span className="rounded-full bg-sage-100 px-2.5 py-0.5 font-sans text-[0.7rem] font-semibold tracking-[0.14em] text-forest uppercase">
                          optional
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">{ing.role}</p>

                    {ing.claims.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {ing.claims.map((c) => (
                          <li key={c} className="flex gap-3 text-[0.93rem] leading-relaxed text-ink">
                            <span aria-hidden="true" className="mt-[0.6rem] h-px w-3 shrink-0 bg-citrus" />
                            <span>
                              {c}
                              <sup className="ml-0.5 text-citrus-700">1</sup>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {ing.note && (
                      <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-muted italic">{ing.note}</p>
                    )}

                    <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] text-ink-muted">
                      <div className="flex items-center gap-2">
                        <dt>Menge pro Portion</dt>
                        <dd>
                          <Placeholder>— mg</Placeholder>
                        </dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <dt>% NRV*</dt>
                        <dd>
                          <Placeholder>— %</Placeholder>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-8 rounded-2xl bg-sand/60 p-6 text-[0.82rem] leading-relaxed text-ink-muted sm:p-7">
            <p>
              <sup className="text-citrus-700">1</sup> Zugelassene gesundheitsbezogene Angabe gemäß VO
              (EU) Nr. 432/2012. Diese Angaben verwenden wir nur, wenn die finale Rezeptur die dafür
              erforderlichen Mindestmengen erreicht.
            </p>
            <p className="mt-2">
              * NRV = Nährstoffbezugswert gemäß VO (EU) Nr. 1169/2011. Werte in eckigen Klammern sind
              Platzhalter und werden mit der finalen Rezeptur ergänzt.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
