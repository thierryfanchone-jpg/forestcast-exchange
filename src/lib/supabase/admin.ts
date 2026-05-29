import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseAdminConfigured } from "@/lib/env";

/**
 * Client administrateur Supabase (Service Role).
 *
 * ⚠️ SÉCURITÉ : ce module importe "server-only" ; toute tentative de
 * l'importer dans un composant client provoque une erreur de build.
 * La SUPABASE_SERVICE_ROLE_KEY n'est donc JAMAIS exposée au navigateur.
 *
 * Réservé aux opérations serveur sensibles : webhooks de paiement,
 * ajout de crédits, activation de l'illimité. Ignore les RLS.
 */
export function createAdminClient() {
  if (!isSupabaseAdminConfigured()) {
    return null;
  }
  return createClient(env.supabaseUrl!, env.supabaseServiceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
