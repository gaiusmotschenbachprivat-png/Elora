"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { callFunction, services } from "@/lib/services";
import { Arrow } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Launch-Registrierung / Newsletter mit Double-Opt-in.
 * Erfolg wird nur angezeigt, wenn die Edge Function die Speicherung bestätigt.
 */
export function SignupForm({
  list = "launch",
  tone = "light",
  submitLabel = "Vormerken",
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
    if (!email) next.email = "Bitte gib deine E-Mail-Adresse ein.";
    else if (!EMAIL_RE.test(email) || email.length > 254) next.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
    if (!consent) next.consent = "Bitte bestätige deine Einwilligung.";
    setErrors(next);
    if (next.email) emailRef.current?.focus();
    if (next.email || next.consent) return;

    if (!active) {
      setStatus({
        kind: "error",
        message: "Die Registrierung ist noch nicht aktiviert. Wir richten sie gerade ein – deine Adresse wurde nicht gespeichert.",
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
        setStatus({ kind: "error", message: res.message ?? "Die Anmeldung konnte nicht gespeichert werden. Bitte versuche es später erneut." });
      }
    } catch {
      setStatus({ kind: "error", message: "Keine Verbindung möglich. Bitte prüfe deine Internetverbindung." });
    }
  }

  if (status.kind === "done") {
    return (
      <div role="status" className={`border-t pt-8 ${dark ? "border-ivory/20" : "border-line"}`}>
        <span className={`inline-flex h-11 w-11 items-center justify-center ${dark ? "bg-ivory-50 text-forest-900" : "bg-forest text-ivory-50"}`}>
          <IconCheck size={20} />
        </span>
        <p className={`mt-5 font-display text-[2rem] leading-tight ${dark ? "text-ivory-50" : ""}`}>Fast geschafft.</p>
        <p className={`mt-2 max-w-md leading-relaxed ${dark ? "text-ivory/75" : "text-ink-soft"}`}>
          Wir haben dir eine E-Mail geschickt. Bitte bestätige deine Anmeldung über den Link darin – erst dann bist du eingetragen.
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
          E-Mail-Adresse
        </label>
        <input
          ref={emailRef}
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Deine E-Mail-Adresse"
          maxLength={254}
          disabled={sending}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={`h-16 min-w-0 flex-1 bg-transparent text-[1.15rem] outline-none sm:text-[1.3rem] ${dark ? "text-ivory-50 placeholder:text-ivory/40" : "placeholder:text-ink-muted/70"}`}
        />
        <button type="submit" disabled={sending} className={`group mb-4 inline-flex shrink-0 items-center gap-3 text-[0.92rem] font-medium ${dark ? "text-ivory-50" : "text-ink"} disabled:opacity-50`}>
          {sending ? "Wird gesendet …" : submitLabel}
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
          Ich möchte per E-Mail über den Launch von ELORA DAY {list === "newsletter" ? "und neue Produkte " : ""}informiert werden. Die Einwilligung kann ich jederzeit widerrufen. Details
          in der{" "}
          <Link href="/datenschutz/" className="underline underline-offset-2">
            Datenschutzerklärung
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
      {!active && status.kind === "idle" && <p className={`spec mt-6 ${muted}`}>Registrierung noch nicht aktiviert · wird eingerichtet</p>}
    </form>
  );
}
