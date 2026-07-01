import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Client Supabase réel si les variables d'environnement sont fournies,
 * sinon `null` — l'application bascule alors sur un mode d'authentification
 * de démonstration (voir lib/auth-store.tsx) pour rester exécutable
 * immédiatement sans dépendance externe.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
