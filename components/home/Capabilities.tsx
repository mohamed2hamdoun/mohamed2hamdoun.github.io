// components/home/Capabilities.tsx — "WHAT I DO" capability areas.
// Ported from _redesign/Home.dc.html lines 336–367. Server component.

import Link from 'next/link';
import { capabilities, type Capability } from '@/data/capabilities';

// Source used cap.d1/d2/d3 to fill 3 of the 9 decorative cells (grid positions
// [2],[3],[7]); the rest stay bordered. We vary the signal-red / ink accents per
// row off cap.diagram so each row's diagram reads distinctly.
const DIAGRAM_FILLS: Record<Capability['diagram'], [string, string, string]> = {
  graph: ['#E5242A', '#080808', '#E5242A'],
  screen: ['#080808', '#E5242A', '#080808'],
  chart: ['#E5242A', '#E5242A', '#080808'],
  frames: ['#080808', '#080808', '#E5242A'],
};

const CELL_BORDER = '1px solid rgba(8,8,8,.4)';

export default function Capabilities() {
  return (
    <section aria-label="Capabilities" className="bg-paper text-ink border-t border-ink">
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          padding: 'clamp(36px,6vh,64px) clamp(16px,3vw,40px) 24px',
        }}
      >
        <h2 className="font-display" style={{ margin: 0, fontSize: 'clamp(30px,4vw,60px)', lineHeight: 1 }}>
          WHAT I DO
        </h2>
        <span
          className="font-mono text-muted"
          style={{ fontWeight: 400, fontSize: '11px', lineHeight: 1, letterSpacing: '.16em' }}
        >
          04 CAPABILITY AREAS
        </span>
      </div>

      {capabilities.map((cap) => {
        const fills = DIAGRAM_FILLS[cap.diagram];
        // 9 cells: fills land at positions [2], [3], [7]; the rest are hairline-bordered.
        const cells: (string | null)[] = [null, null, fills[0], fills[1], null, null, null, fills[2], null];
        return (
          <div
            key={cap.num}
            data-reveal=""
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '18px clamp(24px,4vw,64px)',
              padding: 'clamp(22px,3.5vh,40px) clamp(16px,3vw,40px)',
              borderTop: '1px solid rgba(8,8,8,.35)',
              alignItems: 'flex-start',
            }}
          >
            <span
              className="font-display text-signal"
              style={{ flex: '0 0 auto', fontSize: 'clamp(28px,3vw,44px)', lineHeight: 1 }}
            >
              {cap.num}
            </span>

            <div style={{ flex: '1 1 300px', minWidth: 'min(100%,260px)' }}>
              <h3
                className="font-display"
                style={{ margin: '0 0 10px', fontSize: 'clamp(22px,2.6vw,38px)', lineHeight: 1 }}
              >
                {cap.title}
              </h3>
              <p
                className="text-paper-ink"
                style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, maxWidth: '48ch', textWrap: 'pretty' }}
              >
                {cap.body}
              </p>
            </div>

            <div
              className="font-mono text-muted"
              style={{
                flex: '1 1 240px',
                minWidth: 'min(100%,220px)',
                fontWeight: 400,
                fontSize: '10.5px',
                lineHeight: 1.9,
                letterSpacing: '.08em',
              }}
            >
              <span className="text-ink">STACK — </span>
              {cap.tech.join(' · ')}
              <br />
              <span className="text-ink">PROOF — </span>
              <span className="text-signal">{cap.proof}</span>
              <br />
              <Link
                href={cap.project.href}
                className="text-ink underline hover:text-signal"
                style={{ textUnderlineOffset: '3px' }}
              >
                RELATED: {cap.project.label} →
              </Link>
            </div>

            <div
              aria-hidden="true"
              style={{
                flex: '0 0 92px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: '4px',
                alignSelf: 'center',
              }}
            >
              {cells.map((fill, i) => (
                <span
                  key={i}
                  style={
                    fill
                      ? { width: '100%', aspectRatio: '1', background: fill }
                      : { width: '100%', aspectRatio: '1', border: CELL_BORDER }
                  }
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
