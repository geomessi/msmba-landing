import { defineMiddleware } from "astro:middleware";

/**
 * Markdown content negotiation, per acceptmarkdown.com.
 *
 * An agent sending `Accept: text/markdown` is redirected to the markdown twin
 * of the page it asked for, and every negotiated response carries
 * `Vary: Accept` so a CDN cannot hand the HTML variant to an agent that asked
 * for markdown (or the reverse) depending on which landed in cache first.
 *
 * A redirect rather than an in-place rewrite: it keeps one canonical URL per
 * representation, so the markdown is independently linkable and cacheable.
 */
const MARKDOWN_ROUTES: Record<string, string> = {
	"/": "/index.md",
	"/parent": "/parent.md",
	"/swe": "/swe.md",
	"/women-in-tech": "/women-in-tech.md",
};

function prefersMarkdown(accept: string | null): boolean {
	if (!accept) return false;
	const lower = accept.toLowerCase();
	if (!lower.includes("text/markdown")) return false;

	// Only treat it as a preference if markdown is ranked at least as highly as
	// HTML, so a browser sending a long Accept list still gets the page.
	const quality = (type: string) => {
		const match = lower.match(new RegExp(`${type}(?:;q=([0-9.]+))?`));
		if (!match) return 0;
		return match[1] ? Number(match[1]) : 1;
	};
	return quality("text/markdown") >= quality("text/html");
}

export const onRequest = defineMiddleware(async (context, next) => {
	const path = context.url.pathname.replace(/\/+$/, "") || "/";
	const target = MARKDOWN_ROUTES[path];

	if (target && prefersMarkdown(context.request.headers.get("accept"))) {
		return new Response(null, {
			status: 307,
			headers: { Location: target, Vary: "Accept, Accept-Encoding" },
		});
	}

	const response = await next();
	if (target) {
		const headers = new Headers(response.headers);
		headers.set("Vary", "Accept, Accept-Encoding");
		// These routes are rendered per request so that the negotiation above can
		// happen at all, so give the edge and the browser something to cache
		// against. The pages are fully static in content; only the representation
		// is negotiated.
		if (!headers.has("Cache-Control")) {
			headers.set("Cache-Control", "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
		}
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers,
		});
	}
	return response;
});
