import type { ReactNode } from "react";
import { IconAlert, IconCheck } from "./Icons";

type Tone = "info" | "error" | "success" | "inactive";

const tones: Record<Tone, string> = {
  info: "border-line bg-ivory-50 text-ink-soft",
  inactive: "border-dashed border-stone bg-transparent text-ink-soft",
  error: "border-error/40 bg-[#f4e3da] text-error",
  success: "border-forest/30 bg-sage-200/40 text-forest-900",
};

export function Notice({ tone = "info", title, children, role }: { tone?: Tone; title?: string; children: ReactNode; role?: string }) {
  return (
    <div role={role ?? (tone === "error" ? "alert" : undefined)} className={`flex gap-3 border p-4 text-[0.88rem] leading-relaxed ${tones[tone]}`}>
      {tone === "success" ? (
        <IconCheck size={18} className="mt-0.5 shrink-0" />
      ) : (
        <IconAlert size={18} className="mt-0.5 shrink-0" />
      )}
      <div>
        {title && <p className="font-medium">{title}</p>}
        <div className={title ? "mt-1" : ""}>{children}</div>
      </div>
    </div>
  );
}

/** Kennzeichnung für noch nicht festgelegte Angaben */
export function Tbd({ children }: { children: ReactNode }) {
  return (
    <span title="Vorläufig – wird vor dem Launch festgelegt" className="font-mono text-[0.86em] text-citrus-700">
      [{children}]
    </span>
  );
}

export function StatusTag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "live" | "pending" }) {
  const dot = tone === "live" ? "bg-forest" : tone === "pending" ? "bg-citrus" : "bg-stone";
  return (
    <span className="spec inline-flex items-center gap-2 text-ink-soft">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
