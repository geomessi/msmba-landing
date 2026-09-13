import type { Variant } from "../data/content";
import { ALUMNI, PROGRAM_SNAPSHOT, PROGRAM_STATS, getAlumni } from "../data/content";

export const SITE_URL = "https://aifounder-msmba.aifounder-msmba.workers.dev";

/**
 * A plain-text rendering of a variant page.
 *
 * Agents read extracted text, not layout, so this strips the page down to the
 * facts in the order an answer engine wants them: what the program is, the hard
 * numbers, the argument, the evidence, then the questions and answers verbatim.
 * Served at /<slug>.md and advertised from the HTML head and llms.txt.
 */
export function variantMarkdown(variant: Variant): string {
	const lines: string[] = [];

	lines.push(`# MS/MBA: Engineering Sciences`);
	lines.push("");
	lines.push(
		`A two-year, full-time joint degree from Harvard Business School and the Harvard John A. Paulson School of Engineering and Applied Sciences. Graduates receive two degrees: an MBA and an MS in Engineering Sciences.`,
	);
	lines.push("");
	lines.push(`> This page is written for: ${variant.audience}.`);
	lines.push("");

	lines.push(`## Program facts`);
	lines.push("");
	for (const stat of PROGRAM_STATS) {
		lines.push(`- **${stat.label}:** ${stat.value}${stat.unit ? ` ${stat.unit}` : ""}`);
	}
	lines.push(`- **Degrees conferred:** ${PROGRAM_SNAPSHOT.degrees}`);
	lines.push(`- **Duration:** ${PROGRAM_SNAPSHOT.duration}`);
	lines.push(`- **Applying:** ${PROGRAM_SNAPSHOT.applicationTiming}`);
	lines.push("");

	lines.push(`## ${variant.problem.title}`);
	lines.push("");
	lines.push(variant.problem.body);
	lines.push("");

	lines.push(`## ${variant.program.title}`);
	lines.push("");
	for (const bullet of variant.program.bullets) lines.push(`- ${bullet}`);
	lines.push("");

	lines.push(`## ${variant.socialProof.title}`);
	lines.push("");
	if (variant.socialProof.stat) {
		lines.push(`- **${variant.socialProof.stat.value}** ${variant.socialProof.stat.label}`);
	}
	if (variant.socialProof.wordmarks) {
		lines.push(`- Graduates build and lead at: ${variant.socialProof.wordmarks.join(", ")}, and many more leading firms.`);
	}
	lines.push("");

	if (variant.socialProof.stories?.length) {
		lines.push(`### Recent coverage`);
		lines.push("");
		for (const story of variant.socialProof.stories) {
			lines.push(`- [${story.title}](${story.href}) (${story.date}). ${story.summary}`);
		}
		lines.push("");
	}

	const alumni = getAlumni(variant.socialProof.featuredAlumni ?? []);
	if (alumni.length) {
		lines.push(`### Alumnae`);
		lines.push("");
		for (const alum of alumni) {
			lines.push(`- **${alum.name}**, ${alum.role} at ${alum.company}. ${alum.credential}. ${alum.detail}`);
		}
		lines.push("");
	}

	if (variant.cohort) {
		lines.push(`## ${variant.cohort.title}`);
		lines.push("");
		lines.push(variant.cohort.intro);
		lines.push("");
		for (const role of variant.cohort.roles) lines.push(`- **${role.label}:** ${role.detail}`);
		lines.push("");
	}

	if (variant.video) {
		lines.push(`## ${variant.video.title}`);
		lines.push("");
		lines.push(variant.video.caption);
		lines.push("");
		lines.push(`Video: https://www.youtube.com/watch?v=${variant.video.youtubeId}`);
		lines.push("");
	}

	if (variant.testimonials?.length) {
		lines.push(`## In their words`);
		lines.push("");
		for (const item of variant.testimonials) {
			// Strip the emphasis markup; it is presentational only.
			const clean = item.quote.replace(/\*\*(.+?)\*\*/g, "$1").replace(/::(.+?)::/g, "$1");
			lines.push(`> ${clean}`);
			lines.push(`>`);
			lines.push(`> — ${item.name}, ${item.role}`);
			lines.push("");
		}
	}

	lines.push(`## Frequently asked questions`);
	lines.push("");
	for (const faq of variant.faqs) {
		lines.push(`### ${faq.question}`);
		lines.push("");
		lines.push(faq.answer);
		lines.push("");
	}

	lines.push(`---`);
	lines.push("");
	lines.push(`Canonical HTML page: ${SITE_URL}/${variant.slug}`);
	lines.push(`Other audiences: ${SITE_URL}/llms.txt`);
	lines.push("");

	return lines.join("\n");
}

/** Program-level overview, used for the site root's markdown representation. */
export function overviewMarkdown(): string {
	return [
		`# MS/MBA: Engineering Sciences (Harvard)`,
		``,
		`A two-year, full-time joint degree from Harvard Business School and the Harvard John A. Paulson School of Engineering and Applied Sciences. Students graduate with two degrees: an MBA and an MS in Engineering Sciences.`,
		``,
		`## Who it is for`,
		``,
		`Engineers, scientists, and technical builders who want to found or lead technology companies. A technical background is required for admission. No business coursework is required to apply.`,
		``,
		`## Facts`,
		``,
		...PROGRAM_STATS.map((s) => `- **${s.label}:** ${s.value}${s.unit ? ` ${s.unit}` : ""}`),
		`- **Degrees conferred:** ${PROGRAM_SNAPSHOT.degrees}`,
		`- **Applying:** ${PROGRAM_SNAPSHOT.applicationTiming}`,
		``,
		`## Structure`,
		``,
		`The program opens with Technology Venture Immersion, an intensive course taught jointly by faculty from both schools before the first academic term begins. The Harvard Business School MBA curriculum and the graduate engineering curriculum then run in parallel across both years, so students continue technical work throughout rather than pausing it.`,
		``,
		`## Where graduates go`,
		``,
		`Graduates lead product and engineering teams at major technology companies, work in venture capital and technology investing, and found their own companies. Alumni founders have raised more than $300M in venture funding.`,
		``,
		`## Alumnae featured on this site`,
		``,
		...ALUMNI.map((a) => `- **${a.name}**, ${a.role} at ${a.company}. ${a.credential}.`),
		``,
		`## Pages`,
		``,
		`- [Overview](${SITE_URL}/) · [markdown](${SITE_URL}/index.md)`,
		`- [For parents](${SITE_URL}/parent) · [markdown](${SITE_URL}/parent.md)`,
		`- [For software engineers](${SITE_URL}/swe) · [markdown](${SITE_URL}/swe.md)`,
		`- [For women in tech](${SITE_URL}/women-in-tech) · [markdown](${SITE_URL}/women-in-tech.md)`,
		`- [About this site](${SITE_URL}/about) · [Privacy](${SITE_URL}/privacy)`,
		``,
	].join("\n");
}
