import type { Metadata } from "next";
import { BookOpen, Compass, Layers, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Learn",
  description: "Understand event contracts, probability markets and how Forecaxt's exchange works.",
};

const sections = [
  {
    Icon: Compass,
    title: "What is a forecast exchange?",
    body: "A forecast exchange is a regulated marketplace where contracts settle to a fixed payout depending on a real-world outcome. Prices reflect the market's aggregate probability.",
  },
  {
    Icon: Layers,
    title: "How do event contracts work?",
    body: "Each market issues YES and NO shares. Both add up to $1. A YES share pays $1 if the event resolves true, otherwise $0. You can trade in and out at the current market price at any time before resolution.",
  },
  {
    Icon: ShieldCheck,
    title: "How are outcomes resolved?",
    body: "Outcomes are determined by Chainlink price feeds, UMA's optimistic oracle, official press wires (Reuters, AP) or, when none are available, a transparent admin process with full audit log and dispute window.",
  },
  {
    Icon: BookOpen,
    title: "Risk & compliance",
    body: "Event contracts carry a risk of total loss. Forecaxt operates under MiCA in the EU and partner licensing frameworks across African and Caribbean jurisdictions.",
  },
];

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-accent-green">Learn</p>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
        Probability, made tradable.
      </h1>
      <p className="mt-3 max-w-2xl text-ink-secondary">
        Forecaxt is a probability market — every contract converts the likelihood of a real-world
        event into a tradable share between 1¢ and 99¢.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <div key={s.title} className="panel p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/15 text-accent-blue">
              <s.Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-secondary">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
