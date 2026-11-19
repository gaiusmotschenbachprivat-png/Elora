import Link from "next/link";

export function Wordmark({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link href="/" aria-label="ELORA – home" className={`inline-flex items-center py-2 ${className}`}>
      <span className={`wordmark text-[1.15rem] leading-none lg:text-[1.3rem] ${tone === "light" ? "text-ivory" : "text-forest"}`}>ELORA</span>
    </Link>
  );
}
