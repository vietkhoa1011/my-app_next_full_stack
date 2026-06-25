"use client";

export default function SearchEmpty({ query }: { query: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-400 text-sm">Không tìm thấy anime phù hợp</p>
            <p className="text-gray-600 text-xs mt-1">
                với từ khóa "<span className="text-gray-500">{query}</span>"
            </p>
        </div>
    );
}