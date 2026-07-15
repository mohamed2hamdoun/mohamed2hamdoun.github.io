'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Drives every `[data-reveal]` / `[data-parallax]` element so section markup can
 * stay in server components and only this island ships JS.
 *
 * Reveal is DETERMINISTIC and rect-based (not IntersectionObserver): an element
 * is revealed the moment its top enters the viewport band, on mount, on scroll,
 * and on resize — plus a hard failsafe that force-reveals anything still hidden
 * shortly after load. This guarantees content is NEVER left invisible (the earlier
 * observer-based version could strand elements at opacity:0 under React's dev
 * double-mount / observer timing).
 *
 * Re-runs on route change (`pathname`) since the root layout never remounts.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const markVisible = (el: Element) => {
      el.classList.add('is-visible');
      const underline = el.querySelector<HTMLElement>('[data-underline]');
      if (underline) window.setTimeout(() => (underline.style.width = '100%'), 350);
    };

    // reduced motion: show everything immediately, no animation, done.
    if (reduced) {
      document.querySelectorAll('[data-reveal]').forEach(markVisible);
      return;
    }

    const revealInView = () => {
      const vh = window.innerHeight;
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        const r = el.getBoundingClientRect();
        // reveal once the element's top crosses ~95% down the viewport
        if (r.top < vh * 0.95 && r.bottom > -80) markVisible(el);
      });
    };

    // --- parallax
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const applyParallax = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const factor = parseFloat(el.dataset.parallax || '0');
        el.style.transform = `translate3d(0, ${(-y * factor).toFixed(1)}px, 0)`;
      });
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        revealInView();
        applyParallax();
        raf = 0;
      });
    };

    // initial passes: now, next frame, and after fonts/layout settle
    revealInView();
    applyParallax();
    const rafId = requestAnimationFrame(revealInView);
    const t1 = window.setTimeout(revealInView, 300);

    // hard failsafe: nothing stays hidden. Any element still not visible after
    // load gets shown (below-the-fold ones simply appear without the scroll effect).
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(markVisible);
    }, 2500);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      cancelAnimationFrame(rafId);
      window.clearTimeout(t1);
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
