import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "solid" | "outline" | "light" | "text";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-4 overflow-hidden whitespace-nowrap font-normal uppercase tracking-[0.2em] transition-[color,background-color,border-color] duration-700 ease-[var(--ease-soft)] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid:
    "bg-forest text-ivory before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-forest-900 before:transition-transform before:duration-700 before:ease-[var(--ease-soft)] hover:before:scale-y-100 [&>*]:relative",
  outline: "border border-forest/50 text-forest hover:border-forest hover:bg-forest hover:text-ivory",
  light: "bg-ivory text-forest-900 hover:bg-ivory-50",
  text: "text-ink link-line !px-0 !h-auto",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.62rem]",
  md: "h-12 px-8 text-[0.66rem]",
  lg: "h-14 px-9 text-[0.7rem]",
};

export function buttonClasses(variant: Variant = "solid", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 12"
      className={`h-3 w-6 transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

export function LinkButton({ href, variant = "solid", size = "md", arrow = false, className = "", children, ...rest }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}
