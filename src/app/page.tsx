"use client";

import Link from "next/link";
import { ShieldCheck, Gauge, Globe2, Wand2 } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export default function HomePage() {
  const { t } = useI18n();

  const features = [
    { icon: Gauge, title: t("home.feature1Title"), desc: t("home.feature1Desc") },
    { icon: Globe2, title: t("home.feature2Title"), desc: t("home.feature2Desc") },
    { icon: Wand2, title: t("home.feature3Title"), desc: t("home.feature3Desc") },
  ];

  const steps = [t("home.step1"), t("home.step2"), t("home.step3")];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-app flex flex-col items-center py-20 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-1.5 text-sm font-medium text-brand-700">
            <ShieldCheck className="h-4 w-4" />
            TrustLayer AI
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t("home.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            {t("home.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/audit" className="btn-primary px-6 py-3 text-base">
              {t("home.ctaStart")}
            </Link>
            <Link href="/pricing" className="btn-secondary px-6 py-3 text-base">
              {t("home.ctaPricing")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-app py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="container-app">
          <h2 className="text-center text-2xl font-bold text-ink">
            {t("home.howTitle")}
          </h2>
          <ol className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={i} className="flex flex-col items-center text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm text-ink">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
