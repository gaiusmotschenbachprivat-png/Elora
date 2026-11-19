import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Enso } from "@/components/brand/Enso";
import { IconInstagram, IconPinterest, IconTikTok } from "@/components/ui/Icons";

const socials = [
  { label: "Instagram", Icon: IconInstagram },
  { label: "TikTok", Icon: IconTikTok },
  { label: "Pinterest", Icon: IconPinterest },
];

function Col({ title, items }: { title: string; items: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <nav aria-label={title}>
      <h2 className="spec text-ivory/60">{title}</h2>
      <ul className="mt-6 space-y-3 text-[0.9rem]">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="text-ivory/80 transition-colors duration-500 hover:text-ivory">
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
    <footer className="grain relative overflow-hidden bg-forest-900 pb-[env(safe-area-inset-bottom,0px)] text-ivory/80">
      <div className="frame relative z-[2] pt-24 lg:pt-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-4">
            <Enso tone="ivory" className="absolute -top-10 -left-8 h-40 w-40 opacity-60" />
            <p className="wordmark relative text-[1.6rem] text-ivory">ELORA</p>
            <p className="relative mt-6 font-display text-[1.9rem] leading-tight text-ivory italic">{site.slogan}</p>
            <p className="relative mt-4 max-w-xs text-[0.88rem] leading-relaxed text-ivory/55">{site.positioning}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-6">
            <Col title="Shop" items={footerNav.shop} />
            <Col title="ELORA" items={footerNav.about} />
            <Col title="Legal" items={footerNav.legal} />
          </div>
          <div className="lg:col-span-1 lg:col-start-12">
            <h2 className="spec text-ivory/60">Follow</h2>
            <ul className="mt-6 flex gap-2 lg:flex-col" aria-label="Social media – profiles coming soon">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <span title={`${label} – profile coming soon`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/55">
                    <Icon size={17} />
                    <span className="sr-only">{label} – profile coming soon</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid gap-6 border-t border-ivory/10 pt-8 text-[0.74rem] leading-relaxed text-ivory/60 lg:grid-cols-12">
          <p className="lg:col-span-8">
            ELORA DAY is in development and not yet available. It is planned as a food supplement. Food supplements are not a substitute for a varied, balanced diet and a healthy
            lifestyle. Product images are concept visualisations (mockups), not the final packaging. Values in square brackets are placeholders. Legal pages are placeholders and will
            be completed and reviewed before any sale.
          </p>
          <p className="lg:col-span-4 lg:text-right">
            <sup>1</sup> Authorised health claim under Regulation (EU) No 432/2012 – only used if the final formulation meets the conditions of use.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-ivory/10 py-6 text-[0.7rem] text-ivory/60">
          <span>© {new Date().getFullYear()} ELORA</span>
          <span className="spec">{site.secondary}</span>
        </div>
      </div>
    </footer>
  );
}
