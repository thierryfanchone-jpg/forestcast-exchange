import Link from 'next/link';
import { Wrench } from 'lucide-react';

const cols = [
  {
    title: 'Plateforme',
    links: [
      { href: '/diagnostic', label: 'Faire un diagnostic' },
      { href: '/tarifs', label: 'Tarifs' },
      { href: '/artisans', label: 'Artisans partenaires' },
      { href: '/dashboard', label: 'Mon espace' },
    ],
  },
  {
    title: 'Domaines',
    links: [
      { href: '/diagnostic?domain=electricite', label: 'Électricité' },
      { href: '/diagnostic?domain=plomberie', label: 'Plomberie' },
      { href: '/diagnostic?domain=climatisation', label: 'Climatisation' },
      { href: '/diagnostic?domain=securite_incendie', label: 'Sécurité incendie' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '/mentions-legales', label: 'Mentions légales' },
      { href: '/confidentialite', label: 'Politique de confidentialité' },
      { href: '/cgv', label: 'CGV' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <Wrench className="h-3.5 w-3.5 text-white" />
            </div>
            <span>IA Artisan</span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            Diagnostic IA multimodal pour pannes et travaux à domicile. Résultats clairs,
            conseils de sécurité, mise en relation artisan.
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {c.title}
            </h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} IA Artisan. Tous droits réservés.</span>
          <span>Pré-diagnostic IA — Ne remplace pas un professionnel certifié</span>
        </div>
      </div>
    </footer>
  );
}
