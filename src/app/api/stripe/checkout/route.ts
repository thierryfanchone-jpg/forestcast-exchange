import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

type ProductId = "diagnostic-ia" | "diagnostic-humain" | "visio-depannage";

interface CheckoutRequestBody {
  productId: ProductId;
  customerEmail?: string;
}

const productConfig: Record<
  ProductId,
  { name: string; amount: number; currency: string }
> = {
  "diagnostic-ia": {
    name: siteConfig.tarifs.diagnosticIA.label,
    amount: Math.round(siteConfig.tarifs.diagnosticIA.price! * 100),
    currency: "eur",
  },
  "diagnostic-humain": {
    name: siteConfig.tarifs.diagnosticHumain.label,
    amount: Math.round(siteConfig.tarifs.diagnosticHumain.price! * 100),
    currency: "eur",
  },
  "visio-depannage": {
    name: siteConfig.tarifs.visio.label,
    amount: Math.round(siteConfig.tarifs.visio.price! * 100),
    currency: "eur",
  },
};

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error: "Paiement en ligne non disponible",
        message:
          "Le paiement en ligne n'est pas encore configuré. Veuillez nous contacter pour obtenir un lien de paiement.",
        contact: {
          phone: siteConfig.phoneDisplay,
          whatsapp: siteConfig.whatsapp,
          email: siteConfig.email,
        },
      },
      { status: 503 }
    );
  }

  let body: CheckoutRequestBody;

  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = {
        productId: formData.get("productId") as ProductId,
        customerEmail: (formData.get("customerEmail") as string) || undefined,
      };
    }
  } catch {
    return NextResponse.json(
      { error: "Corps de la requête invalide" },
      { status: 400 }
    );
  }

  const { productId, customerEmail } = body;

  if (!productId || !productConfig[productId]) {
    return NextResponse.json(
      {
        error: "Produit invalide",
        message: `productId doit être l'un des suivants : ${Object.keys(productConfig).join(", ")}`,
      },
      { status: 400 }
    );
  }

  const product = productConfig[productId];
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://electrosecuriteinc.fr";

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-05-27.dahlia",
    });

    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] =
      {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: product.currency,
              product_data: {
                name: product.name,
                description: `ElectroSécurité Inc — ${product.name}`,
              },
              unit_amount: product.amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${siteUrl}/paiement?success=1&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/paiement?canceled=1`,
        metadata: {
          productId,
          company: siteConfig.name,
        },
      };

    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session de paiement" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement", message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Endpoint de paiement ElectroSécurité Inc",
      usage: "POST avec { productId, customerEmail? }",
      products: Object.keys(productConfig),
      available: !!process.env.STRIPE_SECRET_KEY,
    },
    { status: 200 }
  );
}
