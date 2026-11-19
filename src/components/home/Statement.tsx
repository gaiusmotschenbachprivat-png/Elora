import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Enso } from "@/components/brand/Enso";

export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="relative overflow-hidden pt-32 lg:pt-48">
      <div className="frame relative text-center">
        <Enso className="absolute top-1/2 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 sm:h-[30rem] sm:w-[30rem]" />
        <Reveal>
          <h2 id="statement-title" className="caps relative font-display text-[clamp(2.4rem,1.2rem+4.4vw,6rem)] leading-[1.05] text-forest">
            A small ritual.
            <br />
            <span className="display-italic text-ink">A thoughtful beginning.</span>
          </h2>
        </Reveal>
      </div>
      <Reveal variant="image" className="mt-24 overflow-hidden lg:mt-32">
        <div className="aspect-[4/3] bg-sand-100 sm:aspect-[2/1]">
          <Picture
            name="statement"
            alt="Concept visualisation: halved citrus fruit, fresh ginger, a glass of water and a celadon bowl on travertine in low morning light"
            width={2400}
            height={1200}
            sizes="100vw"
            position="50% 60%"
          />
        </div>
      </Reveal>
    </section>
  );
}
