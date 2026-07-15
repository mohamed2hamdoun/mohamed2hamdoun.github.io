import Link from 'next/link';
import { publications, researchInterests } from '@/data/research';

/**
 * RESEARCH PREVIEW (paper). Ported from the approved design (Home.dc.html §Research
 * Preview). Content is data-driven from data/research; styling values are verbatim.
 */
export default function ResearchPreview() {
  const pub = publications[0];
  const label = `${pub.status} — ${pub.journal.toUpperCase()} (JOURNAL) · ${pub.category.toUpperCase()}`;

  return (
    <section
      aria-label="Research"
      className="bg-paper text-ink border-t border-ink"
      style={{ padding: 'clamp(40px,7vh,80px) clamp(16px,3vw,40px)' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <h2
          className="font-display"
          style={{ margin: 0, fontSize: 'clamp(30px,4vw,60px)', lineHeight: 1 }}
        >
          RESEARCH
        </h2>
        <Link
          href="/research"
          className="font-mono hover:text-signal"
          style={{ fontSize: '11px', fontWeight: 500, lineHeight: 1, letterSpacing: '0.16em' }}
        >
          FULL RESEARCH PAGE →
        </Link>
      </div>

      <article
        data-reveal
        className="border border-ink"
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {/* abstract column */}
        <div
          style={{
            flex: '1 1 460px',
            minWidth: 'min(100%,300px)',
            padding: 'clamp(22px,3vw,40px)',
            borderRight: '1px solid rgba(8,8,8,0.25)',
          }}
        >
          <p
            className="font-mono text-signal"
            style={{ margin: '0 0 12px', fontSize: '10px', lineHeight: 1.6, letterSpacing: '0.16em' }}
          >
            {label}
          </p>
          <h3
            className="font-display uppercase"
            style={{ margin: '0 0 16px', fontSize: 'clamp(24px,3vw,44px)', lineHeight: 1.02, maxWidth: '24ch' }}
          >
            {pub.title}
          </h3>
          <p
            className="text-paper-ink"
            style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.65, maxWidth: '62ch', textWrap: 'pretty' }}
          >
            <span
              className="font-mono text-muted"
              style={{ fontWeight: 500, fontSize: '11px', letterSpacing: '0.14em' }}
            >
              ABSTRACT —{' '}
            </span>
            {pub.abstract}
          </p>
          <p
            className="font-mono text-muted"
            style={{ margin: '16px 0 0', fontSize: '10px', lineHeight: 1.8, letterSpacing: '0.1em' }}
          >
            DOI — [ AWAITING VERIFICATION ] · LINK — [ PENDING ]
          </p>
        </div>

        {/* methods column */}
        <div
          style={{
            flex: '1 1 260px',
            minWidth: 'min(100%,240px)',
            padding: 'clamp(22px,3vw,40px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <span
            className="font-mono text-muted"
            style={{ fontWeight: 500, fontSize: '10px', lineHeight: 1, letterSpacing: '0.16em', marginBottom: '8px' }}
          >
            METHODS
          </span>
          {pub.methods.map((m, i) => (
            <span
              key={m}
              className="font-mono"
              style={{
                fontSize: '11px',
                lineHeight: 2,
                letterSpacing: '0.06em',
                borderBottom: i < pub.methods.length - 1 ? '1px solid rgba(8,8,8,0.15)' : undefined,
              }}
            >
              {`${String(i + 1).padStart(2, '0')} — ${m.toUpperCase()}`}
            </span>
          ))}
          <Link
            href={pub.caseStudy}
            className="font-mono hover:text-signal"
            style={{ marginTop: 'auto', paddingTop: '18px', fontSize: '11px', fontWeight: 500, lineHeight: 1, letterSpacing: '0.16em' }}
          >
            READ THE CASE STUDY →
          </Link>
        </div>
      </article>

      {/* current directions */}
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px', alignItems: 'center' }}
      >
        <span
          className="font-mono text-muted"
          style={{ fontWeight: 500, fontSize: '10px', lineHeight: 1, letterSpacing: '0.16em', marginRight: '8px' }}
        >
          CURRENT DIRECTIONS —
        </span>
        {researchInterests.map((interest) => (
          <span
            key={interest}
            className="font-mono"
            style={{
              border: '1px solid rgba(8,8,8,0.35)',
              padding: '8px 12px',
              fontSize: '10px',
              lineHeight: 1,
              letterSpacing: '0.12em',
            }}
          >
            {interest.toUpperCase()}
          </span>
        ))}
      </div>
    </section>
  );
}
