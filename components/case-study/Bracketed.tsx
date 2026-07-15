import { Fragment } from 'react';

/**
 * Renders a string verbatim, wrapping any `[ ... ]` placeholder segment in
 * `text-faint` so unverified content reads as dimmed, never fabricated.
 * The honest [ PLACEHOLDER ] notes in caseStudy.results/limitations pass
 * through unchanged — this only restyles the bracketed spans.
 */
export default function Bracketed({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]*\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]*\]$/.test(part) ? (
          <span key={i} className="text-faint">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
