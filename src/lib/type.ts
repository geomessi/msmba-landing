/**
 * Split display copy into deliberate lines at sentence boundaries.
 *
 * Browser line-breaking gets display type wrong at these sizes: left to itself,
 * "Two degrees. Two institutions." balances into "Two / degrees. Two /
 * institutions.", orphaning a word and breaking mid-sentence. Breaking on the
 * period instead gives "Two degrees." / "Two institutions." — the rhythm the
 * copy was written for.
 */
export function sentenceLines(text: string): string[] {
	return text
		.split(/(?<=[.!?])\s+/)
		.map((line) => line.trim())
		.filter(Boolean);
}
