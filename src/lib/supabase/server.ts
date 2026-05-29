import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as createAdminBase } from "@supabase/supabase-js";
import { env, isSupabaseConfigured, isSupabaseAdminConfigured } from "@/lib/env";

/**
 * Client Supabase côté serveur (lié aux cookies de la requête).
 * Retourne null si Supabase n'est pas configuré.
 */
export async function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl!, env.supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Appelé depuis un Server Component : ignoré, le middleware
          // se charge du rafraîchissement de session.
        }
      },
    },
  });
}

/**
 * Client administrateur (service role) pour les opérations serveur
 * sensibles (webhooks, ajout de crédits). Ignore les RLS.
 */
export function createAdminClient() {
  if (!isSupabaseAdminConfigured()) {
    return null;
  }
  return createAdminBase(env.supabaseUrl!, env.supabaseServiceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
