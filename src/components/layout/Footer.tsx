import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { IconInstagram, IconPinterest, IconTikTok } from "@/components/ui/Icons";

const socials = [
  { label: "Instagram", Icon: IconInstagram },
  { label: "TikTok", Icon: IconTikTok },
  { label: "Pinterest", Icon: IconPinterest },
];

function Col({ title, items }: { title: string; items: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <nav aria-label={title}>
      <h2 className="spec text-ivory/45">{title}</h2>
      <ul className="mt-5 space-y-2.5 text-[0.92rem]">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="text-ivory/80 transition-colors hover:text-ivory-50">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-forest-900 text-ivory/80 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="frame relative z-[2] pt-20 lg:pt-28">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-display text-[2rem] leading-[1.1] text-ivory-50 italic lg:text-[2.4rem]">
              Bewusst beginnen.
              <br />
              Jeden Morgen.
            </p>
            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-ivory/60">
              {site.category}. ELORA entwickelt Produkte mit ausgewählten Inhaltsstoffen – klar, transparent und mit Anspruch an Qualität.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-6">
            <Col title="Shop" items={footerNav.shop} />
            <Col title="Über ELORA" items={footerNav.about} />
            <Col title="Rechtliches" items={footerNav.legal} />
          </div>
          <div className="lg:col-span-1 lg:col-start-12">
            <h2 className="spec text-ivory/45">Social</h2>
            <ul className="mt-5 flex gap-2 lg:flex-col" aria-label="Social Media – Profile folgen">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <span title={`${label} – Profil folgt`} className="inline-flex h-10 w-10 items-center justify-center border border-ivory/15 text-ivory/55">
                    <Icon size={18} />
                    <span className="sr-only">{label} – Profil folgt</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-ivory/10 pt-8 text-[0.75rem] leading-relaxed text-ivory/45 lg:grid-cols-12">
          <p className="lg:col-span-8">
            ELORA DAY befindet sich in der Entwicklung und ist derzeit nicht erhältlich. Geplant ist ein Nahrungsergänzungsmittel. Nahrungsergänzungsmittel sind kein Ersatz für eine
            ausgewogene, abwechslungsreiche Ernährung und eine gesunde Lebensweise. Produktabbildungen sind Konzeptvisualisierungen (Mockups), nicht die finale Verpackung. Angaben in
            eckigen Klammern sind Platzhalter.
          </p>
          <p className="lg:col-span-4 lg:text-right">
            <sup>1</sup> Zugelassene gesundheitsbezogene Angabe gemäß VO (EU) Nr. 432/2012 – nur verwendbar, wenn die finale Rezeptur die Bedingungen erfüllt.
          </p>
        </div>
      </div>

      {/* Signatur: übergroße Wortmarke */}
      <div aria-hidden="true" className="relative z-[2] mt-10 select-none overflow-hidden">
        <p className="translate-y-[16%] text-center font-sans text-[24vw] leading-[0.8] font-light tracking-[0.12em] text-ivory/[0.07] [margin-right:-0.12em]">ELORA</p>
      </div>
      <div className="frame relative z-[2] flex flex-wrap justify-between gap-3 border-t border-ivory/10 py-5 text-[0.72rem] text-ivory/40">
        <span>© {new Date().getFullYear()} ELORA</span>
        <span className="spec">Natural Daily Nutrition</span>
      </div>
    </footer>
  );
}
