// data/site.ts — single source of truth for identity, nav, contact, metrics.
// Ported from the approved Claude Design frontend (data/site.js), typed for production.

export interface NavItem {
  label: string;
  /** Real Next.js route. */
  href: string;
}

export interface Metric {
  value: string;
  label: string;
  /** Highlight in signal red (used for the single strongest metric). */
  accent?: boolean;
}

export interface SocialLink {
  label: string;
  value: string;
  /** null when the URL is not yet verified — the UI hides/greys unlinked entries. */
  href: string | null;
  verified: boolean;
  /** Opens in a new tab (external). */
  external?: boolean;
}

export const site = {
  name: 'Mohamed Hamdoun',
  monogram: 'MH',
  location: 'United Arab Emirates',
  locationShort: 'UAE',
  timezone: 'GST (UTC+4)',
  roles: ['AI SYSTEMS DEVELOPER', 'RESEARCHER', 'CREATIVE TECHNOLOGIST'] as const,
  topLabels: [
    'AI SYSTEMS / RESEARCH / CREATIVE TECHNOLOGY',
    'BASED IN THE UAE',
    'AVAILABLE FOR SELECTED PROJECTS',
  ] as const,
  statement:
    'I design intelligent systems and digital experiences that turn complex ideas into useful, memorable products.',
  concept: 'INTELLIGENCE, DESIGNED.',
  email: 'mohamed2hamdoun@gmail.com',
  availability: 'AVAILABLE FOR SELECTED PROJECTS',
  closingHeadline:
    'LET’S BUILD SOMETHING THAT THINKS CLEARLY AND FEELS UNFORGETTABLE.',
  // TODO(CLAUDE-CODE): confirm production origin before launch (used for metadata + sitemap).
  url: 'https://mohamedhamdoun.com',
  description:
    'Mohamed Hamdoun — AI Systems Developer, applied AI researcher, and creative technologist based in the UAE. Agentic systems, machine-learning research, and cinematic web experiences.',
} as const;

export const nav: NavItem[] = [
  { label: 'WORK', href: '/work' },
  { label: 'RESEARCH', href: '/research' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/#contact' },
];

// Only verified metrics. Do NOT add invented numbers (see FACTUAL CONTENT RULES).
export const metrics: Metric[] = [
  { value: '01', label: 'PUBLISHED\nRESEARCH PAPER', accent: true },
  { value: 'TOP 3', label: 'HACKATHON\nCHALLENGE CATEGORY' },
  { value: '4+', label: 'YEARS OF\nCREATIVE PRODUCTION' },
];

// TODO(CLAUDE-CODE): replace placeholder profile URLs with verified links, then flip `verified`.
// Unverified links render as "[ AWAITING VERIFIED URL ]" and are not clickable.
export const socials: SocialLink[] = [
  {
    label: 'EMAIL',
    value: 'mohamed2hamdoun@gmail.com',
    href: 'mailto:mohamed2hamdoun@gmail.com',
    verified: true,
  },
  { label: 'LINKEDIN', value: '[ AWAITING VERIFIED URL ]', href: null, verified: false, external: true },
  { label: 'GITHUB', value: '[ AWAITING VERIFIED URL ]', href: null, verified: false, external: true },
  { label: 'YOUTUBE', value: '[ AWAITING VERIFIED URL ]', href: null, verified: false, external: true },
];

export const projectTypes = [
  { value: 'ai', label: 'AI / AGENTIC SYSTEM' },
  { value: 'web', label: 'WEB PRODUCT' },
  { value: 'research', label: 'RESEARCH COLLABORATION' },
  { value: 'creative', label: 'CREATIVE / FILM' },
  { value: 'other', label: 'OTHER' },
] as const;
