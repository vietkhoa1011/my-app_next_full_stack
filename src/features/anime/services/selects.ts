/**
 * Reusable Prisma select objects to eliminate duplication
 * across multiple query functions.
 */

/** Card-level selection (used in grids, carousels, listings) */
export const animeCardSelect = {
    id: true,
    Title: true,
    image_url: true,
    Score: true,
    Rank: true,
    Members: true,
    Type: true,
    Episodes: true,
} as const;

/** Homepage card selection (same as card but without Episodes) */
export const animeHomeCardSelect = {
    id: true,
    Title: true,
    image_url: true,
    Score: true,
    Rank: true,
    Members: true,
    Type: true,
} as const;

/** Common where condition: must have an image */
export const hasImage = { image_url: { not: null } } as const;