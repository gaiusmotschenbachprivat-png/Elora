import { SignupForm } from "@/components/ui/SignupForm";
import { Reveal } from "@/components/ui/Reveal";
import { IconCalendar, IconCheck, IconMail } from "@/components/ui/Icons";
import { site } from "@/lib/site";

const perks = [
  "Frühzeitige Informationen zum Launch",
  "Einblicke in Rezeptur & Entwicklung",
  "Kein Spam – Abmeldung jederzeit",
];

export function Newsletter() {
  return (
    <section id="vormerken" aria-labelledby="newsletter-title" className="relative py-24 sm:py-28 lg:py-32">
      <div className="container-elora">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[2rem] bg-sand px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            {/* Landschaft */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 260"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full sm:h-52"
            >
              <path d="M0 150 C 200 100 360 150 560 120 S 960 80 1200 120 V260 H0Z" fill="#dfe2d6" opacity="0.7" />
              <path d="M0 200 C 240 160 420 200 640 176 S 1000 160 1200 180 V260 H0Z" fill="#c9cebf" opacity="0.7" />
              <path d="M0 236 C 260 214 520 236 760 222 S 1060 214 1200 226 V260 H0Z" fill="#aeb6a1" opacity="0.6" />
            </svg>

            <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream-50 text-forest shadow-[var(--shadow-soft)]">
                  <IconMail size={24} />
                </span>
                <h2 id="newsletter-title" className="mt-7 text-h2 font-light text-forest-900">
                  Immer auf dem Laufenden.
                </h2>
                <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
                  Erhalte exklusive Updates zu ELORA DAY, dem Launch und unseren nächsten Schritten.
                </p>
                <ul className="mt-8 space-y-3">
                  {perks.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[0.95rem] text-ink">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-forest text-cream-50">
                        <IconCheck size={14} strokeWidth={2} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 flex items-center gap-2.5 text-[0.85rem] text-ink-muted">
                  <IconCalendar size={17} className="text-sage" />
                  Geplanter Launch: {site.launch}
                </p>
              </div>

              <div className="lg:col-span-6 lg:pt-4">
                <div className="rounded-[1.5rem] bg-cream-50/90 p-6 shadow-[var(--shadow-soft)] ring-1 ring-line/60 backdrop-blur sm:p-8">
                  <SignupForm />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
