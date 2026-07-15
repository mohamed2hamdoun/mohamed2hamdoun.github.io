import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { projectSlugs } from '@/data/projects';
import { site } from '@/data/site';

// sitemap.ts / robots.ts only import types from 'next' (erased at runtime), so both
// are safe to call directly in a node test. Mirror the base-URL derivation they use.
const base = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, '');

describe('sitemap()', () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it('includes the four static routes', () => {
    for (const path of ['', '/work', '/research', '/about']) {
      expect(urls).toContain(`${base}${path}`);
    }
  });

  it('includes one entry per project slug', () => {
    for (const slug of projectSlugs) {
      expect(urls).toContain(`${base}/work/${slug}`);
    }
  });

  it('has exactly the static + per-project entries', () => {
    expect(entries).toHaveLength(4 + projectSlugs.length);
  });
});

describe('robots()', () => {
  it('disallows /api/', () => {
    const r = robots();
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    const disallow = rules.flatMap((rule) => {
      const d = rule?.disallow;
      if (!d) return [];
      return Array.isArray(d) ? d : [d];
    });
    expect(disallow).toContain('/api/');
  });

  it('points at the sitemap', () => {
    expect(robots().sitemap).toBe(`${base}/sitemap.xml`);
  });
});
