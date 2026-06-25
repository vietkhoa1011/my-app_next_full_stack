"use client";

import Link from "next/link";
import { SearchBar } from "@/features/search";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-linear-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
                            AnimeVault
                        </span>
                    </Link>

                    {/* Search Bar - from Search Feature */}
                    <SearchBar />

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <Link href="/anime" className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Browse</Link>
                        <a href="#" className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Trending</a>
                        <a href="#" className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Top Rated</a>
                        <div className="relative group">
                            <button className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center gap-1">
                                Genres
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </nav>

                    {/* User Avatar */}
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 p-0.5 cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                        <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center text-sm font-bold text-white">
                            A
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}