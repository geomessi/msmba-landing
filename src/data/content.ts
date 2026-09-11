// MS/MBA: Engineering Sciences — landing page content
// Source: MSMBA_LandingPage_PRD.docx v1.0 (Sept 2026)
// Items marked [PLACEHOLDER] below are called out as open items in PRD section 8
// and must be filled in with real names/quotes/stats before any traffic goes live.

export type CtaKind = "waitlist" | "info-session";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface QuoteItem {
  quote: string;
  attribution: string;
  isPlaceholder?: boolean;
}

export interface Variant {
  id: "parent" | "swe" | "women-in-tech";
  slug: string;
  icpLabel: string;
  personaName: string;
  theme: {
    bg: string;
    heroBg: string;
    heroText: string;
    accent: string;
    accentText: string;
    headingFont: string;
  };
  hero: {
    headline: string;
    subhead: string;
    ctaLabel: string;
    ctaKind: CtaKind;
  };
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
    quotes: QuoteItem[];
  };
  objections: FaqItem[];
  communityAssets?: string[];
}

// Section 4 — same across all variants
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
    icpLabel: "ICP A — The Parent",
    personaName: "The Strategic Parent",
    theme: {
      bg: "bg-white",
      heroBg: "bg-[#A51C30]",
      heroText: "text-white",
      accent: "text-[#A51C30]",
      accentText: "bg-[#A51C30] text-white",
      headingFont: "font-serif",
    },
    hero: {
      headline: "Two Degrees. Two Institutions. One Rare Path.",
      subhead:
        "Your child already knows how to build. The MS/MBA equips them to lead what they build — with an MBA from HBS and an MS in Engineering Sciences from SEAS.",
      ctaLabel: "Request an Info Session",
      ctaKind: "info-session",
    },
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
      title: "Where graduates go",
      quotes: [
        {
          quote: "[PLACEHOLDER — replace with a verified alumni outcome or quote before launch]",
          attribution: "[PLACEHOLDER] Alumni name, grad year, current role",
          isPlaceholder: true,
        },
        {
          quote: "[PLACEHOLDER — replace with a verified alumni outcome or quote before launch]",
          attribution: "[PLACEHOLDER] Alumni name, grad year, current role",
          isPlaceholder: true,
        },
      ],
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
    icpLabel: "ICP B — The SWE Pivot",
    personaName: "The Builder Who Wants to Lead",
    theme: {
      bg: "bg-white",
      heroBg: "bg-[#001A3A]",
      heroText: "text-white",
      accent: "text-[#001A3A]",
      accentText: "bg-[#A51C30] text-white",
      headingFont: "font-sans",
    },
    hero: {
      headline: "You Built It. Now Learn to Run It.",
      subhead:
        "The MS/MBA: Engineering Sciences is a two-year Harvard program for engineers who want to found companies, lead products, and make 'how to build it' decisions at the table — not take orders from it.",
      ctaLabel: "Join the Waitlist",
      ctaKind: "waitlist",
    },
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
      title: "What graduates go on to do",
      quotes: [
        {
          quote:
            "Alumni founders from this program have gone on to raise over $300M in venture funding.",
          attribution: "Program-level outcome (PRD v1.0) — pair with named founder stories before launch",
        },
        {
          quote: "[PLACEHOLDER — replace with a verified founder/PM alumni quote before launch]",
          attribution: "[PLACEHOLDER] Alumni name, grad year, current role",
          isPlaceholder: true,
        },
      ],
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
    icpLabel: "ICP C — Women in Tech",
    personaName: "The Engineer Who Belongs",
    theme: {
      bg: "bg-[#FBF7F2]",
      heroBg: "bg-[#A51C30]",
      heroText: "text-white",
      accent: "text-[#A51C30]",
      accentText: "bg-[#A51C30] text-white",
      headingFont: "font-serif",
    },
    hero: {
      headline: "Built With You in Mind. Not After the Fact.",
      subhead:
        "The MS/MBA brings your engineering identity into HBS — with a community of women who've done it, a women's representative in the program, and a dual degree that says you can build it and run it.",
      ctaLabel: "Talk to Our Women's Rep",
      ctaKind: "info-session",
    },
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
      title: "Alumni who've done it",
      quotes: [
        {
          quote: "[PLACEHOLDER — 1–2 sentence quote from a women alum, founder/PM/investor path]",
          attribution: "[PLACEHOLDER] Alumni name, grad year, current role",
          isPlaceholder: true,
        },
        {
          quote: "[PLACEHOLDER — 1–2 sentence quote from a women alum, founder/PM/investor path]",
          attribution: "[PLACEHOLDER] Alumni name, grad year, current role",
          isPlaceholder: true,
        },
        {
          quote: "[PLACEHOLDER — 1–2 sentence quote from a women alum, founder/PM/investor path]",
          attribution: "[PLACEHOLDER] Alumni name, grad year, current role",
          isPlaceholder: true,
        },
      ],
    },
    objections: [
      {
        question: "Will I be one of the only women in a technical program at HBS?",
        answer:
          "[PLACEHOLDER — insert real cohort gender composition stat once available.] The program has a named women's representative and an alumni network of women founders, PMs, and investors — ask to be connected directly.",
      },
      {
        question: "Is the dual degree worth it, or does the MBA alone open the same doors?",
        answer:
          "The technical credential differentiates you, especially for VC, founder, and senior IC paths — it signals you can build, not just manage the people who build.",
      },
    ],
    communityAssets: [
      "[PLACEHOLDER] Women's Representative — name, title, and direct contact path",
      "[PLACEHOLDER] Women in cohort — % or relevant stat, if available",
      "Link to the broader Women @ HBS community",
    ],
  },
];

export function getVariant(slug: string): Variant | undefined {
  return VARIANTS.find((v) => v.slug === slug);
}
