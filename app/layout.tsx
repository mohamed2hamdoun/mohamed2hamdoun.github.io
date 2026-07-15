import type { Metadata, Viewport } from 'next';
import { Anton, Instrument_Sans, Instrument_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { site } from '@/data/site';

// Self-hosted via next/font — no layout shift, no external font request at runtime.
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' });
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument-sans', display: 'swap' });
const instrumentSerif = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-instrument-serif', display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-ibm-plex-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI Systems Developer & Creative Technologist`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — AI Systems Developer & Creative Technologist`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — AI Systems Developer & Creative Technologist`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  // TODO(CLAUDE-CODE): add openGraph.images / twitter.images once OG images are generated
  // (see SEO & METADATA phase). Add icons/manifest when favicon assets exist.
};

export const viewport: Viewport = {
  themeColor: '#080808',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${anton.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`;
  return (
    <html lang="en" className={fontVars}>
      <head>
        {/* Progressive enhancement: if JS is unavailable, reveal-animated content
            must still be visible. The reveal island (client) handles the animated path. */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: '[data-reveal]{opacity:1!important;transform:none!important}[data-underline]{width:100%!important}' }} />
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-[-48px] z-[200] bg-signal px-[18px] py-[10px] font-mono text-[12px] leading-none tracking-[0.12em] text-paper transition-[top] duration-150 focus:top-3"
        >
          SKIP TO CONTENT
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
        <JsonLd />
      </body>
    </html>
  );
}
