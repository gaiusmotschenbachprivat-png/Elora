import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Tbd } from "@/components/ui/Notice";
import { ingredients } from "@/lib/content";

/** Editorial ingredient index. `detailed` also lists all authorised claims. */
export function IngredientIndex({ detailed = false, headingLevel = 2 }: { detailed?: boolean; headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section aria-labelledby="ingredients-title" className="py-28 lg:py-40">
      <div className="frame grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>Ingredients</Eyebrow>
              <H id="ingredients-title" className="caps mt-10 font-display text-title text-forest">
                Five ingredients.
                <br />
                <span className="display-italic text-ink">Nothing more.</span>
              </H>
              <p className="mt-8 max-w-sm leading-relaxed text-ink-soft">
                The formulation is in development. Shown here are the planned ingredient groups – amounts per serving will be published with the final formulation.
              </p>
            </Reveal>
            <Reveal variant="image" className="mt-12 hidden overflow-hidden lg:block">
              <div className="aspect-[4/5] bg-sand-100">
                <Picture name="macro" alt="Concept visualisation: close-up of halved citrus fruit, fresh ginger and drink powder on wood" width={1600} height={2000} sizes="38vw" />
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="border-t border-forest/50 lg:col-span-6 lg:col-start-7">
          {ingredients.map((ing, i) => (
            <Reveal as="li" key={ing.symbol} delay={i * 80} className="border-b border-line py-9 lg:py-11">
              <article className="grid grid-cols-[4.5rem_1fr] gap-x-6 sm:grid-cols-[7rem_1fr]">
                <p aria-hidden="true" className="font-display text-[3.4rem] leading-[0.85] text-forest sm:text-[4.8rem]">
                  {ing.symbol}
                </p>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-[1.75rem] leading-tight">{ing.name}</h3>
                    <p className="spec text-ink-muted">
                      {ing.group}
                      {ing.optional ? " · optional" : ""}
                    </p>
                  </div>
                  <p className="mt-2 leading-relaxed text-ink-soft">{ing.role}</p>
                  {(detailed ? ing.claims : ing.claims.slice(0, 1)).map((c) => (
                    <p key={c} className="mt-3 text-[0.92rem]">
                      {c}
                      <sup className="ml-0.5 text-gold-700">1</sup>
                    </p>
                  ))}
                  {ing.note && <p className="mt-3 text-[0.86rem] text-ink-muted italic">{ing.note}</p>}
                  {detailed && (
                    <p className="mt-4 text-[0.78rem] text-ink-muted">
                      Amount per serving <Tbd>— mg</Tbd> · % NRV* <Tbd>— %</Tbd>
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
          <li className="pt-6 text-[0.76rem] leading-relaxed text-ink-muted">
            <sup>1</sup> Authorised health claim under Regulation (EU) No 432/2012. We only use it if the final formulation reaches the required minimum amounts.
            {detailed && <> * NRV = nutrient reference value under Regulation (EU) No 1169/2011.</>}
          </li>
        </ol>
      </div>
    </section>
  );
}
