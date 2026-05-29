import Link from "next/link";
import { Settings2 } from "lucide-react";
import { isProd } from "@/lib/env";

/**
 * Message affiché lorsqu'un service requis n'est pas encore configuré.
 * - En développement : on détaille les variables à renseigner.
 * - En production : message sobre + retour à l'accueil, pour ne jamais
 *   donner l'impression que tout le site est cassé.
 * Le Header / Footer restent affichés (rendu dans le layout).
 */
export function ConfigNotice({ service }: { service: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-soft">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Settings2 className="h-6 w-6" />
      </span>
      <h2 className="text-lg font-semibold text-ink">
        Service bientôt disponible
      </h2>
      <p className="text-sm text-muted">
        {service} n&apos;est pas encore configuré pour cette instance.
        {isProd
          ? " Revenez bientôt — la configuration est en cours de finalisation."
          : ""}
      </p>

      {!isProd && (
        <p className="text-sm text-muted">
          Renseignez les variables correspondantes dans{" "}
          <code className="rounded bg-slate-100 px-1">.env.local</code>{" "}
          (voir <code className="rounded bg-slate-100 px-1">.env.example</code>).
        </p>
      )}

      <Link href="/" className="btn-primary">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
