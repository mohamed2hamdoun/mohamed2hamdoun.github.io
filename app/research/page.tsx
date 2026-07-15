import type { Metadata } from 'next';
import { publications, researchInterests, researchPrinciples } from '@/data/research';
import PublicationRow from '@/components/research/PublicationRow';
import SchematicFigure from '@/components/research/SchematicFigure';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Applied machine learning and healthcare AI research led by a peer-reviewed publication in Algorithms on probability-feature enrichment for early diabetes prediction — honest baselines, reproducible pipelines, verified results only.',
};

const pubCount = String(publications.length).padStart(2, '0');

// Figure/table register — descriptions are grounded in the published method's
// own techniques (data/research.ts). Every value stays a labelled placeholder;
// no metrics are invented (see brief §14).
const figureRegister = [
  { ref: 'FIG. 01', description: 'Class-conditional density estimate', method: 'GMM / KDE' },
  { ref: 'FIG. 02', description: 'Feature-space projection', method: 'PCA' },
  { ref: 'FIG. 03', description: 'Correlation structure', method: 'Correlation reduction' },
  { ref: 'TBL. 01', description: 'Evaluation metrics', method: 'Logistic regression' },
];

export default function ResearchPage() {
  return (
    <>
      {/* ── MASTHEAD ─────────────────────────────────────────────
          First section clears the 56px fixed nav via paddingTop. */}
      <section
        aria-label="Research overview"
        className="bg-ink text-paper"
        style={{
          padding:
            'calc(56px + clamp(28px,6vh,56px)) clamp(16px,3vw,40px) clamp(32px,5vh,56px)',
        }}
      >
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 border-b border-[color:var(--color-line-paper)] pb-4 font-mono text-[10px] leading-[1.5] tracking-[0.16em] text-muted">
          <span>RESEARCH INDEX</span>
          <span>APPLIED ML / HEALTHCARE AI</span>
          <span className="text-signal">{pubCount} PUBLISHED — PEER REVIEWED</span>
          <span>PROVENANCE ENFORCED</span>
        </div>

        <div className="mt-[clamp(28px,5vh,56px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div className="min-w-[min(100%,320px)] flex-[1_1_560px]">
            <p
              data-reveal
              className="mb-[14px] font-mono text-[11px] leading-none tracking-[0.2em] text-signal"
            >
              FIELD — APPLIED MACHINE LEARNING
            </p>
            <h1
              data-reveal
              className="font-display text-[clamp(56px,11vw,180px)] leading-[0.9] tracking-[0.005em] text-paper"
            >
              RESEARCH
            </h1>
          </div>
          <p
            data-reveal
            className="min-w-[min(100%,300px)] max-w-[54ch] flex-[1_1_420px] text-[clamp(15px,1.3vw,18px)] leading-[1.6] text-pretty text-muted"
          >
            <span className="font-serif text-paper italic">
              Applied machine learning on problems where the stakes are real
            </span>{' '}
            — clinical prediction, energy, climate. The work favours honest baselines,
            reproducible pipelines, and evaluation that survives peer review over benchmark
            theatre. The record below leads with peer-reviewed, published work; every unverified
            figure is left as an explicit placeholder.
          </p>
        </div>
      </section>

      {/* ── PUBLISHED WORK (leads the record) ──────────────────── */}
      <section
        aria-label="Published work"
        className="border-t border-ink bg-paper text-ink"
        style={{ padding: 'clamp(40px,7vh,80px) clamp(16px,3vw,40px)' }}
      >
        <div className="mb-[clamp(24px,4vh,44px)] flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="m-0 font-display text-[clamp(30px,4vw,60px)] leading-none">
            PUBLISHED WORK
          </h2>
          <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted">
            {pubCount} PEER-REVIEWED · LEADS THE RECORD
          </span>
        </div>

        <div className="flex flex-col gap-[clamp(24px,4vh,44px)]">
          {publications.map((pub) => (
            <PublicationRow key={pub.id} pub={pub} />
          ))}
        </div>
      </section>

      {/* ── METHODOLOGY (figure + register table) ──────────────── */}
      <section
        aria-label="Research methodology"
        className="border-t border-ink bg-ink text-paper"
        style={{ padding: 'clamp(40px,7vh,80px) clamp(16px,3vw,40px)' }}
      >
        <div className="mb-[clamp(20px,3.5vh,36px)] flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="m-0 font-display text-[clamp(30px,4vw,60px)] leading-none">
            METHODOLOGY
          </h2>
          <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted">
            REPRODUCIBLE BY DESIGN
          </span>
        </div>

        <p className="mb-[clamp(28px,4.5vh,48px)] max-w-[72ch] text-[15px] leading-[1.65] text-pretty text-muted">
          The published work enriches clinical feature spaces with class-conditional probability
          features from Gaussian Mixture Models and Kernel Density Estimation, reduces
          dimensionality with PCA and correlation reduction, then classifies with logistic
          regression. The figures and tables below reproduce here once verified against the
          published record.
        </p>

        <div className="flex flex-wrap gap-x-[clamp(24px,4vw,64px)] gap-y-10">
          <SchematicFigure />

          <div className="min-w-[min(100%,300px)] flex-[1_1_420px]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse font-mono text-[11px] leading-none">
                <caption className="mb-3 text-left font-mono text-[10px] leading-none tracking-[0.16em] text-muted">
                  FIGURE &amp; TABLE REGISTER — AWAITING VERIFIED VALUES
                </caption>
                <thead>
                  <tr className="border-b border-[color:var(--color-line-paper)] text-left tracking-[0.14em] text-muted">
                    <th scope="col" className="py-3 pr-4 font-medium">REF</th>
                    <th scope="col" className="py-3 pr-4 font-medium">DESCRIPTION</th>
                    <th scope="col" className="py-3 pr-4 font-medium">SOURCE METHOD</th>
                    <th scope="col" className="py-3 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {figureRegister.map((row) => (
                    <tr key={row.ref} className="border-b border-[color:var(--color-line-paper)]">
                      <th
                        scope="row"
                        className="whitespace-nowrap py-3 pr-4 text-left font-medium text-paper"
                      >
                        {row.ref}
                      </th>
                      <td className="py-3 pr-4 text-paper">{row.description}</td>
                      <td className="py-3 pr-4 text-muted">{row.method}</td>
                      <td className="py-3 text-signal">[ PENDING ]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRENT INTERESTS ──────────────────────────────────── */}
      <section
        aria-label="Current interests"
        className="border-t border-ink bg-paper text-ink"
        style={{ padding: 'clamp(40px,7vh,80px) clamp(16px,3vw,40px)' }}
      >
        <div className="mb-[clamp(20px,3.5vh,36px)] flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="m-0 font-display text-[clamp(30px,4vw,60px)] leading-none">
            CURRENT INTERESTS
          </h2>
          <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted">
            {String(researchInterests.length).padStart(2, '0')} ACTIVE DIRECTIONS
          </span>
        </div>

        <ul className="m-0 flex list-none flex-wrap gap-[10px] p-0">
          {researchInterests.map((interest) => (
            <li
              key={interest}
              className="border border-[rgba(8,8,8,0.35)] px-3 py-2 font-mono text-[10px] leading-none tracking-[0.12em]"
            >
              {interest.toUpperCase()}
            </li>
          ))}
        </ul>
      </section>

      {/* ── RESEARCH PRINCIPLES ────────────────────────────────── */}
      <section
        aria-label="Research principles"
        className="border-t border-ink bg-ink text-paper"
        style={{ padding: 'clamp(40px,7vh,80px) clamp(16px,3vw,40px)' }}
      >
        <div className="mb-[clamp(28px,5vh,52px)] flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="m-0 font-display text-[clamp(30px,4vw,60px)] leading-none">
            RESEARCH PRINCIPLES
          </h2>
          <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted">
            {String(researchPrinciples.length).padStart(2, '0')} — NON-NEGOTIABLE
          </span>
        </div>

        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-[clamp(24px,4vw,64px)] gap-y-8 p-0">
          {researchPrinciples.map((principle, i) => (
            <li
              key={principle.title}
              data-reveal
              className="relative border-t border-[color:var(--color-line-paper)] pr-4 pt-[22px]"
            >
              <span aria-hidden className="absolute -top-[4px] left-0 h-[7px] w-[7px] bg-signal" />
              <span className="mb-2 block font-mono text-[10px] leading-none tracking-[0.16em] text-signal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 font-display text-[clamp(18px,1.9vw,28px)] leading-none text-paper">
                {principle.title}
              </h3>
              <p className="m-0 max-w-[40ch] text-[13.5px] leading-[1.6] text-pretty text-muted">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
