"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Sun, Moon, Wallet } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/markets", label: "Markets" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/learn", label: "Learn" },
];

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "text-ink-primary"
                    : "text-ink-secondary hover:text-ink-primary",
                )}
              >
                {n.label}
                {active ? (
                  <span className="absolute inset-x-2 -bottom-[17px] h-px bg-gradient-to-r from-transparent via-accent-green to-transparent" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:flex">
            <label className="relative flex w-72 items-center">
              <Search className="absolute left-3 h-4 w-4 text-ink-secondary" />
              <input
                type="search"
                placeholder="Search markets, tags…"
                className="h-9 w-full rounded-lg border border-white/[0.06] bg-white/[0.03] pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-secondary focus:border-accent-green/40 focus:outline-none focus:ring-2 focus:ring-accent-green/20"
              />
            </label>
          </div>

          <button
            className="btn-ghost h-9 w-9 justify-center p-0"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button className="btn-ghost h-9 w-9 justify-center p-0" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>

          <Link href="/portfolio" className="btn-secondary hidden h-9 sm:inline-flex">
            <Wallet className="h-4 w-4" />
            <span className="font-mono text-xs">$8,412.40</span>
          </Link>

          <Link href="/login" className="btn-primary h-9">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
