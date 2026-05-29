import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import { isSupabaseConfigured, logEnvStatus } from "@/lib/env";
import { DashboardView } from "@/components/DashboardView";
import { ConfigNotice } from "@/components/ConfigNotice";
import { LoginPrompt } from "@/components/LoginPrompt";
import type { Audit } from "@/types";

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
  const { data: audits } = await supabase!
    .from("audits")
    .select("id, original_question, trust_score, risk_level, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="container-app max-w-4xl py-12">
      <DashboardView profile={profile} audits={(audits as Audit[]) ?? []} />
    </div>
  );
}
