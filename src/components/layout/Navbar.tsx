'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const NAV = [
  { href: '/diagnostic', label: 'Diagnostic' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/artisans', label: 'Artisans' },
  { href: '/dashboard', label: 'Mon espace' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-gray-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Wrench className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg">IA Artisan</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/diagnostic" className="hidden sm:block">
            <Button size="md">Analyser une panne</Button>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
            <Link href="/diagnostic" onClick={() => setMobileOpen(false)}>
              <Button size="md" className="mt-2 w-full">
                Analyser une panne
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
