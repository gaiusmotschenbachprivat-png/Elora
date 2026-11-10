import { SignupForm } from "@/components/commerce/SignupForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export function Join() {
  return (
    <section id="newsletter" aria-labelledby="join-title" className="grain relative bg-sand py-24 lg:py-36">
      <div className="frame relative z-[2] grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Eyebrow index="§ 06">Newsletter</Eyebrow>
          <h2 id="join-title" className="mt-8 font-display text-display">
            Werde Teil
            <br />
            von <em className="display-italic text-forest">ELORA.</em>
          </h2>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:pt-20">
          <p className="text-lede text-ink-soft">Erfahre als Erste*r von unserem Launch und zukünftigen Produkten.</p>
          <p className="spec mt-3 text-ink-muted">Geplanter Launch · {site.launch}</p>
          <div className="mt-10">
            <SignupForm list="newsletter" submitLabel="Anmelden" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
