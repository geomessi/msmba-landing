import type { APIRoute } from "astro";
import { overviewMarkdown } from "../lib/markdown";

/** Markdown twin of the site root. */
export const GET: APIRoute = () =>
	new Response(overviewMarkdown(), {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			Vary: "Accept, Accept-Encoding",
			"Cache-Control": "public, max-age=3600",
		},
	});
