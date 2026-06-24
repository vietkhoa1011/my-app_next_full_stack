import type { AnimeCard, AnimeDetail, AnimeRaw } from "@/features/anime/types/Anime";
import { cleanImageUrl } from "@/features/anime/utils/url";
import { getFallbackGenres } from "@/features/anime/utils/genres";

/** Convert raw Prisma Decimal to number */
function toNumber(val: unknown): number {
    if (val === null || val === undefined) return 0;
    if (typeof val === "number") return val;
    if (typeof val === "string") return parseFloat(val);
    if (typeof (val as { toString: () => string }).toString === "function") {
        return parseFloat((val as { toString: () => string }).toString());
    }
    return 0;
}

/** Convert raw data to AnimeCard (for grids/carousels) */
export function toAnimeCard(raw: AnimeRaw, genres?: string[]): AnimeCard {
    return {
        id: raw.id,
        title: raw.Title || "Unknown Title",
        imageUrl: cleanImageUrl(raw.image_url),
        score: toNumber(raw.Score),
        rank: raw.Rank,
        members: raw.Members || 0,
        type: raw.Type,
        episodes: raw.Episodes,
        genres: genres || getFallbackGenres(raw.Title || ""),
    };
}

/** Convert raw data to AnimeDetail (for detail page) */
export function toAnimeDetail(raw: AnimeRaw): AnimeDetail {
    return {
        id: raw.id,
        title: raw.Title || "Unknown Title",
        imageUrl: cleanImageUrl(raw.image_url),
        score: toNumber(raw.Score),
        rank: raw.Rank,
        members: raw.Members || 0,
        type: raw.Type,
        episodes: raw.Episodes,
        aired: raw.Aired,
        pageUrl: raw.page_url,
    };
}

/** Convert raw data with nullable fields to AnimeCard */
export function toAnimeCardRaw(raw: {
    id: number;
    Title: string | null;
    Rank: number | null;
    Score: unknown;
    image_url: string | null;
    Members: number | null;
    Type: string | null;
    Episodes?: string | null;
}): AnimeCard {
    return {
        id: raw.id,
        title: raw.Title || "Unknown Title",
        imageUrl: cleanImageUrl(raw.image_url),
        score: toNumber(raw.Score),
        rank: raw.Rank,
        members: raw.Members || 0,
        type: raw.Type,
        episodes: raw.Episodes ?? null,
        genres: getFallbackGenres(raw.Title || ""),
    };
}
