/// <reference types="astro/client" />

// LOOPS_API_KEY is a secret (not in wrangler.jsonc), set via
// `npx wrangler pages secret put LOOPS_API_KEY` / .dev.vars locally.
declare namespace Cloudflare {
	interface Env {
		LOOPS_API_KEY?: string;
	}
}

interface ImportMetaEnv {
	readonly DEV: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
