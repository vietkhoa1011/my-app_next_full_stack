"use client";

import { useState } from "react";
import type { AnimeCard } from "@/features/anime/types/Anime";
import { getFallbackGenres, genresList } from "@/features/anime/utils";
import AnimeCardBase from "@/components/ui/AnimeCardBase";
import HeroSection from "@/components/home/HeroSection";

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <div className="relative group p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 transform hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center text-center gap-3">
            <div className="text-4xl text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                {icon}
            </div>
            <div className="text-3xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
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
            ? "bg-linear-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/30"
            : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:text-white"
            }`}
    >
        {genre}
    </button>
);

export default function HomePageClient({
    featured,
    topRated,
    popular,
    recent,
}: {
    featured: AnimeCard | null;
    topRated: AnimeCard[];
    popular: AnimeCard[];
    recent: AnimeCard[];
}) {
    const [activeGenre, setActiveGenre] = useState<string>("Action");

    // Add genres to anime for display
    const featuredAnime = featured
        ? { ...featured, genres: featured.genres || getFallbackGenres(featured.title) }
        : null;
    const popularAnime = popular.map((a) => ({
        ...a,
        genres: getFallbackGenres(a.title),
    }));

    return (
        <div className="min-h-screen bg-[#0a0a1a] text-white selection:bg-purple-500/30 selection:text-white">
            {/* Hero Banner */}
            {featuredAnime && <HeroSection anime={featuredAnime} />}

            {/* Trending Carousel */}
            {popularAnime.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <span className="w-1 h-8 bg-linear-to-b from-purple-500 to-pink-500 rounded-full" />
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
                        {popularAnime.slice(0, 7).map((anime) => (
                            <AnimeCardBase
                                key={anime.id}
                                id={anime.id}
                                title={anime.title}
                                imageUrl={anime.imageUrl}
                                score={anime.score}
                                rank={anime.rank}
                                members={anime.members}
                                type={anime.type}
                                episodes={anime.episodes}
                                genres={anime.genres}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Top Rated Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                        <span className="w-1 h-8 bg-linear-to-b from-blue-500 to-purple-500 rounded-full" />
                        Highest Rated
                    </h2>
                    <a href="/anime?page=1" className="text-sm text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1">
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
                    {topRated.map((anime) => (
                        <AnimeCardBase
                            key={anime.id}
                            id={anime.id}
                            title={anime.title}
                            imageUrl={anime.imageUrl}
                            score={anime.score}
                            rank={anime.rank}
                            members={anime.members}
                            type={anime.type}
                            episodes={anime.episodes}
                            genres={getFallbackGenres(anime.title)}
                        />
                    ))}
                </div>
            </section>

            {/* Most Popular Top 10 */}
            <section className="relative py-12 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <span className="w-1 h-8 bg-linear-to-b from-pink-500 to-purple-500 rounded-full" />
                            Most Popular
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {popularAnime.map((anime, index) => (
                            <AnimeCardBase
                                key={anime.id}
                                id={anime.id}
                                title={anime.title}
                                imageUrl={anime.imageUrl}
                                score={anime.score}
                                rank={anime.rank}
                                members={anime.members}
                                type={anime.type}
                                episodes={anime.episodes}
                                genres={anime.genres}
                                showNumber={index + 1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Browse by Genre */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-linear-to-b from-green-400 to-blue-500 rounded-full" />
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

            {/* Statistics Section */}
            <section className="relative py-16">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/10 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard label="Anime" value="24,905" icon={
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" /></svg>
                        } />
                        <StatCard label="Users" value="731,290" icon={
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                        } />
                        <StatCard label="Reviews" value="24M+" icon={
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                        } />
                        <StatCard label="Genres" value="50+" icon={
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                        } />
                    </div>
                </div>
            </section>

            {/* Recently Added */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                        <span className="w-1 h-8 bg-linear-to-b from-purple-500 to-blue-500 rounded-full" />
                        Recently Added
                    </h2>
                    <a href="/anime?page=1" className="text-sm text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1">
                        View All
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4">
                    {recent.map((anime) => (
                        <AnimeCardBase
                            key={anime.id}
                            id={anime.id}
                            title={anime.title}
                            imageUrl={anime.imageUrl}
                            score={anime.score}
                            rank={anime.rank}
                            members={anime.members}
                            type={anime.type}
                            episodes={anime.episodes}
                            genres={getFallbackGenres(anime.title)}
                        />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-900/30 via-blue-900/30 to-pink-900/30" />
                <div className="absolute inset-0 backdrop-blur-xl bg-white/5" />
                <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-purple-300 via-blue-300 to-pink-300 bg-clip-text text-transparent">
                        Discover Your Next Favorite Anime
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                        Explore personalized recommendations based on your taste. Our AI-powered engine learns what you love to suggest the perfect anime for you.
                    </p>
                    <button className="px-10 py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-white text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95">
                        Explore Recommendations
                        <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    );
}