import type { APIRoute, GetStaticPaths } from "astro";
import { VARIANTS, getVariant } from "../data/content";
import { variantMarkdown } from "../lib/markdown";

/**
 * Markdown twin of each variant page, at /<slug>.md.
 *
 * Agents that prefer text get the full page content without parsing layout.
 * Advertised from the HTML head via <link rel="alternate" type="text/markdown">
 * and from llms.txt.
 */
export const getStaticPaths: GetStaticPaths = () =>
	VARIANTS.map((variant) => ({ params: { slug: variant.slug } }));

export const GET: APIRoute = ({ params }) => {
	const variant = getVariant(params.slug ?? "");
	if (!variant) return new Response("Not found", { status: 404 });

	return new Response(variantMarkdown(variant), {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			// So a CDN never hands the HTML variant to an agent asking for markdown.
			Vary: "Accept, Accept-Encoding",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
