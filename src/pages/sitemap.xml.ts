import type { APIRoute } from "astro";
import { VARIANTS } from "../data/content";
import { SITE_URL } from "../lib/markdown";

/** XML sitemap. Static list, since every route is known at build time. */
export const GET: APIRoute = () => {
	const lastmod = new Date().toISOString().split("T")[0];
	const urls = [
		{ loc: `${SITE_URL}/`, priority: "1.0" },
		...VARIANTS.map((v) => ({ loc: `${SITE_URL}/${v.slug}`, priority: "0.9" })),
		{ loc: `${SITE_URL}/about`, priority: "0.5" },
		{ loc: `${SITE_URL}/privacy`, priority: "0.3" },
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) =>
			`  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`,
	)
	.join("\n")}
</urlset>
`;

	return new Response(body, {
		headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
	});
};
