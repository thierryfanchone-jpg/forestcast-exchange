import { getCurrentProfile } from "@/lib/auth";
import { isSupabaseConfigured, logEnvStatus } from "@/lib/env";
import { AccountView } from "@/components/AccountView";
import { ConfigNotice } from "@/components/ConfigNotice";
import { LoginPrompt } from "@/components/LoginPrompt";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!isSupabaseConfigured()) {
    logEnvStatus("account");
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
        <LoginPrompt next="/account" />
      </div>
    );
  }

  return (
    <div className="container-app py-12">
      <AccountView profile={profile} />
    </div>
  );
}
