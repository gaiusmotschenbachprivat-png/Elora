import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Enso } from "@/components/brand/Enso";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative bg-ivory lg:h-[min(100svh,64rem)] lg:min-h-[46rem]">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-100 sm:aspect-[16/11] lg:absolute lg:inset-0 lg:aspect-auto">
        <div className="settle absolute inset-0">
          <Picture
            name="hero"
            alt="Concept visualisation: the ELORA DAY tin on a light wooden board, with citrus, ginger, a celadon cup and a glass of water in shoji-filtered morning light"
            width={2400}
            height={1200}
            sizes="100vw"
            priority
            position="70% 60%"
            className="lg:[object-position:62%_60%]"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(243,240,232,0.94)_0%,rgba(243,240,232,0.6)_30%,rgba(243,240,232,0)_52%)] lg:block" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ivory/80 to-transparent lg:hidden" />
      </div>

      <div className="frame relative flex h-full flex-col justify-end pt-12 pb-16 lg:pt-40 lg:pb-[clamp(3.5rem,9vh,7rem)]">
        <Enso className="absolute top-[22%] left-[1%] hidden h-[26rem] w-[26rem] lg:block" strokeWidth={0.7} />
        <p className="spec rise relative text-ink-muted" style={{ "--d": "200ms" } as React.CSSProperties}>
          {site.positioning}
        </p>
        <h1 id="hero-title" className="caps relative mt-7 font-display text-[clamp(2.7rem,1.2rem+4.6vw,6.3rem)] leading-[0.98] text-forest">
          <span className="rise block" style={{ "--d": "300ms" } as React.CSSProperties}>
            The art of
          </span>
          <span className="rise block" style={{ "--d": "460ms" } as React.CSSProperties}>
            daily balance.
          </span>
        </h1>
        <div className="rise relative mt-9 max-w-md" style={{ "--d": "640ms" } as React.CSSProperties}>
          <p className="font-display text-[1.6rem] leading-snug text-ink italic">A thoughtful start to every day.</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Discover ELORA DAY – a thoughtfully formulated daily drink with selected electrolytes and micronutrients.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
            <Link
              href="/produkte/elora-day/"
              className="group relative inline-flex h-14 items-center gap-4 overflow-hidden bg-forest px-9 text-[0.72rem] tracking-[0.2em] text-ivory uppercase before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-forest-900 before:transition-transform before:duration-700 before:ease-[var(--ease-soft)] hover:before:scale-y-100 [&>*]:relative"
            >
              <span>Discover ELORA DAY</span>
              <Arrow />
            </Link>
            <Link href="/#philosophy" className="text-[0.72rem] tracking-[0.2em] text-forest uppercase link-line">
              Our Philosophy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
