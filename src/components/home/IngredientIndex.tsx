import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Tbd } from "@/components/ui/Notice";
import { ingredients } from "@/lib/content";

/** Editorialer Formel-Index. `detailed` zeigt zusätzlich alle zugelassenen Angaben. */
export function IngredientIndex({ detailed = false, headingLevel = 2 }: { detailed?: boolean; headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section aria-labelledby="ingredients-title" className="py-24 lg:py-36">
      <div className="frame grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow index="§ 03">Inhaltsstoffe</Eyebrow>
              <H id="ingredients-title" className="mt-8 font-display text-title">
                Fünf Inhaltsstoffe.
                <br />
                <em className="display-italic text-ink-soft">Keiner zu viel.</em>
              </H>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
                Die Rezeptur befindet sich in Entwicklung. Gezeigt werden die geplanten Inhaltsstoffgruppen – Mengen pro Portion veröffentlichen wir mit der finalen Rezeptur.
              </p>
            </Reveal>
            <Reveal variant="image" className="mt-10 hidden overflow-hidden lg:block">
              <div className="aspect-[4/5] bg-sand">
                <Picture name="macro" alt="Konzeptvisualisierung: aufgeschnittene Orange, Ingwer und Pulver auf Travertin in Nahaufnahme" width={1600} height={2000} sizes="38vw" />
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="border-t border-ink/80 lg:col-span-6 lg:col-start-7">
          {ingredients.map((ing, i) => (
            <Reveal as="li" key={ing.symbol} delay={i * 60} className="border-b border-line py-8 lg:py-10">
              <article className="grid grid-cols-[4.5rem_1fr] gap-x-6 sm:grid-cols-[7rem_1fr]">
                <p aria-hidden="true" className="font-display text-[3.2rem] leading-[0.85] text-forest-900 sm:text-[4.6rem]">
                  {ing.symbol}
                </p>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-[1.6rem] leading-tight">{ing.name}</h3>
                    <p className="spec text-ink-muted">
                      {ing.group}
                      {ing.optional ? " · optional" : ""}
                    </p>
                  </div>
                  <p className="mt-2 leading-relaxed text-ink-soft">{ing.role}</p>
                  {detailed && ing.claims.length > 0 && (
                    <ul className="mt-4 space-y-1.5 text-[0.92rem]">
                      {ing.claims.map((c) => (
                        <li key={c}>
                          {c}
                          <sup className="ml-0.5 text-citrus-700">1</sup>
                        </li>
                      ))}
                    </ul>
                  )}
                  {!detailed && ing.claims[0] && (
                    <p className="mt-3 text-[0.92rem]">
                      {ing.claims[0]}
                      <sup className="ml-0.5 text-citrus-700">1</sup>
                    </p>
                  )}
                  {ing.note && <p className="mt-3 text-[0.86rem] text-ink-muted italic">{ing.note}</p>}
                  {detailed && (
                    <p className="mt-4 font-mono text-[0.78rem] text-ink-muted">
                      Menge pro Portion <Tbd>— mg</Tbd> · % NRV* <Tbd>— %</Tbd>
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
          <li className="pt-6 text-[0.78rem] leading-relaxed text-ink-muted">
            <sup>1</sup> Zugelassene gesundheitsbezogene Angabe gemäß VO (EU) Nr. 432/2012. Wir verwenden sie nur, wenn die finale Rezeptur die erforderlichen Mindestmengen
            erreicht.
            {detailed && <> * NRV = Nährstoffbezugswert gemäß VO (EU) Nr. 1169/2011.</>}
          </li>
        </ol>
      </div>
    </section>
  );
}
