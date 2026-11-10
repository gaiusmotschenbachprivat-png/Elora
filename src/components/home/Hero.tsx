import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative bg-ivory lg:h-[min(100svh,66rem)] lg:min-h-[44rem]">
      {/* Bild: mobil eigenständiger Ausschnitt, Desktop vollflächig */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sand sm:aspect-[16/11] lg:absolute lg:inset-0 lg:aspect-auto">
        <div className="settle absolute inset-0">
          <Picture
            name="hero"
            alt="Konzeptvisualisierung: ELORA DAY auf Travertin, mit Orangen, Zitrone, Ingwer und einem Glas im Morgenlicht"
            width={2400}
            height={1200}
            sizes="100vw"
            priority
            position="72% 60%"
            className="lg:[object-position:85%_60%]"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(245,241,233,0.92)_0%,rgba(245,241,233,0.55)_30%,rgba(245,241,233,0)_55%)] lg:block" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ivory/70 to-transparent lg:hidden" />
      </div>

      <div className="frame relative flex h-full flex-col justify-end pt-10 pb-14 lg:pt-36 lg:pb-[clamp(3rem,7vh,6rem)]">
        <p className="spec rise text-ink-muted" style={{ "--d": "100ms" } as React.CSSProperties}>
          N° 01 — ELORA DAY · Citrus &amp; Ingwer
        </p>
        <h1 id="hero-title" className="mt-6 font-display text-[clamp(3.1rem,1.2rem+5.6vw,7.4rem)] leading-[0.92] font-normal tracking-[-0.035em] text-forest-900">
          <span className="rise block" style={{ "--d": "180ms" } as React.CSSProperties}>
            Dein Morgen.
          </span>
          <span className="rise block" style={{ "--d": "300ms" } as React.CSSProperties}>
            <em className="display-italic text-citrus-700">Natürlich</em>
          </span>
          <span className="rise block" style={{ "--d": "380ms" } as React.CSSProperties}>
            unterstützt.
          </span>
        </h1>
        <div className="rise mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" style={{ "--d": "460ms" } as React.CSSProperties}>
          <div className="max-w-md">
            <p className="text-lede text-ink-soft">Durchdachte Nutrition für einen bewussten Start in den Tag.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/produkte/elora-day/"
                className="group relative inline-flex h-14 items-center gap-4 overflow-hidden bg-forest px-8 text-[0.95rem] text-ivory-50 before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-forest-900 before:transition-transform before:duration-500 before:ease-[var(--ease-soft)] hover:before:scale-y-100 [&>*]:relative"
              >
                <span>ELORA DAY entdecken</span>
                <Arrow />
              </Link>
              <Link href="/philosophie/" className="text-[0.95rem] link-line">
                Unsere Philosophie
              </Link>
            </div>
          </div>
          <dl className="hidden gap-10 text-right lg:flex">
            <div>
              <dt className="spec text-ink-muted">Launch</dt>
              <dd className="mt-1 font-display text-[1.2rem]">{site.launch}</dd>
            </div>
            <div>
              <dt className="spec text-ink-muted">Ohne</dt>
              <dd className="mt-1 font-display text-[1.2rem]">Koffein · Taurin</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
