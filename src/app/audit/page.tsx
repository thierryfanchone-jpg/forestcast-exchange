import { AuditForm } from "@/components/AuditForm";
import { getCurrentProfile } from "@/lib/auth";
import { isSupabaseConfigured, logEnvStatus } from "@/lib/env";
import { ConfigNotice } from "@/components/ConfigNotice";
import { LoginPrompt } from "@/components/LoginPrompt";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  if (!isSupabaseConfigured()) {
    logEnvStatus("audit");
    return (
      <div className="container-app py-16">
        <ConfigNotice service="Supabase" />
      </div>
    );
  }

  const profile = await getCurrentProfile();

  // Non connecté : on invite à se connecter (sans casser la navigation).
  if (!profile) {
    return (
      <div className="container-app py-16">
        <LoginPrompt next="/audit" />
      </div>
    );
  }

  return (
    <div className="container-app max-w-3xl py-12">
      <AuditForm credits={profile.audit_credits} unlimited={profile.is_unlimited} />
    </div>
  );
}
