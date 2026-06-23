"use client";

import type { Anime } from "@/lib/anime-helpers";
import AnimeCard from "@/components/home/AnimeCard";
import SectionTitle from "@/components/home/SectionTitle";

export default function PopularSection({ animeList }: { animeList: Anime[] }) {
    return (
        <section className="relative py-12 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <SectionTitle color="from-pink-500 to-purple-500">Most Popular</SectionTitle>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {animeList.map((anime, index) => (
                        <AnimeCard key={anime.id} anime={{ ...anime, Rank: index + 1 }} showRank />
                    ))}
                </div>
            </div>
        </section>
    );
}