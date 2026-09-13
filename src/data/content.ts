// MS/MBA: Engineering Sciences, landing page content
// Source: MSMBA_LandingPage_PRD.docx v1.0 (Sept 2026)

export type CtaKind = "waitlist" | "info-session";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Women alumni of the program, featured on the ICP C page only.
 *
 * Every field is drawn from each person's own public profile, her stated title,
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
      "Building technology for textured hair. HaloBraid's braid-assist device helps stylists finish braids five times faster. Previously co-founded Desora, and researched nanotechnology at the School of Engineering and Applied Sciences.",
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

/** A school news story, linked out from the page. */
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

/** Shared across ICP A and ICP B: recent, verifiable outcomes from the school. */
export const FEATURED_STORIES: Story[] = [
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
    title: "Three start-ups named President's Innovation Challenge finalists",
    summary: "Health and research ventures will compete for a share of a $500,000 prize pool.",
    tags: ["Entrepreneurship", "Health / Medicine", "Robotics"],
    href: "https://seas.harvard.edu/news/three-seas-start-ups-named-presidents-innovation-challenge-finalists",
  },
];

/**
 * Set as typeset wordmarks rather than brand image files: logo assets carry
 * trademark usage rules, and a row of mismatched PNGs looks worse than clean
 * type.
 */
export const EMPLOYER_WORDMARKS = [
  "Google",
  "Amazon",
  "Anthropic",
  "OpenAI",
  "Netflix",
  "Spotify",
  "Datadog",
  "NVIDIA",
  "a16z",
  "Microsoft",
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
  /** Plain description of who this page is for, used on the internal index. */
  audience: string;
  theme: {
    /** Page surface, cool paper for A/B, warm for C. */
    surface: string;
    /** Hairline rule color, tuned to the surface temperature. */
    rule: string;
    /** Primary CTA: navy by default, crimson for the warmer ICP C. */
    cta: string;
    /** Whether the display headline leans serif (A, C) or grotesk (B). */
    displayLean: "serif" | "grotesk";
  };
  hero: {
    /** Full headline, drives <title>, meta description, and the H1 text. */
    headline: string;
    /** Set in the heavy grotesk. */
    headlineLead: string;
    /** Set in the editorial serif italic, the typographic turn. */
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
    /** Recent school news, linked out so the reader can verify the outcomes. */
    stories?: Story[];
    /** Optional program-level stat shown alongside whatever else is here. */
    stat?: { value: string; label: string };
    /** Employer wordmark row. */
    wordmarks?: string[];
  };
  /** Embedded video. ICP A, where seeing the actual class does the work. */
  video?: VideoEmbed;
  /** What the cohort itself is worth, beyond the credential. */
  cohort?: {
    title: string;
    intro: string;
    roles: { label: string; detail: string }[];
  };
  testimonials?: Testimonial[];
  /**
   * Ordered deliberately per audience so the section reads as a sequence rather
   * than a pile: what it is, then how it works, then the objection this reader
   * actually arrived with, then where it leads.
   */
  faqs: FaqItem[];
}

// Section 4, identical across all variants. Set as oversized numerals so the
// three facts that matter most read at a glance.
export const PROGRAM_STATS = [
  { value: "30", unit: "", label: "Students per cohort" },
  { value: "2", unit: "yrs", label: "Full-time, on campus" },
  { value: "2", unit: "", label: "Degrees conferred" },
];

export const PROGRAM_SNAPSHOT = {
  cohortSize: "30 students",
  duration: "2 years, full-time, on campus",
  degrees: "MBA (Harvard Business School) and MS in Engineering Sciences (Harvard School of Engineering and Applied Sciences)",
  // Not specified in the PRD, and the exact process isn't documented anywhere I
  // could verify, deliberately vague rather than inventing an application flow.
  applicationTiming: "Deadlines and requirements come from Harvard Business School and School of Engineering and Applied Sciences admissions. Check with them for the current cycle.",
};

// Section 5.4, the universal AEO questions.
//
// These answers are what an answer engine will quote, often stripped of the
// surrounding page, so each one leads with the direct answer, stands on its own
// without context, uses the full official program name, and carries a concrete
// number where there is one. Plain declarative sentences do double duty here:
// they're what a person wants to read and what a model can lift cleanly.
export const FAQ_WHAT_IS_IT: FaqItem = {
  question: "What is the Harvard MS/MBA: Engineering Sciences?",
  answer:
    "The MS/MBA: Engineering Sciences is a two-year, full-time joint degree from Harvard Business School and the Harvard John A. Paulson School of Engineering and Applied Sciences. Graduates receive two degrees: an MBA and an MS in Engineering Sciences. Each cohort is about thirty students, and every one of them is admitted with a technical background.",
};

