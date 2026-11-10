import { createClient } from "npm:@supabase/supabase-js@2.45.4";

/** Service-Client (umgeht RLS) – nur serverseitig in Edge Functions verwenden. */
export function adminClient() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Ermittelt die angemeldete Person aus dem Authorization-Header (falls vorhanden). */
export async function userFromRequest(req: Request): Promise<{ id: string; email?: string } | null> {
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const { data } = await adminClient().auth.getUser(token);
  return data.user ? { id: data.user.id, email: data.user.email ?? undefined } : null;
}
