"use client";

import type { Anime } from "@/lib/anime-helpers";
import AnimeCard from "@/components/home/AnimeCard";
import SectionTitle from "@/components/home/SectionTitle";

export default function TopRatedSection({ animeList }: { animeList: Anime[] }) {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
                <SectionTitle color="from-blue-500 to-purple-500">Highest Rated</SectionTitle>
                <a href="#" className="text-sm text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1">
                    View All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
                {animeList.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
            </div>
        </section>
    );
}