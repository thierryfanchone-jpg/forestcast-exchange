import { NextResponse } from "next/server";
import {
  isSupabaseConfigured,
  isSupabaseAdminConfigured,
  isOpenAIConfigured,
  isTavilyConfigured,
  isStripeConfigured,
  isPaypalConfigured,
  isCryptoConfigured,
} from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnostic de configuration (booléens uniquement, aucun secret).
 * Permet de vérifier en un coup d'œil ce qui est configuré en prod.
 */
export async function GET() {
  const supabase_public = isSupabaseConfigured();
  const supabase_admin = isSupabaseAdminConfigured();
  const openai = isOpenAIConfigured();
  const tavily = isTavilyConfigured();

  // L'app est "ok" dès que l'authentification (Supabase public) fonctionne.
  const status = supabase_public ? "ok" : "degraded";

  return NextResponse.json({
    status,
    supabase_public,
    supabase_admin,
    openai,
    tavily,
    payments: {
      stripe: isStripeConfigured(),
      paypal: isPaypalConfigured(),
      crypto: isCryptoConfigured(),
    },
  });
}
