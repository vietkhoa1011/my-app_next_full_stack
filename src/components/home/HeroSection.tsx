"use client";

import Image from "next/image";
import type { AnimeCard } from "@/features/anime/types/Anime";
import { formatMembersStrict, formatScore } from "@/features/anime/utils";

interface HeroAnime extends AnimeCard {
    genres: string[];
}

export default function HeroSection({ anime }: { anime: HeroAnime }) {
    return (
        <section className="relative h-[70vh] min-h-145 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={anime.imageUrl}
                    alt={anime.title}
                    fill
                    className="object-cover object-center scale-110 blur-sm"
                    priority
                    loading="eager"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#0a0a1a] via-[#0a0a1a]/80 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a1a] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl space-y-6 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm backdrop-blur-md">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        #1 Featured Anime
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                        {anime.title}
                    </h1>

                    <div className="flex flex-wrap gap-2">
                        {anime.genres.map((genre) => (
                            <span key={genre} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm text-gray-200 border border-white/10">
                                {genre}
                            </span>
                        ))}
                        {anime.type && (
                            <span className="px-4 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-md text-sm text-purple-300 border border-purple-500/30">
                                {anime.type}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed line-clamp-3 max-w-xl">
                        Score: {formatScore(anime.score)} | Rank: #{anime.rank || "N/A"} | Members: {formatMembersStrict(anime.members)}
                    </p>

                    <div className="flex gap-4 pt-2">
                        <button className="px-8 py-3.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            View Details
                        </button>
                        <button className="px-8 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2">
                            <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            Add to Favorites
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}