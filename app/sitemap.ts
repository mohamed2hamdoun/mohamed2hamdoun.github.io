import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { projectSlugs } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/\/$/, '');
  const staticRoutes = ['', '/work', '/research', '/about'].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${base}/work/${slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...projectRoutes];
}
