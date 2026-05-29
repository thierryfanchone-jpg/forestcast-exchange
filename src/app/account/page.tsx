import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { AccountView } from "@/components/AccountView";
import { ConfigNotice } from "@/components/ConfigNotice";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="container-app py-12">
        <ConfigNotice service="Supabase" />
      </div>
    );
  }

  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login?next=/account");
  }

  return (
    <div className="container-app py-12">
      <AccountView profile={profile} />
    </div>
  );
}
