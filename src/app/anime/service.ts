import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
// service.ts

export type AnimeItem = {
    id: number;
    Title: string | null;
    Rank: number | null;
    Score: number | null;
    image_url: string | null;
};

// Helper to convert Prisma Decimal to number
function toAnimeItem(data: {
    id: number;
    Title: string | null;
    Rank: number | null;
    image_url: string | null;
    Score: Prisma.Decimal | string | number | null;
}): AnimeItem {
    return {
        id: data.id,
        Title: data.Title,
        image_url: data.image_url,
        Score: data.Score ? Number(data.Score) : null,
        Rank: data.Rank,
    };
}

export async function getTopAnime(limit = 10): Promise<AnimeItem[]> {
    const data = await prisma.anime_data.findMany({
        take: limit,
        orderBy: {
            Score: "desc",
        },
        select: {
            id: true,
            Title: true,
            image_url: true,
            Score: true,
            Rank: true,
        },
    });
    return data.map(toAnimeItem);
}

export async function getAnimeById(id: number): Promise<AnimeItem | null> {
    const data = await prisma.anime_data.findUnique({
        where: {
            id,
        },
    });
    if (!data) return null;
    return toAnimeItem(data);
}

export async function getAnimePage(
    page: number,
    pageSize: number = 20
): Promise<AnimeItem[]> {
    const data = await prisma.anime_data.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
            id: true,
            Title: true,
            image_url: true,
            Score: true,
            Rank: true,
        },
    });
    return data.map(toAnimeItem);
}