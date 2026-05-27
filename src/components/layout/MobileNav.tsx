"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LineChart, Briefcase, Trophy, BookOpen, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/markets", label: "Markets", Icon: LineChart },
  { href: "/portfolio", label: "Portfolio", Icon: Briefcase },
  { href: "/leaderboard", label: "Ranks", Icon: Trophy },
  { href: "/learn", label: "Learn", Icon: BookOpen },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.06] bg-bg/85 backdrop-blur-xl md:hidden">
      <ul className="mx-auto flex max-w-md justify-between px-2 py-2">
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] uppercase tracking-wider",
                  active ? "text-accent-green" : "text-ink-secondary",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
