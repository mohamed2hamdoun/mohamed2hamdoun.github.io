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
  phone: '+971 50 703 3673',
  phoneHref: 'tel:+971507033673',
  availability: 'AVAILABLE FOR SELECTED PROJECTS',
  closingHeadline:
    'LET’S BUILD SOMETHING THAT THINKS CLEARLY AND FEELS UNFORGETTABLE.',
  url: 'https://mohamed2hamdoun.github.io',
  /** Downloadable CV (generated PDF in /public). */
  cvUrl: '/Mohamed-Hamdoun-CV.pdf',
  description:
    'Mohamed Hamdoun — AI Systems Developer, applied AI researcher, and creative technologist based in the UAE. Agentic systems, machine-learning research, LLM-powered products, and cinematic web experiences.',
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

// Verified from CV + GitHub. Unverified links (href:null) render as a placeholder
// and are not clickable.
export const socials: SocialLink[] = [
  {
    label: 'EMAIL',
    value: 'mohamed2hamdoun@gmail.com',
    href: 'mailto:mohamed2hamdoun@gmail.com',
    verified: true,
  },
  { label: 'PHONE', value: '+971 50 703 3673', href: 'tel:+971507033673', verified: true },
  { label: 'LINKEDIN', value: 'linkedin.com/in/mohamed-hamdoun', href: 'https://linkedin.com/in/mohamed-hamdoun', verified: true, external: true },
  { label: 'GITHUB', value: 'github.com/mohamed2hamdoun', href: 'https://github.com/mohamed2hamdoun', verified: true, external: true },
  { label: 'YOUTUBE', value: 'youtube.com/@mohamed_tech1', href: 'https://youtube.com/@mohamed_tech1', verified: true, external: true },
];

export const projectTypes = [
  { value: 'ai', label: 'AI / AGENTIC SYSTEM' },
  { value: 'web', label: 'WEB PRODUCT' },
  { value: 'research', label: 'RESEARCH COLLABORATION' },
  { value: 'creative', label: 'CREATIVE / FILM' },
  { value: 'other', label: 'OTHER' },
] as const;
