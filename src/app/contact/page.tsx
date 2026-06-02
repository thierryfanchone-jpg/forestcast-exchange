import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez ElectroSécurité Inc pour vos dépannages électriques, devis ou urgences en Martinique. Appel, WhatsApp ou email disponibles.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Nous contacter
          </p>
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-400">
            Pour toute demande d&apos;intervention, devis ou question, nous sommes
            à votre disposition. Réponse rapide garantie.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact actions */}
          <div className="space-y-4">
            <h2 className="mb-6 text-xl font-bold text-white">
              Contactez-nous directement
            </h2>

            {/* Call */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-yellow-400/50 hover:bg-gray-800"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400/10">
                <Phone className="h-7 w-7 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Appel téléphonique
                </p>
                <p className="text-xl font-bold text-white">{siteConfig.phoneDisplay}</p>
                <p className="text-sm text-gray-400">Cliquez pour appeler directement</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-green-800/50 bg-green-950/20 p-5 transition-all hover:border-green-600 hover:bg-green-950/40"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-green-600/20">
                <svg className="h-7 w-7 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  WhatsApp
                </p>
                <p className="text-xl font-bold text-white">{siteConfig.phoneDisplay}</p>
                <p className="text-sm text-gray-400">Message, photo, vidéo — réponse rapide</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5 transition-all hover:border-yellow-400/50 hover:bg-gray-800"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400/10">
                <Mail className="h-7 w-7 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </p>
                <p className="text-base font-bold text-white break-all">{siteConfig.email}</p>
                <p className="text-sm text-gray-400">Réponse sous 24h ouvrées</p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-yellow-400/10">
                <MapPin className="h-7 w-7 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Siège social
                </p>
                <p className="text-base font-bold text-white">{siteConfig.address}</p>
                <p className="text-sm text-gray-400">Zone d&apos;intervention : toute la Martinique</p>
              </div>
            </div>
          </div>

          {/* Hours & info */}
          <div className="space-y-6">
            {/* Opening hours */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-400" />
                <h2 className="text-lg font-bold text-white">Horaires d&apos;ouverture</h2>
              </div>
              <div className="space-y-3">
                {siteConfig.openingHours.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex justify-between border-b border-gray-800 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-gray-400">{slot.day}</span>
                    <span className="text-sm font-semibold text-white">{slot.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-red-800/40 bg-red-950/20 p-3">
                <p className="text-xs text-red-400">
                  <strong>Urgences électriques :</strong> disponibles 7j/7 — Appelez le{" "}
                  {siteConfig.phoneDisplay}
                </p>
              </div>
            </div>

            {/* Reservation CTA */}
            <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-6">
              <h3 className="mb-2 font-bold text-white">Besoin d&apos;un rendez-vous ?</h3>
              <p className="mb-4 text-sm text-gray-400">
                Planifiez une intervention ou un devis directement en ligne via
                notre formulaire de réservation.
              </p>
              <a
                href="/reservation"
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
              >
                Demander un devis
              </a>
            </div>

            {/* Diagnostic IA */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 font-bold text-white">Diagnostic rapide à distance</h3>
              <p className="mb-4 text-sm text-gray-400">
                Décrivez votre problème à notre assistant IA. Premier diagnostic
                dès 4,90 € TTC, sans déplacement.
              </p>
              <a
                href="/depannage-ia"
                className="inline-flex items-center gap-2 rounded-lg border border-yellow-400/30 px-5 py-2.5 text-sm font-bold text-yellow-400 transition-colors hover:bg-yellow-400/10"
              >
                Démarrer le diagnostic
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
