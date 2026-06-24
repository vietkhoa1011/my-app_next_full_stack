/** Format score to display string */
export function formatScore(score: number | null): string {
    if (score === null) return "N/A";
    return score.toFixed(1);
}

/** Format detailed score */
export function formatScoreDetailed(score: number | null): string {
    if (score === null) return "N/A";
    return score.toFixed(2);
}

/** Format members count to human-readable */
export function formatMembers(members: number | null): string {
    if (!members) return "N/A";
    if (members >= 1_000_000) return (members / 1_000_000).toFixed(1) + "M";
    if (members >= 1_000) return (members / 1_000).toFixed(0) + "K";
    return members.toLocaleString();
}

/** Format members for homepage (non-nullable) */
export function formatMembersStrict(members: number): string {
    if (members >= 1_000_000) return (members / 1_000_000).toFixed(1) + "M";
    if (members >= 1_000) return (members / 1_000).toFixed(0) + "K";
    return members.toString();
}