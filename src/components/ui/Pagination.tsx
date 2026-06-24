"use client";

import Link from "next/link";

function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
    const pages: (number | "ellipsis")[] = [1];
    const delta = 2;
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) pages.push("ellipsis");
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (rangeEnd < totalPages - 1) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
}

export default function Pagination({
    currentPage,
    totalPages,
    basePath = "/anime",
}: {
    currentPage: number;
    totalPages: number;
    basePath?: string;
}) {
    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    const btnClass = (disabled: boolean) =>
        `px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1 ${disabled
            ? "bg-white/5 text-gray-600 cursor-not-allowed"
            : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10 hover:border-purple-500/50"
        }`;

    return (
        <nav className="flex justify-center items-center gap-2 mt-12 pb-8" aria-label="Pagination">
            <Link
                href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : "#"}
                className={btnClass(currentPage <= 1)}
                aria-disabled={currentPage <= 1}
                onClick={(e) => { if (currentPage <= 1) e.preventDefault(); }}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
            </Link>

            <div className="hidden sm:flex items-center gap-1.5">
                {pageNumbers.map((page, index) =>
                    page === "ellipsis" ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500 text-sm">...</span>
                    ) : (
                        <Link
                            key={page}
                            href={`${basePath}?page=${page}`}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 ${page === currentPage
                                    ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10 hover:border-purple-500/50"
                                }`}
                        >
                            {page}
                        </Link>
                    )
                )}
            </div>

            <span className="sm:hidden text-sm text-gray-400">Page {currentPage} of {totalPages}</span>

            <Link
                href={currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : "#"}
                className={btnClass(currentPage >= totalPages)}
                aria-disabled={currentPage >= totalPages}
                onClick={(e) => { if (currentPage >= totalPages) e.preventDefault(); }}
            >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </nav>
    );
}