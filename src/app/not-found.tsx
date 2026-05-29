import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-app flex flex-col items-center py-24 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <p className="mt-4 text-muted">Page introuvable.</p>
      <Link href="/" className="btn-primary mt-6">
        Accueil
      </Link>
    </div>
  );
}
