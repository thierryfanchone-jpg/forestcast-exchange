import Link from "next/link";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Platform",
    links: [
      { href: "/markets", label: "Markets" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/learn", label: "Learn" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/api-docs", label: "API Docs" },
      { href: "/api-docs#websocket", label: "WebSocket" },
      { href: "/api-docs#contracts", label: "Smart Contracts" },
      { href: "https://status.forecaxt.com", label: "Status" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/compliance", label: "Compliance" },
      { href: "/legal/risk", label: "Risk Disclosure" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.05] bg-surface-1/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-green/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-16 md:grid-cols-6">
        <div className="col-span-2 space-y-4">
          <Logo />
          <p className="max-w-sm text-sm text-ink-secondary">
            Forecaxt is a regulated forecast exchange for event contracts across Europe,
            Africa and the Caribbean. Real probability, transparent oracles, institutional
            liquidity.
          </p>
          <div className="flex gap-2 pt-2">
            <span className="chip">EU MiCA-compliant</span>
            <span className="chip">SOC 2 Type II</span>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-secondary">
              {c.title}
            </h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-secondary transition-colors hover:text-ink-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-ink-secondary">
          <span>© {new Date().getFullYear()} Forecaxt SA. All rights reserved.</span>
          <span className="font-mono">
            Forecast Exchange · Event Contracts · Probability Markets
          </span>
        </div>
      </div>
    </footer>
  );
}
