// Section 5.2, the three custom events:
// waitlist_signup, info_session_click, faq_expand (each carries the variant id).

declare global {
	interface Window {
		plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
	}
}

export function track(event: string, props: Record<string, string> = {}) {
	if (typeof window === "undefined") return;

	// Log in development regardless of whether the analytics script is present.
	// Plausible's inline stub defines window.plausible immediately, so gating the
	// log on its absence would mean never seeing an event locally again.
	if (import.meta.env.DEV) console.debug("[track]", event, props);

	// The stub queues calls made before the async script loads, so a fast
	// interaction right after page load is still recorded.
	window.plausible?.(event, { props });
}
