import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";

export function Opening() {
  return (
    <section aria-labelledby="opening-title" className="pt-28 pb-24 lg:pt-44 lg:pb-36">
      <div className="frame grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Eyebrow index="§ 01">Die Idee</Eyebrow>
          <h2 id="opening-title" className="mt-8 font-display text-display text-forest-900">
            Ein bewusster <em className="display-italic">Anfang.</em>
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-28" delay={120}>
          <p className="text-lede text-ink">
            Der Morgen gibt dem Tag seine Richtung. ELORA entsteht aus der Idee, diesen Moment bewusst zu gestalten – mit wenigen, sorgfältig ausgewählten Inhaltsstoffen statt langer Listen.
          </p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Kein Versprechen von mehr Leistung, kein Ritual mit zehn Schritten. Ein Glas Wasser, eine Portion ELORA DAY, ein klarer Geschmack von Citrus und Ingwer.
          </p>
        </Reveal>
      </div>
      <Reveal variant="image" className="mt-20 overflow-hidden lg:mt-28">
        <div className="aspect-[4/3] bg-sand sm:aspect-[16/8] lg:aspect-[16/7]">
          <Picture
            name="still"
            alt="Konzeptvisualisierung: Morgenlicht und Blattschatten auf einer Kalkwand, ein Glas und eine Zitrone auf Travertin"
            width={2400}
            height={1350}
            sizes="100vw"
            position="55% 60%"
          />
        </div>
      </Reveal>
      <div className="frame mt-4 flex justify-between text-[0.75rem] text-ink-muted">
        <span className="spec">Morgenlicht</span>
        <span className="spec">Konzeptvisualisierung</span>
      </div>
    </section>
  );
}
