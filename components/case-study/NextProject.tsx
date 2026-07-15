import Link from 'next/link';
import { projects, nextProject } from '@/data/projects';

/**
 * Previous / next project navigation (paper tone) plus a full-width link back to
 * the /work index. Neighbours wrap around the projects list; `next` uses the
 * shared nextProject() helper. Big Anton links, hover-inverts.
 */
export default function NextProject({ slug }: { slug: string }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = nextProject(slug);

  return (
    <nav aria-label="Project navigation" className="bg-paper text-ink">
      <div
        className="grid border-t border-ink"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))' }}
      >
        <Link
          href={`/work/${prev.slug}`}
          className="group flex flex-col gap-3 border-r border-ink p-[clamp(24px,4vw,56px)] transition-colors hover:bg-ink hover:text-paper"
        >
          <span className="font-mono text-[10px] leading-none tracking-[0.18em] text-muted">
            ← PREVIOUS · {prev.num}
          </span>
          <span
            className="font-display leading-[0.98]"
            style={{ fontSize: 'clamp(24px,3vw,48px)' }}
          >
            {prev.shortTitle}
          </span>
        </Link>

        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col items-end gap-3 p-[clamp(24px,4vw,56px)] text-right transition-colors hover:bg-signal hover:text-paper"
        >
          <span className="font-mono text-[10px] leading-none tracking-[0.18em] text-muted">
            NEXT · {next.num} →
          </span>
          <span
            className="font-display leading-[0.98]"
            style={{ fontSize: 'clamp(24px,3vw,48px)' }}
          >
            {next.shortTitle}
          </span>
        </Link>
      </div>

      <Link
        href="/work"
        className="flex items-center justify-center gap-4 border-t border-ink p-[22px] font-mono text-[12px] font-medium leading-none tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
      >
        INDEX — ALL WORK <span aria-hidden>→</span>
      </Link>
    </nav>
  );
}
