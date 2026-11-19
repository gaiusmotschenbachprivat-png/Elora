import { Reveal } from "@/components/ui/Reveal";

/**
 * Balance-Kreis (Ensō-Anmutung): ein feiner, bewusst nicht ganz geschlossener
 * Ring. Zeichnet sich beim Einblenden langsam (respektiert reduced motion).
 */
export function Enso({ className = "", tone = "gold", strokeWidth = 0.6 }: { className?: string; tone?: "gold" | "forest" | "ivory"; strokeWidth?: number }) {
  const color = tone === "gold" ? "text-gold" : tone === "ivory" ? "text-ivory/50" : "text-forest/40";
  // Bogen von -80° bis 250° (Öffnung oben rechts), Mittelpunkt 50/50, Radius 46
  const p = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(50 + 46 * Math.cos(a)).toFixed(2)} ${(50 + 46 * Math.sin(a)).toFixed(2)}`;
  };
  return (
    <Reveal data-enso="" aria-hidden="true" className={`pointer-events-none ${color} ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" fill="none">
        <path className="enso-path" pathLength={1} d={`M ${p(-80)} A 46 46 0 1 1 ${p(250)}`} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path className="enso-path" pathLength={1} d={`M ${p(-70)} A 45.2 45.2 0 1 1 ${p(200)}`} stroke="currentColor" strokeOpacity={0.35} strokeWidth={strokeWidth * 0.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </Reveal>
  );
}
