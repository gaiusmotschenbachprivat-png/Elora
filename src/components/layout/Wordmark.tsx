import Link from "next/link";

export function Wordmark({
  className = "",
  tone = "dark",
  asLink = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  asLink?: boolean;
}) {
  const inner = (
    <span
      className={`wordmark text-[1.45rem] leading-none sm:text-[1.6rem] ${tone === "light" ? "text-cream-50" : "text-ink"} ${className}`}
    >
      ELORA
    </span>
  );
  if (!asLink) return inner;
  return (
    <Link href="/" aria-label="ELORA – zur Startseite" className="inline-flex items-center py-2">
      {inner}
    </Link>
  );
}
