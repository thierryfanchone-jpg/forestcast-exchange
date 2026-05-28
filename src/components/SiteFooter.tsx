import Link from "next/link";
import { WHATSAPP_NUMBER, SITE_EMAIL } from "@/lib/config";

const NAV = {
  Boutique: [
    { href: "/menus", label: "Menus" },
    { href: "/salades", label: "Salades" },
    { href: "/biscuits", label: "Biscuits" },
    { href: "/gateaux", label: "Gâteaux" },
    { href: "/specialites", label: "Spécialités Maison" },
    { href: "/boissons", label: "Boissons Healthy" },
    { href: "/condiments", label: "Condiments" },
    { href: "/epicerie", label: "Épicerie Fine" },
  ],
  Services: [
    { href: "/traiteur", label: "Traiteur & Événements" },
    { href: "/commander", label: "Commander en ligne" },
  ],
  "La Marque": [
    { href: "/notre-histoire", label: "Notre Histoire" },
    { href: "/contact", label: "Contact" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-cream/5 bg-surface-1 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-1 block font-serif text-2xl text-gold leading-none">
              Les Ateliers
            </Link>
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-cream/35">
              de la Forme
            </p>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-cream/45">
              Cuisine premium, saine et gourmande. Sans gluten, sans lactose.
              Des saveurs caribéennes pour le plaisir et le bien-être depuis
              2017.
            </p>
            <div className="flex flex-col gap-1.5 text-[12px] text-cream/30">
              <span>{WHATSAPP_NUMBER}</span>
              <span>{SITE_EMAIL}</span>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([section, items]) => (
            <div key={section}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-gold/55">
                {section}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-cream/35 transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/5 pt-6 md:flex-row">
          <p className="text-[11px] text-cream/25">
            © {new Date().getFullYear()} Les Ateliers de la Forme — Thierry
            Fanchone. Tous droits réservés.
          </p>
          <p className="text-[11px] text-cream/15">
            Fondé en 2017 · Cuisine caribéenne premium
          </p>
        </div>
      </div>
    </footer>
  );
}
