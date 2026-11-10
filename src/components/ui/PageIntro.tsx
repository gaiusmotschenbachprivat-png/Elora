import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function PageIntro({ eyebrow, index, title, lede, children }: { eyebrow: string; index?: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <header className="frame pt-36 pb-16 lg:pt-48 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow index={index} className="rise">
            {eyebrow}
          </Eyebrow>
          <h1 className="rise mt-8 font-display text-display" style={{ "--d": "120ms" } as React.CSSProperties}>
            {title}
          </h1>
        </div>
        {lede && (
          <div className="rise lg:col-span-4 lg:pt-20" style={{ "--d": "240ms" } as React.CSSProperties}>
            <p className="text-lede text-ink-soft">{lede}</p>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
