import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <span className="chip mb-6">404</span>
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        That market doesn&apos;t exist (yet).
      </h1>
      <p className="mt-3 text-ink-secondary">
        The contract you were looking for may have settled, been archived, or never existed.
      </p>
      <div className="mt-6 flex gap-2">
        <Link href="/" className="btn-secondary">
          Back home
        </Link>
        <Link href="/markets" className="btn-primary">
          Browse markets
        </Link>
      </div>
    </div>
  );
}
