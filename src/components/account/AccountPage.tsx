"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useShop } from "@/components/providers/ShopProvider";
import { Arrow, buttonClasses } from "@/components/ui/Button";
import { Field, SelectField } from "@/components/ui/Field";
import { Notice } from "@/components/ui/Notice";
import { shopConfig } from "@/config/shop";
import { formatPrice } from "@/lib/commerce";
import { services } from "@/lib/services";
import { getSupabase } from "@/lib/supabase";
import { AuthPanel } from "./AuthPanel";

const TABS = [
  { id: "overview", label: "Übersicht" },
  { id: "orders", label: "Bestellungen" },
  { id: "addresses", label: "Adressen" },
  { id: "profile", label: "Persönliche Daten" },
] as const;
type Tab = (typeof TABS)[number]["id"];

export function AccountPage() {
  const { session, authReady } = useShop();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("weiter");

  if (!services.supabase) {
    return (
      <Wrap title="Kundenkonto">
        <Notice tone="inactive" title="Kundenkonto noch nicht aktiviert">
          Registrierung und Anmeldung werden freigeschaltet, sobald unser Kundensystem verbunden ist. Es werden derzeit keine Kontodaten gespeichert.
        </Notice>
      </Wrap>
    );
  }
  if (!authReady) return <Wrap title="Kundenkonto"><p className="text-ink-muted">Wird geladen …</p></Wrap>;
  if (!session)
    return (
      <Wrap title="Willkommen." lede="Melde dich an, um Bestellungen, Adressen und deine Daten zu verwalten.">
        <AuthPanel onDone={() => next && next.startsWith("/") && router.push(next)} />
      </Wrap>
    );
  return <Dashboard />;
}

function Wrap({ title, lede, children }: { title: string; lede?: string; children: React.ReactNode }) {
  return (
    <div className="frame grid gap-12 pt-36 pb-28 lg:grid-cols-12 lg:pt-44">
      <div className="lg:col-span-5">
        <p className="spec text-ink-muted">Kundenkonto</p>
        <h1 className="mt-6 font-display text-display">{title}</h1>
        {lede && <p className="mt-6 max-w-sm text-lede text-ink-soft">{lede}</p>}
      </div>
      <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">{children}</div>
    </div>
  );
}

