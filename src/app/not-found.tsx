import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-[11px] uppercase tracking-widest text-gold">
        404
      </p>
      <h1 className="mb-4 font-serif text-4xl text-cream md:text-5xl">
        Page introuvable
      </h1>
      <div className="gold-line mx-auto mb-6 w-24" />
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-cream/50">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-gold">
          Retour à l&apos;accueil
        </Link>
        <Link href="/commander" className="btn-outline">
          Voir nos produits
        </Link>
      </div>
    </div>
  );
}
