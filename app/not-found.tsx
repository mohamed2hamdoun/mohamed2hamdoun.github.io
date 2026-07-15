import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-56px)] flex-col items-center justify-center gap-8 px-[clamp(16px,3vw,40px)] py-24 text-center">
      <p className="font-mono text-[11px] leading-none tracking-[0.2em] text-signal">
        ERROR — ROUTE NOT FOUND
      </p>
      <h1 className="font-display text-[clamp(80px,20vw,220px)] leading-[0.86] text-paper">404</h1>
      <p className="max-w-[46ch] font-body text-[15px] leading-relaxed text-muted">
        This page doesn’t exist — or hasn’t been built yet. The signal drops here.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-3 bg-signal px-6 py-4 font-mono text-[12px] font-medium leading-none tracking-[0.16em] text-paper transition-colors hover:bg-paper hover:text-ink"
      >
        RETURN HOME <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
