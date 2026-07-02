import { setRequestLocale } from "next-intl/server";
import { SearchView } from "@/components/search/search-view";

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SearchView />;
}
