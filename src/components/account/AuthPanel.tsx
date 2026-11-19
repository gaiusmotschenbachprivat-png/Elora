"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Arrow, buttonClasses } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { getSupabase } from "@/lib/supabase";
import { siteUrl } from "@/lib/services";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Turns Supabase errors into clear messages */
export function authMessage(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "Email address or password is incorrect.";
  if (m.includes("email not confirmed")) return "Please confirm your email address first, using the link in our email.";
  if (m.includes("already registered")) return "An account already exists for this email address. Sign in or reset your password.";
  if (m.includes("password")) return "The password does not meet the requirements (at least 10 characters).";
  if (m.includes("rate limit")) return "Too many attempts. Please wait a moment.";
  return "That did not work. Please try again.";
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
    if (!EMAIL_RE.test(email)) errs.email = "Please enter a valid email address.";
    if (mode === "register") {
      if (password.length < 10) errs.password = "At least 10 characters.";
      if (!String(f.get("firstName") ?? "").trim()) errs.firstName = "Please enter your first name.";
      if (f.get("privacy") !== "on") errs.privacy = "Please confirm the privacy notice.";
    } else if (!password) errs.password = "Please enter your password.";
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
      setMessage({ tone: "success", text: "Almost there: we have sent you an email. Please confirm your address, then you can sign in." });
    }
  }

  return (
    <div className="max-w-md">
      <div role="tablist" aria-label="Sign in or create account" className="flex gap-8 border-b border-line">
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
            {m === "login" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>
      <form noValidate onSubmit={submit} className="mt-8 space-y-6" key={mode}>
        {mode === "register" && (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="firstName" name="firstName" label="First name" required autoComplete="given-name" error={errors.firstName} />
            <Field id="lastName" name="lastName" label="Last name" autoComplete="family-name" />
          </div>
        )}
        <Field id="email" name="email" type="email" label="Email address" required autoComplete="email" error={errors.email} />
        <Field
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          error={errors.password}
          hint={mode === "register" ? "At least 10 characters. Passwords are only ever stored encrypted." : undefined}
        />
        {mode === "register" && (
          <div>
            <label className="flex gap-3 text-[0.82rem] leading-relaxed text-ink-soft">
              <input type="checkbox" name="privacy" className="check" aria-invalid={errors.privacy ? true : undefined} />
              <span>
                I have read the <Link href="/datenschutz/" className="underline underline-offset-2">privacy policy (Datenschutz)</Link>.
              </span>
            </label>
            {errors.privacy && <p className="mt-1.5 pl-7 text-[0.8rem] text-error">{errors.privacy}</p>}
          </div>
        )}
        {message && <Notice tone={message.tone}>{message.text}</Notice>}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button type="submit" disabled={busy} className={buttonClasses("solid", "lg")}>
            <span>{busy ? "Please wait …" : mode === "login" ? "Sign in" : "Create account"}</span>
            <Arrow />
          </button>
          {mode === "login" && (
            <Link href="/konto/passwort/" className="text-[0.88rem] link-line">
              Forgot your password?
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
