// components/home/Statement.tsx — editorial "working belief" statement.
// Ported from _redesign/Home.dc.html lines 327–334. Server component.

export default function Statement() {
  return (
    <section
      aria-label="Statement"
      className="bg-paper text-ink border-t border-ink"
      style={{ padding: 'clamp(72px,14vh,160px) clamp(16px,3vw,40px)' }}
    >
      <p
        className="font-mono text-muted"
        style={{ margin: '0 0 22px', fontWeight: 400, fontSize: '10px', lineHeight: 1, letterSpacing: '.2em' }}
      >
        (A WORKING BELIEF)
      </p>
      <blockquote
        data-reveal=""
        className="font-display"
        style={{
          margin: 0,
          fontSize: 'clamp(34px,6.2vw,104px)',
          lineHeight: 1.04,
          letterSpacing: '.005em',
          maxWidth: '20ch',
          textWrap: 'pretty',
        }}
      >
        GOOD TECHNOLOGY IS NOT JUST WHAT IT CAN DO.
        <span style={{ display: 'block', marginTop: '.35em' }}>
          IT IS{' '}
          <span
            className="font-serif text-signal"
            style={{
              position: 'relative',
              display: 'inline-block',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            how clearly
            <span
              data-underline=""
              aria-hidden="true"
              className="bg-signal"
              style={{ position: 'absolute', left: 0, bottom: '.02em', height: '3px', width: '0%' }}
            />
          </span>{' '}
          PEOPLE CAN USE IT.
        </span>
      </blockquote>
    </section>
  );
}
