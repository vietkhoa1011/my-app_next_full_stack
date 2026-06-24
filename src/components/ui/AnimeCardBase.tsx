"use client";

import Image from "next/image";
import Link from "next/link";
import { formatScore, formatMembers } from "@/features/anime/utils";
import ScoreBadge from "@/components/ui/ScoreBadge";

interface AnimeCardBaseProps {
    id: number;
    title: string;
    imageUrl: string;
    score: number;
    rank: number | null;
    members: number;
    type: string | null;
    episodes: string | null;
    genres?: string[];
    showNumber?: number;
    /** Link href override (defaults to /anime/${id}) */
    href?: string;
    /** Card sizing variant */
    size?: "sm" | "md";
}

export default function AnimeCardBase({
    id,
    title,
    imageUrl,
    score,
    rank,
    members,
    type,
    episodes,
    genres,
    showNumber,
    href = `/anime/${id}`,
    size = "md",
}: AnimeCardBaseProps) {
    const isSmall = size === "sm";
    const outerWidth = isSmall
        ? "w-36 md:w-40"
        : "w-44 md:w-48 lg:w-52";
    const infoPadding = isSmall ? "p-3" : "p-4";

    return (
        <Link
            href={href}
            className={`group relative shrink-0 ${outerWidth} cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10`}
        >
            <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                <div className="relative aspect-3/4 overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 176px, 208px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute top-3 left-3">
                        <ScoreBadge score={formatScore(score)} />
                    </div>

                    {rank && (
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white/90 text-xs px-2 py-1 rounded-full border border-white/10">
                            #{rank}
                        </div>
                    )}
                </div>

                <div className={infoPadding}>
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                        {genres?.slice(0, 2).map((genre) => (
                            <span key={genre} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/5 backdrop-blur-sm">
                                {genre}
                            </span>
                        ))}
                        {!genres && type && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-400 border border-white/5">
                                {type}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {showNumber && (
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xl border-2 border-white/20 backdrop-blur-md">
                    #{showNumber}
                </div>
            )}
        </Link>
    );
}