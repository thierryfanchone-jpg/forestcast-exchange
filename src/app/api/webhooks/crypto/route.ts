import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { env, isCryptoConfigured } from "@/lib/env";
import { fulfillPayment } from "@/lib/credits";
import { isProductType } from "@/lib/pricing";
import type { ProductType } from "@/types";

export const runtime = "nodejs";

/** Webhook crypto : Coinbase Commerce ou NOWPayments selon CRYPTO_PROVIDER. */
export async function POST(request: Request) {
  if (!isCryptoConfigured()) {
    return NextResponse.json({ error: "Crypto non configuré." }, { status: 503 });
  }

  const body = await request.text();

  // ── Coinbase Commerce ──────────────────────────────────────────
  if (env.cryptoProvider === "coinbase") {
    const signature = request.headers.get("x-cc-webhook-signature") ?? "";
    if (!env.coinbaseWebhookSecret) {
      return NextResponse.json({ error: "Secret manquant." }, { status: 503 });
    }
    const expected = crypto
      .createHmac("sha256", env.coinbaseWebhookSecret)
      .update(body)
      .digest("hex");
    if (expected !== signature) {
      return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
    }

    try {
      const payload = JSON.parse(body) as {
        event?: {
          type?: string;
          data?: {
            code?: string;
            metadata?: { user_id?: string; product_type?: string };
            pricing?: { local?: { amount?: string; currency?: string } };
          };
        };
      };
      const ev = payload.event;
      if (ev?.type === "charge:confirmed" && ev.data?.metadata) {
        const { user_id, product_type } = ev.data.metadata;
        if (user_id && product_type && isProductType(product_type)) {
          await fulfillPayment({
            userId: user_id,
            productType: product_type as ProductType,
            provider: "crypto",
            providerPaymentId: ev.data.code ?? "",
            amount: Math.round(
              Number(ev.data.pricing?.local?.amount ?? 0) * 100
            ),
            currency: ev.data.pricing?.local?.currency ?? "EUR",
          });
        }
      }
    } catch (err) {
      console.error("Erreur webhook Coinbase:", err);
      return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
    }
    return NextResponse.json({ received: true });
  }

  // ── NOWPayments ────────────────────────────────────────────────
  const signature = request.headers.get("x-nowpayments-sig") ?? "";
  if (!env.nowpaymentsIpnSecret) {
    return NextResponse.json({ error: "Secret manquant." }, { status: 503 });
  }
  // NOWPayments signe le JSON trié par clés.
  const sorted = JSON.stringify(sortObject(JSON.parse(body)));
  const expected = crypto
    .createHmac("sha512", env.nowpaymentsIpnSecret)
    .update(sorted)
    .digest("hex");
  if (expected !== signature) {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  try {
    const payload = JSON.parse(body) as {
      payment_status?: string;
      payment_id?: string | number;
      order_id?: string;
      price_amount?: number;
      price_currency?: string;
    };
    if (
      (payload.payment_status === "finished" ||
        payload.payment_status === "confirmed") &&
      payload.order_id
    ) {
      const [userId, productType] = payload.order_id.split(":");
      if (userId && isProductType(productType)) {
        await fulfillPayment({
          userId,
          productType: productType as ProductType,
          provider: "crypto",
          providerPaymentId: String(payload.payment_id ?? payload.order_id),
          amount: Math.round(Number(payload.price_amount ?? 0) * 100),
          currency: (payload.price_currency ?? "EUR").toUpperCase(),
        });
      }
    }
  } catch (err) {
    console.error("Erreur webhook NOWPayments:", err);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}

/** Trie récursivement les clés d'un objet (requis par NOWPayments). */
function sortObject(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortObject((obj as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return obj;
}
