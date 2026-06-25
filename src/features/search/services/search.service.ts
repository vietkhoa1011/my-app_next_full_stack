import type { SearchResult } from "@/features/search/types/search.types";

/**
 * Fetches search results from the internal API route.
 * This keeps the Prisma logic server-side (API route) while the hook
 * only handles client-side concerns.
 */
export async function fetchSearchResults(query: string, signal?: AbortSignal): Promise<SearchResult[]> {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal,
        headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results as SearchResult[];
}