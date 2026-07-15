import type { Decision } from '@/data/projects';

/**
 * caseStudy.decisions as numbered editorial rows (ink tone): oversized signal
 * index, Anton title (h3), muted body. Mirrors the Process/Capabilities numbered
 * block idiom.
 */
export default function DecisionList({ decisions }: { decisions: Decision[] }) {
  return (
    <ol className="m-0 list-none p-0">
      {decisions.map((d, i) => (
        <li
          key={d.title}
          className="flex flex-wrap gap-x-[clamp(16px,3vw,40px)] gap-y-3 border-t border-[color:var(--color-line-paper)] py-[clamp(20px,3vh,36px)]"
        >
          <span
            aria-hidden
            className="font-display text-signal leading-none"
            style={{ fontSize: 'clamp(28px,3vw,48px)', flex: '0 0 auto' }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-[min(100%,280px)] flex-1">
            <h3
              className="font-display text-paper"
              style={{ fontSize: 'clamp(20px,2vw,30px)', lineHeight: 1.05 }}
            >
              {d.title}
            </h3>
            <p className="mt-3 max-w-[68ch] text-[15px] leading-[1.6] text-pretty text-muted">
              {d.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
