import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env, isSupabaseConfigured } from "@/lib/env";

/**
 * Client Supabase côté serveur (lié aux cookies de la requête).
 * Utilise uniquement les variables publiques (URL + anon key).
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
      setAll(
        cookiesToSet: { name: string; value: string; options?: CookieOptions }[]
      ) {
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

// Le client administrateur vit désormais dans "@/lib/supabase/admin".
export { createAdminClient } from "@/lib/supabase/admin";
