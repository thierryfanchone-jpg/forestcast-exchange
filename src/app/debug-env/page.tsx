import { notFound } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { env, isProd } from "@/lib/env";

export const dynamic = "force-dynamic";

/**
 * Page de diagnostic des variables d'environnement.
 * Visible uniquement en développement. N'affiche JAMAIS les valeurs,
 * seulement leur présence (✅) ou leur absence (❌).
 */
export default function DebugEnvPage() {
  // En production : page introuvable (aucune fuite d'information).
  if (isProd) {
    notFound();
  }

  const groups: { title: string; vars: { name: string; set: boolean; scope: string }[] }[] = [
    {
      title: "Application",
      vars: [{ name: "NEXT_PUBLIC_APP_URL", set: Boolean(env.appUrl), scope: "public" }],
    },
    {
      title: "Supabase",
      vars: [
        { name: "NEXT_PUBLIC_SUPABASE_URL", set: Boolean(env.supabaseUrl), scope: "public" },
        { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", set: Boolean(env.supabaseAnonKey), scope: "public" },
        { name: "SUPABASE_SERVICE_ROLE_KEY", set: Boolean(env.supabaseServiceRoleKey), scope: "serveur" },
      ],
    },
    {
      title: "IA & recherche",
      vars: [
        { name: "OPENAI_API_KEY", set: Boolean(env.openaiApiKey), scope: "serveur" },
        { name: "TAVILY_API_KEY", set: Boolean(env.tavilyApiKey), scope: "serveur" },
      ],
    },
    {
      title: "Stripe",
      vars: [
        { name: "STRIPE_SECRET_KEY", set: Boolean(env.stripeSecretKey), scope: "serveur" },
        { name: "STRIPE_WEBHOOK_SECRET", set: Boolean(env.stripeWebhookSecret), scope: "serveur" },
        { name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", set: Boolean(env.stripePublishableKey), scope: "public" },
      ],
    },
    {
      title: "PayPal",
      vars: [
        { name: "PAYPAL_CLIENT_ID", set: Boolean(env.paypalClientId), scope: "serveur" },
        { name: "PAYPAL_CLIENT_SECRET", set: Boolean(env.paypalClientSecret), scope: "serveur" },
        { name: "PAYPAL_WEBHOOK_ID", set: Boolean(env.paypalWebhookId), scope: "serveur" },
      ],
    },
    {
      title: "Crypto",
      vars: [
        { name: "COINBASE_COMMERCE_API_KEY", set: Boolean(env.coinbaseApiKey), scope: "serveur" },
        { name: "NOWPAYMENTS_API_KEY", set: Boolean(env.nowpaymentsApiKey), scope: "serveur" },
      ],
    },
  ];

  return (
    <div className="container-app max-w-3xl py-12">
      <h1 className="text-2xl font-bold text-ink">Diagnostic des variables</h1>
      <p className="mt-2 text-sm text-muted">
        Page de développement uniquement. Les valeurs ne sont jamais affichées.
      </p>

      <div className="mt-8 space-y-6">
        {groups.map((g) => (
          <div key={g.title} className="card p-5">
            <h2 className="mb-3 font-semibold text-ink">{g.title}</h2>
            <ul className="space-y-2">
              {g.vars.map((v) => (
                <li key={v.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-mono text-ink">{v.name}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-muted">{v.scope}</span>
                    {v.set ? (
                      <CheckCircle2 className="h-5 w-5 text-trust" />
                    ) : (
                      <XCircle className="h-5 w-5 text-danger" />
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
