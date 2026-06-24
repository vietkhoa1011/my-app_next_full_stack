// app/page.tsx
import { getTopRatedAnime, getMostPopularAnime, getRecentAnime, getFeaturedAnime } from "@/features/homepage/services";
import HomePageClient from "@/app/HomePageClient";

export const dynamic = "force-dynamic";

export default async function AnimeHomepage() {
  const [featured, topRated, popular, recent] = await Promise.all([
    getFeaturedAnime(),
    getTopRatedAnime(8),
    getMostPopularAnime(10),
    getRecentAnime(8),
  ]);

  return (
    <HomePageClient
      featured={featured}
      topRated={topRated}
      popular={popular}
      recent={recent}
    />
  );
}