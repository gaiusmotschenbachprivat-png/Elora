"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { services } from "./services";

let client: SupabaseClient | null = null;

/**
 * Browser-Client für Supabase (Auth + Datenbank mit Row Level Security).
 * Gibt `null` zurück, solange Supabase nicht konfiguriert ist.
 */
export function getSupabase(): SupabaseClient | null {
  if (!services.supabase) return null;
  if (!client) {
    client = createClient(services.supabase.url, services.supabase.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "pkce" },
    });
  }
  return client;
}
