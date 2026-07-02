import { setRequestLocale } from "next-intl/server";
import { SolutionPage } from "@/components/solutions/solution-page";

export default async function CommunitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolutionPage namespace="communities" />;
}
