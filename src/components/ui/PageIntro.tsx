import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function PageIntro({ eyebrow, index, title, lede, children }: { eyebrow: string; index?: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <header className="frame pt-40 pb-20 lg:pt-56 lg:pb-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow index={index} className="rise">
            {eyebrow}
          </Eyebrow>
          <h1 className="caps rise mt-10 font-display text-display text-forest" style={{ "--d": "140ms" } as React.CSSProperties}>
            {title}
          </h1>
        </div>
        {lede && (
          <div className="rise lg:col-span-4 lg:pt-24" style={{ "--d": "280ms" } as React.CSSProperties}>
            <p className="text-lede text-ink-soft">{lede}</p>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
