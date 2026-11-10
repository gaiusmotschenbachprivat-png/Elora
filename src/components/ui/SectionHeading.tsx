import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  tone = "dark",
  className = "",
}: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p
        className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${light ? "text-citrus" : "text-citrus-700"}`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-5 text-h2 font-light ${light ? "text-cream-50" : "text-forest-900"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-[1.05rem] leading-relaxed ${light ? "text-cream/75" : "text-ink-soft"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
