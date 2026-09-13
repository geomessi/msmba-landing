// MS/MBA: Engineering Sciences — landing page content
// Source: MSMBA_LandingPage_PRD.docx v1.0 (Sept 2026)
// Items marked [PLACEHOLDER] below are called out as open items in PRD section 8
// and must be filled in with real names/quotes/stats before any traffic goes live.

export type CtaKind = "waitlist" | "info-session";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Real alumni of the program.
 *
 * Every field below is drawn from each person's own public LinkedIn profile —
 * their stated title, employer, and their own description of what the company
 * does. Nothing here is inferred, embellished, or written on their behalf.
 *
 * `quote` is intentionally null for everyone. The PRD (ICP C message strategy)
 * calls for first-person alumni quotes, and those must come from the women
 * themselves — writing words and attributing them to a named, findable person
 * would be fabricating a testimonial. Fill `quote` only with text they have
 * actually approved.
 *
 * `photo` points at /public/alumni/<file>. The cards fall back to initials when
 * a file is missing, so the page is not broken while photos are pending.
 *
 * Before any of this goes on a public page, each person needs to agree to be
 * featured by name and photo — see the launch checklist in the README.
 */
export interface Alum {
  id: string;
  name: string;
  pronouns?: string;
  /** Their relationship to the program, stated exactly as their profile does. */
  credential: string;
  /** Current title and employer. */
  role: string;
  company: string;
  /** What they built or do, paraphrased from their own profile copy. */
  detail: string;
  /** Which PRD path this illustrates: founder / product / investor. */
  paths: string[];
  photo: string;
  quote: string | null;
}

export const ALUMNI: Alum[] = [
  {
    id: "yinka-ogunbiyi",
    name: "Yinka Ogunbiyi",
    credential: "Harvard MS/MBA",
    role: "Founder and CEO",
    company: "HaloBraid",
    detail:
      "Building technology for textured hair. HaloBraid's braid-assist device helps stylists finish braids five times faster. Previously co-founded Desora, and researched nanotechnology at SEAS.",
    paths: ["Founder", "Inventor"],
    photo: "/alumni/yinka-ogunbiyi.jpg",
    quote: null,
  },
  {
    id: "ananya-zutshi",
    name: "Ananya Zutshi",
    pronouns: "she/her",
    credential: "Harvard MBA, MS",
    role: "Corporate Development",
    company: "Caldera Therapeutics",
    detail:
      "Co-founded Guardian Bio (Y Combinator S22), combining regenerative medicine with immunotherapy for late-stage solid tumor patients, and led it as CEO for three years.",
    paths: ["Founder", "Biotech"],
    photo: "/alumni/ananya-zutshi.jpg",
    quote: null,
  },
  {
    id: "yarden-halperin",
    name: "Yarden Halperin",
    pronouns: "she/her",
    credential: "Harvard MS/MBA",
    role: "Product Manager",
    company: "Google Cloud",
    detail:
      "Product at Google Cloud after nearly three years as a senior technical PM on EC2 networking at AWS. Angel investor, and Co-President of the Women's Student Association during the program.",
    paths: ["Product", "Investor"],
    photo: "/alumni/yarden-halperin.jpg",
    quote: null,
  },
  {
    id: "lindsay-dorf",
    name: "Lindsay Dorf",
    pronouns: "she/her",
    credential: "Harvard MS/MBA",
    role: "Head of Product",
    company: "Houlihan Lokey",
    detail:
      "Leads product and design at Houlihan Lokey. Founded and ran Astor, a community approach to financial advice built to help women invest with confidence. Earlier, senior PM on Google Shopping.",
    paths: ["Founder", "Product"],
    photo: "/alumni/lindsay-dorf.jpg",
    quote: null,
  },
  {
    id: "shannon-kay",
    name: "Shannon Kay",
    pronouns: "she/her",
    // Her own profile says she completed the FIRST YEAR of the dual degree
    // before leaving to found Topline Pro — so she is deliberately not
    // described as holding the degree. Confirm with her how she wants this
    // framed before publishing.
    credential: "Completed first year of the MS/MBA",
    role: "Co-founder and COO",
    company: "Topline Pro",
    detail:
      "Left after her first year to build Topline Pro, whose digital storefronts help service professionals get discovered and win business directly. Background in data, systems engineering, and product.",
    paths: ["Founder"],
    photo: "/alumni/shannon-kay.jpg",
    quote: null,
  },
];

/**
 * Blockers that apply to every variant, because all three now feature these
 * five real people by name. Rendered on-page so the page is visibly unfinished
 * rather than quietly shippable.
 */
