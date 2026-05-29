import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { DashboardView } from "@/components/DashboardView";
import { ConfigNotice } from "@/components/ConfigNotice";
import type { Audit } from "@/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="container-app py-12">
        <ConfigNotice service="Supabase" />
      </div>
    );
  }

  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login?next=/dashboard");
  }

  const supabase = await createClient();
  const { data: audits } = await supabase!
    .from("audits")
    .select("id, original_question, trust_score, risk_level, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="container-app max-w-4xl py-12">
      <DashboardView
        profile={profile}
        audits={(audits as Audit[]) ?? []}
      />
    </div>
  );
}
