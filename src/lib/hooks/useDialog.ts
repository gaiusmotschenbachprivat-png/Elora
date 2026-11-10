"use client";

import { useEffect, type RefObject } from "react";

/** Fokusfalle, Escape und Scroll-Sperre für modale Ebenen (Menü, Warenkorb). */
export function useDialog(open: boolean, onClose: () => void, ref: RefObject<HTMLElement | null>, returnFocus?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const previouslyFocused = (returnFocus?.current ?? document.activeElement) as HTMLElement | null;

    const focusables = () =>
      Array.from(node?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])') ?? []).filter(
        (el) => el.offsetParent !== null,
      );
    const t = window.setTimeout(() => focusables()[0]?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, ref, returnFocus]);
}
