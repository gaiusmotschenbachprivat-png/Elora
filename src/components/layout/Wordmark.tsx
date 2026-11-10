import Link from "next/link";

export function Wordmark({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link href="/" aria-label="ELORA – Startseite" className={`inline-flex items-center py-2 ${className}`}>
      <span className={`wordmark text-[1.3rem] leading-none lg:text-[1.45rem] ${tone === "light" ? "text-ivory-50" : "text-ink"}`}>ELORA</span>
    </Link>
  );
}
