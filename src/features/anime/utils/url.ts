/** Clean MyAnimeList image URL by removing resolution prefix */
export function cleanImageUrl(url: string | null): string {
    if (!url) return "";
    return url.replace("/r/100x140", "");
}

/** Extract MAL anime ID from page_url */
export function getMALIdFromPageUrl(url: string | null): string | null {
    if (!url) return null;
    const match = url.match(/\/anime\/(\d+)/);
    return match ? match[1] : null;
}

/** Build full MyAnimeList link */
export function buildMALLink(pageUrl: string | null, title: string | null): string | null {
    const id = getMALIdFromPageUrl(pageUrl);
    if (!id) return null;
    return `https://myanimelist.net/anime/${id}/${title?.replace(/\s+/g, "_")}`;
}