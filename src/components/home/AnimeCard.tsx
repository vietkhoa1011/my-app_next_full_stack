"use client";

import Image from "next/image";
import type { Anime } from "@/lib/anime-helpers";
import { formatMembers } from "@/lib/anime-helpers";

export default function AnimeCard({ anime, showRank }: { anime: Anime; showRank?: boolean }) {
    return (
        <div className="group relative shrink-0 w-44 md:w-48 lg:w-52 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10">
            <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                        src={anime.image_url}
                        alt={anime.Title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 176px, 208px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Score Badge */}
                    <div className="absolute top-3 left-3 bg-linear-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {anime.Score.toFixed(1)}
                    </div>

                    {/* Popularity Badge */}
                    {anime.Members > 0 && (
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white/90 text-xs px-2 py-1 rounded-full border border-white/10">
                            <svg className="w-3 h-3 inline-block mr-1 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            {formatMembers(anime.Members)}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="p-4">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {anime.Title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {anime.genres.slice(0, 2).map((genre) => (
                            <span key={genre} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/5 backdrop-blur-sm">
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rank Number for Top 10 */}
            {showRank && anime.Rank && (
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-white/20 backdrop-blur-md">
                    #{anime.Rank}
                </div>
            )}
        </div>
    );
}