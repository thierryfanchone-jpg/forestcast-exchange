import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-navy">
      <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gold">
        404
      </div>
      <h1 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
        Page introuvable
      </h1>
      <p className="mb-8 max-w-sm text-slate-400">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
        <Link href="/formations" className="btn-outline">
          Voir les formations
        </Link>
      </div>
    </div>
  );
}
