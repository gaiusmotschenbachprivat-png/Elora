"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { ritual } from "@/lib/content";

/**
 * Morgenritual in drei Schritten. Desktop: das Bild bleibt stehen und blendet
 * ruhig über, während die Schritte vorbeiziehen. Mobil: jeder Schritt mit Bild.
 */
export function Ritual({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.step))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="ritual" aria-labelledby="ritual-title" className="relative py-28 lg:py-44">
      <div className="frame">
        <Reveal className="max-w-3xl">
          <Eyebrow index="03">The morning ritual</Eyebrow>
          <H id="ritual-title" className="caps mt-10 font-display text-display text-forest">
            Make room
            <br />
            for yourself.
          </H>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-sand-100">
              {ritual.map((s, i) => (
                <div
                  key={s.image}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1800ms] ease-[var(--ease-soft)] ${i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
                >
                  <Picture name={s.image} alt={s.alt} width={1200} height={1500} sizes="46vw" />
                </div>
              ))}
              <p className="spec absolute bottom-5 left-5 bg-ivory/80 px-3 py-1.5 text-ink-soft backdrop-blur">
                {ritual[active].n} / 03
              </p>
            </div>
          </div>

          <ol className="lg:col-span-5 lg:col-start-8">
            {ritual.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-step={i}
                className="border-t border-line py-10 last:border-b lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:py-0"
              >
                <div className="aspect-[4/5] overflow-hidden bg-sand-100 lg:hidden">
                  <Picture name={s.image} alt={s.alt} width={1200} height={1500} sizes="100vw" />
                </div>
                <div className="mt-8 lg:mt-0">
                  <p className={`font-display text-[3.4rem] leading-none transition-colors duration-1000 ${i === active ? "text-gold-700" : "text-sand-300"}`}>{s.n}</p>
                  <h3 className="caps mt-5 font-display text-[2rem] leading-none text-forest">{s.title}</h3>
                  <p className="mt-4 max-w-xs text-lede text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p className="spec mt-10 text-ink-muted">Serving size and amount of water will be set with the final formulation.</p>
      </div>
    </section>
  );
}
