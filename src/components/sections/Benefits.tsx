import { Reveal } from "@/components/ui/Reveal";
import {
  IconCitrus,
  IconDrop,
  IconElectrolyte,
  IconFlask,
  IconMicronutrient,
} from "@/components/ui/Icons";

const benefits = [
  {
    title: "Elektrolyte",
    text: "Kalium, Magnesium und Natrium – ausgewählte Mineralstoffe für deinen Alltag.",
    Icon: IconElectrolyte,
  },
  {
    title: "Ausgewählte Mikronährstoffe",
    text: "Mit Vitamin C und optional Vitamin B12 – gezielt statt beliebig.",
    Icon: IconMicronutrient,
  },
  {
    title: "Citrus & Ingwer",
    text: "Ein natürlich inspirierter, frischer Geschmack mit dezenter Ingwernote.",
    Icon: IconCitrus,
  },
  {
    title: "Einfache Zubereitung",
    text: "Pulver in Wasser auflösen, umrühren – in weniger als einer Minute.",
    Icon: IconDrop,
  },
  {
    title: "Bewusst formuliert",
    text: "Ohne Koffein, ohne Taurin, ohne unnötige künstliche Zusätze.",
    Icon: IconFlask,
  },
];

export function Benefits() {
  return (
    <section
      id="produkt"
      aria-labelledby="benefits-title"
      className="relative border-y border-line/70 bg-sand/60"
    >
      <h2 id="benefits-title" className="sr-only">
        Was ELORA DAY auszeichnet
      </h2>
      <div className="container-elora">
        <ul className="grid grid-cols-1 divide-y divide-line/80 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
          {benefits.map(({ title, text, Icon }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 80}
              className={`group flex gap-4 py-7 sm:py-9 lg:flex-col lg:gap-5 lg:px-7 lg:py-12 lg:first:pl-0 lg:last:pr-0 ${
                i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sage/35 bg-cream-50 text-forest transition-colors duration-500 group-hover:border-citrus/50 group-hover:text-citrus-700">
                <Icon size={23} />
              </span>
              <div>
                <h3 className="font-display text-[1.12rem] font-normal text-forest-900">{title}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
