import type { ProjectStatus } from '@/data/projects';

// Short machine-status label + whether it earns the signal-red accent
// (verified achievements) vs. a muted in-progress state.
const LABEL: Record<ProjectStatus, string> = {
  awarded: 'AWARDED',
  published: 'PUBLISHED',
  'in-development': 'IN DEVELOPMENT',
  working: 'WORKING SYSTEM',
  concept: 'CONCEPT',
};

const STRONG: Record<ProjectStatus, boolean> = {
  awarded: true,
  published: true,
  'in-development': false,
  working: false,
  concept: false,
};

export default function StatusBadge({ kind }: { kind: ProjectStatus }) {
  const strong = STRONG[kind];
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1.5 font-mono text-[10px] font-medium leading-none tracking-[0.14em] ${
        strong ? 'border-signal text-signal' : 'border-current text-muted'
      }`}
    >
      <span
        aria-hidden
        className={`h-[6px] w-[6px] rounded-full ${strong ? 'bg-signal' : 'bg-muted'}`}
      />
      {LABEL[kind]}
    </span>
  );
}
