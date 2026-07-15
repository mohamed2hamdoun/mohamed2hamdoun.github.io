import { site } from '@/data/site';

/**
 * Site-wide Person + WebSite structured data. Only VERIFIED facts — no unverified
 * social profiles (sameAs), no invented awards/affiliations.
 * TODO(CLAUDE-CODE): add `sameAs: [linkedin, github, youtube]` once those URLs are verified,
 * and add a ScholarlyArticle node for the publication when its URL/DOI is confirmed.
 */
export default function JsonLd() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, '');
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: site.name,
        jobTitle: 'AI Systems Developer, Applied AI Researcher, Creative Technologist',
        url: base,
        email: `mailto:${site.email}`,
        address: { '@type': 'PostalAddress', addressCountry: 'AE', addressRegion: site.location },
        knowsAbout: ['Artificial Intelligence', 'Agentic Systems', 'Machine Learning', 'Web Development', 'Creative Technology'],
      },
      {
        '@type': 'WebSite',
        name: `${site.name} — Portfolio`,
        url: base,
        inLanguage: 'en',
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
