import {
  CitrusDefs,
  CitrusHalf,
  Glass,
  GlassDefs,
  GingerDefs,
  GingerRoot,
  GingerSlice,
  Leaf,
  LeafDefs,
  Lemon,
  SoftDefs,
  Stone,
  StoneDefs,
  Tin,
  TinDefs,
} from "./elements";

type ArtProps = { className?: string; title?: string };

/* ------------------------------------------------------------------ */
/*  Hero: ELORA DAY auf Travertin, Orange, Zitrone, Ingwer             */
/* ------------------------------------------------------------------ */
export function HeroStill({ className = "", title }: ArtProps) {
  const p = "hero";
  return (
    <svg
      viewBox="40 30 800 540"
      className={className}
      role="img"
      aria-label={
        title ??
        "Konzept-Visualisierung: Die Dose ELORA DAY auf einem hellen Travertinsockel, umgeben von einer halbierten Orange, einer Zitrone, frischem Ingwer und grünen Blättern im Morgenlicht."
      }
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <SoftDefs p={p} />
        <TinDefs p={p} />
        <CitrusDefs p={p} />
        <GingerDefs p={p} />
        <LeafDefs p={p} />
        <StoneDefs p={p} />
      </defs>

      {/* Morgenlicht */}
      <circle cx="470" cy="250" r="300" fill={`url(#${p}-sun)`} />

      {/* Sockel */}
      <g transform="translate(60 436)">
        <Stone p={p} w={800} d={46} h={78} />
      </g>

      {/* Schatten (Licht fällt von rechts oben) */}
      <g filter={`url(#${p}-blur-lg)`}>
        <ellipse cx="380" cy="470" rx="190" ry="12" fill="#5b4d36" opacity="0.22" />
        <ellipse cx="205" cy="472" rx="110" ry="8" fill="#5b4d36" opacity="0.18" />
        <ellipse cx="630" cy="474" rx="110" ry="7" fill="#5b4d36" opacity="0.16" />
      </g>
      <g filter={`url(#${p}-blur-sm)`}>
        <ellipse cx="450" cy="470" rx="146" ry="7" fill="#3a3424" opacity="0.32" />
        <ellipse cx="236" cy="470" rx="64" ry="5" fill="#3a3424" opacity="0.3" />
      </g>

      {/* Blätter hinter den Früchten */}
      <g transform="translate(232 400) rotate(-152)">
        <Leaf p={p} len={150} />
      </g>
      <g transform="translate(236 404) rotate(-118)">
        <Leaf p={p} len={118} width={0.34} />
      </g>
      <g transform="translate(250 410) rotate(-196)">
        <Leaf p={p} len={104} width={0.33} />
      </g>

      {/* Zitrone */}
      <g transform="translate(140 432) rotate(-6) scale(0.86)">
        <Lemon p={p} />
      </g>

      {/* Orangenhälfte */}
      <g transform="translate(244 392)">
        <CitrusHalf p={p} r={78} />
      </g>

      {/* Dose */}
      <g transform="translate(310 52)">
        <Tin p={p} />
      </g>

      {/* Ingwer */}
      <g transform="translate(700 452) rotate(-24)">
        <Leaf p={p} len={100} width={0.34} />
      </g>
      <g transform="translate(560 384)">
        <GingerRoot p={p} />
      </g>
      <g transform="translate(572 452) rotate(-8)">
        <GingerSlice p={p} rx={22} ry={19} />
      </g>
      <g transform="translate(668 470) scale(1 0.42)">
        <GingerSlice p={p} rx={26} ry={24} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Glas im Morgenlicht (Inhaltsstoffe)                                */
/* ------------------------------------------------------------------ */
export function GlassStill({ className = "", title }: ArtProps) {
  const p = "glass";
  return (
    <svg
      viewBox="0 0 480 560"
      className={className}
      role="img"
      aria-label={
        title ??
        "Konzept-Visualisierung: Ein Glas mit hellgelbem ELORA DAY Getränk, Eiswürfeln und Orangenscheibe, daneben eine Orangenhälfte und Ingwerscheiben."
      }
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <SoftDefs p={p} />
        <GlassDefs p={p} />
        <CitrusDefs p={p} />
        <GingerDefs p={p} />
        <LeafDefs p={p} />
        <linearGradient id={`${p}-wall`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f3ece0" />
          <stop offset="1" stopColor="#e2d7c5" />
        </linearGradient>
        <linearGradient id={`${p}-table`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#eee6d8" />
          <stop offset="1" stopColor="#ddd1bd" />
        </linearGradient>
      </defs>

      <rect width="480" height="560" fill={`url(#${p}-wall)`} />
      {/* Fensterlicht */}
      <g filter={`url(#${p}-blur-lg)`} opacity="0.75">
        <path d="M250 -20 L380 -20 L250 420 L120 420 Z" fill="#ffffff" opacity="0.55" />
        <path d="M400 -20 L470 -20 L340 420 L270 420 Z" fill="#ffffff" opacity="0.45" />
      </g>
      {/* Blattschatten */}
      <g filter={`url(#${p}-blur-sm)`} opacity="0.1" className="animate-leaf-sway">
        <g transform="translate(470 30) rotate(150)">
          <Leaf p={p} len={140} />
        </g>
        <g transform="translate(480 90) rotate(170)">
          <Leaf p={p} len={110} />
        </g>
        <g transform="translate(440 0) rotate(120)">
          <Leaf p={p} len={120} />
        </g>
      </g>

      {/* Tischfläche */}
      <rect x="0" y="410" width="480" height="150" fill={`url(#${p}-table)`} />
      <path d="M0 410 H480" stroke="#ffffff" strokeOpacity="0.8" />

      <g transform="translate(150 196) scale(1.12)">
        <Glass p={p} />
      </g>

      <g filter={`url(#${p}-blur-sm)`}>
        <ellipse cx="96" cy="482" rx="70" ry="7" fill="#3a3424" opacity="0.25" />
      </g>
      <g transform="translate(90 432) rotate(-150)">
        <Leaf p={p} len={92} width={0.34} />
      </g>
      <g transform="translate(98 428)">
        <CitrusHalf p={p} r={54} />
      </g>
      <g transform="translate(392 482) scale(1 0.42)">
        <GingerSlice p={p} rx={28} ry={26} />
      </g>
      <g transform="translate(428 462) rotate(-10)">
        <GingerSlice p={p} rx={20} ry={17} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Philosophie: Morgenritual – Dose & Glas                            */
/* ------------------------------------------------------------------ */
export function RitualStill({ className = "", title }: ArtProps) {
  const p = "ritual";
  return (
    <svg
      viewBox="0 0 640 560"
      className={className}
      role="img"
      aria-label={
        title ??
        "Konzept-Visualisierung: Morgenritual mit der Dose ELORA DAY und einem frisch zubereiteten Glas im warmen Licht."
      }
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <SoftDefs p={p} />
        <TinDefs p={p} />
        <GlassDefs p={p} />
        <CitrusDefs p={p} />
        <LeafDefs p={p} />
        <StoneDefs p={p} />
        <linearGradient id={`${p}-bg`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#dfe2d6" />
          <stop offset="1" stopColor="#c9cebf" />
        </linearGradient>
      </defs>

      <rect width="640" height="560" fill={`url(#${p}-bg)`} />
      <circle cx="420" cy="170" r="260" fill={`url(#${p}-sun)`} />
      {/* Landschaftslinien */}
      <path d="M0 330 C 120 290 240 320 350 300 S 560 270 640 290 V560 H0Z" fill="#b8bfab" opacity="0.55" />
      <path d="M0 370 C 140 340 260 366 380 346 S 560 330 640 342 V560 H0Z" fill="#a1aa92" opacity="0.5" />

      <g transform="translate(-20 412)">
        <Stone p={p} w={700} d={60} h={150} />
      </g>
      <g filter={`url(#${p}-blur-sm)`}>
        <ellipse cx="232" cy="460" rx="124" ry="7" fill="#3a3424" opacity="0.3" />
        <ellipse cx="482" cy="454" rx="72" ry="6" fill="#3a3424" opacity="0.25" />
      </g>

      <g transform="translate(112 100) scale(0.86)">
        <Tin p={p} />
      </g>
      <g transform="translate(400 232) scale(1.02)">
        <Glass p={p} />
      </g>
      <g transform="translate(566 458) rotate(-160)">
        <Leaf p={p} len={96} width={0.34} />
      </g>
      <g transform="translate(586 428)">
        <CitrusHalf p={p} r={34} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Blattschatten (dekorativ, für Hintergründe)                         */
/* ------------------------------------------------------------------ */
export function LeafShadow({ className = "" }: { className?: string }) {
  const p = "shadow";
  const leaves: Array<[number, number, number, number]> = [
    [40, 60, 168, 170],
    [90, 120, 150, 150],
    [140, 40, 190, 160],
    [200, 150, 140, 130],
    [250, 70, 200, 150],
    [300, 180, 150, 120],
    [350, 100, 185, 140],
  ];
  return (
    <svg viewBox="0 0 520 420" className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id={`${p}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <g filter={`url(#${p}-blur)`} fill="#465641">
        <path d="M520 10 C 420 40 300 90 180 210" stroke="#465641" strokeWidth="4" fill="none" />
        {leaves.map(([x, y, rot, len], i) => (
          <path
            key={i}
            transform={`translate(${520 - x} ${y}) rotate(${rot})`}
            d={`M0 0 C ${len * 0.25} ${-len * 0.34} ${len * 0.75} ${-len * 0.29} ${len} 0 C ${len * 0.72} ${len * 0.25} ${len * 0.25} ${len * 0.29} 0 0 Z`}
          />
        ))}
      </g>
    </svg>
  );
}
