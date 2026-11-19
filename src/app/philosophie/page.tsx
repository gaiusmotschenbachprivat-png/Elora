import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { Principles } from "@/components/home/Principles";
import { Statement } from "@/components/home/Statement";
import { Newsletter } from "@/components/home/Newsletter";
import { Botanical } from "@/components/brand/Botanical";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description: "Japanese-inspired wellness, European quality. Why ELORA believes in simplicity, balance and thoughtful daily rituals.",
};

const thoughts = [
  { k: "Intention", t: "A ritual is not about doing more. It is about doing one small thing with full attention – a glass of water, a quiet moment, the start of a day." },
  { k: "Restraint", t: "Inspired by Japanese aesthetics, we leave out what is not needed. Fewer ingredients make a formulation easier to understand." },
  { k: "Honesty", t: "We say openly what is confirmed and what is still in development. No unproven promises, no invented reviews." },
];

export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Our philosophy"
        title={
          <>
            The art of
            <br />
            daily balance.
          </>
        }
        lede="ELORA is a European wellness brand inspired by Japanese aesthetics, minimalism and the philosophy of mindful daily rituals."
      />
      <Reveal variant="image" className="overflow-hidden">
        <div className="aspect-[4/3] bg-sand-100 sm:aspect-[2/1]">
          <Picture name="statement" alt="Concept visualisation: citrus, ginger and a glass of water on travertine in morning light" width={2400} height={1200} sizes="100vw" />
        </div>
      </Reveal>
      <section className="grain relative overflow-hidden py-28 lg:py-40">
        <div className="frame relative z-[2] grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="caps font-display text-title text-forest">
              Less,
              <br />
              but better.
            </p>
            <p className="mt-8 max-w-sm leading-relaxed text-ink-soft">
              ELORA is not of Japanese origin and does not follow a traditional Japanese recipe. Japan inspires our design and our way of thinking about daily rituals – our
              products are developed to European quality standards.
            </p>
            <Botanical className="mt-14 hidden h-44 w-auto text-sage lg:block" />
          </Reveal>
          <ol className="border-t border-forest/50 lg:col-span-6 lg:col-start-7">
            {thoughts.map((p, i) => (
              <Reveal as="li" key={p.k} delay={i * 100} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-10">
                <span className="font-display text-[1.6rem] leading-none text-gold-700">0{i + 1}</span>
                <div>
                  <h2 className="caps font-display text-[1.9rem] leading-none text-forest">{p.k}</h2>
                  <p className="mt-4 leading-relaxed text-ink-soft">{p.t}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="frame pb-28">
        <Reveal variant="image" className="mx-auto max-w-xl overflow-hidden">
          <div className="aspect-[4/5] bg-sand-100">
            <Picture name="philosophy" alt="Concept visualisation: a ceramic cup and a single citrus fruit on travertine" width={1600} height={2000} sizes="(min-width: 640px) 36rem, 100vw" />
          </div>
        </Reveal>
      </section>
      <Principles withLink={false} />
      <Statement />
      <Newsletter />
    </>
  );
}
