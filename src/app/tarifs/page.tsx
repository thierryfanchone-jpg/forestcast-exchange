import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PRICING_PLANS } from "@/lib/demo-data";
import { Check, Zap, Crown, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "Choisissez la formule ORION ACADEMY qui correspond à vos ambitions.",
};

export default function TarifsPage() {
  const standardPlans = PRICING_PLANS.filter((p) => p.id !== "plus");
  const plusPlan = PRICING_PLANS.find((p) => p.id === "plus");

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="bg-navy-light py-20">
          <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
            <h1 className="section-title mb-4">Tarifs transparents</h1>
            <p className="section-subtitle mx-auto max-w-xl">
              Investis dans ta progression. Choisis la formule adaptée à ton objectif.
            </p>
          </div>
        </section>

        {/* Standard plans */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {standardPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`card-orion flex flex-col ${
                    plan.is_popular ? "border-gold/40 shadow-gold-glow relative" : ""
                  }`}
                >
                  {plan.is_popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold px-4 py-1 text-xs font-bold text-[#0b1120]">
                        <Zap size={12} /> Populaire
                      </span>
                    </div>
                  )}

                  <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    {plan.name}
                  </div>

                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price === 0 ? "0€" : `${plan.price}€`}
                    </span>
                    {plan.period && (
                      <span className="mb-1 text-sm text-slate-400">/{plan.period}</span>
                    )}
                  </div>

                  <p className="mb-6 text-sm text-slate-400">{plan.description}</p>

                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check size={14} className="mt-0.5 shrink-0 text-green-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/inscription"
                    className={`justify-center text-sm ${
                      plan.is_popular ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ORION PLUS — Premium block */}
        {plusPlan && (
          <section className="bg-navy-light py-16">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
              <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-navy-muted to-navy p-8 shadow-gold-glow md:p-12">
                {/* Gold bar top */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

                <div className="grid items-center gap-10 md:grid-cols-2">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-bold text-gold">
                      <Crown size={14} />
                      Offre Premium
                    </div>
                    <h2 className="mb-3 text-4xl font-bold text-white">
                      ORION <span className="text-gold">PLUS</span>
                    </h2>
                    <p className="mb-4 text-slate-400">{plusPlan.description}</p>
                    <div className="mb-6 flex items-end gap-2">
                      <span className="text-5xl font-bold text-white">{plusPlan.price}€</span>
                      <span className="mb-1 text-slate-400">paiement unique</span>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/orion-plus"
                        className="btn-primary gap-2 justify-center"
                      >
                        Rejoindre ORION PLUS
                        <ArrowRight size={16} />
                      </Link>
                      <Link href="/orion-plus" className="btn-outline justify-center">
                        Voir le détail
                      </Link>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                      Garantie satisfait ou remboursé 14 jours · Places limitées
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {plusPlan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-slate-300">
                        <Check size={16} className="shrink-0 text-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ teaser */}
        <section className="py-12">
          <div className="text-center">
            <p className="text-slate-400">
              Des questions ?{" "}
              <Link href="/#faq" className="text-gold underline-offset-2 hover:underline">
                Consultez notre FAQ
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
