import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

interface WaitlistPayload {
	email?: string;
	variant?: string;
	ctaKind?: string;
	utm?: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
	let body: WaitlistPayload;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "invalid_json" }, { status: 400 });
	}

	const email = body.email?.trim().toLowerCase();
	const variant = body.variant?.trim();

	if (!email || !EMAIL_RE.test(email)) {
		return Response.json({ error: "invalid_email" }, { status: 400 });
	}
	if (!variant) {
		return Response.json({ error: "missing_variant" }, { status: 400 });
	}

	const entry = {
		email,
		variant,
		ctaKind: body.ctaKind === "info-session" ? "info-session" : "waitlist",
		utm: body.utm ?? {},
		ts: new Date().toISOString(),
	};

	// Cloudflare bindings (KV + secrets), see wrangler.jsonc / .dev.vars.
	if (env.WAITLIST) {
		const key = `waitlist:${entry.ts}:${crypto.randomUUID()}`;
		await env.WAITLIST.put(key, JSON.stringify(entry));
	}

	// Optional: forward to Loops.so (section 5.1) once LOOPS_API_KEY is set.
	if (env.LOOPS_API_KEY) {
		try {
			await fetch("https://app.loops.so/api/v1/contacts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${env.LOOPS_API_KEY}`,
				},
				body: JSON.stringify({
					email,
					source: "msmba-landing",
					userGroup: entry.variant,
					ctaKind: entry.ctaKind,
					...entry.utm,
				}),
			});
		} catch {
			// Loops forwarding is best-effort, the KV write above is the source of truth.
		}
	}

	return Response.json({ ok: true });
};
