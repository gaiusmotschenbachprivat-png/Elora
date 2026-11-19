"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { shopConfig } from "@/config/shop";
import { useShop } from "@/components/providers/ShopProvider";
import { Arrow, buttonClasses } from "@/components/ui/Button";
import { Field, SelectField } from "@/components/ui/Field";
import { Notice, Tbd } from "@/components/ui/Notice";
import { Picture } from "@/components/ui/Picture";
import { formatPrice, getPurchaseState } from "@/lib/commerce";
import { callFunction, services } from "@/lib/services";
import { getSupabase } from "@/lib/supabase";

type Address = { firstName: string; lastName: string; street: string; addition: string; zip: string; city: string; country: string };
const emptyAddress: Address = { firstName: "", lastName: "", street: "", addition: "", zip: "", city: "", country: "DE" };

type Quote = { subtotalCents: number; shippingCents: number; discountCents: number; totalCents: number; couponCode?: string | null };

const STEPS = ["Address", "Shipping", "Review & pay"] as const;

function validateAddress(a: Address, prefix: string) {
  const e: Record<string, string> = {};
  if (!a.firstName.trim()) e[`${prefix}firstName`] = "Please enter your first name.";
  if (!a.lastName.trim()) e[`${prefix}lastName`] = "Please enter your last name.";
  if (!a.street.trim()) e[`${prefix}street`] = "Please enter street and house number.";
  else if (!/\d/.test(a.street)) e[`${prefix}street`] = "Please add the house number.";
  const zipOk = a.country === "AT" ? /^\d{4}$/.test(a.zip.trim()) : /^\d{5}$/.test(a.zip.trim());
  if (!zipOk) e[`${prefix}zip`] = a.country === "AT" ? "Austrian postcodes have 4 digits." : "German postcodes have 5 digits.";
  if (!a.city.trim()) e[`${prefix}city`] = "Please enter your town or city.";
  return e;
}

