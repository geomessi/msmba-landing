# MS/MBA: Engineering Sciences, Landing Page Variants

Three ICP-locked landing pages built from `MSMBA_LandingPage_PRD.docx` (v1.0). Same architecture (waitlist capture, AEO-optimized FAQ, analytics), different message per audience.

| Route            | ICP                | CTA                     |
| ---------------- | ------------------- | ------------------------ |
| `/parent`         | A, The Parent       | Request an Info Session |
| `/swe`             | B, The SWE Pivot    | Join the Waitlist       |
| `/women-in-tech`   | C, Women in Tech    | Talk to Our Women's Rep |
| `/`                | Internal review index (noindex) |, |

Stack: [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), deployed as a Cloudflare Worker with static assets via [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/). Waitlist submissions are a Worker API route (`src/pages/api/waitlist.ts`) writing to a Cloudflare KV namespace, with an optional forward to [Loops.so](https://loops.so).

## Getting started

```sh
npm install
npm run dev
```

## Before deploying

1. **Create the KV namespace** and drop its id into `wrangler.jsonc`:
   ```sh
   npx wrangler kv namespace create WAITLIST
   ```
2. **(Optional) Loops.so**, set the secret so waitlist signups also land in Loops:
   ```sh
   npx wrangler secret put LOOPS_API_KEY
   ```
   Locally, copy `.dev.vars.example` to `.dev.vars` and fill it in instead.
3. **Analytics** is already installed. Plausible lives in `src/layouts/Layout.astro`; its script id is public by design, so it sits in the code rather than an environment file. To point at a different Plausible site, change `PLAUSIBLE_SRC` there.

## Commands

| Command                | Action                                                  |
| ----------------------- | -------------------------------------------------------- |
| `npm run dev`            | Local dev server at `localhost:4321`                     |
| `npm run build`          | Build to `./dist/`                                       |
| `npx wrangler dev`       | Run the built Worker locally (after `npm run build`), including the `/api/waitlist` KV-backed route |
| `npx astro check`        | Type-check                                                |
| `npx wrangler deploy`    | Build + deploy to Cloudflare                              |

## Analytics events (PRD 5.2)

Fired via `window.plausible` (see `src/lib/track.ts`). Plausible's inline stub queues events fired before its script finishes loading, so a fast interaction right after page load is still recorded:

- `waitlist_signup`, waitlist form submit, tagged with `variant`
- `info_session_click`, info-session form submit, tagged with `variant`
- `faq_expand`, first time a visitor opens an FAQ item, tagged with `question`

UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`) are captured from the URL and stored alongside each waitlist entry in KV.

## AEO (PRD 5.4)

Each variant page emits `schema.org/EducationalOccupationalProgram` (in `Layout.astro`) and `schema.org/FAQPage` (in `FAQSection.astro`) JSON-LD, and answers the program's core questions in plain text in the page body, not behind a modal or in a PDF.