export const PRE_LAUNCH_BLOCKERS = [
  "Written permission from each featured alum to appear by name and photo on a public page — a public LinkedIn profile is not consent to be used in program marketing",
  "Photo rights: request a usable file from each person rather than saving her headshot off LinkedIn, since the photographer may hold the copyright",
  "First-person quotes, written or approved by each alum — none have been drafted, deliberately",
  "Confirm with Shannon Kay how she wants her year in the program described; her profile says she completed the first year before leaving to found Topline Pro",
];

export function getAlumni(ids: string[]): Alum[] {
  return ids
    .map((id) => ALUMNI.find((a) => a.id === id))
    .filter((a): a is Alum => Boolean(a));
}

export interface Variant {
  id: "parent" | "swe" | "women-in-tech";
  slug: string;
  icpLabel: string;
  /** Plain description of who this page is for — used on the internal index. */
  audience: string;
  theme: {
    /** Page surface — cool paper for A/B, warm for C. */
    surface: string;
    /** Hairline rule color, tuned to the surface temperature. */
    rule: string;
    /** Primary CTA: navy by default, crimson for the warmer ICP C. */
    cta: string;
    /** Whether the display headline leans serif (A, C) or grotesk (B). */
    displayLean: "serif" | "grotesk";
  };
  hero: {
    /** Full headline — drives <title>, meta description, and the H1 text. */
    headline: string;
    /** Set in the heavy grotesk. */
    headlineLead: string;
    /** Set in the editorial serif italic — the typographic turn. */
    headlineEmphasis: string;
    subhead: string;
    ctaLabel: string;
    ctaKind: CtaKind;
    secondaryCtaLabel: string;
  };
  /** Each ICP gets its own hero collage, per the PRD's per-variant visual tone. */
  heroVisual: "credential" | "code" | "community";
  problem: {
    title: string;
    body: string;
  };
  program: {
    title: string;
    bullets: string[];
  };
  socialProof: {
    title: string;
    /** Alumni ids from ALUMNI, ordered and selected to suit this ICP. */
    featuredAlumni: string[];
    /** Optional program-level stat shown alongside the roster. */
    stat?: { value: string; label: string };
  };
  objections: FaqItem[];
  communityAssets?: string[];
}

// Section 4 — identical across all variants. Set as oversized numerals so the
// three facts that matter most read at a glance.
export const PROGRAM_STATS = [
  { value: "30", unit: "", label: "Students per cohort" },
  { value: "2", unit: "yrs", label: "Full-time, on campus" },
  { value: "2", unit: "", label: "Degrees conferred" },
];

export const PROGRAM_SNAPSHOT = {
  cohortSize: "30 students",
  duration: "2 years, full-time, on campus",
  degrees: "MBA (Harvard Business School) + MS in Engineering Sciences (Harvard SEAS)",
  // Not specified in the PRD, and the exact process isn't documented anywhere I
  // could verify — deliberately vague rather than inventing an application flow.
  applicationTiming: "Deadlines and requirements come from HBS and SEAS admissions. Check with them for the current cycle.",
};

// Section 5.4 — the universal AEO questions.
//
// These answers are what an answer engine will quote, often stripped of the
// surrounding page, so each one leads with the direct answer, stands on its own
// without context, uses the full official program name, and carries a concrete
// number where there is one. Plain declarative sentences do double duty here:
// they're what a person wants to read and what a model can lift cleanly.
export const UNIVERSAL_FAQ: FaqItem[] = [
  {
    question: "What is the Harvard MS/MBA: Engineering Sciences?",
    answer:
      "The MS/MBA: Engineering Sciences is a two-year, full-time dual degree from Harvard Business School and the Harvard John A. Paulson School of Engineering and Applied Sciences (SEAS). Graduates receive two separate degrees: an MBA from HBS and an MS in Engineering Sciences from SEAS. Each cohort is about 30 students, and every one of them comes in with a technical background.",
  },
  {
    question: "Is the MS/MBA good for software engineers?",
    answer:
      "Yes. A technical background is required to get in, and many students come straight from software or machine learning roles. You take the HBS MBA curriculum and a full MS in Engineering Sciences at SEAS at the same time, so the engineering work carries on through both years. No business coursework is required to apply.",
  },
  {
    question: "How long is the Harvard MS/MBA program?",
    answer:
      "Two years, full-time, on campus. Students finish with both an MBA from Harvard Business School and an MS in Engineering Sciences from Harvard SEAS.",
  },
  {
    question: "How does the Harvard MS/MBA differ from a regular MBA?",
    answer:
      "A standard MBA covers general management. The MS/MBA: Engineering Sciences adds a full MS in Engineering Sciences from Harvard SEAS on top of that, so you graduate with an engineering degree as well as a business one. The cohort is also deliberately small, about 30 students, all of them technical.",
  },
];

