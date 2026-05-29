import Stripe from "stripe";
import { env, isStripeConfigured } from "@/lib/env";

let stripe: Stripe | null = null;

/** Retourne l'instance Stripe, ou null si la clé secrète est absente. */
export function getStripe(): Stripe | null {
  if (!isStripeConfigured()) return null;
  if (!stripe) {
    // On laisse Stripe utiliser la version d'API par défaut de la librairie.
    stripe = new Stripe(env.stripeSecretKey!);
  }
  return stripe;
}
