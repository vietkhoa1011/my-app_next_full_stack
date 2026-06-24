import { getAnimeById, getRelatedAnime } from "@/features/anime/services";
import AnimeDetailClient from "@/app/anime/[id]/AnimeDetailClient";

export default async function AnimeDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const animeId = parseInt(id, 10);

    if (isNaN(animeId)) {
        return <div className="min-h-screen bg-[#0a0a1a] text-white flex items-center justify-center">Invalid anime ID</div>;
    }

    const [anime, related] = await Promise.all([
        getAnimeById(animeId),
        getRelatedAnime(animeId, 5),
    ]);

    if (!anime) {
        return (
            <div className="min-h-screen bg-[#0a0a1a] text-white flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="text-gray-400">Anime not found</p>
                <a href="/anime" className="px-6 py-2 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-colors">
                    Browse Anime
                </a>
            </div>
        );
    }

    return <AnimeDetailClient anime={anime} related={related} />;
}