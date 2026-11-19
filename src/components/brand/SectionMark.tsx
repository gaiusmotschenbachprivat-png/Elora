/** Vertikale Kapitelmarke (Tategaki-Anmutung) mit feiner Linie – nur ab Desktop. */
export function SectionMark({ children, tone = "dark", className = "" }: { children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none hidden flex-col items-center gap-5 lg:flex ${tone === "light" ? "text-ivory/55" : "text-ink-muted"} ${className}`}>
      <span className="spec vertical">{children}</span>
      <span className="h-20 w-px bg-current opacity-40" />
    </div>
  );
}
