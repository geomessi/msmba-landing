/**
 * Small interactions, kept in one place.
 *
 * Every one of these is opt-in via a data attribute, bails out entirely under
 * prefers-reduced-motion, and degrades to a perfectly usable static page if the
 * script never runs. None of them gate content behind motion.
 */

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A crimson hairline under the nav that tracks how far down the page you are. */
export function scrollProgress(bar: HTMLElement) {
	const update = () => {
		const max = document.documentElement.scrollHeight - window.innerHeight;
		const ratio = max > 0 ? window.scrollY / max : 0;
		bar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
	};
	update();
	window.addEventListener("scroll", update, { passive: true });
	window.addEventListener("resize", update, { passive: true });
}

/**
 * Count a numeral up to its final value the first time it scrolls into view.
 * The real value is always in the DOM first, so a reader who never triggers it
 * (or has motion off) still sees the number.
 */
export function countUp(el: HTMLElement) {
	const target = Number(el.dataset.count ?? el.textContent ?? 0);
	if (!Number.isFinite(target) || target <= 0 || reduced()) return;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				observer.disconnect();

				const duration = 900;
				const start = performance.now();
				const tick = (now: number) => {
					const t = Math.min((now - start) / duration, 1);
					// Ease out, so it decelerates into the final number.
					const eased = 1 - Math.pow(1 - t, 3);
					el.textContent = String(Math.round(eased * target));
					if (t < 1) requestAnimationFrame(tick);
					else el.textContent = String(target);
				};
				el.textContent = "0";
				requestAnimationFrame(tick);
			}
		},
		{ threshold: 0.6 },
	);
	observer.observe(el);
}

/** Nudge an element toward the cursor while the pointer is near it. */
export function magnetic(el: HTMLElement, strength = 0.22, radius = 90) {
	if (reduced() || !window.matchMedia("(hover: hover)").matches) return;

	const onMove = (event: PointerEvent) => {
		const rect = el.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = event.clientX - cx;
		const dy = event.clientY - cy;

		if (Math.abs(dx) > rect.width / 2 + radius || Math.abs(dy) > rect.height / 2 + radius) {
			el.style.setProperty("--mx", "0px");
			el.style.setProperty("--my", "0px");
			return;
		}
		el.style.setProperty("--mx", `${dx * strength}px`);
		el.style.setProperty("--my", `${dy * strength}px`);
	};

	window.addEventListener("pointermove", onMove, { passive: true });
	el.addEventListener("pointerleave", () => {
		el.style.setProperty("--mx", "0px");
		el.style.setProperty("--my", "0px");
	});
}

/** Drift a hero graphic a few pixels against the cursor, for a little depth. */
export function parallax(el: HTMLElement, amount = 10) {
	if (reduced() || !window.matchMedia("(hover: hover)").matches) return;

	const onMove = (event: PointerEvent) => {
		const rect = el.getBoundingClientRect();
		if (rect.bottom < 0 || rect.top > window.innerHeight) return;
		const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
		const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
		el.style.setProperty("--px", `${Math.max(-1, Math.min(1, nx)) * amount}px`);
		el.style.setProperty("--py", `${Math.max(-1, Math.min(1, ny)) * amount * 0.6}px`);
	};

	window.addEventListener("pointermove", onMove, { passive: true });
}
