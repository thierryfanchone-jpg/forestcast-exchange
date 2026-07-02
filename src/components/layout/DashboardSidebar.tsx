"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Mic,
  Award,
  BadgeCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/formations", label: "Mes formations", icon: BookOpen },
  { href: "/dashboard/coach", label: "Coach IA", icon: MessageSquare },
  { href: "/dashboard/simulation", label: "Simulation orale", icon: Mic },
  { href: "/dashboard/certification", label: "Certification", icon: Award },
  { href: "/dashboard/passeport", label: "Passeport", icon: BadgeCheck },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-navy-border px-6">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-serif text-lg font-bold text-gold">ORION</span>
          <span className="text-sm font-semibold tracking-widest text-white">ACADEMY</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  pathname === href
                    ? "bg-gold/10 text-gold"
                    : "text-slate-400 hover:bg-navy-muted hover:text-white"
                )}
              >
                <Icon size={18} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-navy-border p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-navy-muted hover:text-white">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-navy-border bg-navy-light md:flex md:flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile toggle */}
      <button
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-gold-glow md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-navy-light">
            <button
              className="absolute right-4 top-4 p-2 text-slate-400"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
