import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkoutSchema } from "@/lib/validation";
import { getPlan } from "@/lib/pricing";
import { createCryptoCharge } from "@/lib/crypto-pay";
import { isCryptoConfigured } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isCryptoConfigured()) {
    return NextResponse.json(
      { error: "Paiement crypto non configuré." },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Produit invalide." }, { status: 400 });
  }

  const plan = getPlan(parsed.data.product_type);

  try {
    const charge = await createCryptoCharge({
      amount: plan.price,
      currency: plan.currency,
      productType: plan.type,
      userId: user.id,
    });
    return NextResponse.json({ id: charge.id, url: charge.url });
  } catch (err) {
    console.error("Erreur crypto checkout:", err);
    return NextResponse.json(
      { error: "Création du paiement crypto impossible." },
      { status: 500 }
    );
  }
}
