"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Arrow, buttonClasses } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { getSupabase } from "@/lib/supabase";
import { siteUrl } from "@/lib/services";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Übersetzt Supabase-Fehler in verständliche Hinweise */
export function authMessage(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "E-Mail-Adresse oder Passwort stimmen nicht.";
  if (m.includes("email not confirmed")) return "Bitte bestätige zuerst deine E-Mail-Adresse über den Link in unserer E-Mail.";
  if (m.includes("already registered")) return "Für diese E-Mail-Adresse gibt es bereits ein Konto. Melde dich an oder setze dein Passwort zurück.";
  if (m.includes("password")) return "Das Passwort erfüllt die Anforderungen nicht (mindestens 10 Zeichen).";
  if (m.includes("rate limit")) return "Zu viele Versuche. Bitte warte einen Moment.";
  return "Das hat nicht geklappt. Bitte versuche es erneut.";
}

export function AuthPanel({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    const errs: Record<string, string> = {};
    if (!EMAIL_RE.test(email)) errs.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    if (mode === "register") {
      if (password.length < 10) errs.password = "Mindestens 10 Zeichen.";
      if (!String(f.get("firstName") ?? "").trim()) errs.firstName = "Bitte gib deinen Vornamen ein.";
      if (f.get("privacy") !== "on") errs.privacy = "Bitte bestätige den Hinweis zum Datenschutz.";
    } else if (!password) errs.password = "Bitte gib dein Passwort ein.";
    setErrors(errs);
    setMessage(null);
    if (Object.keys(errs).length) return;

    setBusy(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMessage({ tone: "error", text: authMessage(error.message) });
      onDone();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: siteUrl("/konto/"),
          data: { first_name: String(f.get("firstName")).trim(), last_name: String(f.get("lastName") ?? "").trim() },
        },
      });
      setBusy(false);
      if (error) return setMessage({ tone: "error", text: authMessage(error.message) });
      if (data.session) return onDone();
      setMessage({ tone: "success", text: "Fast geschafft: Wir haben dir eine E-Mail geschickt. Bitte bestätige deine Adresse, danach kannst du dich anmelden." });
    }
  }

  return (
    <div className="max-w-md">
      <div role="tablist" aria-label="Anmelden oder registrieren" className="flex gap-8 border-b border-line">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setErrors({});
              setMessage(null);
            }}
            className={`-mb-px border-b pb-3 text-[0.95rem] transition-colors ${mode === m ? "border-ink text-ink" : "border-transparent text-ink-muted hover:text-ink"}`}
          >
            {m === "login" ? "Anmelden" : "Konto erstellen"}
          </button>
        ))}
      </div>
      <form noValidate onSubmit={submit} className="mt-8 space-y-6" key={mode}>
        {mode === "register" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="firstName" name="firstName" label="Vorname" required autoComplete="given-name" error={errors.firstName} />
            <Field id="lastName" name="lastName" label="Nachname" autoComplete="family-name" />
          </div>
        )}
        <Field id="email" name="email" type="email" label="E-Mail-Adresse" required autoComplete="email" error={errors.email} />
        <Field
          id="password"
          name="password"
          type="password"
          label="Passwort"
          required
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          error={errors.password}
          hint={mode === "register" ? "Mindestens 10 Zeichen. Passwörter werden ausschließlich verschlüsselt gespeichert." : undefined}
        />
        {mode === "register" && (
          <div>
            <label className="flex gap-3 text-[0.82rem] leading-relaxed text-ink-soft">
              <input type="checkbox" name="privacy" className="check" aria-invalid={errors.privacy ? true : undefined} />
              <span>
                Ich habe die <Link href="/datenschutz/" className="underline underline-offset-2">Datenschutzerklärung</Link> zur Kenntnis genommen.
              </span>
            </label>
            {errors.privacy && <p className="mt-1.5 pl-7 text-[0.8rem] text-error">{errors.privacy}</p>}
          </div>
        )}
        {message && <Notice tone={message.tone}>{message.text}</Notice>}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button type="submit" disabled={busy} className={buttonClasses("solid", "lg")}>
            <span>{busy ? "Bitte warten …" : mode === "login" ? "Anmelden" : "Konto erstellen"}</span>
            <Arrow />
          </button>
          {mode === "login" && (
            <Link href="/konto/passwort/" className="text-[0.88rem] link-line">
              Passwort vergessen?
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
