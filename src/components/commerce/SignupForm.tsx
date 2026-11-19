"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { callFunction, services } from "@/lib/services";
import { Arrow } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Launch list / newsletter with double opt-in.
 * Success is only shown once the edge function confirms the record was stored.
 */
export function SignupForm({
  list = "launch",
  tone = "light",
  submitLabel = "Join",
}: {
  list?: "launch" | "newsletter";
  tone?: "light" | "dark";
  submitLabel?: string;
}) {
  const id = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<{ email?: string; consent?: string }>({});
  const active = Boolean(services.supabase);
  const dark = tone === "dark";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const consent = data.get("consent") === "on";
    const next: typeof errors = {};
    if (!email) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email) || email.length > 254) next.email = "This email address does not look complete.";
    if (!consent) next.consent = "Please confirm your consent.";
    setErrors(next);
    if (next.email) emailRef.current?.focus();
    if (next.email || next.consent) return;

    if (!active) {
      setStatus({
        kind: "error",
        message: "Sign-up is not activated yet. We are setting it up – your address has not been stored.",
      });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const { ok, data: res } = await callFunction<{ ok?: boolean; message?: string }>("launch-signup", {
        email,
        consent: true,
        list,
        productId: "elora-day",
        website: String(data.get("website") ?? ""),
      });
      if (ok && res.ok) {
        setStatus({ kind: "done" });
        form.reset();
      } else {
        setStatus({ kind: "error", message: res.message ?? "Your sign-up could not be saved. Please try again later." });
      }
    } catch {
      setStatus({ kind: "error", message: "No connection. Please check your internet connection." });
    }
  }

  if (status.kind === "done") {
    return (
      <div role="status" className={`border-t pt-8 ${dark ? "border-ivory/20" : "border-line"}`}>
        <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${dark ? "bg-ivory-50 text-forest-900" : "bg-forest text-ivory-50"}`}>
          <IconCheck size={20} />
        </span>
        <p className={`mt-6 font-display text-[2.2rem] leading-tight ${dark ? "text-ivory-50" : ""}`}>Almost there.</p>
        <p className={`mt-2 max-w-md leading-relaxed ${dark ? "text-ivory/75" : "text-ink-soft"}`}>
          We have sent you an email. Please confirm your sign-up via the link inside – only then are you subscribed.
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";
  const muted = dark ? "text-ivory/65" : "text-ink-muted";
  const lineColor = dark ? "border-ivory/30 focus-within:border-ivory-50" : "border-ink/25 focus-within:border-ink";

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className={`flex items-end gap-4 border-b transition-colors ${lineColor}`}>
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          ref={emailRef}
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          maxLength={254}
          disabled={sending}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={`h-16 w-0 min-w-0 flex-1 bg-transparent font-display text-[1.35rem] outline-none sm:text-[1.6rem] ${dark ? "text-ivory-50 placeholder:text-ivory/40" : "placeholder:text-ink-muted/70"}`}
        />
        <button type="submit" disabled={sending} className={`group mb-4 inline-flex shrink-0 items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase ${dark ? "text-ivory-50" : "text-forest"} disabled:opacity-50`}>
          {sending ? "Sending …" : submitLabel}
          <Arrow />
        </button>
      </div>
      {errors.email && (
        <p id={`${id}-email-error`} className={`mt-2 text-[0.82rem] ${dark ? "text-[#f0c3ad]" : "text-error"}`}>
          {errors.email}
        </p>
      )}

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <input
          id={`${id}-consent`}
          name="consent"
          type="checkbox"
          disabled={sending}
          className={`check ${dark ? "border-ivory/50" : ""}`}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
        />
        <label htmlFor={`${id}-consent`} className={`text-[0.8rem] leading-relaxed ${muted}`}>
          I would like to receive emails about the launch of ELORA DAY{list === "newsletter" ? ", new rituals and products" : ""}. I can withdraw my consent at any time. Details in the{" "}
          <Link href="/datenschutz/" className="underline underline-offset-2">
            privacy policy (Datenschutz)
          </Link>
          .
        </label>
      </div>
      {errors.consent && (
        <p id={`${id}-consent-error`} className={`mt-2 pl-7 text-[0.82rem] ${dark ? "text-[#f0c3ad]" : "text-error"}`}>
          {errors.consent}
        </p>
      )}

      <div aria-live="polite">
        {status.kind === "error" && (
          <p role="alert" className={`mt-6 border-l-2 pl-4 text-[0.88rem] leading-relaxed ${dark ? "border-[#f0c3ad] text-ivory/85" : "border-error text-error"}`}>
            {status.message}
          </p>
        )}
      </div>
      {!active && status.kind === "idle" && <p className={`spec mt-6 ${muted}`}>Sign-up not yet activated · being set up</p>}
    </form>
  );
}
