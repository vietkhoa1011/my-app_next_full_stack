import { getAnimePage } from "@/features/anime/services";
import AnimeGridView from "@/features/anime/components/AnimeGridView";
import Pagination from "@/components/ui/Pagination";

export const dynamic = "force-dynamic";

export default async function AnimeListPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);
    const pageSize = 24;

    const { items, total, totalPages } = await getAnimePage(currentPage, pageSize);

    return (
        <div className="min-h-screen bg-[#0a0a1a] text-white">
            {/* Page Header */}
            <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                        <span className="w-1.5 h-10 bg-linear-to-b from-purple-500 to-pink-500 rounded-full" />
                        Browse All Anime
                    </h1>
                    <p className="text-gray-400 mt-2 ml-5">
                        Showing page {currentPage} of {totalPages} · {total.toLocaleString()} titles total
                    </p>
                </div>
            </div>

            {/* Anime Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimeGridView items={items} currentPage={currentPage} />
                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );
}