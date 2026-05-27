import Link from "next/link";

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2">
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-green to-accent-blue shadow-glow">
        <span className="absolute inset-[3px] rounded-md bg-bg" />
        <svg viewBox="0 0 20 20" className="relative h-3.5 w-3.5">
          <path
            d="M2 14 L7 8 L11 12 L18 4"
            fill="none"
            stroke="#00D084"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!small ? (
        <span className="font-display text-base font-bold tracking-tight text-ink-primary">
          Foreca<span className="text-accent-green">x</span>t
        </span>
      ) : null}
    </Link>
  );
}
