import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Play, BookOpen, MessageSquare, CheckCircle, Lock } from "lucide-react";
import { DEMO_COURSES } from "@/lib/demo-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePlayerPage({ params }: Props) {
  const { slug } = await params;
  const course = DEMO_COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  const DEMO_LESSONS = Array.from({ length: course.lesson_count > 8 ? 8 : course.lesson_count }, (_, i) => ({
    id: `lesson-${i + 1}`,
    title: `Leçon ${i + 1} : ${["Introduction et bases", "Techniques fondamentales", "Exercices pratiques", "Cas concrets", "Mise en situation", "Analyse et feedback", "Progression avancée", "Évaluation finale"][i]}`,
    duration: Math.floor(Math.random() * 10) + 5,
    is_completed: i < 3,
    is_locked: i > 4,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/formations" className="flex items-center gap-2 text-sm text-slate-400 hover:text-gold">
          <ArrowLeft size={16} /> Mes formations
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-sm text-white">{course.title}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video player area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video placeholder */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-navy-muted border border-navy-border flex items-center justify-center">
            <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-20`} />
            <div className="relative z-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 backdrop-blur">
                <Play size={24} className="text-gold ml-1" />
              </div>
              <div className="text-white font-semibold">Leçon 4 : Cas concrets</div>
              <div className="text-slate-400 text-sm mt-1">7 min</div>
            </div>
          </div>

          {/* Lesson content */}
          <div className="card-orion">
            <h2 className="mb-3 text-lg font-bold text-white">Résumé de la leçon</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Dans cette leçon, nous allons explorer des cas concrets et des exemples réels tirés de situations professionnelles. Tu vas apprendre à appliquer les techniques vues précédemment dans des contextes variés.
            </p>
            <div className="mt-4 rounded-lg border border-navy-border bg-navy p-4">
              <div className="text-sm font-semibold text-white mb-2">📝 Exercice pratique</div>
              <p className="text-sm text-slate-400">Prépare une réponse à la question : &quot;Parlez-moi d&apos;une situation difficile que vous avez gérée.&quot;</p>
              <Link href="/dashboard/coach" className="btn-primary mt-3 inline-flex items-center gap-2 text-xs py-2 px-3">
                <MessageSquare size={14} />
                Faire l&apos;exercice avec l&apos;IA
              </Link>
            </div>
          </div>
        </div>

        {/* Lessons list */}
        <div className="card-orion h-fit">
          <h3 className="mb-4 font-semibold text-white flex items-center gap-2">
            <BookOpen size={16} className="text-gold" />
            Leçons ({course.lesson_count})
          </h3>
          <div className="space-y-2">
            {DEMO_LESSONS.map((lesson, i) => (
              <button
                key={lesson.id}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  i === 3
                    ? "bg-gold/10 text-gold"
                    : lesson.is_locked
                    ? "text-slate-600 cursor-not-allowed"
                    : "text-slate-400 hover:bg-navy-muted hover:text-white"
                }`}
                disabled={lesson.is_locked}
              >
                {lesson.is_completed ? (
                  <CheckCircle size={16} className="shrink-0 text-green-400" />
                ) : lesson.is_locked ? (
                  <Lock size={16} className="shrink-0" />
                ) : (
                  <Play size={16} className="shrink-0" />
                )}
                <span className="flex-1 truncate">{lesson.title}</span>
                <span className="text-xs shrink-0">{lesson.duration}m</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
