import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export interface AnimeHomepageItem {
    id: number;
    Title: string;
    image_url: string;
    Score: number;
    Rank: number | null;
    Members: number;
    Type: string | null;
}

function cleanImageUrl(url: string | null): string {
    if (!url) return "";
    return url.replace("/r/100x140", "");
}

function toAnimeItem(data: {
    id: number;
    Title: string | null;
    image_url: string | null;
    Score: Prisma.Decimal | string | number | null;
    Rank: number | null;
    Members: number | null;
    Type: string | null;
}): AnimeHomepageItem {
    return {
        id: data.id,
        Title: data.Title || "Unknown Title",
        image_url: cleanImageUrl(data.image_url),
        Score: data.Score ? Number(data.Score) : 0,
        Rank: data.Rank,
        Members: data.Members || 0,
        Type: data.Type,
    };
}

/**
 * Get the top anime by Score (for Highest Rated section)
 */
export async function getTopRatedAnime(limit: number = 8): Promise<AnimeHomepageItem[]> {
    const data = await prisma.anime_data.findMany({
        take: limit,
        orderBy: { Score: "desc" },
        select: {
            id: true,
            Title: true,
            image_url: true,
            Score: true,
            Rank: true,
            Members: true,
            Type: true,
        },
        where: {
            Score: { not: null },
            image_url: { not: null },
        },
    });
    return data.map(toAnimeItem);
}

/**
 * Get the most popular anime by Members (for Trending / Most Popular section)
 */
export async function getMostPopularAnime(limit: number = 10): Promise<AnimeHomepageItem[]> {
    const data = await prisma.anime_data.findMany({
        take: limit,
        orderBy: { Members: "desc" },
        select: {
            id: true,
            Title: true,
            image_url: true,
            Score: true,
            Rank: true,
            Members: true,
            Type: true,
        },
        where: {
            Members: { not: null },
            image_url: { not: null },
        },
    });
    return data.map(toAnimeItem);
}

/**
 * Get recently added anime (for Recently Added section)
 */
export async function getRecentAnime(limit: number = 8): Promise<AnimeHomepageItem[]> {
    const data = await prisma.anime_data.findMany({
        take: limit,
        orderBy: { id: "desc" },
        select: {
            id: true,
            Title: true,
            image_url: true,
            Score: true,
            Rank: true,
            Members: true,
            Type: true,
        },
        where: {
            image_url: { not: null },
        },
    });
    return data.map(toAnimeItem);
}

/**
 * Get featured anime (highest ranked by Score)
 */
export async function getFeaturedAnime(): Promise<AnimeHomepageItem | null> {
    const data = await prisma.anime_data.findFirst({
        orderBy: { Score: "desc" },
        select: {
            id: true,
            Title: true,
            image_url: true,
            Score: true,
            Rank: true,
            Members: true,
            Type: true,
        },
        where: {
            image_url: { not: null },
        },
    });
    return data ? toAnimeItem(data) : null;
}