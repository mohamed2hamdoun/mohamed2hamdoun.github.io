import type { ArchitectureNode } from '@/data/projects';

/**
 * Renders caseStudy.architecture as a numbered vertical node flow inside a dark
 * HUD panel (consistent with the SelectedWork mockups). A left rail carries the
 * numbered markers and connecting line; each node's name + description sits to
 * the right. Vertical by construction — it stacks on mobile and never overflows.
 * Pure designed schematic (text/divs), no imagery.
 */
export default function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNode[] }) {
  return (
    <div className="border border-[rgba(241,233,218,0.16)] bg-ink-2 p-[clamp(16px,2.5vw,32px)]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[9.5px] leading-none tracking-[0.16em] text-muted">
        <span>SYSTEM FLOW — {String(nodes.length).padStart(2, '0')} NODES (SCHEMATIC)</span>
        <span className="text-signal">● DATA FLOW ↓</span>
      </div>
      <ol className="m-0 list-none p-0">
        {nodes.map((n, i) => (
          <li key={n.node} className="flex gap-[clamp(14px,2vw,28px)] pb-6 last:pb-0">
            {/* rail: numbered marker + connecting line to the next node */}
            <div className="flex flex-none flex-col items-center">
              <span className="flex h-8 w-8 items-center justify-center border border-signal font-mono text-[11px] leading-none text-signal">
                {String(i + 1).padStart(2, '0')}
              </span>
              {i < nodes.length - 1 && (
                <span aria-hidden className="mt-1 w-px flex-1 bg-[rgba(241,233,218,0.22)]" />
              )}
            </div>
            {/* node */}
            <div className="flex-1 border border-[rgba(241,233,218,0.14)] bg-ink p-[clamp(12px,1.6vw,20px)]">
              <span
                className="block font-display text-paper"
                style={{ fontSize: 'clamp(16px,1.7vw,24px)', lineHeight: 1.05 }}
              >
                {n.node}
              </span>
              <span className="mt-2 block font-mono text-[11px] leading-[1.6] tracking-[0.06em] text-muted">
                {n.desc}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
