import { env, isCryptoConfigured } from "@/lib/env";

/**
 * Crée un paiement crypto via Coinbase Commerce ou NOWPayments selon
 * CRYPTO_PROVIDER. Renvoie l'identifiant fournisseur et l'URL de paiement.
 */
export async function createCryptoCharge(params: {
  amount: number;
  currency: string;
  productType: string;
  userId: string;
}): Promise<{ id: string; url: string | null }> {
  if (!isCryptoConfigured()) {
    throw new Error("Paiement crypto non configuré.");
  }

  const metadata = { user_id: params.userId, product_type: params.productType };

  if (env.cryptoProvider === "coinbase") {
    const res = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CC-Api-Key": env.coinbaseApiKey!,
        "X-CC-Version": "2018-03-22",
      },
      body: JSON.stringify({
        name: "TrustLayer AI",
        description: `Pack ${params.productType}`,
        pricing_type: "fixed_price",
        local_price: {
          amount: params.amount.toFixed(2),
          currency: params.currency,
        },
        metadata,
        redirect_url: `${env.appUrl}/success`,
        cancel_url: `${env.appUrl}/cancel`,
      }),
    });

    if (!res.ok) {
      throw new Error("Coinbase Commerce: création du paiement échouée.");
    }
    const data = (await res.json()) as {
      data: { id: string; code: string; hosted_url: string };
    };
    return { id: data.data.code, url: data.data.hosted_url };
  }

  // NOWPayments — facture hébergée.
  const res = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.nowpaymentsApiKey!,
    },
    body: JSON.stringify({
      price_amount: params.amount,
      price_currency: params.currency.toLowerCase(),
      order_id: `${params.userId}:${params.productType}`,
      order_description: `Pack ${params.productType}`,
      success_url: `${env.appUrl}/success`,
      cancel_url: `${env.appUrl}/cancel`,
      ipn_callback_url: `${env.appUrl}/api/webhooks/crypto`,
    }),
  });

  if (!res.ok) {
    throw new Error("NOWPayments: création de la facture échouée.");
  }
  const data = (await res.json()) as { id: string; invoice_url: string };
  return { id: data.id, url: data.invoice_url };
}
