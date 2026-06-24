"use client";

import type { AnimeCard } from "@/features/anime/types/Anime";
import AnimeCardBase from "@/components/ui/AnimeCardBase";
import { formatMembers } from "@/features/anime/utils";

export default function AnimeGridView({
    items,
    currentPage,
}: {
    items: AnimeCard[];
    currentPage: number;
}) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
            {items.map((anime, index) => (
                <div key={anime.id} className="relative">
                    <AnimeCardBase
                        id={anime.id}
                        title={anime.title}
                        imageUrl={anime.imageUrl}
                        score={anime.score}
                        rank={anime.rank}
                        members={anime.members}
                        type={anime.type}
                        episodes={anime.episodes}
                        genres={anime.genres}
                    />
                    {/* Row Number */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-linear-to-br from-purple-600/80 to-blue-600/80 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white/20">
                        {(currentPage - 1) * 24 + index + 1}
                    </div>
                </div>
            ))}
        </div>
    );
}