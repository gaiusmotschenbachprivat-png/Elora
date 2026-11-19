"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useShop } from "@/components/providers/ShopProvider";
import { Arrow, buttonClasses } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { services, siteUrl } from "@/lib/services";
import { getSupabase } from "@/lib/supabase";

/**
 * 1. Ohne Sitzung: Link zum Zurücksetzen anfordern.
 * 2. Über den Link aus der E-Mail (Recovery-Sitzung): neues Passwort setzen.
 */
export function PasswordReset() {
  const { session } = useShop();
  const [recovery, setRecovery] = useState(false);
  const [msg, setMsg] = useState<{ tone: "success" | "error" | "inactive"; text: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange((event) => event === "PASSWORD_RECOVERY" && setRecovery(true));
    return () => data.subscription.unsubscribe();
  }, []);

  async function request(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return setMsg({ tone: "inactive", text: "The customer account is not activated yet." });
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setError("Please enter a valid email address.");
    setError(null);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: siteUrl("/konto/passwort/") });
    // Aus Datenschutzgründen immer dieselbe Rückmeldung (keine Auskunft, ob ein Konto existiert)
    setMsg(
      err?.message?.toLowerCase().includes("rate")
        ? { tone: "error", text: "Too many requests. Please try again in a few minutes." }
        : { tone: "success", text: "If an account exists for this address, we have sent you a reset link." },
    );
  }

  async function update(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pw = String(new FormData(e.currentTarget).get("password") ?? "");
    if (pw.length < 10) return setError("At least 10 characters.");
    setError(null);
    const { error: err } = await getSupabase()!.auth.updateUser({ password: pw });
    setMsg(err ? { tone: "error", text: "The password could not be saved. Please request a new link." } : { tone: "success", text: "Your new password has been saved." });
  }

  const setNew = recovery || (session && typeof window !== "undefined" && window.location.search.includes("code="));

  return (
    <div className="frame grid gap-12 pt-36 pb-28 lg:grid-cols-12 lg:pt-44">
      <div className="lg:col-span-5">
        <p className="spec text-ink-muted">Account</p>
        <h1 className="mt-6 font-display text-title">{setNew ? "New password." : "Forgot your password?"}</h1>
      </div>
      <div className="max-w-md lg:col-span-5 lg:col-start-7 lg:pt-12">
        {!services.supabase ? (
          <Notice tone="inactive">The customer account is not activated yet.</Notice>
        ) : setNew ? (
          <form noValidate onSubmit={update} className="space-y-6">
            <Field id="password" name="password" type="password" label="New password" required autoComplete="new-password" error={error} hint="At least 10 characters." />
            {msg && <Notice tone={msg.tone === "inactive" ? "inactive" : msg.tone}>{msg.text}</Notice>}
            <button type="submit" className={buttonClasses("solid", "lg")}>
              <span>Save password</span>
              <Arrow />
            </button>
            {msg?.tone === "success" && (
              <Link href="/konto/" className="block link-line w-fit">
                Go to account
              </Link>
            )}
          </form>
        ) : (
          <form noValidate onSubmit={request} className="space-y-6">
            <p className="text-ink-soft">Enter your email address. We will send you a link to set a new password.</p>
            <Field id="email" name="email" type="email" label="Email address" required autoComplete="email" error={error} />
            {msg && <Notice tone={msg.tone === "inactive" ? "inactive" : msg.tone}>{msg.text}</Notice>}
            <button type="submit" className={buttonClasses("solid", "lg")}>
              <span>Request link</span>
              <Arrow />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
