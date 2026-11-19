import { SignupForm } from "@/components/commerce/SignupForm";
import { Botanical } from "@/components/brand/Botanical";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export function Newsletter() {
  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="grain relative overflow-hidden py-28 lg:py-44">
      <Botanical className="pointer-events-none absolute bottom-10 left-[4%] hidden h-64 w-auto text-sage/60 lg:block" />
      <div className="frame relative z-[2] grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Eyebrow index="05">Newsletter</Eyebrow>
          <h2 id="newsletter-title" className="caps mt-10 font-display text-title text-forest">
            A more thoughtful
            <br />
            way to begin.
          </h2>
        </Reveal>
        <Reveal delay={140} className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          <p className="text-lede text-ink-soft">Discover new rituals, product updates and the world of ELORA.</p>
          <div className="mt-12">
            <SignupForm list="newsletter" submitLabel="Subscribe" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
