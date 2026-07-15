// components/about/Timeline.tsx — biography timeline as a connected editorial
// rail: entries grouped by period (EARLY / THEN / NOW / NEXT), a single hairline
// runs down the left with a node per moment. Server component; motion via
// `data-reveal`. Source data: data/timeline.ts (not modified here).

import { timeline, type TimelineEntry, type TimelinePeriod } from '@/data/timeline';

// Neutral framing labels for each period tag — presentation only, no invented facts.
const PERIOD_DESCRIPTOR: Record<TimelinePeriod, string> = {
  EARLY: 'ORIGINS',
  THEN: 'CREATIVE YEARS',
  NOW: 'CURRENT WORK',
  NEXT: 'AHEAD',
};

// Group consecutive entries by period, preserving the data's order.
function groupByPeriod(entries: TimelineEntry[]) {
  const groups: { period: TimelinePeriod; entries: TimelineEntry[] }[] = [];
  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (last && last.period === entry.period) last.entries.push(entry);
    else groups.push({ period: entry.period, entries: [entry] });
  }
  return groups;
}

const RULE = '1px solid rgba(8,8,8,0.22)';

export default function Timeline() {
  const groups = groupByPeriod(timeline);

  return (
    <div style={{ marginLeft: '5px' }}>
      {groups.map((group) => (
        <div key={group.period}>
          {/* period marker — sits on the same rail as the entries */}
          <div
            style={{
              position: 'relative',
              borderLeft: RULE,
              paddingLeft: 'clamp(22px,3vw,36px)',
              paddingTop: 'clamp(28px,4vh,44px)',
              paddingBottom: '10px',
            }}
          >
            <span
              aria-hidden="true"
              className="bg-signal"
              style={{ position: 'absolute', left: '-5px', top: 'clamp(30px,4vh,46px)', width: '9px', height: '9px' }}
            />
            <span
              className="font-mono text-signal"
              style={{ fontWeight: 500, fontSize: '11px', lineHeight: 1, letterSpacing: '0.2em' }}
            >
              {group.period}
            </span>
            <span
              className="font-mono text-muted"
              style={{ marginLeft: '10px', fontSize: '10px', lineHeight: 1, letterSpacing: '0.16em' }}
            >
              — {PERIOD_DESCRIPTOR[group.period]}
            </span>
          </div>

          {/* entries */}
          {group.entries.map((entry) => (
            <div
              key={entry.title}
              data-reveal
              style={{
                position: 'relative',
                borderLeft: RULE,
                paddingLeft: 'clamp(22px,3vw,36px)',
                paddingTop: '14px',
                paddingBottom: 'clamp(18px,2.6vh,30px)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-4px',
                  top: '20px',
                  width: '7px',
                  height: '7px',
                  border: '1px solid rgba(8,8,8,0.55)',
                  background: 'var(--color-paper)',
                }}
              />
              <h3
                className="font-display"
                style={{ margin: '0 0 6px', fontSize: 'clamp(19px,2vw,28px)', lineHeight: 1.05 }}
              >
                {entry.title}
              </h3>
              <p
                className="text-paper-ink"
                style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.55, maxWidth: '52ch', textWrap: 'pretty' }}
              >
                {entry.body}
              </p>
            </div>
          ))}
        </div>
      ))}

      {/* rail terminus */}
      <div style={{ borderLeft: RULE, height: 'clamp(20px,3vh,32px)' }} aria-hidden="true" />
    </div>
  );
}
