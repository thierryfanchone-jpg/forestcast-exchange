import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { ReportView } from "@/components/ReportView";
import { ConfigNotice } from "@/components/ConfigNotice";
import { LoginPrompt } from "@/components/LoginPrompt";
import type { Audit } from "@/types";

export const dynamic = "force-dynamic";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <div className="container-app py-16">
        <ConfigNotice service="Supabase" />
      </div>
    );
  }

  const supabase = await createClient();
  if (!supabase) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return (
      <div className="container-app py-16">
        <LoginPrompt next={`/result/${id}`} />
      </div>
    );
  }

  // RLS garantit que l'utilisateur ne lit que ses propres audits.
  const { data: audit } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!audit) notFound();

  return (
    <div className="container-app max-w-4xl py-12">
      <ReportView audit={audit as Audit} />
    </div>
  );
}
