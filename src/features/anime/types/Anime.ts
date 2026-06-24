// ========================================
// Core anime types - single source of truth
// ========================================

/** Raw Prisma model shape (what comes from database) */
export interface AnimeRaw {
    id: number;
    Title: string | null;
    Rank: number | null;
    Score: { toString(): string } | string | number | null;
    image_url: string | null;
    Members: number | null;
    Type: string | null;
    Episodes: string | null;
    Aired: string | null;
    page_url: string | null;
}

/** Base anime - fields always available */
export interface AnimeBase {
    id: number;
    title: string;
    imageUrl: string;
    score: number;
    rank: number | null;
    members: number;
    type: string | null;
}

/** Card-level anime (used in grids/carousels) */
export interface AnimeCard extends AnimeBase {
    episodes: string | null;
    genres: string[];
}

/** Detail-level anime (full info for detail page) */
export interface AnimeDetail extends AnimeBase {
    episodes: string | null;
    aired: string | null;
    pageUrl: string | null;
}

/** Paginated response */
export interface PaginatedResult<T> {
    items: T[];
    total: number;
    totalPages: number;
}