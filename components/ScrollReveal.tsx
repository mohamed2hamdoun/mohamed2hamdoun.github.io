'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Single client island that drives every `[data-reveal]` and `[data-parallax]`
 * element on the page — so section markup stays in server components and only
 * this tiny effect ships JS.
 *
 * Re-runs on every route change (`pathname` dep): the root layout does not remount
 * during SPA navigation, so without this, `data-reveal` content on a page reached
 * via <Link> would never be revealed and would stay invisible.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- reveals
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    let io: IntersectionObserver | null = null;

    if (reduced) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('is-visible');
              const underline = en.target.querySelector<HTMLElement>('[data-underline]');
              if (underline) window.setTimeout(() => (underline.style.width = '100%'), 350);
              io?.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealEls.forEach((el) => io!.observe(el));
      // safety: reveal anything already in view right after mount / navigation
      requestAnimationFrame(() => {
        revealEls.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible');
        });
      });
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    // --- parallax (fine-pointer, motion-allowed only)
    let raf = 0;
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let onScroll: (() => void) | null = null;
    if (!reduced && parallaxEls.length) {
      const apply = () => {
        const y = window.scrollY;
        parallaxEls.forEach((el) => {
          const factor = parseFloat(el.dataset.parallax || '0');
          el.style.transform = `translate3d(0, ${(-y * factor).toFixed(1)}px, 0)`;
        });
        raf = 0;
      };
      onScroll = () => {
        if (!raf) raf = requestAnimationFrame(apply);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      apply();
    }

    return () => {
      io?.disconnect();
      if (onScroll) window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
