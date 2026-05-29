import { redirect } from "next/navigation";
import { AuditForm } from "@/components/AuditForm";
import { getCurrentProfile } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { ConfigNotice } from "@/components/ConfigNotice";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="container-app py-12">
        <ConfigNotice service="Supabase" />
      </div>
    );
  }

  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login?next=/audit");
  }

  return (
    <div className="container-app max-w-3xl py-12">
      <AuditForm credits={profile.audit_credits} unlimited={profile.is_unlimited} />
    </div>
  );
}
