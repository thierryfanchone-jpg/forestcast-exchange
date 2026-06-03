import Link from "next/link";
import { BookOpen, Clock, Play } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { DEMO_COURSES } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mes formations" };

const DEMO_PROGRESS: Record<string, number> = {
  "course-1": 75,
  "course-2": 40,
};

export default function MesFormationsPage() {
  const purchasedCourses = DEMO_COURSES.slice(0, 2);
  const availableCourses = DEMO_COURSES.slice(2);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Mes formations</h1>
        <p className="mt-1 text-slate-400">Continue là où tu t&apos;es arrêté.</p>
      </div>

      {/* Purchased / In progress */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">En cours</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {purchasedCourses.map((course) => {
            const progress = DEMO_PROGRESS[course.id] ?? 0;
            return (
              <div key={course.id} className="card-orion card-hover group">
                <div className={`mb-4 h-20 rounded-lg bg-gradient-to-br ${course.color} flex items-end p-4`}>
                  <div className="text-lg font-bold text-white">{course.title}</div>
                </div>
                <h3 className="mb-1 font-semibold text-white">{course.subtitle}</h3>
                <div className="mb-4 flex gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={12} />{course.duration_hours}h</span>
                  <span className="flex items-center gap-1"><BookOpen size={12} />{course.lesson_count} leçons</span>
                </div>
                <Progress value={progress} showLabel className="mb-4" />
                <Link
                  href={`/dashboard/formations/${course.slug}`}
                  className="btn-primary w-full justify-center gap-2"
                >
                  <Play size={16} />
                  {progress > 0 ? "Continuer" : "Commencer"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available to unlock */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Disponibles</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {availableCourses.map((course) => (
            <div key={course.id} className="card-orion opacity-70">
              <div className={`mb-3 h-14 rounded-lg bg-gradient-to-br ${course.color} flex items-center px-4`}>
                <div className="font-bold text-white">{course.title}</div>
              </div>
              <p className="mb-3 text-sm text-slate-400">{course.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gold">{formatPrice(course.price)}</span>
                <Link href="/tarifs" className="btn-secondary py-1.5 px-3 text-xs">
                  Débloquer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
