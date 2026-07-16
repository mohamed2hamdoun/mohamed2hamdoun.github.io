/** @type {import('next').NextConfig} */

// Static export for GitHub Pages (no server runtime). This generates a fully
// static `out/` directory: every route as HTML, the case studies pre-rendered
// via generateStaticParams, plus sitemap/robots/OG image as static files.
//
// Note: `headers()` / API routes / server-side rendering are intentionally NOT
// used — GitHub Pages is static hosting. The contact form uses a mailto composer.
// If this is ever hosted on a Node server (e.g. Vercel), drop `output: 'export'`
// and re-add security headers + a real contact API.
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // next/image optimizer needs a server; static export can't use it
  },
};

export default nextConfig;
