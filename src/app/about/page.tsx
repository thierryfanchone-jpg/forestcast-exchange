import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Forecaxt — building the forecast exchange for European, African and Caribbean markets.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-green">About</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
        We&apos;re building the forecast exchange the world deserves.
      </h1>
      <div className="prose prose-invert mt-8 max-w-none text-ink-secondary">
        <p>
          Forecaxt is headquartered in Paris with offices in Dakar and Fort-de-France. Our team
          combines fixed-income veterans from BNP and Crédit Agricole with engineers who built
          early order-matching infrastructure at major crypto exchanges.
        </p>
        <p>
          We believe probability is one of the most under-priced asset classes in the world.
          Bringing institutional liquidity to event contracts across Europe, Africa and the
          Caribbean is how we level the playing field.
        </p>
        <p>
          Our infrastructure is non-custodial by default, settles on Polygon and Arbitrum, and is
          governed by a transparent oracle stack including Chainlink price feeds and UMA&apos;s
          optimistic oracle.
        </p>
      </div>
    </div>
  );
}
