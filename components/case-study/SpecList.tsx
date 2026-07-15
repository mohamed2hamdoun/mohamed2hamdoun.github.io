/**
 * Reusable string[] renderer used for the domain arrays (components / methods /
 * features) and the constraints list.
 *
 *  - layout="grid": modular tagged cells (e.g. "C.01") — the SelectedWork idiom.
 *  - layout="rail": a vertical hairline-separated list with signal ticks, for
 *    constraint requirements.
 *
 * Both stack cleanly on mobile (auto-fit grid / single column) and never overflow.
 */
interface SpecListProps {
  items: string[];
  layout?: 'grid' | 'rail';
  /** Grid index prefix, e.g. 'C' -> "C.01". Ignored by the rail layout. */
  tag?: string;
  tone?: 'ink' | 'paper';
}

export default function SpecList({ items, layout = 'grid', tag = '', tone = 'ink' }: SpecListProps) {
  const paper = tone === 'paper';
  const border = paper ? 'border-ink' : 'border-[color:var(--color-line-paper)]';

  if (layout === 'rail') {
    return (
      <ul className="m-0 flex list-none flex-col p-0">
        {items.map((item, i) => (
          <li
            key={i}
            className={`flex items-start gap-4 border-t ${border} py-[clamp(12px,1.8vh,20px)]`}
          >
            <span aria-hidden className="mt-[7px] h-[7px] w-[7px] flex-none bg-signal" />
            <span className="mt-[3px] font-mono text-[10px] leading-none tracking-[0.16em] text-signal">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`text-[15px] leading-[1.5] text-pretty ${
                paper ? 'text-paper-ink' : 'text-paper'
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={`m-0 grid list-none border-l border-t ${border} p-0`}
      style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))' }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex min-h-[84px] flex-col gap-2 border-b border-r ${border} p-[14px]`}
        >
          <span className="font-mono text-[9px] leading-none tracking-[0.14em] text-muted">
            {tag ? `${tag}.` : ''}
            {String(i + 1).padStart(2, '0')}
          </span>
          <span
            className={`font-display text-[16px] leading-[1.12] ${paper ? 'text-ink' : 'text-paper'}`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
