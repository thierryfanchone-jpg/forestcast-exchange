import Link from "next/link";
import { Mail, Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_LINKS = {
  plateforme: [
    { href: "/formations", label: "Formations" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/dashboard/coach", label: "Coach IA" },
    { href: "/orion-plus", label: "✦ ORION PLUS" },
    { href: "/inscription", label: "Créer un compte" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/cgv", label: "CGV" },
    { href: "/cgu", label: "CGU" },
    { href: "/confidentialite", label: "Confidentialité" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-navy-border bg-navy-light">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-1">
              <span className="font-serif text-xl font-bold text-gold">ORION</span>
              <span className="text-xl font-semibold tracking-widest text-white">ACADEMY</span>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Apprends. Entraîne-toi. Progresse.
              <br />
              La plateforme de formation pratique avec coach IA pour développer tes compétences en communication.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Mail, href: "mailto:contact@orion-academy.fr", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-border text-slate-400 transition-colors hover:border-gold/30 hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Plateforme links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              Plateforme
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.plateforme.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              Légal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-border pt-8 md:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ORION ACADEMY. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-500">
            Apprends. Entraîne-toi. Progresse.
          </p>
        </div>
      </div>
    </footer>
  );
}
