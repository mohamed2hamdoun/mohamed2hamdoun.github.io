import Bracketed from './Bracketed';

/**
 * Results panel (ink tone). Renders caseStudy.results verbatim — the honest
 * [ PLACEHOLDER ] notes are dimmed via <Bracketed>, never fabricated. The
 * verified project.outcome is echoed above as a signal-red kicker.
 */
export default function ResultBlock({ results, outcome }: { results: string; outcome?: string }) {
  return (
    <div className="border border-[rgba(241,233,218,0.16)] bg-ink-2 p-[clamp(20px,3vw,40px)]">
      {outcome && (
        <p className="mb-5 font-mono text-[10px] leading-[1.6] tracking-[0.16em] text-signal">
          OUTCOME — {outcome.toUpperCase()}
        </p>
      )}
      <p
        className="max-w-[74ch] text-pretty text-paper"
        style={{ fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.6 }}
      >
        <Bracketed text={results} />
      </p>
      <p className="mt-6 font-mono text-[9.5px] leading-[1.6] tracking-[0.12em] text-faint">
        BRACKETED VALUES ARE UNVERIFIED PLACEHOLDERS — SHOWN VERBATIM, NEVER FABRICATED.
      </p>
    </div>
  );
}
