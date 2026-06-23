export default function Footer() {
    return (
        <footer className="bg-black/30 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold bg-linear-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                                AnimeVault
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Your ultimate destination for discovering, tracking, and sharing your love for anime. Powered by community data from MyAnimeList.
                        </p>
                    </div>
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
    );
}