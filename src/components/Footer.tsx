import Link from "next/link";
import { Wrench, Phone, Mail, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2 font-bold text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Wrench className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl">
                Depann<span className="text-blue-400">IA</span>
              </span>
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              Votre assistant dépannage habitat 24h/24. Diagnostic IA, conseils de sécurité et mise en relation avec des artisans qualifiés.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+33000000000" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                Urgence 24h/24
              </a>
              <a href="mailto:contact@depannia.fr" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                contact@depannia.fr
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Services
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                ["Diagnostic IA", "/diagnostic"],
                ["Urgence artisan", "/urgence"],
                ["Guides dépannage", "/guides"],
                ["Espace artisans", "/artisans"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Métiers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Métiers couverts
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              {["Électricien", "Plombier", "Technicien clim", "Réparateur électroménager", "Serrurier"].map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Informations
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                ["À propos", "#"],
                ["Mentions légales", "#"],
                ["CGU", "#"],
                ["Politique confidentialité", "#"],
                ["Contact", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-700 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} DepannIA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-400">
            <Shield className="h-3.5 w-3.5 text-green-500" />
            DepannIA ne remplace pas un professionnel — conseils de sécurité uniquement
          </div>
        </div>
      </div>
    </footer>
  );
}
