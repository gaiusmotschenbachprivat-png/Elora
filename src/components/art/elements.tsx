/**
 * ELORA – illustrierte Bildwelt
 * ---------------------------------------------------------------
 * Alle Motive sind als SVG-Gruppen aufgebaut, damit sie gestochen
 * scharf, extrem leicht (< 10 KB) und farblich exakt auf die
 * Markenpalette abgestimmt sind. Jede Gruppe erhält ein ID-Präfix
 * (`p`), damit mehrere Kompositionen auf einer Seite koexistieren.
 *
 * Sobald echte Kampagnenfotografie vorliegt, können die Kompositionen
 * in `components/art/*.tsx` 1:1 durch <Image>-Komponenten ersetzt werden.
 */

const JOST = "var(--font-jost), sans-serif";
const MANROPE = "var(--font-manrope), sans-serif";

/* ------------------------------------------------------------------ */
/*  Produktdose ELORA DAY  (lokales Koordinatensystem 280 × 420)       */
/* ------------------------------------------------------------------ */
export function TinDefs({ p }: { p: string }) {
  return (
    <>
      <linearGradient id={`${p}-tin-shade`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#4a4231" stopOpacity="0.26" />
        <stop offset="0.08" stopColor="#4a4231" stopOpacity="0.1" />
        <stop offset="0.2" stopColor="#4a4231" stopOpacity="0" />
        <stop offset="0.66" stopColor="#4a4231" stopOpacity="0" />
        <stop offset="0.88" stopColor="#4a4231" stopOpacity="0.12" />
        <stop offset="1" stopColor="#4a4231" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id={`${p}-tin-hi`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${p}-tin-lid`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#ece5d8" />
        <stop offset="1" stopColor="#e2d9c9" />
      </linearGradient>
      <linearGradient id={`${p}-tin-top`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#fbf9f4" />
        <stop offset="1" stopColor="#e7dfd1" />
      </linearGradient>
      <linearGradient id={`${p}-tin-band`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#292b28" stopOpacity="0.16" />
        <stop offset="1" stopColor="#292b28" stopOpacity="0" />
      </linearGradient>
      <clipPath id={`${p}-tin-clip`}>
        <path d="M0 24 V84 A140 22 0 0 0 280 84 V24 Z" />
        <path d="M2 80 V396 A138 22 0 0 0 278 396 V80 Z" />
        <ellipse cx="140" cy="24" rx="140" ry="22" />
      </clipPath>
      <clipPath id={`${p}-body-clip`}>
        <path d="M2 80 V396 A138 22 0 0 0 278 396 V80 Z" />
      </clipPath>
    </>
  );
}

export function Tin({ p }: { p: string }) {
  return (
    <g>
      {/* Korpus */}
      <path d="M2 80 V396 A138 22 0 0 0 278 396 V80 Z" fill="#f6f2ea" />
      {/* Landschaft auf dem Etikett */}
      <g clipPath={`url(#${p}-body-clip)`}>
        <path
          d="M0 326 C 52 304 104 320 152 310 S 244 292 280 302 V430 H0Z"
          fill="#dfe2d6"
        />
        <path
          d="M0 346 C 46 330 112 344 168 330 S 246 330 280 320 V430 H0Z"
          fill="#aeb6a1"
        />
        <path
          d="M0 376 C 70 360 134 374 196 362 S 258 366 280 360 V430 H0Z"
          fill="#87927a"
        />
        <path
          d="M0 400 C 60 392 126 400 180 392 S 252 394 280 388 V430 H0Z"
          fill="#617058"
        />
        {/* dezente Sonne */}
        <circle cx="214" cy="318" r="11" fill="#c78b43" opacity="0.28" />
      </g>
      {/* Typografie */}
      <text
        x="147"
        y="150"
        textAnchor="middle"
        fontFamily={JOST}
        fontSize="29"
        fontWeight="400"
        letterSpacing="14"
        fill="#292b28"
      >
        ELORA
      </text>
      <line x1="122" x2="158" y1="168" y2="168" stroke="#c78b43" strokeWidth="1" />
      <text
        x="142"
        y="226"
        textAnchor="middle"
        fontFamily={JOST}
        fontSize="58"
        fontWeight="400"
        letterSpacing="5"
        fill="#c78b43"
      >
        DAY
      </text>
      <text
        x="141"
        y="252"
        textAnchor="middle"
        fontFamily={MANROPE}
        fontSize="9.5"
        fontWeight="600"
        letterSpacing="2.4"
        fill="#465641"
      >
        ELEKTROLYTE &amp;
      </text>
      <text
        x="141"
        y="266"
        textAnchor="middle"
        fontFamily={MANROPE}
        fontSize="9.5"
        fontWeight="600"
        letterSpacing="2.4"
        fill="#465641"
      >
        MIKRONÄHRSTOFFE
      </text>
      <text
        x="141"
        y="288"
        textAnchor="middle"
        fontFamily={MANROPE}
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="2.6"
        fill="#a96f2c"
      >
        CITRUS · INGWER
      </text>
      <text
        x="141"
        y="396"
        textAnchor="middle"
        fontFamily={MANROPE}
        fontSize="6.8"
        fontWeight="600"
        letterSpacing="1.9"
        fill="#f5f1e9"
      >
        NAHRUNGSERGÄNZUNGSMITTEL
      </text>
      <text
        x="141"
        y="407"
        textAnchor="middle"
        fontFamily={MANROPE}
        fontSize="6.4"
        fontWeight="500"
        letterSpacing="1.9"
        fill="#f5f1e9"
        opacity="0.85"
      >
        CA. 30 PORTIONEN
      </text>
      {/* Deckel */}
      <path d="M0 24 V84 A140 22 0 0 0 280 84 V24 Z" fill={`url(#${p}-tin-lid)`} />
      <path
        d="M2 86 A138 22 0 0 0 278 86 V98 A138 22 0 0 1 2 98 Z"
        fill={`url(#${p}-tin-band)`}
      />
      <path d="M0 84 A140 22 0 0 0 280 84" fill="none" stroke="#b9ad98" strokeWidth="0.8" />
      <ellipse cx="140" cy="24" rx="140" ry="22" fill={`url(#${p}-tin-top)`} />
      <ellipse
        cx="140"
        cy="24"
        rx="126"
        ry="18"
        fill="none"
        stroke="#d6ccbb"
        strokeWidth="0.9"
      />
      {/* Volumen-Schattierung */}
      <rect
        x="0"
        y="0"
        width="280"
        height="430"
        fill={`url(#${p}-tin-shade)`}
        clipPath={`url(#${p}-tin-clip)`}
      />
      <rect
        x="38"
        y="0"
        width="62"
        height="430"
        fill={`url(#${p}-tin-hi)`}
        opacity="0.55"
        clipPath={`url(#${p}-tin-clip)`}
      />
      <ellipse cx="140" cy="24" rx="140" ry="22" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Orangenhälfte (frontal, Radius 80, Mittelpunkt 0/0)               */
/* ------------------------------------------------------------------ */
export function CitrusDefs({ p }: { p: string }) {
  return (
    <>
      <radialGradient id={`${p}-flesh`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#f7c56a" />
        <stop offset="0.6" stopColor="#f0a440" />
        <stop offset="1" stopColor="#e5892a" />
      </radialGradient>
      <radialGradient id={`${p}-peel`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#f2a046" />
        <stop offset="1" stopColor="#d2721f" />
      </radialGradient>
      <radialGradient id={`${p}-lemon`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#f6dc74" />
        <stop offset="1" stopColor="#d6a42a" />
      </radialGradient>
      <radialGradient id={`${p}-lemon-flesh`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fbeaa6" />
        <stop offset="1" stopColor="#f1d25f" />
      </radialGradient>
    </>
  );
}

function segmentPath(i: number, n: number, ri: number, ro: number, gapDeg: number) {
  const step = (Math.PI * 2) / n;
  const gap = (gapDeg * Math.PI) / 180;
  const a0 = i * step + gap - Math.PI / 2;
  const a1 = (i + 1) * step - gap - Math.PI / 2;
  const mid = (a0 + a1) / 2;
  const f = (v: number) => v.toFixed(2);
  const ix = Math.cos(mid) * ri;
  const iy = Math.sin(mid) * ri;
  const x0 = Math.cos(a0) * ro;
  const y0 = Math.sin(a0) * ro;
  const x1 = Math.cos(a1) * ro;
  const y1 = Math.sin(a1) * ro;
  return `M${f(ix)} ${f(iy)} L${f(x0)} ${f(y0)} A${ro} ${ro} 0 0 1 ${f(x1)} ${f(y1)} Z`;
}

function vesicles(i: number, n: number, ri: number, ro: number) {
  const step = (Math.PI * 2) / n;
  const mid = i * step + step / 2 - Math.PI / 2;
  const lines = [-0.12, 0, 0.12].map((o) => {
    const a = mid + o * step * 1.6;
    const r0 = ri + (ro - ri) * 0.32;
    const r1 = ro - 6;
    return `M${(Math.cos(a) * r0).toFixed(2)} ${(Math.sin(a) * r0).toFixed(2)} L${(Math.cos(a) * r1).toFixed(2)} ${(Math.sin(a) * r1).toFixed(2)}`;
  });
  return lines.join(" ");
}

export function CitrusHalf({
  p,
  r = 80,
  variant = "orange",
  showBack = true,
}: {
  p: string;
  r?: number;
  variant?: "orange" | "lemon";
  showBack?: boolean;
}) {
  const s = r / 80;
  const n = variant === "orange" ? 10 : 9;
  const lemon = variant === "lemon";
  const segs = Array.from({ length: n }, (_, i) => i);
  return (
    <g transform={`scale(${s})`}>
      {showBack && (
        <ellipse cx="10" cy="3" rx="80" ry="80" fill={lemon ? "#c99a26" : "#b9621d"} />
      )}
      <circle r="80" fill={`url(#${p}-${lemon ? "lemon" : "peel"})`} />
      <circle r="73.5" fill={lemon ? "#fbf3d6" : "#f8ead0"} />
      <circle r="69" fill={lemon ? "#f6eabd" : "#f3dcb5"} />
      <g>
        {segs.map((i) => (
          <path
            key={i}
            d={segmentPath(i, n, 6, 65, 2.3)}
            fill={`url(#${p}-${lemon ? "lemon-flesh" : "flesh"})`}
            stroke={lemon ? "#f3dc80" : "#ee9a3b"}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        ))}
        {segs.map((i) => (
          <path
            key={`v${i}`}
            d={vesicles(i, n, 6, 65)}
            stroke="#ffffff"
            strokeOpacity="0.32"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        ))}
      </g>
      <circle r="5" fill={lemon ? "#fbf3d6" : "#f8ead0"} />
      <ellipse cx="-30" cy="-36" rx="26" ry="12" fill="#ffffff" opacity="0.16" transform="rotate(-35 -30 -36)" />
    </g>
  );
}

/* Zitrone, ganz (Mittelpunkt 0/0, ca. 140 × 90) */
export function Lemon({ p }: { p: string }) {
  return (
    <g>
      <path
        d="M-70 2 C -66 -30 -32 -44 2 -44 C 36 -44 64 -30 70 -2 C 74 0 76 4 72 7 C 64 34 32 46 0 46 C -34 46 -62 32 -70 8 C -76 6 -76 2 -70 2 Z"
        fill={`url(#${p}-lemon)`}
      />
      <path
        d="M-40 -26 C -22 -36 10 -38 30 -30"
        stroke="#fff6cf"
        strokeOpacity="0.55"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="72" cy="2" r="3" fill="#b78a1f" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Ingwer                                                             */
/* ------------------------------------------------------------------ */
export function GingerDefs({ p }: { p: string }) {
  return (
    <>
      <linearGradient id={`${p}-ginger`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#e2c696" />
        <stop offset="0.55" stopColor="#cfa970" />
        <stop offset="1" stopColor="#aa8150" />
      </linearGradient>
      <radialGradient id={`${p}-ginger-slice`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#f6e6b2" />
        <stop offset="1" stopColor="#e8cd86" />
      </radialGradient>
    </>
  );
}

export function GingerRoot({ p }: { p: string }) {
  return (
    <g>
      <path
        d="M10 60 C 4 44 18 30 36 34 C 44 20 62 14 74 24 C 84 10 104 8 114 24 C 126 18 142 22 150 34 C 166 28 186 34 192 50 C 198 66 186 80 168 78 C 152 88 128 86 116 78 C 100 88 76 88 64 78 C 48 86 26 84 18 74 C 12 72 10 66 10 60 Z"
        fill={`url(#${p}-ginger)`}
      />
      <g fill="none" stroke="#9a7243" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round">
        <path d="M38 38 C 42 50 42 62 36 74" />
        <path d="M74 28 C 78 42 78 60 70 78" />
        <path d="M114 28 C 118 44 118 62 112 78" />
        <path d="M152 38 C 156 50 156 64 150 76" />
      </g>
      <g fill="none" stroke="#9a7243" strokeOpacity="0.22" strokeWidth="0.9" strokeLinecap="round">
        <path d="M22 56 C 40 54 56 56 66 54" />
        <path d="M86 50 C 98 48 108 50 120 48" />
        <path d="M128 58 C 142 56 158 58 176 56" />
      </g>
      <path
        d="M30 40 C 44 34 58 30 70 30 M 88 22 C 98 18 108 20 112 26 M 130 30 C 142 28 156 34 166 36"
        stroke="#f6e9cc"
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* frischer Trieb */}
      <path d="M100 14 C 98 6 104 0 110 2 C 108 8 106 12 100 14 Z" fill="#c9a07c" />
      <path d="M100 14 C 98 6 104 0 110 2" stroke="#d58f72" strokeOpacity="0.5" fill="none" />
    </g>
  );
}

export function GingerSlice({ p, rx = 30, ry = 24 }: { p: string; rx?: number; ry?: number }) {
  return (
    <g>
      <ellipse cx="2" cy="4" rx={rx} ry={ry} fill="#b48955" />
      <ellipse rx={rx} ry={ry} fill="#d0ab72" />
      <ellipse rx={rx - 3.5} ry={ry - 3.5} fill={`url(#${p}-ginger-slice)`} />
      <ellipse
        rx={rx * 0.62}
        ry={ry * 0.62}
        fill="none"
        stroke="#dcbd73"
        strokeWidth="1.2"
        strokeDasharray="1.5 3"
      />
      <ellipse rx={rx * 0.3} ry={ry * 0.3} fill="#ecd290" opacity="0.8" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Blätter                                                            */
/* ------------------------------------------------------------------ */
export function LeafDefs({ p }: { p: string }) {
  return (
    <linearGradient id={`${p}-leaf`} x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stopColor="#6d7f5b" />
      <stop offset="1" stopColor="#3e4d38" />
    </linearGradient>
  );
}

/** Blatt mit Ursprung am Stiel (0/0), zeigt nach rechts, Länge ~ len */
export function Leaf({ p, len = 120, width = 0.36 }: { p: string; len?: number; width?: number }) {
  const w = len * width;
  return (
    <g>
      <path
        d={`M0 0 C ${len * 0.25} ${-w * 0.95} ${len * 0.75} ${-w * 0.8} ${len} 0 C ${len * 0.72} ${w * 0.7} ${len * 0.25} ${w * 0.8} 0 0 Z`}
        fill={`url(#${p}-leaf)`}
      />
      <path
        d={`M2 0 C ${len * 0.35} ${-w * 0.08} ${len * 0.7} ${-w * 0.06} ${len * 0.96} 0`}
        stroke="#9aa886"
        strokeOpacity="0.7"
        strokeWidth="1.1"
        fill="none"
      />
      {[0.25, 0.42, 0.59, 0.74].map((t) => (
        <g key={t} stroke="#9aa886" strokeOpacity="0.35" strokeWidth="0.8" fill="none">
          <path d={`M${len * t} ${-w * 0.05} q ${len * 0.08} ${-w * 0.3} ${len * 0.16} ${-w * 0.42}`} />
          <path d={`M${len * t} ${w * 0.02} q ${len * 0.08} ${w * 0.26} ${len * 0.16} ${w * 0.36}`} />
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Glas mit ELORA DAY  (lokal 160 × 230)                              */
/* ------------------------------------------------------------------ */
export function GlassDefs({ p }: { p: string }) {
  return (
    <>
      <linearGradient id={`${p}-drink`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#f7e6a8" stopOpacity="0.92" />
        <stop offset="1" stopColor="#efcf72" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id={`${p}-glass-edge`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
        <stop offset="0.18" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="0.8" stopColor="#ffffff" stopOpacity="0.08" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
      </linearGradient>
      <radialGradient id={`${p}-caustic`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#f1c862" stopOpacity="0.55" />
        <stop offset="1" stopColor="#f1c862" stopOpacity="0" />
      </radialGradient>
      <clipPath id={`${p}-drink-clip`}>
        <path d="M13.6 74 L22 208 Q 24 218 34 218 L126 218 Q 136 218 138 208 L146.4 74 Z" />
      </clipPath>
    </>
  );
}

export function Glass({ p }: { p: string }) {
  return (
    <g>
      {/* Lichtbrechung auf der Unterlage */}
      <ellipse cx="118" cy="226" rx="88" ry="14" fill={`url(#${p}-caustic)`} />
      <ellipse cx="80" cy="222" rx="70" ry="8" fill="#292b28" opacity="0.12" />
      {/* Flüssigkeit */}
      <path
        d="M13.6 74 L22 208 Q 24 218 34 218 L126 218 Q 136 218 138 208 L146.4 74 Z"
        fill={`url(#${p}-drink)`}
      />
      <g clipPath={`url(#${p}-drink-clip)`}>
        {/* Orangenscheibe im Glas */}
        <g transform="translate(96 150) rotate(-14)">
          <circle r="40" fill="#e9973a" opacity="0.55" />
          <circle r="35" fill="#f7d58a" opacity="0.6" />
          {Array.from({ length: 10 }, (_, i) => (
            <path
              key={i}
              d={segmentPath(i, 10, 3, 32, 3)}
              fill="#f2b257"
              opacity="0.55"
            />
          ))}
        </g>
        {/* Eiswürfel */}
        <g fill="#ffffff" fillOpacity="0.32" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.2">
          <rect x="30" y="64" width="40" height="38" rx="7" transform="rotate(-12 50 83)" />
          <rect x="78" y="70" width="38" height="36" rx="7" transform="rotate(10 97 88)" />
          <rect x="46" y="104" width="34" height="32" rx="6" transform="rotate(22 63 120)" />
        </g>
        {/* Bläschen */}
        <g fill="#ffffff" opacity="0.7">
          <circle cx="40" cy="180" r="1.6" />
          <circle cx="52" cy="160" r="1.1" />
          <circle cx="118" cy="190" r="1.4" />
          <circle cx="66" cy="196" r="1" />
          <circle cx="30" cy="140" r="1.2" />
        </g>
      </g>
      <ellipse cx="80" cy="74" rx="66.4" ry="8.5" fill="#fbf0c6" opacity="0.85" />
      {/* Glaskörper */}
      <path
        d="M10 14 L22 208 Q 24 218 34 218 L126 218 Q 136 218 138 208 L150 14"
        fill={`url(#${p}-glass-edge)`}
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="1.4"
      />
      <path d="M24 204 Q 80 214 136 204" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="3" fill="none" />
      <ellipse cx="80" cy="14" rx="70" ry="9" fill="none" stroke="#ffffff" strokeOpacity="0.95" strokeWidth="1.4" />
      <path d="M22 26 L32 196" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" />
      <path d="M136 30 L130 150" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Travertin-Sockel                                                   */
/* ------------------------------------------------------------------ */
export function StoneDefs({ p }: { p: string }) {
  return (
    <>
      <linearGradient id={`${p}-stone-front`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#e6dccb" />
        <stop offset="1" stopColor="#d3c5ae" />
      </linearGradient>
      <linearGradient id={`${p}-stone-top`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#e9e0d1" />
        <stop offset="1" stopColor="#f5eee3" />
      </linearGradient>
      <filter id={`${p}-stone-tex`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.18" numOctaves="3" seed="7" />
        <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.55 -0.12" />
        <feComposite in2="SourceGraphic" operator="in" />
      </filter>
    </>
  );
}

/** Steinplatte: Breite w, Tiefe der Oberseite d, Höhe der Front h  */
export function Stone({ p, w = 640, d = 26, h = 84 }: { p: string; w?: number; d?: number; h?: number }) {
  const inset = d * 0.9;
  const front = `M0 ${d} L${w} ${d} L${w} ${d + h - 8} Q${w} ${d + h} ${w - 8} ${d + h} L8 ${d + h} Q0 ${d + h} 0 ${d + h - 8} Z`;
  return (
    <g>
      <ellipse cx={w / 2} cy={d + h + 6} rx={w * 0.5} ry="10" fill="#292b28" opacity="0.08" />
      <path d={front} fill={`url(#${p}-stone-front)`} />
      <path d={front} filter={`url(#${p}-stone-tex)`} fill="#000" opacity="0.5" />
      <path
        d={`M${inset} 0 L${w - inset} 0 Q${w - inset * 0.4} 0 ${w} ${d - 2} L${w} ${d} L0 ${d} L0 ${d - 2} Q${inset * 0.4} 0 ${inset} 0 Z`}
        fill={`url(#${p}-stone-top)`}
      />
      <path d={`M0 ${d} L${w} ${d}`} stroke="#fffaf1" strokeOpacity="0.9" strokeWidth="1.6" />
      <path d={`M0 ${d + 2.5} L${w} ${d + 2.5}`} stroke="#a8977b" strokeOpacity="0.25" strokeWidth="1" />
      {/* Poren & Adern */}
      <g fill="#b6a68c" opacity="0.5">
        <ellipse cx={w * 0.12} cy={d + h * 0.45} rx="6" ry="1.5" />
        <ellipse cx={w * 0.31} cy={d + h * 0.7} rx="9" ry="1.7" />
        <ellipse cx={w * 0.55} cy={d + h * 0.38} rx="5" ry="1.2" />
        <ellipse cx={w * 0.74} cy={d + h * 0.62} rx="11" ry="1.8" />
        <ellipse cx={w * 0.9} cy={d + h * 0.3} rx="4" ry="1.1" />
        <ellipse cx={w * 0.2} cy={d * 0.55} rx="7" ry="1" />
        <ellipse cx={w * 0.83} cy={d * 0.6} rx="5" ry="0.9" />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Weiche Schatten / Licht                                            */
/* ------------------------------------------------------------------ */
export function SoftDefs({ p }: { p: string }) {
  return (
    <>
      <filter id={`${p}-blur-lg`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id={`${p}-blur-sm`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <radialGradient id={`${p}-sun`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="0.55" stopColor="#fbf6ec" stopOpacity="0.45" />
        <stop offset="1" stopColor="#f5f1e9" stopOpacity="0" />
      </radialGradient>
    </>
  );
}
