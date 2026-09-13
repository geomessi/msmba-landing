/**
 * Split display copy into deliberate lines at sentence boundaries.
 *
 * Browser line-breaking gets display type wrong at these sizes: left to itself,
 * "Two degrees. Two institutions." balances into "Two / degrees. Two /
 * institutions.", orphaning a word and breaking mid-sentence. Breaking on the
 * period instead gives "Two degrees." / "Two institutions.", the rhythm the
 * copy was written for.
 */
export function sentenceLines(text: string): string[] {
	return text
		.split(/(?<=[.!?])\s+/)
		.map((line) => line.trim())
		.filter(Boolean);
}

/**
 * Light emphasis markup for pull quotes, so a long block of student voice has
 * some texture instead of landing as an undifferentiated wall of type.
 *
 *   **text**  →  bold, full-strength ink
 *   ::text::  →  crimson accent
 *
 * Input is escaped before any markup is expanded, so copy stays inert even
 * though every string here is first-party.
 */
export function emphasize(text: string): string {
	const escaped = text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

	return escaped
		.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>')
		.replace(/::(.+?)::/g, '<span class="font-semibold text-crimson">$1</span>');
}
