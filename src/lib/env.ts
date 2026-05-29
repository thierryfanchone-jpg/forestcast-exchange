/**
 * Accès centralisé aux variables d'environnement.
 *
 * ⚠️ POINT CRITIQUE — Next.js n'« inline » une variable NEXT_PUBLIC_* dans
 * le bundle navigateur QUE si elle est lue via un accès LITTÉRAL :
 *     process.env.NEXT_PUBLIC_SUPABASE_URL   ✅ remplacé au build
 *     process.env[name]                      ❌ renvoie undefined côté client
 *
 * On lit donc chaque variable explicitement. Les variables secrètes
 * (sans préfixe NEXT_PUBLIC_) sont automatiquement remplacées par
 * `undefined` dans le bundle client par Next.js : elles ne sont JAMAIS
 * exposées au navigateur et ne sont lisibles que côté serveur.
 */

function clean(value: string | undefined): string | undefined {
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

// ── Variables publiques (client + serveur) ─────────────────────────
const NEXT_PUBLIC_APP_URL = clean(process.env.NEXT_PUBLIC_APP_URL);
const NEXT_PUBLIC_SUPABASE_URL = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
const NEXT_PUBLIC_SUPABASE_ANON_KEY = clean(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = clean(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export const env = {
  // App
  appUrl: NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  // Supabase (URL + anon key : publiques ; service role : serveur uniquement)
  supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: clean(process.env.SUPABASE_SERVICE_ROLE_KEY),

  // IA (serveur uniquement)
  openaiApiKey: clean(process.env.OPENAI_API_KEY),
  openaiModel: clean(process.env.OPENAI_MODEL) ?? "gpt-4o-mini",
  tavilyApiKey: clean(process.env.TAVILY_API_KEY),

  // Stripe
  stripeSecretKey: clean(process.env.STRIPE_SECRET_KEY),
  stripeWebhookSecret: clean(process.env.STRIPE_WEBHOOK_SECRET),
  stripePublishableKey: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  stripePriceStarter: clean(process.env.STRIPE_PRICE_STARTER),
  stripePricePro: clean(process.env.STRIPE_PRICE_PRO),
  stripePriceUnlimited: clean(process.env.STRIPE_PRICE_UNLIMITED),

  // PayPal (serveur uniquement)
  paypalEnv: clean(process.env.PAYPAL_ENV) ?? "sandbox",
  paypalClientId: clean(process.env.PAYPAL_CLIENT_ID),
  paypalClientSecret: clean(process.env.PAYPAL_CLIENT_SECRET),
  paypalWebhookId: clean(process.env.PAYPAL_WEBHOOK_ID),

  // Crypto (serveur uniquement)
  cryptoProvider: (clean(process.env.CRYPTO_PROVIDER) ?? "coinbase") as
    | "coinbase"
    | "nowpayments",
  coinbaseApiKey: clean(process.env.COINBASE_COMMERCE_API_KEY),
  coinbaseWebhookSecret: clean(process.env.COINBASE_COMMERCE_WEBHOOK_SECRET),
  nowpaymentsApiKey: clean(process.env.NOWPAYMENTS_API_KEY),
  nowpaymentsIpnSecret: clean(process.env.NOWPAYMENTS_IPN_SECRET),

  // Crédits par pack (serveur)
  packStarterCredits: Number(process.env.PACK_STARTER_CREDITS ?? "5"),
  packProCredits: Number(process.env.PACK_PRO_CREDITS ?? "15"),
};

// ── Helpers de détection ───────────────────────────────────────────
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

export const isProd = process.env.NODE_ENV === "production";

/**
 * Journalise (côté serveur uniquement) l'état des variables critiques.
 * Sans effet sur le rendu : sert au diagnostic dans les logs Vercel.
 */
export function logEnvStatus(context: string) {
  if (typeof window !== "undefined") return; // jamais côté client
  const missing: string[] = [];
  if (!env.supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!env.supabaseAnonKey) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!env.supabaseServiceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!env.openaiApiKey) missing.push("OPENAI_API_KEY");
  if (missing.length > 0) {
    console.warn(
      `[env:${context}] Variables manquantes : ${missing.join(", ")}`
    );
  }
}
