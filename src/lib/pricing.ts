import type { ProductType } from "@/types";
import { env } from "@/lib/env";

export interface Plan {
  type: ProductType;
  /** Crédits ajoutés (0 = illimité géré via is_unlimited). */
  credits: number;
  unlimited: boolean;
  recurring: boolean;
  /** Prix affiché (lu côté public). */
  price: number;
  currency: string;
  /** Identifiant de prix Stripe (côté serveur). */
  stripePriceId?: string;
  popular?: boolean;
}

const priceStarter = Number(process.env.NEXT_PUBLIC_PRICE_STARTER ?? "9");
const pricePro = Number(process.env.NEXT_PUBLIC_PRICE_PRO ?? "19");
const priceUnlimited = Number(process.env.NEXT_PUBLIC_PRICE_UNLIMITED ?? "39");

/**
 * Définition des offres. Les crédits et les prix Stripe sont résolus
 * via les variables d'environnement (cf. .env.example).
 */
export const PLANS: Record<ProductType, Plan> = {
  starter: {
    type: "starter",
    credits: Number(process.env.PACK_STARTER_CREDITS ?? "5"),
    unlimited: false,
    recurring: false,
    price: priceStarter,
    currency: "EUR",
    stripePriceId: env.stripePriceStarter,
  },
  pro: {
    type: "pro",
    credits: Number(process.env.PACK_PRO_CREDITS ?? "15"),
    unlimited: false,
    recurring: false,
    price: pricePro,
    currency: "EUR",
    stripePriceId: env.stripePricePro,
    popular: true,
  },
  unlimited: {
    type: "unlimited",
    credits: 0,
    unlimited: true,
    recurring: true,
    price: priceUnlimited,
    currency: "EUR",
    stripePriceId: env.stripePriceUnlimited,
  },
};

export function getPlan(type: ProductType): Plan {
  return PLANS[type];
}

export function isProductType(value: string): value is ProductType {
  return value === "starter" || value === "pro" || value === "unlimited";
}

/** Données de prix exposables côté client (sans identifiants Stripe). */
export const PUBLIC_PLANS = Object.values(PLANS).map((p) => ({
  type: p.type,
  credits: p.credits,
  unlimited: p.unlimited,
  recurring: p.recurring,
  price: p.price,
  currency: p.currency,
  popular: p.popular ?? false,
}));
