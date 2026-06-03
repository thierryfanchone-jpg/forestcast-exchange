import Link from "next/link";
import { Award, Download, QrCode, Check } from "lucide-react";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { DEMO_COURSES } from "@/lib/demo-data";
import { formatDate, getCertificateLevelColor, getCertificateLevelLabel } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Certification" };

const DEMO_CERTIFICATES = [
  {
    id: "cert-1",
    course_id: "course-1",
    user_name: "Apprenant Demo",
    certification_name: "Certification Orion Speak — Prise de parole",
    score: 92,
    level: "or" as const,
    issued_at: new Date().toISOString(),
    qr_code: "https://orion-academy.fr/verify/cert-1",
  },
];

export default function CertificationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Certifications</h1>
        <p className="mt-1 text-slate-400">Tes certifications officielles ORION ACADEMY.</p>
      </div>

      {/* Level explanation */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { level: "bronze" as const, range: "60 – 74 %", icon: "🥉" },
          { level: "argent" as const, range: "75 – 89 %", icon: "🥈" },
          { level: "or" as const, range: "90 – 100 %", icon: "🥇" },
        ].map(({ level, range, icon }) => (
          <div key={level} className="card-orion text-center">
            <div className="text-3xl mb-2">{icon}</div>
            <div className={`font-bold text-lg ${getCertificateLevelColor(level)}`}>
              {getCertificateLevelLabel(level)}
            </div>
            <div className="text-xs text-slate-400 mt-1">Score {range}</div>
          </div>
        ))}
      </div>

      {/* Earned certificates */}
      {DEMO_CERTIFICATES.map((cert) => {
        return (
          <div key={cert.id} className="card-orion">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {/* Certificate preview */}
              <div className="flex-1 rounded-xl border border-gold/20 bg-gradient-to-br from-navy to-navy-muted p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
                <div className="mb-2 flex items-center justify-center gap-2">
                  <span className="font-serif text-gold text-lg font-bold">ORION</span>
                  <span className="text-sm font-semibold tracking-widest text-white">ACADEMY</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-400 mb-4">Certificat officiel</div>
                <div className="text-2xl font-bold text-white mb-1">{cert.user_name}</div>
                <div className="text-sm text-slate-400 mb-4">a obtenu avec succès la</div>
                <div className="text-lg font-semibold text-gold mb-4">{cert.certification_name}</div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1 mb-4">
                  <span className="text-2xl">🥇</span>
                  <span className={`font-bold ${getCertificateLevelColor(cert.level)}`}>
                    Mention {getCertificateLevelLabel(cert.level)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Score : {cert.score}/100</span>
                  <span>{formatDate(cert.issued_at)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full md:w-56 space-y-4">
                <div className="flex items-center gap-3">
                  <ScoreRing score={cert.score} size={60} />
                  <div>
                    <div className={`text-lg font-bold ${getCertificateLevelColor(cert.level)}`}>
                      {getCertificateLevelLabel(cert.level)}
                    </div>
                    <div className="text-xs text-slate-400">{cert.score}/100</div>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-400">
                  {["Nom complet", "Certification officielle", "Score validé", "QR vérifiable", "Signature ORION ACADEMY"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check size={12} className="text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/api/generate-certificate?id=${cert.id}`}
                  className="btn-primary w-full justify-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Télécharger PDF
                </Link>
                <button className="btn-outline w-full justify-center gap-2 text-sm">
                  <QrCode size={16} />
                  QR Code
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Locked */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">À débloquer</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {DEMO_COURSES.slice(1).map((course) => (
            <div key={course.id} className="card-orion flex items-center gap-4 opacity-60">
              <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                <Award size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-white">{course.title}</div>
                <div className="text-xs text-slate-500">Certification disponible</div>
              </div>
              <Link href="/dashboard/formations" className="btn-secondary py-1.5 px-3 text-xs">
                Accéder
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
