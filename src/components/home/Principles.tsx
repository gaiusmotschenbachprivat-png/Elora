import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Drei Prinzipien mit reduzierten geometrischen Zeichen (Kreis, Linie, Quadrat). */
const marks = {
  balance: (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="24" cy="24" r="19" />
      <path d="M5 24h38" strokeOpacity="0.5" />
    </svg>
  ),
  simplicity: (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M24 5v38" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="0.8">
      <rect x="9" y="9" width="30" height="30" />
      <circle cx="24" cy="24" r="6" strokeOpacity="0.6" />
    </svg>
  ),
};

const items = [
  { key: "balance" as const, title: "Balance", text: "Thoughtfully selected ingredients and a considered approach to everyday nutrition." },
  { key: "simplicity" as const, title: "Simplicity", text: "Less unnecessary complexity. More clarity." },
  { key: "quality" as const, title: "Quality", text: "A commitment to transparency, careful formulation and quality." },
];

export function Principles({ withLink = true }: { withLink?: boolean }) {
  return (
    <section id="philosophy" aria-labelledby="principles-title" className="grain relative overflow-hidden bg-forest py-28 text-ivory lg:py-40">
      <div className="frame relative z-[2]">
        <Reveal className="max-w-3xl">
          <Eyebrow index="04" tone="light">
            Our philosophy
          </Eyebrow>
          <h2 id="principles-title" className="caps mt-10 font-display text-display text-ivory">
            Inspired by
            <br />
            simplicity.
          </h2>
        </Reveal>
        <ul className="mt-20 grid gap-px bg-ivory/15 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal as="li" key={it.key} delay={i * 140} className="bg-forest py-10 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0">
              <span className="text-gold">{marks[it.key]}</span>
              <h3 className="caps mt-10 font-display text-[2rem] leading-none">{it.title}</h3>
              <p className="mt-5 max-w-xs leading-relaxed text-ivory/75">{it.text}</p>
            </Reveal>
          ))}
        </ul>
        {withLink && (
          <Reveal className="mt-16">
            <LinkButton href="/philosophie/" variant="light" arrow>
              Read our philosophy
            </LinkButton>
          </Reveal>
        )}
      </div>
    </section>
  );
}
