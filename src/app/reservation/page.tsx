"use client";

import { useState } from "react";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Send,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse: string;
  typeProbleme: string;
  description: string;
  typePrestation: string;
  creneau: string;
}

const typesProbleme = [
  "Panne de courant (totale)",
  "Disjoncteur qui saute",
  "Prise ou interrupteur défectueux",
  "Court-circuit",
  "Problème d'éclairage",
  "Installation nouvelle / rénovation",
  "Borne de recharge",
  "Sécurité incendie",
  "Sécurité intrusion",
  "Maintenance / vérification",
  "Urgence autre",
  "Autre",
];

const typesPrestations = [
  "Diagnostic IA (4,90 € TTC)",
  "Diagnostic humain à distance (19,90 € TTC)",
  "Visio dépannage (49,90 € TTC)",
  "Déplacement sur site (devis)",
  "Installation électrique (devis)",
  "Borne de recharge IRVE (devis)",
  "Sécurité incendie (devis)",
  "Sécurité intrusion (devis)",
  "Maintenance électrique (devis)",
  "Je ne sais pas encore",
];

const creneaux = [
  "Dès que possible / Urgence",
  "Matin (8h00 - 12h00)",
  "Après-midi (12h00 - 18h00)",
  "Ce jour même si possible",
  "Demain matin",
  "Demain après-midi",
  "Cette semaine",
  "La semaine prochaine",
  "Dans les 2 semaines",
  "Date flexible",
];

export default function ReservationPage() {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse: "",
    typeProbleme: "",
    description: "",
    typePrestation: "",
    creneau: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // Simulate submission — no backend yet
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("success");
  };

  if (formState === "success") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border-2 border-green-500">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-white">
            Demande envoyée !
          </h1>
          <p className="mb-6 text-gray-400 leading-relaxed">
            Merci {formData.prenom} ! Votre demande a bien été reçue. Nous vous
            contacterons dans les plus brefs délais au{" "}
            <strong className="text-white">{formData.telephone}</strong> ou par
            email.
          </p>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 mb-6 text-left">
            <p className="text-sm text-gray-400 mb-1">
              <span className="text-white font-semibold">Prestation :</span>{" "}
              {formData.typePrestation || "À définir"}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <span className="text-white font-semibold">Problème :</span>{" "}
              {formData.typeProbleme || "Non précisé"}
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-white font-semibold">Créneau :</span>{" "}
              {formData.creneau || "Non précisé"}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
            >
              <Phone className="h-4 w-4" />
              Appeler directement
            </a>
            <button
              onClick={() => setFormState("idle")}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-700"
            >
              Nouvelle demande
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="border-b border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Planifier une intervention
          </p>
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
            Réservation & devis
          </h1>
          <p className="text-lg text-gray-400">
            Remplissez le formulaire ci-dessous. Nous vous recontactons
            rapidement pour confirmer votre rendez-vous ou établir votre devis.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Contact sidebar */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-lg font-bold text-white">
                  Contact direct
                </h2>
                <div className="space-y-3">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4 transition-colors hover:border-yellow-400/40"
                  >
                    <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Téléphone</p>
                      <p className="font-bold text-white">
                        {siteConfig.phoneDisplay}
                      </p>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4 transition-colors hover:border-green-500/40"
                  >
                    <div className="h-5 w-5 flex-shrink-0 text-green-400">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">WhatsApp</p>
                      <p className="font-bold text-white">Envoyer un message</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4 transition-colors hover:border-yellow-400/40"
                  >
                    <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="font-bold text-white text-sm break-all">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 rounded-xl border border-gray-800 bg-gray-900 p-4">
                    <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400">Zone d&apos;intervention</p>
                      <p className="font-bold text-white">
                        {siteConfig.serviceArea}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-bold text-white">
                  Horaires
                </h2>
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                  {siteConfig.openingHours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0"
                    >
                      <span className="text-sm text-gray-400">{h.day}</span>
                      <span className="text-sm font-semibold text-white">
                        {h.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-8"
              >
                <h2 className="mb-6 text-xl font-extrabold text-white">
                  Formulaire de demande
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Nom *
                    </label>
                    <input
                      required
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Nom de famille"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Prénom *
                    </label>
                    <input
                      required
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Prénom"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Téléphone *
                    </label>
                    <input
                      required
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="06 96 XX XX XX"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Adresse d&apos;intervention *
                    </label>
                    <input
                      required
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      placeholder="Adresse complète en Martinique"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Type de problème *
                    </label>
                    <select
                      required
                      name="typeProbleme"
                      value={formData.typeProbleme}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white focus:border-yellow-400 focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionnez...</option>
                      {typesProbleme.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Type de prestation *
                    </label>
                    <select
                      required
                      name="typePrestation"
                      value={formData.typePrestation}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white focus:border-yellow-400 focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionnez...</option>
                      {typesPrestations.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Description du problème *
                    </label>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Décrivez votre problème le plus précisément possible (symptômes, depuis quand, ce que vous avez déjà essayé...)"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      <Calendar className="mr-2 inline h-4 w-4 text-yellow-400" />
                      Créneau souhaité *
                    </label>
                    <select
                      required
                      name="creneau"
                      value={formData.creneau}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white focus:border-yellow-400 focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionnez un créneau...</option>
                      {creneaux.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-semibold text-gray-300">
                      Photo (optionnel)
                    </label>
                    <div className="rounded-lg border border-dashed border-gray-700 bg-gray-800 p-6 text-center">
                      <p className="text-sm text-gray-500">
                        Envoyez une photo de votre installation par WhatsApp au{" "}
                        <a
                          href={`https://wa.me/${siteConfig.whatsapp}`}
                          className="text-yellow-400 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {siteConfig.phoneDisplay}
                        </a>{" "}
                        pour accélérer le diagnostic.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-8 py-3.5 text-sm font-bold text-black transition-colors hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? (
                      <>
                        <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Envoyer ma demande
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-gray-500">
                    En soumettant ce formulaire, vous acceptez d&apos;être contacté
                    par ElectroSécurité Inc concernant votre demande.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
