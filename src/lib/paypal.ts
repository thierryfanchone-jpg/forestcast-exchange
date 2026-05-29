import { env, isPaypalConfigured } from "@/lib/env";

function baseUrl(): string {
  return env.paypalEnv === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

/** Obtient un token d'accès OAuth PayPal. */
async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${env.paypalClientId}:${env.paypalClientSecret}`
  ).toString("base64");

  const res = await fetch(`${baseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error("PayPal: échec de l'authentification.");
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** Crée une commande PayPal et renvoie son id + lien d'approbation. */
export async function createOrder(params: {
  amount: number;
  currency: string;
  productType: string;
  userId: string;
}): Promise<{ id: string; approveUrl: string | null }> {
  if (!isPaypalConfigured()) {
    throw new Error("PayPal non configuré.");
  }
  const token = await getAccessToken();

  const res = await fetch(`${baseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: `${params.userId}:${params.productType}`,
          amount: {
            currency_code: params.currency,
            value: params.amount.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: "TrustLayer AI",
        return_url: `${env.appUrl}/api/checkout/paypal/capture`,
        cancel_url: `${env.appUrl}/cancel`,
      },
    }),
  });

  if (!res.ok) {
    throw new Error("PayPal: création de commande échouée.");
  }

  const data = (await res.json()) as {
    id: string;
    links: { rel: string; href: string }[];
  };
  const approve = data.links?.find((l) => l.rel === "approve")?.href ?? null;
  return { id: data.id, approveUrl: approve };
}

/** Capture une commande PayPal approuvée. */
export async function captureOrder(orderId: string): Promise<{
  status: string;
  customId: string | null;
  amount: number;
  currency: string;
}> {
  const token = await getAccessToken();
  const res = await fetch(
    `${baseUrl()}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = (await res.json()) as {
    status: string;
    purchase_units?: {
      custom_id?: string;
      payments?: {
        captures?: { amount?: { value?: string; currency_code?: string } }[];
      };
    }[];
  };

  const unit = data.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];

  return {
    status: data.status,
    customId: unit?.custom_id ?? null,
    amount: Number(capture?.amount?.value ?? 0),
    currency: capture?.amount?.currency_code ?? "EUR",
  };
}
