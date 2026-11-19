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

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  /* Ruhiges Scrollverhalten: kompakter Hintergrund, beim Runterscrollen ausblenden */
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 360 && y > last + 4);
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
  const isActive = (href: string) => !href.includes("#") && pathname?.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[transform,background-color,box-shadow] duration-1000 ease-[var(--ease-soft)] ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "bg-ivory/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"}`}
      >
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <div className={`frame grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-1000 ease-[var(--ease-soft)] ${scrolled ? "h-16" : "h-20 lg:h-28"}`}>
          <div className="flex items-center">
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-2 w-6">
                <span className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-700 ease-[var(--ease-soft)] ${menuOpen ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-ink transition-all duration-700 ease-[var(--ease-soft)] ${menuOpen ? "top-1 w-6 -rotate-45" : "top-2 w-6"}`} />
              </span>
            </button>
            <div className="hidden lg:block">
              <Wordmark />
            </div>
          </div>

          <div className="lg:hidden">
            <Wordmark />
          </div>
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-10 xl:gap-14">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 text-[0.68rem] tracking-[0.24em] text-ink-soft uppercase transition-colors duration-500 hover:text-forest aria-[current=page]:text-forest"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 scale-0 rounded-full bg-gold transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-100 group-aria-[current=page]:scale-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-1 lg:gap-4">
            <Link
              href="/konto/"
              className="hidden h-11 items-center gap-2 px-2 text-[0.68rem] tracking-[0.2em] text-ink-soft uppercase transition-colors hover:text-forest sm:flex"
              aria-label={session ? "My account" : "Sign in"}
            >
              <IconUser size={19} />
              <span className="hidden xl:inline">{session ? "Account" : "Sign in"}</span>
            </Link>
            <button
              type="button"
              onClick={openDrawer}
              className="-mr-2 flex h-11 items-center gap-2.5 px-2 text-[0.68rem] tracking-[0.2em] text-ink-soft uppercase transition-colors hover:text-forest lg:mr-0"
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <IconBag size={19} />
              <span className="hidden xl:inline">Cart</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-ink/25 px-1 text-[0.6rem] tracking-normal tabular-nums">{count}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
        className={`grain fixed inset-0 z-40 flex flex-col bg-ivory pt-[calc(5rem+env(safe-area-inset-top,0px))] transition-[opacity,visibility] duration-700 ease-[var(--ease-soft)] lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="frame relative z-[2] flex min-h-0 flex-1 flex-col overflow-y-auto pb-[max(1.75rem,env(safe-area-inset-bottom,0px))]">
          <nav aria-label="Mobile navigation">
            <ul>
              {mainNav.map((item, i) => (
                <li key={item.href} className="border-b border-line first:border-t">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-baseline justify-between py-5 font-display text-[2.2rem] leading-none text-forest transition-[opacity,transform] duration-1000 ease-[var(--ease-soft)] ${
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                    style={{ transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms" }}
                  >
                    {item.label}
                    <span className="spec text-ink-muted">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="spec mt-8 grid grid-cols-2 gap-y-4 text-ink-soft">
            <li>
              <Link href="/konto/" onClick={closeMenu}>
                {session ? "Account" : "Sign in"}
              </Link>
            </li>
            <li>
              <Link href="/warenkorb/" onClick={closeMenu}>
                Cart ({count})
              </Link>
            </li>
            <li>
              <Link href="/faq/" onClick={closeMenu}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/kontakt/" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
          <Link href="/produkte/elora-day/" onClick={closeMenu} className="mt-auto grid grid-cols-[6rem_1fr] items-center gap-5 pt-10">
            <div className="aspect-[4/5] overflow-hidden bg-sand-100">
              <Picture name="pack-front" alt="" width={1600} height={2000} sizes="110px" />
            </div>
            <div>
              <p className="spec text-ink-muted">{site.launch}</p>
              <p className="mt-2 font-display text-[1.7rem] leading-none text-forest">ELORA DAY</p>
              <p className="mt-2 inline-block text-[0.85rem] text-ink-soft link-line">Discover</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
