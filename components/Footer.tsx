import Link from 'next/link';
import { site } from '@/data/site';

/**
 * Global site footer (rendered once in the root layout, so it appears on every
 * route). The home Contact section ends above it — no duplicate footer.
 */
export default function Footer() {
  return (
    <footer className="relative flex flex-wrap items-center justify-between gap-x-7 gap-y-3 border-t border-[color:var(--color-line-paper)] bg-ink px-[clamp(16px,3vw,40px)] py-[18px] font-mono text-[10px] leading-relaxed tracking-[0.14em] text-faint">
      <span>
        <span className="font-display text-[14px] tracking-[0.04em] text-paper">{site.monogram}</span>
        {' — © 2026 MOHAMED HAMDOUN'}
      </span>
      <span>{site.concept} — {site.locationShort}</span>
      <span className="flex gap-5">
        <Link href="/work" className="text-muted hover:text-signal">WORK</Link>
        <Link href="/research" className="text-muted hover:text-signal">RESEARCH</Link>
        <Link href="/about" className="text-muted hover:text-signal">ABOUT</Link>
      </span>
    </footer>
  );
}
