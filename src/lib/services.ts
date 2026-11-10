/**
 * Externe Dienste – werden ausschließlich über Umgebungsvariablen aktiviert.
 * Fehlt eine Variable, gilt der Dienst als „nicht aktiviert“ und die
 * Oberfläche zeigt das offen an, statt Funktionen vorzutäuschen.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") || null;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null;

export const services = {
  supabase: supabaseUrl && supabaseAnonKey ? { url: supabaseUrl, anonKey: supabaseAnonKey } : null,
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Absolute Website-URL inkl. Unterpfad (für Redirects aus E-Mails/Stripe). */
export function siteUrl(path = "/") {
  if (typeof window !== "undefined") return `${window.location.origin}${basePath}${path}`;
  // NEXT_PUBLIC_SITE_URL enthält bereits einen ggf. vorhandenen Unterpfad
  return `${(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")}${path}`;
}

/** Aufruf einer Supabase Edge Function. Wirft, wenn Supabase nicht verbunden ist. */
export async function callFunction<T>(name: string, body: unknown, accessToken?: string): Promise<{ ok: boolean; status: number; data: T }> {
  if (!services.supabase) throw new Error("not_configured");
  const res = await fetch(`${services.supabase.url}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: services.supabase.anonKey,
      Authorization: `Bearer ${accessToken ?? services.supabase.anonKey}`,
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, status: res.status, data };
}
