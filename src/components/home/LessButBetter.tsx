import { Botanical } from "@/components/brand/Botanical";
import { SectionMark } from "@/components/brand/SectionMark";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";

export function LessButBetter() {
  return (
    <section aria-labelledby="less-title" className="grain relative overflow-hidden py-28 lg:py-44">
      <div className="frame relative z-[2] grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-1">
          <SectionMark>Philosophy</SectionMark>
        </div>
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="01">The beauty of simplicity</Eyebrow>
            <h2 id="less-title" className="caps mt-10 font-display text-display text-forest">
              Less,
              <br />
              but better.
            </h2>
          </Reveal>
          <Reveal delay={150} className="mt-12 max-w-md space-y-6 text-lede text-ink-soft">
            <p className="font-display text-[1.7rem] leading-snug text-ink italic">At ELORA, we believe in the beauty of simplicity.</p>
            <p>
              Inspired by Japanese aesthetics and the philosophy of mindful daily rituals, we create thoughtfully designed products that bring balance and intention into everyday
              life.
            </p>
          </Reveal>
          <Botanical className="mt-16 hidden h-48 w-auto text-sage lg:block" />
        </div>
        <div className="relative lg:col-span-5 lg:col-start-8">
          <Reveal variant="image" className="overflow-hidden">
            <div className="aspect-[4/5] bg-sand-100">
              <Picture name="philosophy" alt="Concept visualisation: a ceramic cup and a single citrus fruit on travertine in shoji-filtered light" width={1600} height={2000} sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </Reveal>
          <p className="spec mt-4 text-ink-muted">Concept visualisation</p>
        </div>
      </div>
    </section>
  );
}
