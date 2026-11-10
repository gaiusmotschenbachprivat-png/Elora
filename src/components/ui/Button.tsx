import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "md" | "lg" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[0.01em] whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-soft)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-cream-50 hover:bg-forest-900 shadow-[0_10px_30px_-14px_rgb(46_56_43/0.7)] hover:shadow-[0_14px_34px_-14px_rgb(46_56_43/0.8)]",
  outline: "border border-ink/25 text-ink hover:border-forest hover:bg-forest hover:text-cream-50",
  ghost: "text-forest hover:text-forest-900 underline-offset-[6px] hover:underline px-0!",
  light: "bg-cream-50 text-forest-900 hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.85rem]",
  md: "h-12 px-7 text-[0.92rem]",
  lg: "h-14 px-8 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 10h12.5M11.5 5.5 16 10l-4.5 4.5" />
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

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}
