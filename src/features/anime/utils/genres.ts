// Fallback genres based on anime title keywords (since DB doesn't have genres)
export function getFallbackGenres(title: string): string[] {
    const t = title.toLowerCase();
    const genreMap: [RegExp, string][] = [
        [/action|fight|battle|shingeki|naruto|bleach|onepiece|dragon|hero|titan|punch|demon|slayer|jujutsu|solo|kaiju|blade|gungrave|kengan|baki|hunter|toriko|jojo|mob|psycho/g, "Action"],
        [/adventure|travel|journey|frieren|mushoku|tensura|konosuba|re:zero|isekai|sao|shield|overlord|gate|log horizon|magic/g, "Adventure"],
        [/fantasy|magic|fairy|soul|spell|witch|elf|dragon|tales|symphogear|madoka|sao|shield|overlord|re:zero|tensura/mg, "Fantasy"],
        [/comedy|funny|gintama|kaguya|saiki|konosuba|nichijou|daily|grand blue|prison school|shimoneta/g, "Comedy"],
        [/romance|love|kimi|toradora|clannad|your lie|violet|kokoro|ao haru|domestic|scum|kaguya/g, "Romance"],
        [/drama|grave|clannad|angel|anohana|violet|frieren|steins|monster|death|code|parasite/gi, "Drama"],
        [/sci|mecha|gundam|code geass|steins|psycho|ghost|evangelion|akira|space|planet|dr stone|gurren/gi, "Sci-Fi"],
        [/sports|haikyuu|kuroko|free|run|dive|major|slam|piano|ball/gi, "Sports"],
        [/slice|daily|k-on|barakamon|usagi|aria|natsume|flying|witch|shiro|girls/gi, "Slice of Life"],
        [/mystery|detective|conan|monster|death|note|paranoia|another|higurashi|shiki|steins/g, "Mystery"],
    ];
    const matched = new Set<string>();
    for (const [regex, genre] of genreMap) {
        if (regex.test(t)) {
            matched.add(genre);
        }
    }
    const allGenres = Array.from(matched);
    return allGenres.length > 0 ? allGenres : ["Fantasy", "Action"];
}

export const genresList = [
    "Action", "Adventure", "Fantasy", "Romance", "Comedy",
    "Drama", "Sci-Fi", "Sports", "Slice of Life", "Mystery",
];