import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
  typescript: true,
});

export const STRIPE_PRODUCTS = {
  starter_29: process.env.STRIPE_PRICE_STARTER || "price_starter_29",
  pro_79: process.env.STRIPE_PRICE_PRO || "price_pro_79",
  expert_199: process.env.STRIPE_PRICE_EXPERT || "price_expert_199",
  subscription_monthly: process.env.STRIPE_PRICE_MONTHLY || "price_monthly_1490",
} as const;
