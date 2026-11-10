import { CitrusDefs, CitrusHalf, GingerDefs, GingerSlice, Leaf, LeafDefs, SoftDefs } from "./elements";

export function CitrusMini({ className = "" }: { className?: string }) {
  const p = "mini";
  return (
    <svg viewBox="0 0 280 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <SoftDefs p={p} />
        <CitrusDefs p={p} />
        <GingerDefs p={p} />
        <LeafDefs p={p} />
      </defs>
      <circle cx="150" cy="100" r="96" fill="#f3ede2" />
      <g filter={`url(#${p}-blur-sm)`}>
        <ellipse cx="140" cy="182" rx="100" ry="6" fill="#3a3424" opacity="0.22" />
      </g>
      <g transform="translate(96 120) rotate(-140)">
        <Leaf p={p} len={96} width={0.34} />
      </g>
      <g transform="translate(110 124) rotate(-104)">
        <Leaf p={p} len={78} width={0.32} />
      </g>
      <g transform="translate(118 118)">
        <CitrusHalf p={p} r={62} />
      </g>
      <g transform="translate(214 150) rotate(-12)">
        <GingerSlice p={p} rx={30} ry={27} />
      </g>
      <g transform="translate(236 182) scale(1 0.4)">
        <GingerSlice p={p} rx={22} ry={20} />
      </g>
    </svg>
  );
}
