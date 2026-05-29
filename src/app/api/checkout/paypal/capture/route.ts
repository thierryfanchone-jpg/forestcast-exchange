import { NextResponse } from "next/server";
import { captureOrder } from "@/lib/paypal";
import { fulfillPayment } from "@/lib/credits";
import { isProductType } from "@/lib/pricing";
import { env, isPaypalConfigured } from "@/lib/env";
import type { ProductType } from "@/types";

export const runtime = "nodejs";

/** Retour PayPal après approbation : capture la commande puis crédite. */
export async function GET(request: Request) {
  if (!isPaypalConfigured()) {
    return NextResponse.redirect(`${env.appUrl}/cancel`);
  }
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token"); // PayPal renvoie l'order id dans "token"

  if (!token) {
    return NextResponse.redirect(`${env.appUrl}/cancel`);
  }

  try {
    const result = await captureOrder(token);
    if (result.status !== "COMPLETED" || !result.customId) {
      return NextResponse.redirect(`${env.appUrl}/cancel`);
    }

    const [userId, productType] = result.customId.split(":");
    if (userId && isProductType(productType)) {
      await fulfillPayment({
        userId,
        productType: productType as ProductType,
        provider: "paypal",
        providerPaymentId: token,
        amount: Math.round(result.amount * 100),
        currency: result.currency,
      });
    }

    return NextResponse.redirect(`${env.appUrl}/success?provider=paypal`);
  } catch (err) {
    console.error("Erreur capture PayPal:", err);
    return NextResponse.redirect(`${env.appUrl}/cancel`);
  }
}
