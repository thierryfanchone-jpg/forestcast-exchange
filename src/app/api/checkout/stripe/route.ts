import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { checkoutSchema } from "@/lib/validation";
import { getPlan } from "@/lib/pricing";
import { env } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Paiement par carte non configuré." },
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
    // Utilise un price Stripe configuré, sinon un prix à la volée.
    const lineItem = plan.stripePriceId
      ? { price: plan.stripePriceId, quantity: 1 }
      : {
          price_data: {
            currency: plan.currency.toLowerCase(),
            product_data: { name: `TrustLayer AI — ${plan.type}` },
            unit_amount: Math.round(plan.price * 100),
            ...(plan.recurring ? { recurring: { interval: "month" as const } } : {}),
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      mode: plan.recurring ? "subscription" : "payment",
      line_items: [lineItem],
      success_url: `${env.appUrl}/success?provider=stripe`,
      cancel_url: `${env.appUrl}/cancel`,
      client_reference_id: user.id,
      metadata: { user_id: user.id, product_type: plan.type },
      ...(plan.recurring
        ? { subscription_data: { metadata: { user_id: user.id, product_type: plan.type } } }
        : {}),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Erreur Stripe checkout:", err);
    return NextResponse.json(
      { error: "Création de la session de paiement impossible." },
      { status: 500 }
    );
  }
}
