import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";

    if (query.length < 2) {
        return NextResponse.json({ results: [], query, total: 0 });
    }

    try {
        const results = await prisma.anime_data.findMany({
            take: 10,
            where: {
                Title: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                Title: true,
                image_url: true,
                Score: true,
                Rank: true,
                Type: true,
            },
            orderBy: {
                Score: "desc",
            },
        });

        const mapped = results.map((item) => ({
            id: item.id,
            title: item.Title || "Unknown",
            image: item.image_url?.replace("/r/100x140", "") || "",
            score: item.Score ? Number(item.Score) : 0,
            rank: item.Rank,
            type: item.Type,
        }));

        return NextResponse.json({ results: mapped, query, total: mapped.length });
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json(
            { results: [], query, total: 0, error: "Search failed" },
            { status: 500 }
        );
    }
}