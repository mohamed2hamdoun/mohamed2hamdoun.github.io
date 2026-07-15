import type { ReactNode } from 'react';

/**
 * Shared editorial section chrome for the case-study template. Owns the
 * ink/paper tone, the full-width padding, the hairline top border, and the
 * signal-tick mono kicker + optional Anton h2. Every prose/diagram block on the
 * page is composed inside one of these so the rhythm stays consistent.
 */
interface SectionProps {
  /** Mono eyebrow, e.g. "SUMMARY". Doubles as the a11y label when no title. */
  label: string;
  /** Optional Anton section heading (rendered as <h2>). */
  title?: string;
  tone?: 'ink' | 'paper';
  children: ReactNode;
}

export default function Section({ label, title, tone = 'ink', children }: SectionProps) {
  const paper = tone === 'paper';
  return (
    <section
      aria-label={title ?? label}
      className={`border-t ${
        paper
          ? 'bg-paper text-ink border-ink'
          : 'bg-ink text-paper border-[color:var(--color-line-paper)]'
      }`}
      style={{ padding: 'clamp(40px,6.5vh,80px) clamp(16px,3vw,40px)' }}
    >
      <header className="mb-[clamp(20px,3vh,36px)] flex flex-wrap items-baseline gap-x-5 gap-y-3">
        <span className="flex items-center gap-2 font-mono text-[11px] leading-none tracking-[0.18em] text-signal">
          <span aria-hidden className="inline-block h-[7px] w-[7px] bg-signal" />
          {label}
        </span>
        {title && (
          <h2
            className="w-full font-display leading-[0.98]"
            style={{ fontSize: 'clamp(28px,3.6vw,56px)' }}
          >
            {title}
          </h2>
        )}
      </header>
      {children}
    </section>
  );
}
