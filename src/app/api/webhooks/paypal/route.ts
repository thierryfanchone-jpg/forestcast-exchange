import { NextResponse } from "next/server";
import { env, isPaypalConfigured } from "@/lib/env";
import { fulfillPayment } from "@/lib/credits";
import { isProductType } from "@/lib/pricing";
import type { ProductType } from "@/types";

export const runtime = "nodejs";

function paypalBase(): string {
  return env.paypalEnv === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

/** Vérifie la signature d'un webhook PayPal via l'API officielle. */
async function verifySignature(
  headers: Headers,
  body: string
): Promise<boolean> {
  if (!env.paypalWebhookId) return false;
  const auth = Buffer.from(
    `${env.paypalClientId}:${env.paypalClientSecret}`
  ).toString("base64");

  const tokenRes = await fetch(`${paypalBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!tokenRes.ok) return false;
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const verifyRes = await fetch(
    `${paypalBase()}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: headers.get("paypal-auth-algo"),
        cert_url: headers.get("paypal-cert-url"),
        transmission_id: headers.get("paypal-transmission-id"),
        transmission_sig: headers.get("paypal-transmission-sig"),
        transmission_time: headers.get("paypal-transmission-time"),
        webhook_id: env.paypalWebhookId,
        webhook_event: JSON.parse(body),
      }),
    }
  );
  if (!verifyRes.ok) return false;
  const result = (await verifyRes.json()) as { verification_status: string };
  return result.verification_status === "SUCCESS";
}

export async function POST(request: Request) {
  if (!isPaypalConfigured()) {
    return NextResponse.json({ error: "PayPal non configuré." }, { status: 503 });
  }

  const body = await request.text();
  const valid = await verifySignature(request.headers, body);
  if (!valid) {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  try {
    const event = JSON.parse(body) as {
      event_type: string;
      resource?: {
        id?: string;
        custom_id?: string;
        amount?: { value?: string; currency_code?: string };
      };
    };

    if (
      event.event_type === "PAYMENT.CAPTURE.COMPLETED" &&
      event.resource?.custom_id
    ) {
      const [userId, productType] = event.resource.custom_id.split(":");
      if (userId && isProductType(productType)) {
        await fulfillPayment({
          userId,
          productType: productType as ProductType,
          provider: "paypal",
          providerPaymentId: event.resource.id ?? event.resource.custom_id,
          amount: Math.round(Number(event.resource.amount?.value ?? 0) * 100),
          currency: event.resource.amount?.currency_code ?? "EUR",
        });
      }
    }
  } catch (err) {
    console.error("Erreur webhook PayPal:", err);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
