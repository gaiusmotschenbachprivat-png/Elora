"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  /** "fade" = Einblenden + Anheben, "image" = Bildöffnung (clip-path + Zoom) */
  variant?: "fade" | "image";
  className?: string;
  children: ReactNode;
} & Record<string, unknown>;

/**
 * Dezentes Einblenden beim Scrollen. Inhalte sind ohne JavaScript und bei
 * prefers-reduced-motion sofort sichtbar (siehe `.js .reveal` in globals.css).
 */
export function Reveal({ as: Tag = "div", delay = 0, variant = "fade", className = "", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const show = () => node.setAttribute("data-in", "");
    if (typeof IntersectionObserver === "undefined") return show();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${variant === "image" ? "reveal-img" : "reveal"} ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
