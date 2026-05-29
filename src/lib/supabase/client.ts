"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env, isSupabaseConfigured } from "@/lib/env";

/**
 * Client Supabase côté navigateur.
 * Retourne null si la configuration est absente afin que l'UI puisse
 * afficher un message propre plutôt que de planter.
 */
export function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createBrowserClient(env.supabaseUrl!, env.supabaseAnonKey!);
}