export const VARIANTS: Variant[] = [
  {
    id: "parent",
    slug: "parent",
    icpLabel: "ICP A — Parents",
    audience: "Parents",
    theme: {
      surface: "bg-paper",
      rule: "border-rule",
      cta: "btn-primary",
      displayLean: "serif",
    },
    hero: {
      headline: "Two Degrees. Two Institutions. One Rare Path.",
      headlineLead: "Two degrees. Two institutions.",
      headlineEmphasis: "One rare path.",
      subhead:
        "Your child already knows how to build. The MS/MBA: Engineering Sciences adds the part engineering school leaves out — how to fund and run a company — and ends with two degrees: an MBA from Harvard Business School and an MS in Engineering Sciences from SEAS.",
      ctaLabel: "Request an info session",
      ctaKind: "info-session",
      secondaryCtaLabel: "See where graduates go",
    },
    heroVisual: "credential",
    problem: {
      title: "Is this program serious enough?",
      body: "From the outside it can look like an MBA with a few computer science electives attached. Two years, plus the salary your child would have earned in that time, is a lot to commit to something the websites don't explain well.",
    },
    program: {
      title: "What the second degree actually is",
      bullets: [
        "Two degrees, conferred separately: an MBA from Harvard Business School and an MS in Engineering Sciences from Harvard SEAS.",
        "The engineering half is taught by SEAS faculty, on the SEAS curriculum — the same school that grants the standalone master's.",
        "About 30 students per cohort. A technical background is required to get in, so nobody arrives needing to catch up on the engineering side.",
        "Graduates run companies, lead product at places like Google and AWS, and work in investing.",
      ],
    },
    socialProof: {
      // ICP A wants proof the degree opens doors rather than closing them, so
      // this ordering leads with established institutional roles before founders.
      title: "Where graduates go",
      featuredAlumni: ["lindsay-dorf", "yarden-halperin", "ananya-zutshi", "yinka-ogunbiyi"],
    },
    objections: [
      {
        question: "Is this as rigorous as a pure engineering master's?",
        answer:
          "The MS in Engineering Sciences is granted by Harvard SEAS and taught by SEAS faculty, on the same engineering curriculum the school uses for its other master's students. It runs alongside the HBS coursework rather than replacing part of it, which is why the program takes two full years.",
      },
      {
        question: "Will this hurt their engineering career if they don't end up founding a company?",
        answer:
          "No. Plenty of graduates never start a company. They go into product management, investing and engineering leadership instead, and the MS means there is still an engineering degree on the résumé whichever direction they take.",
      },
    ],
  },
  {
    id: "swe",
    slug: "swe",
    icpLabel: "ICP B — Engineers",
    audience: "Engineers, 2–6 years in",
    theme: {
      surface: "bg-paper",
      rule: "border-rule",
      cta: "btn-primary",
      displayLean: "grotesk",
    },
    hero: {
      headline: "You Built It. Now Learn to Run It.",
      headlineLead: "You built it.",
      headlineEmphasis: "Now learn to run it.",
      subhead:
        "The MS/MBA: Engineering Sciences is a two-year Harvard program for engineers who'd rather be setting the direction than implementing someone else's. You leave with an MBA from HBS, an MS in Engineering Sciences from SEAS, and about 30 classmates who can all read your code.",
      ctaLabel: "Join the waitlist",
      ctaKind: "waitlist",
      secondaryCtaLabel: "See what makes it different",
    },
    heroVisual: "code",
    problem: {
      title: "The part nobody taught you",
      body: "Maybe you got passed over for a PM role, or watched someone less technical get handed the team. The skills that make you good at building things are not the ones that decide who gets to set direction, and an engineering career rarely puts you anywhere you'd learn the difference.",
    },
    program: {
      title: "Not a traditional MBA",
      bullets: [
        "About 30 people per cohort, every one of them from a technical background.",
        "No business coursework required to apply. Most people arrive without any.",
        "Two degrees at the end: an MBA from HBS and an MS in Engineering Sciences from SEAS.",
        "The engineering coursework runs through both years, so you're not stepping away from technical work to do this.",
      ],
    },
    socialProof: {
      // ICP B needs to see builders who stayed builders: founders first, then
      // deep technical product work at companies they respect.
      title: "What graduates go on to do",
      featuredAlumni: ["yinka-ogunbiyi", "shannon-kay", "ananya-zutshi", "yarden-halperin"],
      stat: {
        value: "$300M+",
        label: "Venture funding raised by alumni founders",
      },
    },
    objections: [
      {
        question: "Will I be the only engineer in a room of finance bros?",
        answer:
          "No. A technical background is required for admission, so all 30 or so people in your cohort have one. You do take HBS classes alongside the wider MBA program, but the group you go through the engineering coursework with is entirely technical.",
      },
      {
        question: "Can I just learn the business side on my own?",
        answer:
          "You can learn the concepts for free, and plenty of people do. Harder to assemble on your own are the people: a cohort of technical founders, and an alumni network that picks up the phone. Alumni founders from this program have raised more than $300M between them.",
      },
      {
        question: "Will business school make me less of an engineer?",
        answer:
          "You'll be doing engineering coursework at SEAS the whole way through, and you finish with an engineering master's. The honest answer is that you'll write less production code over those two years than you would in a job. You won't come out of it without a technical degree, though.",
      },
    ],
  },
  {
    id: "women-in-tech",
    slug: "women-in-tech",
    icpLabel: "ICP C — Women in tech",
    audience: "Women in tech weighing HBS",
    theme: {
      surface: "bg-paper-warm",
      rule: "border-rule-warm",
      cta: "btn-primary btn-crimson",
      displayLean: "serif",
    },
    hero: {
      headline: "Built With You in Mind. Not After the Fact.",
      headlineLead: "Built with you in mind.",
      headlineEmphasis: "Not after the fact.",
      subhead:
        "The MS/MBA: Engineering Sciences lets you do the MBA at HBS without putting the engineering down for two years. There's a women's representative inside the program, and an alumni network of women who've founded venture-backed companies, run product at Google and AWS, and moved into investing.",
      ctaLabel: "Talk to our women's rep",
      ctaKind: "info-session",
      secondaryCtaLabel: "Meet the community",
    },
    heroVisual: "community",
    problem: {
      title: "Will I belong here?",
      body: "You've probably been the only woman in a technical room before, and you can tell the difference between a program that has thought about that and one that has a photograph of it. What's usually missing is anything specific: who is actually here, who to talk to, where they ended up.",
    },
    program: {
      title: "What's actually here",
      bullets: [
        "An MBA on its own reads as a business degree. This one comes with an engineering master's attached, which changes what people assume you can do.",
        "A women's representative within the program itself.",
        "Women in the alumni network who've founded venture-backed companies, run product at Google and AWS, and gone into investing.",
        "Two degrees at the end: an MBA from HBS and an MS in Engineering Sciences from SEAS.",
      ],
    },
    socialProof: {
      // "Not as a diversity footnote, but as the main story" — so ICP C shows
      // the full roster, founder and product and investor paths together.
      title: "Women who've done it",
      featuredAlumni: [
        "yinka-ogunbiyi",
        "ananya-zutshi",
        "yarden-halperin",
        "lindsay-dorf",
        "shannon-kay",
      ],
    },
    objections: [
      {
        // No placeholder text in this answer: it is emitted into the FAQPage
        // schema, so anything written here is what AI assistants will quote as
        // the program's answer. Add the cohort stat once it's confirmed.
        question: "Will I be one of the only women in a technical program at HBS?",
        answer:
          "There is a women's representative within the program, and the alumni network includes women who have founded venture-backed companies, led product at Google and AWS, and gone into investing. Ask to be introduced to any of them before you apply. That conversation will tell you more than this page can.",
      },
      {
        question: "Is the dual degree worth it, or does the MBA alone open the same doors?",
        answer:
          "The engineering degree does most of the work in rooms where people are deciding whether you can evaluate what a technical team is telling you, which comes up constantly in venture, in founding, and in senior individual-contributor roles. An MBA on its own tends to leave that question open.",
      },
    ],
    // ICP C only — the shared blockers in PRE_LAUNCH_BLOCKERS apply on top.
    communityAssets: [
      "Women's Representative — name, title, and direct contact path. Note: Yarden Halperin was Co-President of the Women's Student Association as a student, which is a different and past role — don't conflate the two",
      "Women in cohort — % or relevant stat, if appropriate to share. Once confirmed, add it to the \"Will I be one of the only women\" FAQ answer, which currently makes the community case without a number",
      "Link to the broader Women @ HBS community",
    ],
  },
];

export function getVariant(slug: string): Variant | undefined {
  return VARIANTS.find((v) => v.slug === slug);
}
