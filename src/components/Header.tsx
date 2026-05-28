"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-store";

const MAIN_NAV = [
  { href: "/commander", label: "Commander" },
  { href: "/menus", label: "Menus" },
  { href: "/traiteur", label: "Traiteur" },
  { href: "/notre-histoire", label: "Notre Histoire" },
  { href: "/contact", label: "Contact" },
];

const ALL_NAV = [
  { href: "/commander", label: "Commander" },
  { href: "/menus", label: "Menus" },
  { href: "/salades", label: "Salades" },
  { href: "/biscuits", label: "Biscuits" },
  { href: "/gateaux", label: "Gâteaux" },
  { href: "/specialites", label: "Spécialités Maison" },
  { href: "/boissons", label: "Boissons Healthy" },
  { href: "/condiments", label: "Condiments" },
  { href: "/epicerie", label: "Épicerie Fine" },
  { href: "/traiteur", label: "Traiteur" },
  { href: "/notre-histoire", label: "Notre Histoire" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-deep/95 shadow-[0_1px_0_rgba(201,168,76,0.12)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold tracking-wide text-gold md:text-2xl">
              Les Ateliers
            </span>
            <span className="text-[10px] font-light uppercase tracking-[0.3em] text-cream/60">
              de la Forme
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {MAIN_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium uppercase tracking-widest transition-colors ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-cream/60 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center border border-cream/10 text-cream/60 transition-all hover:border-gold hover:text-gold"
              aria-label={`Ouvrir le panier${totalItems > 0 ? ` (${totalItems} articles)` : ""}`}
            >
              <ShoppingCart size={17} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-deep"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <Link
              href="/commander"
              className="hidden border border-gold bg-gold px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-deep transition-all hover:bg-transparent hover:text-gold md:inline-flex"
            >
              Commander
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center text-cream/60 transition-colors hover:text-gold lg:hidden"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-deep pt-20 lg:hidden"
          >
            <div className="overflow-y-auto px-8 py-4">
              <nav className="flex flex-col">
                {ALL_NAV.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={`block border-b border-cream/5 py-4 font-serif text-2xl transition-colors ${
                        pathname === link.href
                          ? "text-gold"
                          : "text-cream/80 hover:text-gold"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openCart();
                  }}
                  className="btn-gold w-full"
                >
                  <ShoppingCart size={16} />
                  Voir mon panier
                  {totalItems > 0 && (
                    <span className="ml-1 rounded-full bg-deep/30 px-2 text-xs">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
