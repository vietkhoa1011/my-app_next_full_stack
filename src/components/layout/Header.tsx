"use client";

import { useState } from "react";

export default function Header() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-linear-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
                            AnimeVault
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className={`flex-1 max-w-xl relative transition-all duration-300 ${isSearchFocused ? "scale-105" : ""}`}>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-linear-to-r from-purple-500/50 to-blue-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 group-hover:border-purple-500/50 transition-all duration-300">
                                <svg className="w-5 h-5 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm 24,905 anime..."
                                    className="w-full bg-transparent text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-sm"
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <a href="#" className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">Browse</a>
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