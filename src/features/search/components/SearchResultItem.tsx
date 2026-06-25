"use client";

import Image from "next/image";
import type { SearchResult } from "@/features/search/types/search.types";

export default function SearchResultItem({
    item,
    isActive,
    onSelect,
    index,
}: {
    item: SearchResult;
    isActive: boolean;
    onSelect: (id: number) => void;
    index: number;
}) {
    return (
        <button
            type="button"
            onMouseDown={(e) => {
                e.preventDefault();
                onSelect(item.id);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${isActive
                    ? "bg-purple-600/30 border-l-2 border-purple-400"
                    : "hover:bg-white/5 border-l-2 border-transparent"
                }`}
            role="option"
            aria-selected={isActive}
            id={`search-result-${index}`}
        >
            {/* Thumbnail */}
            <div className="w-10 h-14 rounded-lg overflow-hidden bg-white/10 shrink-0">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={40}
                        height={56}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                        {item.title[0]}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                <div className="flex items-center gap-3 mt-1">
                    {item.score > 0 && (
                        <span className="text-xs flex items-center gap-1 text-yellow-400">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {item.score.toFixed(1)}
                        </span>
                    )}
                    {item.rank && (
                        <span className="text-xs text-gray-400">#{item.rank}</span>
                    )}
                    {item.type && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400">
                            {item.type}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}