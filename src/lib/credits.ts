import { createAdminClient } from "@/lib/supabase/server";
import { getPlan } from "@/lib/pricing";
import type { PaymentProvider, ProductType } from "@/types";

/**
 * Applique un paiement confirmé : ajoute les crédits (ou active l'illimité)
 * et enregistre le paiement. Idempotent sur (provider, provider_payment_id).
 */
export async function fulfillPayment(params: {
  userId: string;
  productType: ProductType;
  provider: PaymentProvider;
  providerPaymentId: string;
  amount: number;
  currency?: string;
}): Promise<{ ok: boolean; reason?: string }> {
  const admin = createAdminClient();
  if (!admin) {
    return { ok: false, reason: "Supabase admin non configuré" };
  }

  const plan = getPlan(params.productType);

  // Idempotence : ne pas traiter deux fois le même paiement.
  const { data: existing } = await admin
    .from("payments")
    .select("id, status")
    .eq("provider", params.provider)
    .eq("provider_payment_id", params.providerPaymentId)
    .eq("status", "completed")
    .maybeSingle();

  if (existing) {
    return { ok: true, reason: "déjà traité" };
  }

  const { data: profile } = await admin
    .from("profiles")
    .select("audit_credits, is_unlimited, plan")
    .eq("id", params.userId)
    .maybeSingle();

  if (!profile) {
    return { ok: false, reason: "profil introuvable" };
  }

  const update: Record<string, unknown> = { plan: plan.type };
  if (plan.unlimited) {
    update.is_unlimited = true;
  } else {
    update.audit_credits = (profile.audit_credits ?? 0) + plan.credits;
  }

  await admin.from("profiles").update(update).eq("id", params.userId);

  await admin.from("payments").insert({
    user_id: params.userId,
    provider: params.provider,
    provider_payment_id: params.providerPaymentId,
    amount: params.amount,
    currency: params.currency ?? "EUR",
    product_type: params.productType,
    credits_added: plan.unlimited ? 0 : plan.credits,
    status: "completed",
  });

  return { ok: true };
}
