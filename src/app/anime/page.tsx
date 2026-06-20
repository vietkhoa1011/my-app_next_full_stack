// app/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// --- Types ---
interface Anime {
    id: number;
    title: string;
    image: string;
    score: number;
    genres: string[];
    popularity: number;
    synopsis?: string;
    rank?: number;
}

// --- Mock Data ---
const featuredAnime: Anime = {
    id: 1,
    title: 'Sousou no Frieren',
    image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    score: 9.12,
    genres: ['Adventure', 'Drama', 'Fantasy'],
    popularity: 1250000,
    synopsis: 'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity\'s mortality...',
};

const trendingAnime: Anime[] = [
    { id: 2, title: 'Fullmetal Alchemist: Brotherhood', image: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg', score: 9.09, genres: ['Action', 'Adventure', 'Drama'], popularity: 2850000 },
    { id: 3, title: 'Steins;Gate', image: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg', score: 9.07, genres: ['Sci-Fi', 'Thriller'], popularity: 2100000 },
    { id: 4, title: 'Attack on Titan Final Season', image: 'https://cdn.myanimelist.net/images/anime/1000/110531.jpg', score: 9.00, genres: ['Action', 'Drama', 'Fantasy'], popularity: 3200000 },
    { id: 5, title: 'Jujutsu Kaisen 2nd Season', image: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg', score: 8.88, genres: ['Action', 'Fantasy'], popularity: 1950000 },
    { id: 6, title: 'Kaguya-sama: Love is War', image: 'https://cdn.myanimelist.net/images/anime/1295/110551.jpg', score: 8.41, genres: ['Comedy', 'Romance'], popularity: 1650000 },
    { id: 7, title: 'Demon Slayer: Entertainment District Arc', image: 'https://cdn.myanimelist.net/images/anime/1908/131219.jpg', score: 8.75, genres: ['Action', 'Fantasy'], popularity: 2750000 },
];

const topRatedAnime: Anime[] = [
    { id: 8, title: 'Frieren: Beyond Journey\'s End', image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg', score: 9.12, genres: ['Adventure', 'Drama', 'Fantasy'], popularity: 1250000 },
    { id: 9, title: 'Fullmetal Alchemist: Brotherhood', image: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg', score: 9.09, genres: ['Action', 'Adventure', 'Drama'], popularity: 2850000 },
    { id: 10, title: 'Steins;Gate', image: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg', score: 9.07, genres: ['Sci-Fi', 'Thriller'], popularity: 2100000 },
    { id: 11, title: 'Gintama Season 4', image: 'https://cdn.myanimelist.net/images/anime/3/72078.jpg', score: 9.06, genres: ['Comedy', 'Action', 'Sci-Fi'], popularity: 980000 },
    { id: 12, title: 'Hunter x Hunter (2011)', image: 'https://cdn.myanimelist.net/images/anime/1337/99053.jpg', score: 9.04, genres: ['Action', 'Adventure', 'Fantasy'], popularity: 2400000 },
    { id: 13, title: 'Ginga Eiyuu Densetsu', image: 'https://cdn.myanimelist.net/images/anime/13/13225.jpg', score: 9.02, genres: ['Drama', 'Sci-Fi', 'Military'], popularity: 450000 },
    { id: 14, title: 'Attack on Titan Final Season', image: 'https://cdn.myanimelist.net/images/anime/1000/110531.jpg', score: 9.00, genres: ['Action', 'Drama', 'Fantasy'], popularity: 3200000 },
    { id: 15, title: 'Koe no Katachi', image: 'https://cdn.myanimelist.net/images/anime/1122/96435.jpg', score: 8.94, genres: ['Drama', 'Romance'], popularity: 1750000 },
];

const popularAnime: Anime[] = [
    { id: 16, title: 'Attack on Titan', image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', score: 8.54, genres: ['Action', 'Drama', 'Fantasy'], popularity: 4000000, rank: 1 },
    { id: 17, title: 'Death Note', image: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg', score: 8.62, genres: ['Mystery', 'Thriller', 'Supernatural'], popularity: 3700000, rank: 2 },
    { id: 18, title: 'Naruto', image: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', score: 7.96, genres: ['Action', 'Adventure', 'Fantasy'], popularity: 3500000, rank: 3 },
    { id: 19, title: 'Fullmetal Alchemist: Brotherhood', image: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg', score: 9.09, genres: ['Action', 'Adventure', 'Drama'], popularity: 2850000, rank: 4 },
    { id: 20, title: 'One Punch Man', image: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg', score: 8.50, genres: ['Action', 'Comedy', 'Superhero'], popularity: 2800000, rank: 5 },
    { id: 21, title: 'Sword Art Online', image: 'https://cdn.myanimelist.net/images/anime/11/39717.jpg', score: 7.20, genres: ['Action', 'Fantasy', 'Romance'], popularity: 2900000, rank: 6 },
    { id: 22, title: 'Tokyo Ghoul', image: 'https://cdn.myanimelist.net/images/anime/5/64449.jpg', score: 7.79, genres: ['Action', 'Horror', 'Supernatural'], popularity: 2600000, rank: 7 },
    { id: 23, title: 'Demon Slayer', image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg', score: 8.49, genres: ['Action', 'Fantasy', 'Historical'], popularity: 2750000, rank: 8 },
    { id: 24, title: 'My Hero Academia', image: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg', score: 7.88, genres: ['Action', 'Comedy', 'Superhero'], popularity: 2500000, rank: 9 },
    { id: 25, title: 'Jujutsu Kaisen', image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg', score: 8.63, genres: ['Action', 'Fantasy', 'Supernatural'], popularity: 1950000, rank: 10 },
];

const recentAnime: Anime[] = [
    { id: 26, title: 'Solo Leveling', image: 'https://cdn.myanimelist.net/images/anime/1729/140289.jpg', score: 8.32, genres: ['Action', 'Adventure', 'Fantasy'], popularity: 850000 },
    { id: 27, title: 'Kaijuu 8-gou', image: 'https://cdn.myanimelist.net/images/anime/1563/140390.jpg', score: 8.15, genres: ['Action', 'Sci-Fi', 'Fantasy'], popularity: 620000 },
    { id: 28, title: 'Oshi no Ko', image: 'https://cdn.myanimelist.net/images/anime/1812/134450.jpg', score: 8.69, genres: ['Drama', 'Supernatural'], popularity: 980000 },
    { id: 29, title: 'Mushoku Tensei II', image: 'https://cdn.myanimelist.net/images/anime/1492/137287.jpg', score: 8.42, genres: ['Adventure', 'Drama', 'Fantasy'], popularity: 710000 },
    { id: 30, title: 'Frieren', image: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg', score: 9.12, genres: ['Adventure', 'Drama', 'Fantasy'], popularity: 1250000 },
    { id: 31, title: 'The Apothecary Diaries', image: 'https://cdn.myanimelist.net/images/anime/1860/138756.jpg', score: 8.68, genres: ['Drama', 'Mystery', 'Historical'], popularity: 580000 },
    { id: 32, title: 'Bleach: Sennen Kessen-hen', image: 'https://cdn.myanimelist.net/images/anime/1908/131219.jpg', score: 8.98, genres: ['Action', 'Adventure', 'Fantasy'], popularity: 890000 },
    { id: 33, title: 'Spy x Family Season 2', image: 'https://cdn.myanimelist.net/images/anime/1965/138517.jpg', score: 8.38, genres: ['Action', 'Comedy', 'Slice of Life'], popularity: 750000 },
];

const genresList = [
    'Action', 'Adventure', 'Fantasy', 'Romance', 'Comedy',
    'Drama', 'Sci-Fi', 'Sports', 'Slice of Life', 'Mystery'
];

// --- Components ---
const AnimeCard = ({ anime, showRank }: { anime: Anime; showRank?: boolean }) => (
    <div className="group relative flex-shrink-0 w-44 md:w-48 lg:w-52 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10">
        <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
            <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                    src={anime.image}
                    alt={anime.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 176px, 208px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Score Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {anime.score.toFixed(1)}
                </div>

                {/* Popularity Badge */}
                {anime.popularity > 0 && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white/90 text-xs px-2 py-1 rounded-full border border-white/10">
                        <svg className="w-3 h-3 inline-block mr-1 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {(anime.popularity / 1000000).toFixed(1)}M
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {anime.title}
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
        {showRank && anime.rank && (
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-white/20 backdrop-blur-md">
                #{anime.rank}
            </div>
        )}
    </div>
);

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <div className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 transform hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center text-center gap-3">
            <div className="text-4xl text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                {icon}
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                {value}
            </div>
            <div className="text-sm text-gray-400 font-medium">{label}</div>
        </div>
    </div>
);

const GenreButton = ({ genre, active, onClick }: { genre: string; active?: boolean; onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-md border transform hover:scale-105 ${active
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30'
            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:text-white'
            }`}
    >
        {genre}
    </button>
);

// --- Main Component ---
export default function AnimeHomepage() {
    const [activeGenre, setActiveGenre] = useState<string>('Action');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a1a] text-white selection:bg-purple-500/30 selection:text-white">
            {/* ===== Header ===== */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
                                AnimeVault
                            </span>
                        </div>

                        {/* Search Bar */}
                        <div className={`flex-1 max-w-xl relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
                            <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center text-sm font-bold text-white">
                                A
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-16">
                {/* ===== Hero Banner ===== */}
                <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={featuredAnime.image}
                            alt={featuredAnime.title}
                            fill
                            className="object-cover object-center scale-110 blur-sm"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-[#0a0a1a]/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl space-y-6 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm backdrop-blur-md">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                #{1} Featured Anime
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                                {featuredAnime.title}
                            </h1>

                            <div className="flex flex-wrap gap-2">
                                {featuredAnime.genres.map((genre) => (
                                    <span key={genre} className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm text-gray-200 border border-white/10">
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed line-clamp-3 max-w-xl">
                                {featuredAnime.synopsis}
                            </p>

                            <div className="flex gap-4 pt-2">
                                <button className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2">
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

                {/* ===== Trending Carousel ===== */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                            Trending Now
                        </h2>
                        <a href="#" className="text-sm text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1">
                            View All
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
                        {trendingAnime.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                </section>

                {/* ===== Top Rated Grid ===== */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                            Highest Rated
                        </h2>
                        <a href="#" className="text-sm text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1">
                            View All
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
                        {topRatedAnime.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                </section>

                {/* ===== Most Popular Top 10 ===== */}
                <section className="relative py-12 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                <span className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                                Most Popular
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {popularAnime.map((anime) => (
                                <AnimeCard key={anime.id} anime={anime} showRank />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== Browse by Genre ===== */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                        <span className="w-1 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full" />
                        Browse by Genre
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {genresList.map((genre) => (
                            <GenreButton
                                key={genre}
                                genre={genre}
                                active={activeGenre === genre}
                                onClick={() => setActiveGenre(genre)}
                            />
                        ))}
                    </div>
                </section>

                {/* ===== Statistics Section ===== */}
                <section className="relative py-16">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                label="Anime"
                                value="24,905"
                                icon={
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                                    </svg>
                                }
                            />
                            <StatCard
                                label="Users"
                                value="731,290"
                                icon={
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                }
                            />
                            <StatCard
                                label="Reviews"
                                value="24M+"
                                icon={
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                }
                            />
                            <StatCard
                                label="Genres"
                                value="50+"
                                icon={
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* ===== Recently Added ===== */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                            Recently Added
                        </h2>
                        <a href="#" className="text-sm text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1">
                            View All
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
                        {recentAnime.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                </section>

                {/* ===== CTA Section ===== */}
                <section className="relative py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-pink-900/30" />
                    <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />

                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />

                    <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300 bg-clip-text text-transparent">
                            Discover Your Next Favorite Anime
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                            Explore personalized recommendations based on your taste. Our AI-powered engine learns what you love to suggest the perfect anime for you.
                        </p>
                        <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95">
                            Explore Recommendations
                            <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </section>
            </main>

            {/* ===== Footer ===== */}
            <footer className="bg-black/30 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                                    AnimeVault
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm max-w-xs">
                                Your ultimate destination for discovering, tracking, and sharing your love for anime. Powered by community data from MyAnimeList.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">About</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">GitHub</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">API Documentation</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Status</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Connect</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Discord</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors">Reddit</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
                        <p>&copy; 2024 AnimeVault. Data sourced from MyAnimeList. This is a fan project and not affiliated with MyAnimeList.</p>
                    </div>
                </div>
            </footer>

            {/* Custom CSS for animations and scrollbar */}
            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }
      `}</style>
        </div>
    );
}