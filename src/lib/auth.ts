import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";
import type { User } from "@supabase/supabase-js";

/** Retourne l'utilisateur connecté, ou null. */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Récupère le profil de l'utilisateur connecté.
 * Crée le profil au besoin (filet de sécurité si le trigger SQL absent).
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profile) return profile as Profile;

  // Filet de sécurité : crée le profil avec 2 audits gratuits.
  const { data: created } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email ?? null,
      full_name: (user.user_metadata?.full_name as string) ?? null,
      avatar_url: (user.user_metadata?.avatar_url as string) ?? null,
      audit_credits: 2,
      plan: "free",
    })
    .select("*")
    .maybeSingle();

  return (created as Profile) ?? null;
}
