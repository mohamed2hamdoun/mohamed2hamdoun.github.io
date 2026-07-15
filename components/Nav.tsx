'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/data/site';

const monoLink =
  'font-mono text-[11px] font-medium leading-none tracking-[0.16em] transition-colors hover:text-signal';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isCurrent = (href: string) => {
    const path = href.split('#')[0] || '/';
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(path + '/');
  };

  // lock scroll + focus management while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const opener = openerRef.current;

    const first = dialogRef.current?.querySelector<HTMLElement>('a,button');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled])',
        );
        if (focusables.length === 0) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      opener?.focus(); // restore focus to the opener
    };
  }, [open]);

  const menuItems = [{ label: 'HOME', href: '/' }, ...nav];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-[color:var(--color-line-paper)] bg-[rgba(8,8,8,0.92)] backdrop-blur-[10px]">
        <nav
          aria-label="Primary"
          className="frame-cap flex h-14 items-center justify-between gap-4 px-[clamp(16px,3vw,40px)]"
        >
          <Link href="/" aria-label={`${site.name} — home`} className="flex items-baseline gap-2.5">
            <span className="font-display text-[20px] tracking-[0.04em] text-paper">{site.monogram}</span>
            <span className="font-mono text-[10px] leading-none tracking-[0.18em] text-muted">
              PORTFOLIO — 2026
            </span>
          </Link>

          {/* desktop */}
          <div className="hidden items-center gap-[clamp(18px,2.6vw,36px)] md:flex">
            {nav.map((item) =>
              item.label === 'CONTACT' ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border border-[rgba(241,233,218,0.3)] px-3.5 py-[9px] font-mono text-[11px] font-medium leading-none tracking-[0.16em] transition-colors hover:border-signal hover:bg-signal hover:text-paper"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={`${monoLink} ${isCurrent(item.href) ? 'text-signal' : ''}`}
                >
                  {item.label}
                </Link>
              ),
            )}
            <span className="flex items-center gap-2 font-mono text-[10px] leading-none tracking-[0.14em] text-muted">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-signal animate-blink" />
              AVAILABLE
            </span>
          </div>

          {/* mobile trigger */}
          <button
            ref={openerRef}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-haspopup="dialog"
            className="flex min-h-11 items-center gap-2.5 border border-[rgba(241,233,218,0.3)] px-4 py-2.5 font-mono text-[11px] font-medium leading-none tracking-[0.16em] text-paper transition-colors hover:border-signal md:hidden"
          >
            <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-signal" />
            MENU
          </button>
        </nav>
      </header>

      {/* mobile full-screen menu */}
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[150] flex flex-col overflow-auto bg-ink"
        >
          <div className="flex h-14 flex-none items-center justify-between border-b border-[color:var(--color-line-paper)] px-5">
            <span className="font-display text-[20px]">{site.monogram}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="min-h-11 border border-[rgba(241,233,218,0.3)] px-4 py-2.5 font-mono text-[11px] font-medium leading-none tracking-[0.16em] text-paper transition-colors hover:border-signal hover:text-signal"
            >
              CLOSE ✕
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5 py-8">
            {menuItems.map((item, i) => {
              const current = isCurrent(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? 'page' : undefined}
                  className="flex items-baseline gap-3.5 border-b border-[rgba(241,233,218,0.1)] py-2.5"
                >
                  <span className={`font-mono text-[11px] leading-none ${current ? 'text-signal' : 'text-muted'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-[clamp(40px,10vw,64px)] leading-none ${current ? 'text-signal' : 'text-paper'}`}
                  >
                    {item.label}
                  </span>
                  {current && (
                    <span className="font-mono text-[10px] leading-none tracking-[0.14em] text-signal">
                      ● CURRENT
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-none flex-wrap justify-between gap-4 border-t border-[color:var(--color-line-paper)] p-5 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-muted">
            <a href={`mailto:${site.email}`} className="text-paper hover:text-signal">
              {site.email.toUpperCase()}
            </a>
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-signal" />
              AVAILABLE — {site.locationShort}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
