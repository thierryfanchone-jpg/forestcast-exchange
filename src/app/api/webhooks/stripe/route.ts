import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { fulfillPayment } from "@/lib/credits";
import { isProductType } from "@/lib/pricing";
import type { ProductType } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !env.stripeWebhookSecret) {
    return NextResponse.json(
      { error: "Webhook Stripe non configuré." },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature ?? "",
      env.stripeWebhookSecret
    );
  } catch (err) {
    console.error("Signature Stripe invalide:", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id ?? session.client_reference_id;
      const productType = session.metadata?.product_type;

      if (userId && productType && isProductType(productType)) {
        await fulfillPayment({
          userId,
          productType: productType as ProductType,
          provider: "stripe",
          providerPaymentId: session.id,
          amount: session.amount_total ?? 0,
          currency: (session.currency ?? "eur").toUpperCase(),
        });
      }
    }
  } catch (err) {
    console.error("Erreur traitement webhook Stripe:", err);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
