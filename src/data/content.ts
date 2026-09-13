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
  // Not specified in PRD — team to confirm exact admissions cycle dates.
  applicationTiming: "Apply through the joint HBS/SEAS admissions process — contact admissions for the current cycle's deadlines.",
};

// Section 5.4 — universal AEO questions, answered in plain language in the page body
export const UNIVERSAL_FAQ: FaqItem[] = [
  {
    question: "What is the Harvard MS/MBA: Engineering Sciences?",
    answer:
      "The MS/MBA: Engineering Sciences is a two-year, full-time dual degree offered jointly by Harvard Business School and the Harvard John A. Paulson School of Engineering and Applied Sciences (SEAS). Students graduate with both an MBA from HBS and an MS in Engineering Sciences from SEAS, in a single cohort of 30 students built for engineers who want to found and lead technology ventures.",
  },
  {
    question: "Is the MS/MBA good for software engineers?",
    answer:
      "Yes. The program is built for people with a technical background — software engineers, ML engineers, and other builders — who want business and leadership training without leaving their engineering identity behind. No prior business coursework is required.",
  },
  {
    question: "How long is the Harvard MS/MBA program?",
    answer:
      "The program is two years, full-time, and confers two degrees: an MBA from Harvard Business School and an MS in Engineering Sciences from Harvard SEAS.",
  },
  {
    question: "How does the Harvard MS/MBA differ from a regular MBA?",
    answer:
      "A standard MBA teaches general management. The MS/MBA: Engineering Sciences combines that with a full MS in Engineering Sciences from SEAS, taught alongside a 30-person cohort of technical builders — not a large, generalist MBA class. It's designed for people who want to keep building, not just manage.",
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
        "Your child already knows how to build. The MS/MBA equips them to lead what they build — with an MBA from HBS and an MS in Engineering Sciences from SEAS.",
      ctaLabel: "Request an info session",
      ctaKind: "info-session",
      secondaryCtaLabel: "See where graduates go",
    },
    heroVisual: "credential",
    problem: {
      title: "Is this program serious enough?",
      body: "Prospective students — and the parents helping them decide — often can't tell this apart from an MBA with a few CS electives bolted on. It's a fair question to ask before recommending two years and a rare opportunity cost.",
    },
    program: {
      title: "A dual credential, not a detour",
      bullets: [
        "Two elite institutions, two conferred degrees: MBA (HBS) and MS in Engineering Sciences (SEAS).",
        "Faculty and curriculum drawn from both schools — rigor is verified by SEAS, not assumed.",
        "A 30-person cohort, selected for technical depth as well as leadership potential.",
        "Alumni outcomes span founder, investor, product leader, and engineering leadership paths.",
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
          "The MS in Engineering Sciences is conferred by Harvard SEAS, taught by SEAS faculty, alongside the MBA coursework at HBS. The engineering credential is real, not a certificate program grafted onto an MBA.",
      },
      {
        question: "Will this hurt their engineering career if they don't end up founding a company?",
        answer:
          "No. Alumni outcomes are diverse — product management, investing, engineering leadership, and founder paths are all represented. The dual degree is a credential floor, not a bet on one outcome.",
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
        "The MS/MBA: Engineering Sciences is a two-year Harvard program for engineers who want to found companies, lead products, and make “how to build it” decisions at the table — not take orders from it.",
      ctaLabel: "Join the waitlist",
      ctaKind: "waitlist",
      secondaryCtaLabel: "See what makes it different",
    },
    heroVisual: "code",
    problem: {
      title: "Technical skill alone won't get you there",
      body: "You got passed over for the PM role, or watched a non-technical coworker get promoted to lead. Technical skill got you in the room — it isn't what gets you a seat at the table. That's not a knock on you. It's a different skill set, and most engineers never get taught it.",
    },
    program: {
      title: "Not a traditional MBA",
      bullets: [
        "30 builders, not 300 consultants — an intimate, technical, founder-oriented cohort.",
        "No business background required. You're not behind here; you're the point.",
        "Two conferred degrees: MBA (HBS) + MS in Engineering Sciences (SEAS).",
        "Built for people who want to keep building — and also run what they build.",
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
          "No — every student in the 30-person cohort has a technical background. It's built to be a room of builders, not a generalist MBA class.",
      },
      {
        question: "Can't I just learn business stuff on my own, from YouTube?",
        answer:
          "You can learn concepts. What you can't replicate on your own is the network, the Harvard credential, and the founder infrastructure — alumni from this program alone have raised over $300M in venture funding.",
      },
      {
        question: "Will business school make me less of an engineer?",
        answer:
          "The program is built around your engineering identity, not against it — you keep the MS in Engineering Sciences alongside the MBA. You're not trading one identity for another.",
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
        "The MS/MBA brings your engineering identity into HBS — with a community of women who've done it, a women's representative in the program, and a dual degree that says you can build it and run it.",
      ctaLabel: "Talk to our women's rep",
      ctaKind: "info-session",
      secondaryCtaLabel: "Meet the community",
    },
    heroVisual: "community",
    problem: {
      title: "Will I belong here?",
      body: "You've likely navigated being underrepresented before. Admissions materials rarely show you the community, the representation, or the evidence — just the promise. You want proof, not a poster.",
    },
    program: {
      title: "A dual degree that says both",
      bullets: [
        "An MBA alone signals 'business.' The MS/MBA says: I can build it and run it.",
        "A dedicated women's representative within the program.",
        "A cohort and alumni network that includes women who code, lead, and build — not a footnote.",
        "Two conferred degrees: MBA (HBS) + MS in Engineering Sciences (SEAS).",
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
          "The program has a dedicated women's representative, and its alumni network includes women who have founded venture-backed companies, led product at Google and AWS, and moved into investing. Ask to be connected with any of them directly before you apply.",
      },
      {
        question: "Is the dual degree worth it, or does the MBA alone open the same doors?",
        answer:
          "The technical credential differentiates you, especially for VC, founder, and senior IC paths — it signals you can build, not just manage the people who build.",
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
