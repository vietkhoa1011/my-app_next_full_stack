"use client";

import Image from "next/image";
import Link from "next/link";
import type { AnimeDetail, AnimeCard } from "@/features/anime/types/Anime";
import { formatMembers, formatScore, formatScoreDetailed, buildMALLink } from "@/features/anime/utils";
import ScoreBadge from "@/components/ui/ScoreBadge";

export default function AnimeDetailClient({
    anime,
    related,
}: {
    anime: AnimeDetail;
    related: AnimeCard[];
}) {
    const malLink = buildMALLink(anime.pageUrl, anime.title);

    return (
        <div className="min-h-screen bg-[#0a0a1a] text-white">
            {/* ===== Hero Section with Blurred Backdrop ===== */}
            <section className="relative min-h-[60vh] flex items-end pb-12">
                <div className="absolute inset-0 overflow-hidden">
                    {anime.imageUrl && (
                        <Image
                            src={anime.imageUrl}
                            alt={anime.title}
                            fill
                            className="object-cover scale-110 blur-xl opacity-30"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a1a] via-[#0a0a1a]/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex flex-col md:flex-row gap-8 items-end md:items-center">
                        {/* Poster Card */}
                        <div className="shrink-0 w-48 sm:w-56 lg:w-64 group">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-purple-500/20 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-purple-500/40">
                                {anime.imageUrl && (
                                    <Image
                                        src={anime.imageUrl}
                                        alt={anime.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 192px, 256px"
                                    />
                                )}
                                {anime.score > 0 && (
                                    <div className="absolute top-4 left-4">
                                        <ScoreBadge score={formatScoreDetailed(anime.score)} size="md" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info Column */}
                        <div className="flex-1 pb-4">
                            <div className="space-y-4">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                                    {anime.title}
                                </h1>

                                <div className="flex flex-wrap gap-3">
                                    {anime.type && (
                                        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm text-gray-200 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-400" />
                                            {anime.type}
                                        </span>
                                    )}
                                    {anime.episodes && (
                                        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm text-gray-200">
                                            {anime.episodes} {anime.episodes === "1" ? "Episode" : "Episodes"}
                                        </span>
                                    )}
                                    {anime.aired && (
                                        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm text-gray-200">
                                            {anime.aired}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-6 mt-2 text-gray-300 text-sm">
                                    {anime.rank && (
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            Rank: <span className="text-white font-semibold">#{anime.rank}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        {formatMembers(anime.members)} members
                                    </div>
                                    {anime.score > 0 && (
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Score: {formatScoreDetailed(anime.score)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Main Content ===== */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-linear-to-b from-purple-500 to-pink-500 rounded-full" />
                                Information
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                {anime.title}
                                {anime.type ? ` · ${anime.type}` : ""}
                                {anime.episodes ? ` · ${anime.episodes} episodes` : ""}
                                {anime.aired ? ` · Aired: ${anime.aired}` : ""}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/anime"
                                className="px-8 py-3.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Browse
                            </Link>
                            {malLink && (
                                <a
                                    href={malLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold text-white hover:bg-white/20 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    View on MyAnimeList
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
                            <h3 className="text-lg font-semibold mb-4">Information</h3>
                            <dl className="space-y-4 text-sm">
                                {anime.type && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-400">Type</dt>
                                        <dd className="text-white font-medium">{anime.type}</dd>
                                    </div>
                                )}
                                {anime.episodes && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-400">Episodes</dt>
                                        <dd className="text-white font-medium">{anime.episodes}</dd>
                                    </div>
                                )}
                                {anime.aired && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-400">Aired</dt>
                                        <dd className="text-white font-medium">{anime.aired}</dd>
                                    </div>
                                )}
                                {anime.score > 0 && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-400">Score</dt>
                                        <dd className="text-yellow-400 font-bold">{formatScoreDetailed(anime.score)}</dd>
                                    </div>
                                )}
                                {anime.rank && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-400">Ranked</dt>
                                        <dd className="text-white font-medium">#{anime.rank}</dd>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <dt className="text-gray-400">Members</dt>
                                    <dd className="text-white font-medium">{formatMembers(anime.members)}</dd>
                                </div>
                            </dl>
                        </div>

                        {related.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-xl">
                                <h3 className="text-lg font-semibold mb-4">You Might Also Like</h3>
                                <div className="space-y-3">
                                    {related.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/anime/${item.id}`}
                                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 shrink-0">
                                                {item.imageUrl ? (
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        width={48}
                                                        height={48}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-purple-300">
                                                        {item.title[0] || "?"}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-sm text-gray-300 block truncate">{item.title}</span>
                                                {item.score > 0 && (
                                                    <span className="text-xs text-yellow-400">{formatScore(item.score)}</span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}