import { HeroStill, LeafShadow } from "@/components/art/compositions";
import { LinkButton } from "@/components/ui/Button";
import { IconCalendar, IconFlask, IconNoCaffeine, IconNoTaurine } from "@/components/ui/Icons";
import { signupHref, site } from "@/lib/site";

const traits = [
  { label: "Ohne Koffein", Icon: IconNoCaffeine },
  { label: "Ohne Taurin", Icon: IconNoTaurine },
  { label: "Bewusst formuliert", Icon: IconFlask },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream to-[#efe8dc]"
    >
      {/* Morgenlicht & Blattschatten */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_30%,rgba(255,255,255,0.9),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-24 w-[34rem] opacity-[0.11] sm:w-[44rem] lg:-right-10 lg:w-[52rem]"
      >
        <LeafShadow className="animate-leaf-sway h-auto w-full" />
      </div>

      <div className="container-elora relative grid items-center gap-8 pt-28 pb-12 sm:pt-32 lg:min-h-[min(100svh,54rem)] lg:grid-cols-12 lg:gap-6 lg:pt-32 lg:pb-14">
        <div className="lg:col-span-5 lg:pb-10">
          <p
            className="eyebrow animate-fade-up flex items-center gap-3 text-citrus-700"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
            {site.product}
          </p>
          <h1
            id="hero-title"
            className="animate-fade-up mt-6 text-display font-light text-forest-900"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            Dein Morgen,{" "}
            <span className="block">
              natürlich <em className="font-normal text-citrus-700 not-italic">unterstützt.</em>
            </span>
          </h1>
          <p
            className="animate-fade-up mt-7 max-w-[34rem] text-[1.08rem] leading-relaxed text-ink-soft sm:text-[1.14rem]"
            style={{ "--delay": "260ms" } as React.CSSProperties}
          >
            Ein erfrischendes Getränkepulver mit ausgewählten Elektrolyten und Mikronährstoffen – für
            einen bewussten Start in den Tag.
          </p>

          <ul
            className="animate-fade-up mt-8 flex flex-wrap gap-x-6 gap-y-3"
            style={{ "--delay": "340ms" } as React.CSSProperties}
            aria-label="Eigenschaften"
          >
            {traits.map(({ label, Icon }) => (
              <li key={label} className="flex items-center gap-2.5 text-[0.9rem] text-ink">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sage/40 bg-cream-50/70 text-forest">
                  <Icon size={18} />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div
            className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--delay": "420ms" } as React.CSSProperties}
          >
            <LinkButton href={signupHref} size="lg" arrow>
              Jetzt vormerken
            </LinkButton>
            <LinkButton href="/#produkt" size="lg" variant="outline">
              Mehr erfahren
            </LinkButton>
          </div>

          <p
            className="animate-fade-up mt-7 flex items-center gap-2.5 text-[0.85rem] text-ink-muted"
            style={{ "--delay": "500ms" } as React.CSSProperties}
          >
            <IconCalendar size={17} className="text-sage" />
            Geplanter Launch: <span className="text-ink">{site.launch}</span>
          </p>
        </div>

        <div className="relative lg:col-span-7">
          <div
            className="animate-fade-up relative -mx-6 sm:mx-0 lg:-mr-16 xl:-mr-28"
            style={{ "--delay": "240ms" } as React.CSSProperties}
          >
            <HeroStill className="h-auto w-full" />
          </div>
          <p className="mt-3 text-right text-[0.68rem] tracking-[0.14em] text-ink-muted/80 uppercase">
            Verpackungsdesign: Konzept
          </p>
        </div>
      </div>
    </section>
  );
}
