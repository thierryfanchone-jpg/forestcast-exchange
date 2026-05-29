import { env, isTavilyConfigured } from "@/lib/env";

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

/**
 * Recherche web via l'API Tavily.
 * Retourne un tableau vide (et ne jette pas) si la clé est absente ou
 * si l'appel échoue — l'audit reste possible mais sans sources externes.
 */
export async function searchWeb(query: string): Promise<TavilyResult[]> {
  if (!isTavilyConfigured()) {
    return [];
  }

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: env.tavilyApiKey,
        query: query.slice(0, 400),
        search_depth: "advanced",
        max_results: 6,
        include_answer: false,
      }),
    });

    if (!res.ok) {
      console.error("Tavily a répondu", res.status);
      return [];
    }

    const data = (await res.json()) as { results?: TavilyResult[] };
    return Array.isArray(data.results) ? data.results : [];
  } catch (err) {
    console.error("Erreur Tavily:", err);
    return [];
  }
}
