"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Arrow, buttonClasses } from "./Button";
import { IconAlert, IconCheck } from "./Icons";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; doubleOptIn: boolean }
  | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function SignupForm() {
  const id = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const consent = data.get("consent") === "on";
    const website = String(data.get("website") ?? "");

    let valid = true;
    if (!email) {
      setEmailError("Bitte gib deine E-Mail-Adresse ein.");
      valid = false;
    } else if (!EMAIL_RE.test(email) || email.length > 254) {
      setEmailError("Bitte gib eine gültige E-Mail-Adresse ein.");
      valid = false;
    } else setEmailError(null);

    if (!consent) {
      setConsentError("Bitte bestätige deine Einwilligung.");
      valid = false;
    } else setConsentError(null);

    if (!valid) {
      if (!email || !EMAIL_RE.test(email)) emailRef.current?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, website }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        doubleOptIn?: boolean;
        message?: string;
      };
      if (res.ok && json.ok) {
        setStatus({ kind: "success", doubleOptIn: Boolean(json.doubleOptIn) });
        form.reset();
      } else {
        setStatus({
          kind: "error",
          message:
            json.message ??
            "Deine Anmeldung konnte leider nicht übermittelt werden. Bitte versuche es später erneut.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Keine Verbindung möglich. Bitte prüfe deine Internetverbindung und versuche es erneut.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" aria-live="polite" className="py-4 text-center sm:py-8">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream-50">
          <IconCheck size={26} strokeWidth={1.6} />
        </span>
        <h3 className="mt-6 font-display text-[1.6rem] font-light text-forest-900">
          {status.doubleOptIn ? "Fast geschafft." : "Danke – du bist vorgemerkt."}
        </h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-soft">
          {status.doubleOptIn
            ? "Wir haben dir eine E-Mail geschickt. Bitte bestätige deine Anmeldung über den Link darin."
            : "Wir melden uns, sobald es Neuigkeiten zu ELORA DAY gibt."}
        </p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const emailId = `${id}-email`;
  const consentId = `${id}-consent`;

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${id}-status`}>
      <h3 className="font-display text-[1.35rem] font-normal text-forest-900">Für den Launch vormerken</h3>
      <p className="mt-1.5 text-[0.9rem] text-ink-muted">Kostenlos und unverbindlich.</p>

      <div className="mt-7">
        <label htmlFor={emailId} className="mb-2 block text-[0.85rem] font-medium text-ink">
          E-Mail-Adresse
        </label>
        <div className="flex flex-col gap-3">
          <input
            ref={emailRef}
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="name@beispiel.de"
            required
            maxLength={254}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? `${emailId}-error` : undefined}
            disabled={submitting}
            className={`h-14 w-full min-w-0 rounded-full border bg-white/80 px-6 text-[0.98rem] text-ink transition-[border-color,box-shadow] outline-none placeholder:text-ink-muted/70 focus:border-forest focus:shadow-[0_0_0_4px_rgb(135_146_122/0.18)] ${
              emailError ? "border-[#b4552f]" : "border-line"
            }`}
          />
          <button type="submit" disabled={submitting} className={buttonClasses("primary", "lg", "w-full")}>
            {submitting ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-cream-50/30 border-t-cream-50"
                />
                <span>Wird gesendet …</span>
              </>
            ) : (
              <>
                <span>Jetzt vormerken</span>
                <Arrow />
              </>
            )}
          </button>
        </div>
        {emailError && (
          <p id={`${emailId}-error`} className="mt-2 pl-6 text-[0.83rem] text-[#a24a27]">
            {emailError}
          </p>
        )}
      </div>

      {/* Honeypot gegen Spam-Bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6">
        <div className="flex items-start gap-3">
          <input
            id={consentId}
            name="consent"
            type="checkbox"
            required
            disabled={submitting}
            aria-invalid={Boolean(consentError)}
            aria-describedby={consentError ? `${consentId}-error` : undefined}
            className="elora-check mt-0.5 shrink-0"
          />
          <label htmlFor={consentId} className="cursor-pointer text-[0.82rem] leading-relaxed text-ink-soft">
            Ich möchte per E-Mail Neuigkeiten zu ELORA DAY und dem Launch erhalten. Die Einwilligung
            kann ich jederzeit widerrufen. Mehr in der{" "}
            <Link href="/datenschutz" className="text-forest underline underline-offset-2 hover:text-forest-900">
              Datenschutzerklärung
            </Link>
            .
          </label>
        </div>
        {consentError && (
          <p id={`${consentId}-error`} className="mt-2 pl-8 text-[0.83rem] text-[#a24a27]">
            {consentError}
          </p>
        )}
      </div>

      <div id={`${id}-status`} aria-live="polite">
        {status.kind === "error" && (
          <p
            role="alert"
            className="mt-6 flex gap-3 rounded-2xl border border-[#d9a58b]/60 bg-[#f6e6dc]/60 p-4 text-[0.88rem] leading-relaxed text-[#7c3a1f]"
          >
            <IconAlert size={20} className="mt-px shrink-0" />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
