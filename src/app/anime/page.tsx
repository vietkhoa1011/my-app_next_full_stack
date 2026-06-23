import { getTopAnime } from "@/app/anime/service";

export default async function HomePage() {
    const animes = await getTopAnime(10);

    return (
        <div>
            {animes.map((anime) => (
                <div key={anime.id}>
                    {anime.Title}
                    <img src={anime.image_url || ""} alt={anime.Title || "No title"} />
                    <p>Score: {Number(anime.Score).toFixed(2)}</p>
                    <p>Rank: {anime.Rank?.toString() || "N/A"}</p>
                </div>
            ))}
        </div>
    );
}
