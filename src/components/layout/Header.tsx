"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, site } from "@/lib/site";
import { useShop } from "@/components/providers/ShopProvider";
import { IconBag, IconUser } from "@/components/ui/Icons";
import { Picture } from "@/components/ui/Picture";
import { useDialog } from "@/lib/hooks/useDialog";
import { Wordmark } from "./Wordmark";

export function Header() {
  const pathname = usePathname();
  const { totals, openDrawer, session } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDialog(menuOpen, closeMenu, panelRef, toggleRef);

  // Menü bei Seitenwechsel schließen
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  /* Elegantes Verhalten beim Scrollen: kompakt, beim Runterscrollen ausblenden */
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 320 && y > last + 4);
        if (y < last - 4) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const count = totals.itemCount;
  const solid = scrolled || menuOpen;
  const isActive = (href: string) => pathname?.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[transform,background-color,box-shadow] duration-700 ease-[var(--ease-soft)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "bg-ivory/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"}`}
      >
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-ivory-50"
        >
          Zum Inhalt springen
        </a>
        <div className={`frame grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-700 ease-[var(--ease-soft)] ${scrolled ? "h-16" : "h-[4.5rem] lg:h-24"}`}>
          {/* Links: Menü (mobil) / Wortmarke (Desktop) */}
          <div className="flex items-center">
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              onClick={() => setMenuOpen((v) => !v)}
              className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-2.5 w-6">
                <span className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-500 ease-[var(--ease-soft)] ${menuOpen ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-ink transition-all duration-500 ease-[var(--ease-soft)] ${menuOpen ? "top-1 w-6 -rotate-45" : "top-2.5 w-4"}`} />
              </span>
            </button>
            <div className="hidden lg:block">
              <Wordmark />
            </div>
          </div>

          {/* Mitte: Navigation (Desktop) / Wortmarke (mobil) */}
          <div className="lg:hidden">
            <Wordmark />
          </div>
          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-9 xl:gap-12">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 text-[0.88rem] tracking-[0.01em] text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Rechts: Konto, Warenkorb, CTA */}
          <div className="flex items-center justify-end gap-1 lg:gap-3">
            <Link
              href="/konto/"
              className="hidden h-11 items-center gap-2 px-2 text-[0.85rem] text-ink-soft transition-colors hover:text-ink sm:flex"
              aria-label={session ? "Mein Konto" : "Anmelden"}
            >
              <IconUser size={20} />
              <span className="hidden xl:inline">{session ? "Konto" : "Anmelden"}</span>
            </Link>
            <button
              type="button"
              onClick={openDrawer}
              className="-mr-2 flex h-11 items-center gap-2 px-2 text-[0.85rem] text-ink-soft transition-colors hover:text-ink lg:mr-0"
              aria-label={`Warenkorb öffnen, ${count} ${count === 1 ? "Artikel" : "Artikel"}`}
            >
              <IconBag size={20} />
              <span className="hidden xl:inline">Warenkorb</span>
              <span className="font-mono text-[0.72rem] tabular-nums">({count})</span>
            </button>
            <Link
              href="/produkte/elora-day/"
              className="ml-3 hidden h-10 items-center border border-ink/25 px-5 text-[0.8rem] tracking-[0.02em] transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-ivory-50 lg:inline-flex"
            >
              ELORA DAY
            </Link>
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
        inert={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col bg-ivory pt-[calc(4.5rem+env(safe-area-inset-top,0px))] transition-[clip-path] duration-700 ease-[var(--ease-soft)] lg:hidden ${
          menuOpen ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="frame flex min-h-0 flex-1 flex-col overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
          <nav aria-label="Mobile Navigation" className="border-t border-line">
            <ul>
              {mainNav.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-baseline justify-between py-5 font-display text-[2.1rem] leading-none text-forest-900 transition-[opacity,transform] duration-700 ease-[var(--ease-soft)] ${
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: menuOpen ? `${150 + i * 60}ms` : "0ms" }}
                  >
                    {item.label}
                    <span className="spec text-ink-muted">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="mt-6 grid grid-cols-2 gap-y-3 text-[0.95rem] text-ink-soft">
            <li>
              <Link href="/konto/" onClick={closeMenu}>
                {session ? "Mein Konto" : "Anmelden"}
              </Link>
            </li>
            <li>
              <Link href="/warenkorb/" onClick={closeMenu}>
                Warenkorb ({count})
              </Link>
            </li>
            <li>
              <Link href="/faq/" onClick={closeMenu}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/kontakt/" onClick={closeMenu}>
                Kontakt
              </Link>
            </li>
          </ul>
          <Link href="/produkte/elora-day/" onClick={closeMenu} className="group mt-auto grid grid-cols-[6.5rem_1fr] items-center gap-5 pt-10">
            <div className="aspect-[4/5] overflow-hidden bg-sand">
              <Picture name="pack-front" alt="" width={1600} height={2000} sizes="120px" />
            </div>
            <div>
              <p className="spec text-ink-muted">N° 01 · {site.launch}</p>
              <p className="mt-2 font-display text-[1.6rem] leading-none">ELORA DAY</p>
              <p className="mt-2 text-[0.88rem] text-ink-soft link-line inline-block">Entdecken</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
