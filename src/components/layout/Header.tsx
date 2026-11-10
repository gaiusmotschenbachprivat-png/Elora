"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, signupHref, site } from "@/lib/site";
import { Arrow, LinkButton } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Hintergrund nach dem ersten Scrollen */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Aktiven Abschnitt hervorheben */
  useEffect(() => {
    const ids = nav.map((n) => n.href.split("#")[1]).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* Mobile-Menü: Scroll-Lock, Escape, Fokusfalle */
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !focusables?.length) return;
      const first = toggleRef.current ?? focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid
          ? "bg-cream/85 shadow-[0_1px_0_rgb(41_43_40/0.08)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream-50"
      >
        Zum Inhalt springen
      </a>
      <div
        className={`container-elora flex items-center justify-between gap-6 transition-[height] duration-500 ${
          scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-24"
        }`}
      >
        <Wordmark />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {nav.map((item) => {
              const isActive = active === item.href.split("#")[1];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.88rem] tracking-[0.01em] transition-colors duration-300 hover:text-forest-900 ${
                      isActive ? "text-forest-900" : "text-ink-soft"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-citrus transition-transform duration-500 ease-[var(--ease-soft)] ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LinkButton href={signupHref} size="sm" className="hidden sm:inline-flex">
            Jetzt vormerken
          </LinkButton>
          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand/70 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-soft)] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-soft)] ${
                  open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

    </header>
      {/* Mobile-Menü */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        hidden={!open}
        className={`grain fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-cream lg:hidden ${scrolled ? "top-16" : "top-[4.5rem]"}`}
      >
        <div className="container-elora flex min-h-full flex-col pt-6 pb-10">
          <nav aria-label="Mobile Navigation">
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item, i) => (
                <li
                  key={item.href}
                  className="animate-fade-up"
                  style={{ "--delay": `${60 + i * 55}ms` } as React.CSSProperties}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-5 font-display text-[1.7rem] font-light text-forest-900"
                  >
                    {item.label}
                    <Arrow className="h-5 w-5 text-sage" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-10 animate-fade-up" style={{ "--delay": "380ms" } as React.CSSProperties}>
            <p className="eyebrow text-citrus-700">{site.product}</p>
            <p className="mt-2 text-ink-soft">
              Geplanter Launch: {site.launch}. Sei unter den Ersten, die davon erfahren.
            </p>
            <LinkButton
              href={signupHref}
              size="lg"
              arrow
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Jetzt vormerken
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
