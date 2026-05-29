import Link from "next/link";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { env, isProd } from "@/lib/env";

/**
 * Diagnostic technique affiché quand Supabase n'est pas détecté.
 *
 * Ce n'est PAS un écran de masquage : il indique précisément quelle
 * variable manque (sans jamais afficher de valeur) et comment corriger.
 * On ne contrôle ici que les variables PUBLIQUES (URL + anon key), qui
 * sont identiques côté client et serveur (inlinées au build).
 */
export function ConfigNotice({ service = "Supabase" }: { service?: string }) {
  const checks = [
    { name: "NEXT_PUBLIC_SUPABASE_URL", set: Boolean(env.supabaseUrl) },
    { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", set: Boolean(env.supabaseAnonKey) },
  ];

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-warn/30 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warn-light text-warn">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-semibold text-ink">
            Configuration {service} incomplète
          </h2>
          <p className="text-sm text-muted">
            Variables d&apos;environnement manquantes pour cette instance.
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2 rounded-lg bg-slate-50 p-3">
        {checks.map((c) => (
          <li key={c.name} className="flex items-center justify-between text-sm">
            <span className="font-mono text-ink">{c.name}</span>
            {c.set ? (
              <CheckCircle2 className="h-4 w-4 text-trust" />
            ) : (
              <XCircle className="h-4 w-4 text-danger" />
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2 text-sm text-muted">
        {isProd ? (
          <p>
            Ajoutez ces variables dans <strong>Vercel → Settings →
            Environment Variables</strong>, puis lancez un{" "}
            <strong>Redeploy</strong> (les variables{" "}
            <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_*</code> sont
            figées au build).
          </p>
        ) : (
          <p>
            Renseignez-les dans{" "}
            <code className="rounded bg-slate-100 px-1">.env.local</code> (voir{" "}
            <code className="rounded bg-slate-100 px-1">.env.example</code>),
            puis relancez <code className="rounded bg-slate-100 px-1">npm run dev</code>.
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/" className="btn-secondary">
          Accueil
        </Link>
        <a href="/api/health" className="btn-secondary" target="_blank" rel="noopener noreferrer">
          Voir /api/health
        </a>
      </div>
    </div>
  );
}
