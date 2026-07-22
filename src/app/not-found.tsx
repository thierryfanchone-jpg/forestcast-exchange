import Link from "next/link";
import { Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
        <Wrench className="h-8 w-8 text-blue-600" />
      </div>
      <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">Erreur 404</p>
      <h1 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">Page introuvable</h1>
      <p className="mb-8 max-w-sm text-slate-500">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
        <Link href="/diagnostic" className="btn-outline">
          Faire un diagnostic
        </Link>
      </div>
    </div>
  );
}
