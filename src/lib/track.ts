// Section 5.2 — custom events required before any traffic goes live:
// waitlist_signup, info_session_click, faq_expand (each carries the variant id).

declare global {
	interface Window {
		plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
	}
}

export function track(event: string, props: Record<string, string> = {}) {
	if (typeof window === "undefined") return;
	if (window.plausible) {
		window.plausible(event, { props });
	} else if (import.meta.env.DEV) {
		console.debug("[track]", event, props);
	}
}