export const FAQ_LENGTH: FaqItem = {
  question: "How long is the Harvard MS/MBA program?",
  answer:
    "Two years, full-time, on campus. Students finish with both an MBA from Harvard Business School and an MS in Engineering Sciences from the Harvard School of Engineering and Applied Sciences.",
};

export const FAQ_VS_MBA: FaqItem = {
  question: "How is the Harvard MS/MBA different from a regular MBA?",
  answer:
    "A standard MBA covers general management. The MS/MBA: Engineering Sciences adds a full graduate engineering degree from the Harvard School of Engineering and Applied Sciences, so graduates leave with an engineering credential as well as a business one. The cohort is also deliberately small, roughly thirty students, all of them technical.",
};

export const FAQ_GOOD_FOR_ENGINEERS: FaqItem = {
  question: "Is the MS/MBA good for software engineers?",
  answer:
    "Yes. A technical background is required for admission, and many students arrive directly from software engineering or machine learning roles. You take the Harvard Business School MBA curriculum and a full MS in Engineering Sciences at the same time, so the engineering work continues across both years. No business coursework is required to apply.",
};

export const VARIANTS: Variant[] = [
  {
    id: "parent",
    slug: "parent",
    icpLabel: "ICP A, Parents",
    audience: "Parents",
    theme: {
      surface: "bg-paper",
      rule: "border-rule",
      cta: "btn-primary",
      displayLean: "serif",
    },
    hero: {
      headline: "One Harvard Degree in Engineering and Business",
      headlineLead: "The engineer's",
      headlineEmphasis: "Harvard degree.",
      subhead:
        "The MS/MBA: Engineering Sciences is a joint degree from Harvard Business School and the Harvard School of Engineering and Applied Sciences. Over two years it pairs the full MBA curriculum with a graduate engineering degree, preparing students to lead the technology ventures they help build.",
      ctaLabel: "Request an info session",
      ctaKind: "info-session",
      secondaryCtaLabel: "See where graduates go",
    },
    heroVisual: "credential",
    problem: {
      title: "Is this program serious enough?",
      body: "From the outside, a joint degree can look like an MBA with a handful of technical electives attached. The engineering half of this program is a full graduate degree, taught and examined by the same faculty who teach the standalone master's, and it runs across both years alongside the business curriculum.",
    },
    program: {
      title: "What the joint degree actually is",
      bullets: [
        "Two degrees conferred by Harvard: an MBA from Harvard Business School and an MS in Engineering Sciences from the School of Engineering and Applied Sciences.",
        "The engineering half is taught by the same faculty, on the same curriculum, as the school's standalone master's degree.",
        "Roughly 30 students per cohort, each admitted with an established technical background and prior engineering or scientific training.",
        "MS/MBA graduates go on to excel across diverse career paths, from leading innovative product teams at the world's largest companies, to investing in innovative technology across sectors, to founding their own ventures.",
      ],
    },
    socialProof: {
      title: "Where graduates go",
      stat: {
        value: "$300M+",
        label: "Venture funding raised by alumni founders",
      },
      wordmarks: EMPLOYER_WORDMARKS,
      stories: FEATURED_STORIES,
    },
    video: {
      youtubeId: "ScZTZacWg_E",
      title: "Harvard MS/MBA | TVI Class Overview",
      caption:
        "Technology Venture Immersion is the intensive course that opens the program, before the first academic term begins. Students work in teams on real engineering and commercial problems, and faculty from both schools teach it jointly. The session below offers a direct look at the curriculum and the classroom.",
    },
    testimonials: [
      {
        quote:
          "The MS/MBA has connected me with some of the ::most brilliant people at Harvard Business School::. With how fast AI is moving, having a community to learn from and build with is **a gift**. Our group chat is constantly alive with new ideas, articles, coding tips, and advice. What I value most is that we **slow each other down** and think about the impact we actually want to have. I am proud to know my classmates will be ::the next generation of technology leaders::, and we cheer each other on.",
        name: "Georgia M.",
        role: "Current student",
      },
    ],
    // Parent narrative: what it is, how long, how it differs, is it real, and
    // finally where it leads.
    faqs: [
      FAQ_WHAT_IS_IT,
      FAQ_LENGTH,
      FAQ_VS_MBA,
      {
        question: "Is the MS/MBA as rigorous as a standalone engineering master's?",
        answer:
          "Yes. The MS in Engineering Sciences is granted by the Harvard School of Engineering and Applied Sciences and taught by its faculty, on the same graduate curriculum the school uses for its other master's students. It runs alongside the Harvard Business School coursework rather than replacing any part of it, which is why the program takes two full years.",
      },
      {
        question: "What do Harvard MS/MBA graduates go on to do?",
        answer:
          "Graduates lead product and engineering teams at major technology companies, work in venture capital and technology investing, and found their own companies. Alumni founders have raised more than $300M in venture funding. Because the engineering degree is conferred alongside the MBA, graduates keep a technical credential regardless of which path they take.",
      },
      {
        question: "Does the MS/MBA limit a career to entrepreneurship?",
        answer:
          "No. Founding a company is one common path, and many graduates take others, including product management, technology investing, and engineering leadership at established companies. The joint degree is designed to widen the range of roles available rather than narrow it.",
      },
    ],
  },
  {
    id: "swe",
    slug: "swe",
    icpLabel: "ICP B, Engineers",
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
        "The MS/MBA: Engineering Sciences is a two-year Harvard program for engineers who want to set the direction, not just implement it. You leave with an MBA from Harvard Business School, an MS in Engineering Sciences from the School of Engineering and Applied Sciences, and a cohort of thirty technical builders who become your co-founders, investors, and closest friends.",
      ctaLabel: "Join the waitlist",
      ctaKind: "waitlist",
      secondaryCtaLabel: "See what makes it different",
    },
    heroVisual: "code",
    problem: {
      title: "The part nobody taught you",
      body: "You already know how to build. The other half is rarely handed to an engineer: how capital gets allocated, how a market gets chosen, how a team gets assembled and led. These are learnable skills, and they are seldom picked up on the job. This program teaches them to people who can already ship.",
    },
    program: {
      title: "Not a traditional MBA",
      bullets: [
        "About thirty people per cohort, every one of them from a technical background.",
        "No business coursework required to apply. Most people arrive without any.",
        "Two degrees at the end: an MBA from Harvard Business School and an MS in Engineering Sciences from the School of Engineering and Applied Sciences.",
        "The engineering coursework runs through both years, so you keep building the whole time you are here.",
      ],
    },
    socialProof: {
      // ICP B is the one who checks whether the outcomes are real and recent.
      // Linking straight out to the school rather than paraphrasing lets them verify.
      title: "What graduates go on to do",
      stat: {
        value: "$300M+",
        label: "Venture funding raised by alumni founders",
      },
      wordmarks: EMPLOYER_WORDMARKS,
      stories: FEATURED_STORIES,
    },
    cohort: {
      title: "What you take away from thirty people",
      intro:
        "The degree is what goes on the résumé. The cohort is what you are still drawing on twenty years later, and it is the part that is almost impossible to assemble on your own.",
      roles: [
        { label: "Classmates", detail: "Thirty engineers working on the same problems at the same time." },
        { label: "Collaborators", detail: "The people you call when a project needs a second brain." },
        { label: "Co-founders", detail: "Companies from this program start in these classrooms." },
        { label: "Investors", detail: "Classmates who go into venture and back what you build." },
        { label: "Early hires", detail: "The first engineers you trust enough to recruit." },
        { label: "Lifelong friends", detail: "The people who knew you before any of it worked." },
      ],
    },
    testimonials: [
      {
        quote:
          "The MS/MBA has **expanded my world**. I was hesitant at first that my software engineering experience would not be valued in a business setting. What I found instead is a ::community of like-minded collaborators and friends::, all of them interested in technology and in what it takes to lead a venture built on it. I have been challenged to apply creative problem solving, to explore areas of engineering I had not touched, and to think seriously about ::where I want my career to go::.",
        name: "Emmanuel S.",
        role: "Current student",
      },
    ],
    // Engineer narrative: what it is, is it for me, how it differs, do I stay
    // technical, who is in the room, why not self-teach, how long.
    faqs: [
      FAQ_WHAT_IS_IT,
      FAQ_GOOD_FOR_ENGINEERS,
      FAQ_VS_MBA,
      {
        question: "Will an MBA make me less of an engineer?",
        answer:
          "No. You take engineering coursework at the Harvard School of Engineering and Applied Sciences across both years and graduate with a master's in Engineering Sciences. You will write less production code during the program than you would in a full-time engineering job, and you leave with a graduate engineering degree and two years of applied technical work behind you.",
      },
      {
        question: "Who else is in the MS/MBA cohort?",
        answer:
          "Engineers, scientists, and technical founders. A technical background is required for admission, so every one of the roughly thirty people in the cohort has one. Students take Harvard Business School classes alongside the wider MBA program, and go through the engineering curriculum together as a technical group.",
      },
      {
        question: "Can I learn the business side on my own instead?",
        answer:
          "You can learn the concepts independently, and many engineers do. What is harder to assemble alone is the network: a cohort of technical founders, faculty in both engineering and management, and an alumni community that answers when you call. Alumni founders from this program have raised more than $300M in venture funding.",
      },
      FAQ_LENGTH,
    ],
  },
  {
    id: "women-in-tech",
    slug: "women-in-tech",
    icpLabel: "ICP C, Women in tech",
    audience: "Women in tech weighing HBS",
    theme: {
      surface: "bg-paper-warm",
      rule: "border-rule-warm",
      cta: "btn-primary btn-crimson",
      displayLean: "serif",
    },
    hero: {
      headline: "Women Who Build, at Harvard",
      headlineLead: "Women who build.",
      headlineEmphasis: "At Harvard.",
      subhead:
        "The MS/MBA: Engineering Sciences is a joint degree from Harvard Business School and the Harvard School of Engineering and Applied Sciences, and you stay an engineer the whole way through. The cohort is small, the women in it know each other well, and the alumnae ahead of you have founded companies, led technical teams, and moved into investing.",
      ctaLabel: "Talk to our women's rep",
      ctaKind: "info-session",
      secondaryCtaLabel: "Meet the community",
    },
    heroVisual: "community",
    problem: {
      title: "Will I belong here?",
      body: "If you have been the only woman in an engineering room, you already know the difference between a program that has thought about it and one that has not. The specifics are what is hard to find from the outside: how many women are actually in the cohort, who you can go to for an honest answer, and what the women ahead of you went on to build.",
    },
    program: {
      title: "What's actually here",
      bullets: [
        "An MBA on its own reads as a business degree. This one carries a graduate engineering degree with it, which changes what people assume you can do.",
        "A dedicated student-nominated women's representative, who runs everything from coding sessions to potlucks to weekends out in Boston.",
        "Alumnae who have founded venture-backed companies, led technical and product teams, and moved into investing.",
        "Two degrees at the end: an MBA from Harvard Business School and an MS in Engineering Sciences from the School of Engineering and Applied Sciences.",
      ],
    },
    socialProof: {
      // "The main story, not a diversity footnote", the women alumni roster
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
          "I am so proud to be the ::women's rep:: for my cohort. I host vibe coding sessions, cozy potluck nights, and outings to explore Boston. **Getting close outside of class** is what makes learning together in the classroom all the more fun.",
        name: "Skyler L.",
        role: "Current student, women's representative",
      },
      {
        quote:
          "I have made **lifelong friends** in the MS/MBA and met some of the most inspiring women along the way. It is where I found the ::courage to go all in:: on founding my venture in women's health, and I have felt supported the whole way in **dreaming big** with the business.",
        name: "Jolie L.",
        role: "Current student",
      },
    ],
    // Women in tech narrative: what it is, is it for engineers, will I belong,
    // is the joint degree worth it, how it differs, how long.
    faqs: [
      FAQ_WHAT_IS_IT,
      FAQ_GOOD_FOR_ENGINEERS,
      {
        // Emitted into the FAQPage schema, so this is what an answer engine will
        // quote when asked about support for women in the program.
        question: "Is the Harvard MS/MBA a good program for women in tech?",
        answer:
          "Yes. The cohort is small, roughly thirty students, which makes the community close rather than anonymous. Each cohort nominates a dedicated women's representative who organizes coding sessions, dinners, and social events through the year. Alumnae of the program have founded venture-backed companies, led technical and product teams, and moved into investing, and current students can ask to be introduced to them before applying.",
      },
      {
        question: "Is the joint degree worth it, or does an MBA alone open the same doors?",
        answer:
          "The engineering degree settles a question an MBA alone tends to leave open, which is whether you can evaluate what a technical team is telling you. That matters in venture capital, in founding a company, and in senior technical roles. Graduates carry both credentials, so they are not asked to choose which one to lead with.",
      },
      FAQ_VS_MBA,
      FAQ_LENGTH,
    ],
  },
];

export function getVariant(slug: string): Variant | undefined {
  return VARIANTS.find((v) => v.slug === slug);
}
