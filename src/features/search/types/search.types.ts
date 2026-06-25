// ========================================
// Search feature types
// ========================================

/** Single search result item returned from API */
export interface SearchResult {
    id: number;
    title: string;
    image: string;
    score: number;
    rank: number | null;
    type: string | null;
}

/** Response shape from the search API route */
export interface SearchApiResponse {
    results: SearchResult[];
    query: string;
    total: number;
}

/** Internal state for the search hook */
export interface SearchState {
    query: string;
    results: SearchResult[];
    isOpen: boolean;
    isLoading: boolean;
    error: string | null;
    activeIndex: number;
}