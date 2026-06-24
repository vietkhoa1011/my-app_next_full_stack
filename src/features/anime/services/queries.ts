import { prisma } from "@/lib/prisma";
import { animeCardSelect, animeHomeCardSelect, hasImage } from "@/features/anime/services/selects";
import { toAnimeDetail, toAnimeCardRaw } from "@/features/anime/mappers";
import type { AnimeCard, AnimeDetail } from "@/features/anime/types/Anime";

// ===================================================
// Anime list queries (for /anime - paginated browse)
// ===================================================

export async function getAnimePage(
    page: number,
    pageSize: number = 24
): Promise<{ items: AnimeCard[]; total: number; totalPages: number }> {
    const where = hasImage;

    const [items, total] = await Promise.all([
        prisma.anime_data.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { id: "asc" },
            select: animeCardSelect,
            where,
        }),
        prisma.anime_data.count({ where }),
    ]);

    return {
        items: items.map(toAnimeCardRaw),
        total,
        totalPages: Math.ceil(total / pageSize),
    };
}

// ===================================================
// Single anime queries (for /anime/[id])
// ===================================================

export async function getAnimeById(id: number): Promise<AnimeDetail | null> {
    const data = await prisma.anime_data.findUnique({
        where: { id },
    });
    if (!data) return null;
    return toAnimeDetail(data);
}

// ===================================================
// Related anime (same type, different id)
// ===================================================

export async function getRelatedAnime(id: number, limit: number = 5): Promise<AnimeCard[]> {
    const current = await prisma.anime_data.findUnique({
        where: { id },
        select: { Type: true },
    });
    if (!current) return [];

    const data = await prisma.anime_data.findMany({
        take: limit,
        orderBy: { Score: "desc" },
        where: {
            Type: current.Type,
            id: { not: id },
            ...hasImage,
        },
        select: animeCardSelect,
    });

    return data.map(toAnimeCardRaw);
}

// ===================================================
// Homepage queries (featured, top, popular, recent)
// ===================================================

export async function getTopRatedAnime(limit: number = 8): Promise<AnimeCard[]> {
    const data = await prisma.anime_data.findMany({
        take: limit,
        orderBy: { Score: "desc" },
        select: animeHomeCardSelect,
        where: { Score: { not: null }, ...hasImage },
    });
    return data.map(toAnimeCardRaw);
}

export async function getMostPopularAnime(limit: number = 10): Promise<AnimeCard[]> {
    const data = await prisma.anime_data.findMany({
        take: limit,
        orderBy: { Members: "desc" },
        select: animeHomeCardSelect,
        where: { Members: { not: null }, ...hasImage },
    });
    return data.map(toAnimeCardRaw);
}

export async function getRecentAnime(limit: number = 8): Promise<AnimeCard[]> {
    const data = await prisma.anime_data.findMany({
        take: limit,
        orderBy: { id: "desc" },
        select: animeHomeCardSelect,
        where: hasImage,
    });
    return data.map(toAnimeCardRaw);
}

export async function getFeaturedAnime(): Promise<AnimeCard | null> {
    const data = await prisma.anime_data.findFirst({
        orderBy: { Score: "desc" },
        select: animeHomeCardSelect,
        where: hasImage,
    });
    return data ? toAnimeCardRaw(data) : null;
}