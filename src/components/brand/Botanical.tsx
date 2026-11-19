/** Feine botanische Linienzeichnung: Citruszweig mit Blättern und Frucht. */
export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" aria-hidden="true" focusable="false" className={className} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M100 252 C 98 204, 104 152, 96 92 C 92 62, 100 32, 110 8" />
      <path d="M98 172 C 70 162, 50 142, 44 118 C 66 122, 86 142, 98 172 Z" />
      <path d="M97 170 C 80 155, 61 136, 47 121" strokeOpacity="0.6" />
      <path d="M99 132 C 128 120, 148 100, 154 76 C 132 82, 111 104, 99 132 Z" />
      <path d="M100 130 C 118 116, 136 98, 151 80" strokeOpacity="0.6" />
      <path d="M97 82 C 76 72, 64 54, 62 32 C 80 40, 92 58, 97 82 Z" />
      <path d="M97 80 C 84 66, 72 52, 64 36" strokeOpacity="0.6" />
      <path d="M100 204 C 110 200, 118 196, 122 186" />
      <circle cx="132" cy="204" r="19" />
      <path d="M124 196 C 128 192, 134 191, 138 193" strokeOpacity="0.5" />
    </svg>
  );
}