export function Checkout() {
  const { lines, totals, modes, session } = useShop();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [ship, setShip] = useState<Address>(emptyAddress);
  const [billingSame, setBillingSame] = useState(true);
  const [bill, setBill] = useState<Address>(emptyAddress);
  const [method, setMethod] = useState<string>(shopConfig.shipping.methods[0].id);
  const [coupon, setCoupon] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* Angemeldete Kund*innen: E-Mail und Standardadresse übernehmen */
  useEffect(() => {
    if (!session) return;
    queueMicrotask(() => setEmail((e) => e || session.user.email || ""));
    const supabase = getSupabase();
    supabase
      ?.from("addresses")
      .select("*")
      .eq("is_default", true)
      .limit(1)
      .then(({ data }) => {
        const a = data?.[0];
        if (a)
          setShip((s) =>
            s.street ? s : { firstName: a.first_name, lastName: a.last_name, street: a.street, addition: a.addition ?? "", zip: a.zip, city: a.city, country: a.country },
          );
      });
  }, [session]);

  const purchasable = lines.length > 0 && lines.every((l) => getPurchaseState(l.product, l.variant, modes[l.product.id]).canPurchase);
  const preorder = lines.some((l) => getPurchaseState(l.product, l.variant, modes[l.product.id]).mode === "preorder");

  if (!lines.length) {
    return (
      <Shell>
        <p className="text-lede text-ink-soft">Your cart is empty.</p>
        <Link href="/shop/" className={buttonClasses("solid", "md", "mt-8")}>
          <span>Go to shop</span>
          <Arrow />
        </Link>
      </Shell>
    );
  }

  if (!purchasable) {
    return (
      <Shell>
        <Notice tone="inactive" title="Ordering is not possible yet">
          ELORA DAY is in development. Checkout and payment will only be activated once price, delivery terms, payment provider and all legal information are
          final. Until then you can{" "}
          <Link href="/produkte/elora-day/#launch-list" className="underline underline-offset-2">
            join the launch list
          </Link>{" "}
          with no obligation
          .
        </Notice>
      </Shell>
    );
  }

  const items = lines.map((l) => ({ variantId: l.variantId, qty: l.qty }));
  const methodInfo = shopConfig.shipping.methods.find((m) => m.id === method)!;

  const nextFromAddress = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = { ...validateAddress(ship, "s_") };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) errs.email = "Please enter a valid email address.";
    if (!billingSame) Object.assign(errs, validateAddress(bill, "b_"));
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const applyCoupon = async () => {
    setCouponMsg(null);
    if (!coupon.trim()) return;
    try {
      const { ok, data } = await callFunction<{ quote?: Quote; message?: string }>(
        "checkout",
        { action: "quote", items, shippingMethod: method, coupon: coupon.trim(), country: ship.country },
        session?.access_token,
      );
      if (ok && data.quote) {
        setQuote(data.quote);
        setCouponMsg({ ok: !!data.quote.couponCode, text: data.quote.couponCode ? `Code “${data.quote.couponCode}” applied.` : "This code is not valid." });
      } else setCouponMsg({ ok: false, text: data.message ?? "The code could not be checked." });
    } catch {
      setCouponMsg({ ok: false, text: "Codes cannot be checked at the moment." });
    }
  };

  const pay = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!terms) {
      setErrors({ terms: "Please confirm the terms (AGB) and the cancellation policy (Widerrufsbelehrung)." });
      return;
    }
    setErrors({});
    if (!services.supabase) {
      setSubmitError("Payment processing is not activated yet. No order has been placed.");
      return;
    }
    setSubmitting(true);
    try {
      const { ok, data } = await callFunction<{ url?: string; message?: string }>(
        "checkout",
        {
          action: "create",
          items,
          email: email.trim(),
          shippingAddress: ship,
          billingAddress: billingSame ? ship : bill,
          shippingMethod: method,
          coupon: quote?.couponCode ?? null,
          acceptTerms: true,
        },
        session?.access_token,
      );
      if (ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setSubmitError(data.message ?? "The order could not be created. You have not been charged.");
    } catch {
      setSubmitError("No connection to the payment provider. You have not been charged.");
    }
    setSubmitting(false);
  };

  const addressFields = (a: Address, set: (a: Address) => void, prefix: string) => (
    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field id={`${prefix}firstName`} label="First name" required autoComplete={`${prefix === "s_" ? "shipping" : "billing"} given-name`} value={a.firstName} onChange={(e) => set({ ...a, firstName: e.target.value })} error={errors[`${prefix}firstName`]} />
      <Field id={`${prefix}lastName`} label="Last name" required autoComplete={`${prefix === "s_" ? "shipping" : "billing"} family-name`} value={a.lastName} onChange={(e) => set({ ...a, lastName: e.target.value })} error={errors[`${prefix}lastName`]} />
      <Field id={`${prefix}street`} label="Street and house number" required className="sm:col-span-2" autoComplete={`${prefix === "s_" ? "shipping" : "billing"} address-line1`} value={a.street} onChange={(e) => set({ ...a, street: e.target.value })} error={errors[`${prefix}street`]} />
      <Field id={`${prefix}addition`} label="Address line 2" className="sm:col-span-2" autoComplete={`${prefix === "s_" ? "shipping" : "billing"} address-line2`} value={a.addition} onChange={(e) => set({ ...a, addition: e.target.value })} />
      <Field id={`${prefix}zip`} label="Postcode" required inputMode="numeric" autoComplete={`${prefix === "s_" ? "shipping" : "billing"} postal-code`} value={a.zip} onChange={(e) => set({ ...a, zip: e.target.value })} error={errors[`${prefix}zip`]} />
      <Field id={`${prefix}city`} label="Town / City" required autoComplete={`${prefix === "s_" ? "shipping" : "billing"} address-level2`} value={a.city} onChange={(e) => set({ ...a, city: e.target.value })} error={errors[`${prefix}city`]} />
      <SelectField
        id={`${prefix}country`}
        label="Country"
        className="sm:col-span-2"
        value={a.country}
        onChange={(e) => set({ ...a, country: e.target.value })}
        options={shopConfig.shipping.countries.map((c) => ({ value: c.code, label: c.label }))}
      />
    </div>
  );

  const shown = quote ?? { subtotalCents: totals.subtotalCents ?? 0, shippingCents: totals.shippingCents ?? 0, discountCents: 0, totalCents: totals.totalCents ?? 0 };

  return (
    <div className="frame pt-32 pb-28 lg:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h1 className="font-display text-title">{preorder ? "Pre-order" : "Checkout"}</h1>
        <ol className="flex gap-6" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined} className={`spec flex items-center gap-2 ${i <= step ? "text-ink" : "text-ink-muted/60"}`}>
              <span className={`inline-flex h-6 w-6 items-center justify-center border ${i < step ? "border-forest bg-forest text-ivory-50" : i === step ? "border-ink" : "border-line"}`}>{i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-3 h-px bg-line">
        <div className="h-px bg-forest transition-[width] duration-700 ease-[var(--ease-soft)]" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>

      <div className="mt-12 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {step === 0 && (
            <form noValidate onSubmit={nextFromAddress} className="space-y-12">
              <fieldset>
                <legend className="font-display text-[1.6rem]">Contact</legend>
                {!session && (
                  <p className="mt-2 text-[0.9rem] text-ink-muted">
                    Already a customer?{" "}
                    <Link href="/konto/?weiter=/kasse/" className="link-line text-ink">
                      Sign in
                    </Link>
                  </p>
                )}
                <Field id="email" type="email" label="Email address" required autoComplete="email" className="mt-4" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} hint="For your order confirmation and shipping updates." />
              </fieldset>
              <fieldset>
                <legend className="font-display text-[1.6rem]">Shipping address</legend>
                <div className="mt-4">{addressFields(ship, setShip, "s_")}</div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">Billing address</legend>
                <label className="flex gap-3 text-[0.92rem]">
                  <input type="checkbox" className="check" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} />
                  Billing address is the same as shipping address
                </label>
                {!billingSame && (
                  <div className="mt-8">
                    <p className="font-display text-[1.6rem]">Billing address</p>
                    <div className="mt-4">{addressFields(bill, setBill, "b_")}</div>
                  </div>
                )}
              </fieldset>
              <button type="submit" className={buttonClasses("solid", "lg", "w-full sm:w-auto")}>
                <span>Continue to shipping</span>
                <Arrow />
              </button>
            </form>
          )}

          {step === 1 && (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="space-y-10"
            >
              <fieldset>
                <legend className="font-display text-[1.6rem]">Shipping method</legend>
                <div className="mt-6 border-t border-line">
                  {shopConfig.shipping.methods.map((m) => (
                    <label key={m.id} className="flex cursor-pointer items-center justify-between gap-4 border-b border-line py-5">
                      <span className="flex items-center gap-4">
                        <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} className="h-4 w-4 accent-forest" />
                        <span>
                          <span className="block">{m.label}</span>
                          <span className="block text-[0.82rem] text-ink-muted">{m.deliveryNote}</span>
                        </span>
                      </span>
                      <span className="font-mono text-[0.9rem]">{m.priceCents == null ? <Tbd>to follow</Tbd> : m.priceCents === 0 ? "free" : formatPrice(m.priceCents)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="flex flex-wrap items-center gap-6">
                <button type="submit" className={buttonClasses("solid", "lg")}>
                  <span>Continue to review</span>
                  <Arrow />
                </button>
                <button type="button" onClick={() => setStep(0)} className="text-[0.9rem] link-line">
                  Back
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form noValidate onSubmit={pay} className="space-y-10">
              <section className="grid gap-8 border-t border-ink/80 pt-6 sm:grid-cols-2">
                <div>
                  <h2 className="spec text-ink-muted">Ship to</h2>
                  <address className="mt-3 leading-relaxed not-italic">
                    {ship.firstName} {ship.lastName}
                    <br />
                    {ship.street}
                    {ship.addition && (
                      <>
                        <br />
                        {ship.addition}
                      </>
                    )}
                    <br />
                    {ship.zip} {ship.city}, {ship.country}
                  </address>
                  <button type="button" onClick={() => setStep(0)} className="mt-2 text-[0.85rem] link-line">
                    Edit
                  </button>
                </div>
                <div>
                  <h2 className="spec text-ink-muted">Shipping & contact</h2>
                  <p className="mt-3 leading-relaxed">
                    {methodInfo.label}
                    <br />
                    {email}
                  </p>
                  <button type="button" onClick={() => setStep(1)} className="mt-2 text-[0.85rem] link-line">
                    Edit
                  </button>
                </div>
              </section>

              <section>
                <h2 className="font-display text-[1.6rem]">Discount code</h2>
                <div className="mt-4 flex items-end gap-4">
                  <Field id="coupon" label="Discount code" className="flex-1" value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} autoComplete="off" />
                  <button type="button" onClick={applyCoupon} className={buttonClasses("outline", "md")}>
                    Apply
                  </button>
                </div>
                {couponMsg && <p className={`mt-2 text-[0.85rem] ${couponMsg.ok ? "text-forest" : "text-error"}`}>{couponMsg.text}</p>}
              </section>

              <section>
                <h2 className="font-display text-[1.6rem]">Payment</h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                  Payment is processed securely by our payment provider Stripe. You choose your payment method in the next step.
                </p>
              </section>

              <div>
                <label className="flex gap-3 text-[0.88rem] leading-relaxed text-ink-soft">
                  <input type="checkbox" className="check" checked={terms} onChange={(e) => { setTerms(e.target.checked); if (e.target.checked) setErrors({}); }} aria-invalid={errors.terms ? true : undefined} />
                  <span>
                    I have read the{" "}
                    <Link href="/agb/" className="underline underline-offset-2">terms (AGB)</Link> and the{" "}
                    <Link href="/widerruf/" className="underline underline-offset-2">cancellation policy (Widerrufsbelehrung)</Link>. Information on data protection can be found in the{" "}
                    <Link href="/datenschutz/" className="underline underline-offset-2">privacy policy (Datenschutz)</Link>.
                  </span>
                </label>
                {errors.terms && <p className="mt-2 pl-7 text-[0.82rem] text-error">{errors.terms}</p>}
              </div>

              {submitError && <Notice tone="error">{submitError}</Notice>}

              <div className="flex flex-wrap items-center gap-6">
                <button type="submit" disabled={submitting} className={buttonClasses("solid", "lg", "w-full sm:w-auto")}>
                  <span>{submitting ? "Redirecting …" : preorder ? "Pre-order with obligation to pay" : "Order with obligation to pay"}</span>
                  <Arrow />
                </button>
                <button type="button" onClick={() => setStep(1)} className="text-[0.9rem] link-line">
                  Back
                </button>
              </div>
            </form>
          )}
        </div>

        <aside aria-label="Order summary" className="lg:col-span-4 lg:col-start-9">
          <div className="border-t border-ink/80 pt-6 lg:sticky lg:top-28">
            <h2 className="spec text-ink-muted">Order summary</h2>
            <ul className="mt-4 divide-y divide-line">
              {lines.map((l) => (
                <li key={l.variantId} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-4">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    <Picture name={l.product.images[0].src} alt="" width={1600} height={2000} sizes="60px" />
                  </div>
                  <div>
                    <p className="font-display text-[1.1rem] leading-tight">{l.product.name}</p>
                    <p className="text-[0.8rem] text-ink-muted">
                      {l.qty} × {l.variant.servings}
                    </p>
                  </div>
                  <p className="font-mono text-[0.85rem]">{l.lineCents != null ? formatPrice(l.lineCents) : "—"}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[0.9rem]">
              <div className="flex justify-between text-ink-soft">
                <dt>Subtotal</dt>
                <dd className="font-mono">{formatPrice(shown.subtotalCents)}</dd>
              </div>
              {shown.discountCents > 0 && (
                <div className="flex justify-between text-forest">
                  <dt>Discount</dt>
                  <dd className="font-mono">−{formatPrice(shown.discountCents)}</dd>
                </div>
              )}
              <div className="flex justify-between text-ink-soft">
                <dt>Shipping</dt>
                <dd className="font-mono">{shown.shippingCents === 0 ? "free" : formatPrice(shown.shippingCents)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-[1.05rem]">
                <dt>Total</dt>
                <dd className="font-mono">{formatPrice(shown.totalCents)}</dd>
              </div>
              <p className="text-[0.75rem] text-ink-muted">Incl. VAT · final amount is verified on our server</p>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="frame pt-36 pb-28 lg:pt-44">
      <h1 className="font-display text-title">Checkout</h1>
      <div className="mt-10 max-w-xl">{children}</div>
    </div>
  );
}
