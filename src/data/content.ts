// MS/MBA: Engineering Sciences — landing page content
// Source: MSMBA_LandingPage_PRD.docx v1.0 (Sept 2026)

export type CtaKind = "waitlist" | "info-session";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Women alumni of the program, featured on the ICP C page only.
 *
 * Every field is drawn from each person's own public profile — her stated title,
 * employer, and her own description of what the company does. Nothing is
 * inferred or embellished.
 *
 * `quote` stays null unless the person has actually given one; the cards simply
 * render without a quote block. Photos live in /public/alumni and fall back to
 * initials if a file is ever missing.
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
    // Her own profile says she completed the first year of the dual degree
    // before leaving to found Topline Pro, so she isn't described as holding it.
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

/** A SEAS news story, linked out from the page. */
export interface Story {
  date: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
}

/**
 * First-person quotes from current students. Each person gave permission for
 * their quote to be used and edited; the edits are for flow only and don't add
 * claims they didn't make.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface VideoEmbed {
  youtubeId: string;
  title: string;
  caption: string;
}

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
    /** Alumni ids from ALUMNI. Only ICP C carries the women alumni roster. */
    featuredAlumni?: string[];
    /** SEAS news stories — ICP B, where recent venture outcomes land hardest. */
    stories?: Story[];
    /** Optional program-level stat shown alongside whatever else is here. */
    stat?: { value: string; label: string };
  };
  /** Embedded video — ICP A, where seeing the actual class does the work. */
  video?: VideoEmbed;
  testimonials?: Testimonial[];
  objections: FaqItem[];
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
      title: "Where graduates go",
      stat: {
        value: "$300M+",
        label: "Venture funding raised by alumni founders",
      },
    },
    video: {
      youtubeId: "ScZTZacWg_E",
      title: "Harvard MS/MBA | TVI Class Overview",
      caption:
        "Technology Venture Immersion is the course students take before the first term starts. This is what the classroom actually looks like.",
    },
    testimonials: [
      {
        quote:
          "The MS/MBA has connected me with some of the most brilliant people at Harvard Business School. With how fast AI is moving, having a community to learn from and build with is a gift. Our group chat is constantly alive with new ideas, articles, coding tips, and advice. What I value most is that we slow each other down and think about the impact we actually want to have. I'm proud to know my classmates will be the next generation of technology leaders, and we cheer each other on.",
        name: "Georgia M.",
        role: "Current student",
      },
    ],
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
      // ICP B is the one who checks whether the outcomes are real and recent.
      // Linking straight out to SEAS rather than paraphrasing lets them verify.
      title: "What graduates go on to do",
      stat: {
        value: "$300M+",
        label: "Venture funding raised by alumni founders",
      },
      stories: [
        {
          date: "Jul 13, 2026",
          title: "Automating Software and Success: MS/MBA alum's start-up achieves billion-dollar valuation",
          summary: "Blitzy offers an autonomous software development platform for enterprise.",
          tags: ["AI / Machine Learning", "Alumni", "Entrepreneurship"],
          href: "https://seas.harvard.edu/news/automating-software-and-success-msmba-alums-start-achieves-billion-dollar-valuation",
        },
        {
          date: "Mar 25, 2026",
          title: "Building Better Tools for Complex Engineering: MS/MBA alum co-founds billion-dollar start-up",
          summary: "Nominal offers AI-driven data analysis tools for aerospace, defense and more.",
          tags: ["AI / Machine Learning", "Alumni", "Entrepreneurship"],
          href: "https://seas.harvard.edu/news/building-better-tools-complex-engineering-msmba-alum-co-founds-billion-dollar-start",
        },
        {
          date: "Apr 3, 2026",
          title: "Three SEAS start-ups named President's Innovation Challenge finalists",
          summary: "Health and research ventures will compete for a share of a $500,000 prize pool.",
          tags: ["Entrepreneurship", "Health / Medicine", "Robotics"],
          href: "https://seas.harvard.edu/news/three-seas-start-ups-named-presidents-innovation-challenge-finalists",
        },
      ],
    },
    testimonials: [
      {
        quote:
          "The MS/MBA has expanded my world. I was hesitant at first that my software engineering experience wouldn't be valued in a business setting. What I found instead is a community of like-minded collaborators and friends, all of them interested in technology and in what it takes to lead a venture built on it. I've been challenged to apply creative problem solving, to explore areas of engineering I hadn't touched, and to think seriously about where I want my career to go.",
        name: "Emmanuel S.",
        role: "Current student",
      },
    ],
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
        "Skyler Liu is the women's representative for the program, and runs everything from coding sessions to potlucks.",
        "Women in the alumni network who've founded venture-backed companies, run product at Google and AWS, and gone into investing.",
        "Two degrees at the end: an MBA from HBS and an MS in Engineering Sciences from SEAS.",
      ],
    },
    socialProof: {
      // "The main story, not a diversity footnote" — the women alumni roster
      // lives here and only here.
      title: "Women who've done it",
      featuredAlumni: [
        "yinka-ogunbiyi",
        "ananya-zutshi",
        "yarden-halperin",
        "lindsay-dorf",
        "shannon-kay",
      ],
    },
    testimonials: [
      {
        quote:
          "I'm so proud to be the women's rep for my cohort. I host vibe coding sessions, cozy potluck nights, and outings to explore Boston. Getting close outside of class is what makes learning together in the classroom all the more fun.",
        name: "Skyler Liu",
        role: "Current student · Women's representative",
      },
      {
        quote:
          "I've made lifelong friends in the MS/MBA and met some of the most inspiring women along the way. It's where I found the courage to go all in on founding my venture in women's health, and I've felt supported the whole way in dreaming big with the business.",
        name: "Jolie L.",
        role: "Current student",
      },
    ],
    objections: [
      {
        // This answer is emitted into the FAQPage schema, so it's what an answer
        // engine will quote as the program's own response.
        question: "Will I be one of the only women in a technical program at HBS?",
        answer:
          "The program has a women's representative, Skyler Liu, and the alumni network includes women who have founded venture-backed companies, led product at Google and AWS, and gone into investing. Ask to be introduced to any of them before you apply. That conversation will tell you more than this page can.",
      },
      {
        question: "Is the dual degree worth it, or does the MBA alone open the same doors?",
        answer:
          "The engineering degree does most of the work in rooms where people are deciding whether you can evaluate what a technical team is telling you, which comes up constantly in venture, in founding, and in senior individual-contributor roles. An MBA on its own tends to leave that question open.",
      },
    ],
  },
];

export function getVariant(slug: string): Variant | undefined {
  return VARIANTS.find((v) => v.slug === slug);
}
