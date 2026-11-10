import Link from "next/link";
import { legal, nav, signupHref, site } from "@/lib/site";
import { IconInstagram, IconMail, IconPinterest, IconTikTok } from "@/components/ui/Icons";
import { Wordmark } from "./Wordmark";

const socials = [
  { label: "Instagram", Icon: IconInstagram },
  { label: "TikTok", Icon: IconTikTok },
  { label: "Pinterest", Icon: IconPinterest },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="kontakt" className="grain relative overflow-hidden bg-forest-900 text-cream/80">
      {/* dezente Landschaftslinie */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-forest opacity-60"
      >
        <path
          d="M0 0 H1440 V40 C 1200 90 980 30 760 62 S 280 70 0 30 Z"
          fill="currentColor"
        />
      </svg>

      <div className="container-elora relative pt-24 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Wordmark tone="light" />
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-cream/65">
              {site.category}. Durchdachte Produkte für einen bewussten Alltag – klar, ehrlich und
              mit Anspruch an Qualität.
            </p>
            <Link
              href={signupHref}
              className="group mt-8 inline-flex items-center gap-2 border-b border-citrus/60 pb-1 text-[0.92rem] text-cream-50 transition-colors hover:border-citrus hover:text-white"
            >
              Für den Launch vormerken
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <nav aria-label="Footer-Navigation" className="lg:col-span-2">
            <h2 className="eyebrow text-cream/45">Navigation</h2>
            <ul className="mt-5 space-y-3 text-[0.93rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches" className="lg:col-span-2">
            <h2 className="eyebrow text-cream/45">Rechtliches</h2>
            <ul className="mt-5 space-y-3 text-[0.93rem]">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow text-cream/45">Kontakt</h2>
            <p className="mt-5 flex items-start gap-3 text-[0.93rem]">
              <IconMail size={20} className="mt-0.5 shrink-0 text-citrus" />
              <span>
                Kontaktadresse folgt{" "}
                <span className="text-cream/45">[Platzhalter – wird vor Veröffentlichung ergänzt]</span>
              </span>
            </p>
            <h2 className="eyebrow mt-10 text-cream/45">Folge ELORA</h2>
            <ul className="mt-4 flex gap-2" aria-label="Social Media (Profile folgen in Kürze)">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <span
                    title={`${label} – Profil folgt`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/60"
                  >
                    <Icon size={19} />
                    <span className="sr-only">{label} – Profil folgt</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-cream/10 pt-8 text-[0.78rem] leading-relaxed text-cream/50">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="lg:col-span-8">
              <strong className="font-semibold text-cream/70">Hinweis:</strong> {site.product} befindet sich
              in der Entwicklung und ist derzeit nicht erhältlich. Geplant ist ein
              Nahrungsergänzungsmittel. Nahrungsergänzungsmittel sind kein Ersatz für eine
              ausgewogene, abwechslungsreiche Ernährung und eine gesunde Lebensweise. Alle Angaben
              zu Rezeptur, Nährstoffmengen und Verpackung sind vorläufige Konzeptinformationen;
              Werte in eckigen Klammern sind Platzhalter.
            </p>
            <p className="lg:col-span-4 lg:text-right">
              <sup>1</sup> Zugelassene gesundheitsbezogene Angabe gemäß VO (EU) Nr. 432/2012 – nur
              verwendbar, wenn die finale Rezeptur die erforderlichen Mindestmengen erreicht.
            </p>
          </div>
          <p className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <span>© {year} ELORA. Alle Rechte vorbehalten.</span>
            <span className="wordmark text-[0.7rem] text-cream/35">Natural Daily Nutrition</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
