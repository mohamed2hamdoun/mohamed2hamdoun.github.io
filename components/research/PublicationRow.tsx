import Link from 'next/link';
import type { Publication } from '@/data/research';

/**
 * PublicationRow — a single peer-reviewed publication rendered as a journal
 * article block: source band, oversized title, abstract + numbered methods,
 * and a footer carrying DOI / link status and the case-study link.
 *
 * Honesty rules (data/research.ts): DOI stays a labelled placeholder, and when
 * `pub.link` is null we show "[ PUBLICATION LINK PENDING ]" instead of a
 * "Read Paper" button. The real link renders only once a verified URL exists.
 */
export default function PublicationRow({ pub }: { pub: Publication }) {
  return (
    <article data-reveal className="border border-ink">
      {/* source band — status + journal/category */}
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-[color:var(--color-line-ink)] px-[clamp(20px,3vw,40px)] py-[clamp(14px,2vh,20px)]">
        <span className="inline-flex items-center gap-2 bg-signal px-3 py-2 font-mono text-[10px] font-medium leading-none tracking-[0.16em] text-paper">
          <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-paper" />
          {pub.status}
        </span>
        <span className="font-mono text-[10px] leading-[1.6] tracking-[0.16em] text-muted">
          JOURNAL — {pub.journal.toUpperCase()} · {pub.category.toUpperCase()}
        </span>
      </header>

      {/* title */}
      <div className="border-b border-[color:var(--color-line-ink)] px-[clamp(20px,3vw,40px)] py-[clamp(20px,3vh,34px)]">
        <h3 className="max-w-[26ch] font-display text-[clamp(24px,3.4vw,48px)] uppercase leading-[1.02] text-ink">
          {pub.title}
        </h3>
      </div>

      {/* body — abstract | methods */}
      <div className="flex flex-wrap">
        <div className="min-w-[min(100%,300px)] flex-[1_1_460px] border-b border-[color:var(--color-line-ink)] px-[clamp(20px,3vw,40px)] py-[clamp(22px,3vh,36px)] md:border-b-0 md:border-r md:border-[color:var(--color-line-ink)]">
          <p className="m-0 max-w-[64ch] text-[14.5px] leading-[1.65] text-pretty text-paper-ink">
            <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted">
              ABSTRACT —{' '}
            </span>
            {pub.abstract}
          </p>
        </div>

        <div className="min-w-[min(100%,240px)] flex-[1_1_240px] px-[clamp(20px,3vw,40px)] py-[clamp(22px,3vh,36px)]">
          <span className="mb-3 block font-mono text-[10px] font-medium leading-none tracking-[0.16em] text-muted">
            METHODS
          </span>
          <ul className="m-0 list-none p-0">
            {pub.methods.map((m, i) => (
              <li
                key={m}
                className={`font-mono text-[11px] leading-[2] tracking-[0.06em] text-ink ${
                  i < pub.methods.length - 1 ? 'border-b border-[color:var(--color-line-ink)]' : ''
                }`}
              >
                {`${String(i + 1).padStart(2, '0')} — ${m.toUpperCase()}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* footer — DOI / link status + case study */}
      <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-ink px-[clamp(20px,3vw,40px)] py-[clamp(14px,2vh,20px)]">
        <span className="font-mono text-[10px] leading-[1.8] tracking-[0.1em] text-muted">
          DOI — [ AWAITING VERIFICATION ] ·{' '}
          {pub.link ? (
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2 hover:text-signal"
            >
              READ PAPER ↗
            </a>
          ) : (
            <span className="text-faint">[ PUBLICATION LINK PENDING ]</span>
          )}
        </span>
        <Link
          href={pub.caseStudy}
          className="font-mono text-[11px] font-medium leading-none tracking-[0.16em] text-ink hover:text-signal"
        >
          READ THE CASE STUDY →
        </Link>
      </footer>
    </article>
  );
}
