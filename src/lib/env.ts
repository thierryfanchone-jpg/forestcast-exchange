/**
 * Accès centralisé aux variables d'environnement.
 * Aucune valeur n'est requise au démarrage : les clés manquantes sont
 * détectées au moment de l'utilisation (cf. helpers isXxxConfigured).
 */

function read(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

export const env = {
  // App
  appUrl: read("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000",

  // Supabase
  supabaseUrl: read("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: read("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: read("SUPABASE_SERVICE_ROLE_KEY"),

  // IA
  openaiApiKey: read("OPENAI_API_KEY"),
  openaiModel: read("OPENAI_MODEL") ?? "gpt-4o-mini",
  tavilyApiKey: read("TAVILY_API_KEY"),

  // Stripe
  stripeSecretKey: read("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: read("STRIPE_WEBHOOK_SECRET"),
  stripePublishableKey: read("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
  stripePriceStarter: read("STRIPE_PRICE_STARTER"),
  stripePricePro: read("STRIPE_PRICE_PRO"),
  stripePriceUnlimited: read("STRIPE_PRICE_UNLIMITED"),

  // PayPal
  paypalEnv: read("PAYPAL_ENV") ?? "sandbox",
  paypalClientId: read("PAYPAL_CLIENT_ID"),
  paypalClientSecret: read("PAYPAL_CLIENT_SECRET"),
  paypalWebhookId: read("PAYPAL_WEBHOOK_ID"),

  // Crypto
  cryptoProvider: (read("CRYPTO_PROVIDER") ?? "coinbase") as "coinbase" | "nowpayments",
  coinbaseApiKey: read("COINBASE_COMMERCE_API_KEY"),
  coinbaseWebhookSecret: read("COINBASE_COMMERCE_WEBHOOK_SECRET"),
  nowpaymentsApiKey: read("NOWPAYMENTS_API_KEY"),
  nowpaymentsIpnSecret: read("NOWPAYMENTS_IPN_SECRET"),

  // Crédits par pack
  packStarterCredits: Number(read("PACK_STARTER_CREDITS") ?? "5"),
  packProCredits: Number(read("PACK_PRO_CREDITS") ?? "15"),
};

export const isSupabaseConfigured = () =>
  Boolean(env.supabaseUrl && env.supabaseAnonKey);

export const isSupabaseAdminConfigured = () =>
  Boolean(env.supabaseUrl && env.supabaseServiceRoleKey);

export const isOpenAIConfigured = () => Boolean(env.openaiApiKey);
export const isTavilyConfigured = () => Boolean(env.tavilyApiKey);
export const isStripeConfigured = () => Boolean(env.stripeSecretKey);
export const isPaypalConfigured = () =>
  Boolean(env.paypalClientId && env.paypalClientSecret);
export const isCryptoConfigured = () =>
  env.cryptoProvider === "coinbase"
    ? Boolean(env.coinbaseApiKey)
    : Boolean(env.nowpaymentsApiKey);