function Dashboard() {
  const { session } = useShop();
  const [tab, setTab] = useState<Tab>("overview");
  const name = (session?.user.user_metadata?.first_name as string | undefined) ?? "";

  return (
    <div className="frame pt-36 pb-28 lg:pt-44">
      <p className="spec text-ink-muted">Kundenkonto</p>
      <h1 className="mt-6 font-display text-title">
        Hallo{name ? `, ${name}` : ""}<em className="display-italic">.</em>
      </h1>
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <nav aria-label="Kontobereiche" className="lg:col-span-3">
          <ul className="no-scrollbar flex gap-6 overflow-x-auto border-b border-line lg:flex-col lg:gap-0 lg:border-b-0 lg:border-t">
            {TABS.map((t) => (
              <li key={t.id} className="shrink-0 lg:border-b lg:border-line">
                <button
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? "page" : undefined}
                  className={`-mb-px border-b py-3 text-[0.95rem] whitespace-nowrap transition-colors lg:mb-0 lg:flex lg:w-full lg:justify-between lg:border-b-0 lg:py-4 ${
                    tab === t.id ? "border-ink text-ink" : "border-transparent text-ink-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                  <span aria-hidden="true" className={`hidden lg:inline ${tab === t.id ? "" : "opacity-0"}`}>
                    →
                  </span>
                </button>
              </li>
            ))}
            <li className="shrink-0 lg:pt-6">
              <button type="button" onClick={() => getSupabase()?.auth.signOut()} className="py-3 text-[0.95rem] text-ink-muted hover:text-ink">
                Abmelden
              </button>
            </li>
          </ul>
        </nav>
        <div className="lg:col-span-8 lg:col-start-5">
          {tab === "overview" && <Overview go={setTab} />}
          {tab === "orders" && <Orders />}
          {tab === "addresses" && <Addresses />}
          {tab === "profile" && <Profile />}
        </div>
      </div>
    </div>
  );
}

function Overview({ go }: { go: (t: Tab) => void }) {
  const { session } = useShop();
  const cards: { t: Tab; title: string; text: string }[] = [
    { t: "orders", title: "Bestellungen", text: "Status und Details deiner Bestellungen und Vorbestellungen." },
    { t: "addresses", title: "Adressen", text: "Liefer- und Rechnungsadressen verwalten." },
    { t: "profile", title: "Persönliche Daten", text: "Name, E-Mail-Adresse und Passwort." },
  ];
  return (
    <div>
      <p className="text-ink-soft">Angemeldet als {session?.user.email}</p>
      <ul className="mt-8 border-t border-ink/80">
        {cards.map((c) => (
          <li key={c.t} className="border-b border-line">
            <button type="button" onClick={() => go(c.t)} className="group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-7 text-left">
              <span>
                <span className="block font-display text-[1.6rem] leading-tight">{c.title}</span>
                <span className="mt-1 block text-[0.92rem] text-ink-muted">{c.text}</span>
              </span>
              <Arrow />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

type OrderRow = { id: string; number: string; status: string; kind: string; total_cents: number; created_at: string; order_items: { name: string; qty: number }[] };
const orderStatus: Record<string, string> = {
  pending_payment: "Zahlung ausstehend",
  paid: "Bezahlt",
  fulfilled: "Versendet",
  cancelled: "Abgebrochen",
  refunded: "Erstattet",
};

function Orders() {
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    getSupabase()
      ?.from("orders")
      .select("id, number, status, kind, total_cents, created_at, order_items(name, qty)")
      .order("created_at", { ascending: false })
      .then(({ data, error: e }) => (e ? setError(true) : setOrders((data ?? []) as OrderRow[])));
  }, []);
  if (error) return <Notice tone="error">Bestellungen konnten nicht geladen werden.</Notice>;
  if (!orders) return <p className="text-ink-muted">Wird geladen …</p>;
  if (!orders.length) return <p className="text-lede text-ink-soft">Du hast noch keine Bestellungen.</p>;
  return (
    <ul className="border-t border-ink/80">
      {orders.map((o) => (
        <li key={o.id} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="spec text-ink-muted">
              {o.number} · {new Date(o.created_at).toLocaleDateString("de-DE")} · {o.kind === "preorder" ? "Vorbestellung" : "Bestellung"}
            </p>
            <p className="mt-2">{o.order_items.map((i) => `${i.qty} × ${i.name}`).join(", ")}</p>
          </div>
          <div className="sm:text-right">
            <p className="font-mono">{formatPrice(o.total_cents)}</p>
            <p className="spec mt-1 text-forest">{orderStatus[o.status] ?? o.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

type AddressRow = { id?: string; first_name: string; last_name: string; street: string; addition: string | null; zip: string; city: string; country: string; is_default: boolean };
const blank: AddressRow = { first_name: "", last_name: "", street: "", addition: "", zip: "", city: "", country: "DE", is_default: false };

function Addresses() {
  const { session } = useShop();
  const [list, setList] = useState<AddressRow[] | null>(null);
  const [edit, setEdit] = useState<AddressRow | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(() => {
    getSupabase()
      ?.from("addresses")
      .select("*")
      .order("created_at")
      .then(({ data }) => setList((data ?? []) as AddressRow[]));
  }, []);
  useEffect(load, [load]);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!edit) return;
    const errs: Record<string, string> = {};
    if (!edit.first_name.trim()) errs.first_name = "Pflichtfeld";
    if (!edit.last_name.trim()) errs.last_name = "Pflichtfeld";
    if (!/\d/.test(edit.street)) errs.street = "Straße und Hausnummer";
    if (!(edit.country === "AT" ? /^\d{4}$/ : /^\d{5}$/).test(edit.zip.trim())) errs.zip = "Ungültige PLZ";
    if (!edit.city.trim()) errs.city = "Pflichtfeld";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const supabase = getSupabase()!;
    const row = { ...edit, user_id: session!.user.id };
    if (row.is_default) await supabase.from("addresses").update({ is_default: false }).eq("user_id", session!.user.id);
    const { error } = row.id ? await supabase.from("addresses").update(row).eq("id", row.id) : await supabase.from("addresses").insert(row);
    if (error) return setMsg("Die Adresse konnte nicht gespeichert werden.");
    setEdit(null);
    setMsg(null);
    load();
  }

  async function del(id: string) {
    await getSupabase()?.from("addresses").delete().eq("id", id);
    load();
  }

  if (!list) return <p className="text-ink-muted">Wird geladen …</p>;
  if (edit)
    return (
      <form noValidate onSubmit={save} className="max-w-xl space-y-6">
        <h2 className="font-display text-[1.6rem]">{edit.id ? "Adresse bearbeiten" : "Neue Adresse"}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="a_first" label="Vorname" required value={edit.first_name} onChange={(e) => setEdit({ ...edit, first_name: e.target.value })} error={errors.first_name} />
          <Field id="a_last" label="Nachname" required value={edit.last_name} onChange={(e) => setEdit({ ...edit, last_name: e.target.value })} error={errors.last_name} />
          <Field id="a_street" label="Straße und Hausnummer" required className="sm:col-span-2" value={edit.street} onChange={(e) => setEdit({ ...edit, street: e.target.value })} error={errors.street} />
          <Field id="a_add" label="Adresszusatz" className="sm:col-span-2" value={edit.addition ?? ""} onChange={(e) => setEdit({ ...edit, addition: e.target.value })} />
          <Field id="a_zip" label="PLZ" required value={edit.zip} onChange={(e) => setEdit({ ...edit, zip: e.target.value })} error={errors.zip} />
          <Field id="a_city" label="Ort" required value={edit.city} onChange={(e) => setEdit({ ...edit, city: e.target.value })} error={errors.city} />
          <SelectField id="a_country" label="Land" className="sm:col-span-2" value={edit.country} onChange={(e) => setEdit({ ...edit, country: e.target.value })} options={shopConfig.shipping.countries.map((c) => ({ value: c.code, label: c.label }))} />
        </div>
        <label className="flex gap-3 text-[0.9rem]">
          <input type="checkbox" className="check" checked={edit.is_default} onChange={(e) => setEdit({ ...edit, is_default: e.target.checked })} />
          Als Standardadresse verwenden
        </label>
        {msg && <Notice tone="error">{msg}</Notice>}
        <div className="flex gap-6">
          <button type="submit" className={buttonClasses("solid", "md")}>Speichern</button>
          <button type="button" onClick={() => setEdit(null)} className="link-line self-center text-[0.9rem]">Abbrechen</button>
        </div>
      </form>
    );
  return (
    <div>
      {list.length === 0 ? (
        <p className="text-ink-soft">Noch keine Adressen gespeichert.</p>
      ) : (
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {list.map((a) => (
            <li key={a.id} className="bg-ivory p-6">
              {a.is_default && <p className="spec mb-3 text-forest">Standard</p>}
              <address className="leading-relaxed not-italic">
                {a.first_name} {a.last_name}
                <br />
                {a.street}
                {a.addition ? <><br />{a.addition}</> : null}
                <br />
                {a.zip} {a.city}, {a.country}
              </address>
              <div className="mt-4 flex gap-5 text-[0.85rem]">
                <button type="button" className="link-line" onClick={() => setEdit(a)}>Bearbeiten</button>
                <button type="button" className="link-line text-ink-muted" onClick={() => a.id && del(a.id)}>Löschen</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={() => setEdit({ ...blank, is_default: list.length === 0 })} className={buttonClasses("outline", "md", "mt-8")}>
        Adresse hinzufügen
      </button>
    </div>
  );
}

function Profile() {
  const { session } = useShop();
  const meta = session?.user.user_metadata ?? {};
  const [first, setFirst] = useState<string>(meta.first_name ?? "");
  const [last, setLast] = useState<string>(meta.last_name ?? "");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  async function save(e: FormEvent) {
    e.preventDefault();
    const supabase = getSupabase()!;
    if (pw && pw.length < 10) return setMsg({ tone: "error", text: "Das neue Passwort muss mindestens 10 Zeichen haben." });
    const { error } = await supabase.auth.updateUser({ data: { first_name: first.trim(), last_name: last.trim() }, ...(pw ? { password: pw } : {}) });
    if (!error) await supabase.from("profiles").upsert({ id: session!.user.id, first_name: first.trim(), last_name: last.trim() });
    setPw("");
    setMsg(error ? { tone: "error", text: "Die Änderungen konnten nicht gespeichert werden." } : { tone: "success", text: "Gespeichert." });
  }

  return (
    <form noValidate onSubmit={save} className="max-w-xl space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="p_first" label="Vorname" required value={first} onChange={(e) => setFirst(e.target.value)} autoComplete="given-name" />
        <Field id="p_last" label="Nachname" required value={last} onChange={(e) => setLast(e.target.value)} autoComplete="family-name" />
      </div>
      <Field id="p_email" label="E-Mail-Adresse" required value={session?.user.email ?? ""} readOnly hint="Zum Ändern der E-Mail-Adresse kontaktiere uns bitte." />
      <Field id="p_pw" type="password" label="Neues Passwort" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" hint="Leer lassen, um das Passwort nicht zu ändern." />
      {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
      <button type="submit" className={buttonClasses("solid", "md")}>Speichern</button>
    </form>
  );
}
