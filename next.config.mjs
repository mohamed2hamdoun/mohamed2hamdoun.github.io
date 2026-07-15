/** @type {import('next').NextConfig} */

// Practical security headers for a static+API portfolio. CSP is intentionally
// permissive for Next's inline runtime + the JSON-LD/noscript inline styles;
// tighten with nonces if the threat model warrants it.
//
// DEV needs 'unsafe-eval' (Next Fast Refresh / webpack HMR evaluate modules via
// eval) and the HMR websocket; PROD stays strict (no eval). Getting this wrong
// silently kills ALL client JS in dev — reveals, menu, filters, contact form.
const isDev = process.env.NODE_ENV !== 'production';

const csp = [
  "default-src 'self'",
  isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  isDev ? "connect-src 'self' ws: wss: http://localhost:*" : "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
