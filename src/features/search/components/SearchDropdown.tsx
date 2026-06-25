"use client";

import type { SearchResult } from "@/features/search/types/search.types";
import SearchResultItem from "@/features/search/components/SearchResultItem";
import SearchEmpty from "@/features/search/components/SearchEmpty";

export default function SearchDropdown({
    results,
    isLoading,
    error,
    query,
    activeIndex,
    onSelect,
    dropdownRef,
}: {
    results: SearchResult[];
    isLoading: boolean;
    error: string | null;
    query: string;
    activeIndex: number;
    onSelect: (id: number) => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
}) {
    return (
        <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-purple-500/10 overflow-hidden z-50"
            role="listbox"
            aria-label="Search results"
        >
            {/* Loading skeleton */}
            {isLoading && (
                <div className="px-4 py-4 space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 animate-pulse">
                            <div className="w-10 h-14 rounded-lg bg-white/10" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-3/4 rounded bg-white/10" />
                                <div className="h-2 w-1/2 rounded bg-white/5" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error state */}
            {!isLoading && error && (
                <div className="flex items-center justify-center py-8 px-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-red-400 text-sm">Có lỗi xảy ra, vui lòng thử lại</p>
                    </div>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && results.length === 0 && (
                <SearchEmpty query={query} />
            )}

            {/* Results */}
            {!isLoading && !error && results.length > 0 && (
                <div className="max-h-80 overflow-y-auto">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-white/5">
                        {results.length} kết quả
                    </div>
                    {results.map((item, index) => (
                        <SearchResultItem
                            key={item.id}
                            item={item}
                            index={index}
                            isActive={activeIndex === index}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}