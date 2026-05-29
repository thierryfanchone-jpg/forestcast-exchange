import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import { isSupabaseConfigured, logEnvStatus } from "@/lib/env";
import { DashboardView } from "@/components/DashboardView";
import { ConfigNotice } from "@/components/ConfigNotice";
import { LoginPrompt } from "@/components/LoginPrompt";
import type { Audit, Payment } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    logEnvStatus("dashboard");
    return (
      <div className="container-app py-16">
        <ConfigNotice service="Supabase" />
      </div>
    );
  }

  const profile = await getCurrentProfile();
  if (!profile) {
    return (
      <div className="container-app py-16">
        <LoginPrompt next="/dashboard" />
      </div>
    );
  }

  const supabase = await createClient();

  // Audits récents + total + paiements (RLS limite à l'utilisateur courant).
  const [{ data: audits }, { count }, { data: payments }] = await Promise.all([
    supabase!
      .from("audits")
      .select("id, original_question, trust_score, risk_level, status, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase!
      .from("audits")
      .select("id", { count: "exact", head: true }),
    supabase!
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const auditList = (audits as Audit[]) ?? [];
  const scored = auditList.filter((a) => typeof a.trust_score === "number");
  const avgScore =
    scored.length > 0
      ? Math.round(
          scored.reduce((sum, a) => sum + (a.trust_score ?? 0), 0) / scored.length
        )
      : null;

  return (
    <div className="container-app max-w-4xl py-12">
      <DashboardView
        profile={profile}
        audits={auditList}
        payments={(payments as Payment[]) ?? []}
        totalAudits={count ?? auditList.length}
        avgScore={avgScore}
      />
    </div>
  );
}
