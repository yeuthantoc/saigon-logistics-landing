'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';
import { NAV } from '@/lib/content';
import { btn, cx } from '@/lib/ui';
import { track } from '@/lib/analytics';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3" aria-label={SITE.name}>
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-coral font-display text-2xl font-extrabold text-white shadow-hard-xs"
          >
            S
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold tracking-tight text-ink">
              {SITE.name}
            </span>
            <span className="hidden text-xs font-medium text-muted sm:block">
              {SITE.tagline}
            </span>
          </span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-semibold text-ink/80 transition-colors duration-200 hover:text-coral active:text-coral/70 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-coral hover:after:scale-x-100 motion-safe:after:transition-transform motion-safe:after:duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={SITE.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('contact', { method: 'zalo', source: 'header' })}
            className={btn('teal', 'px-3 py-2 text-sm md:px-4')}
          >
            <span className="emoji">💬</span>
            <span className="hidden xs:inline">Chat Zalo ngay</span>
            <span className="xs:hidden">Zalo</span>
          </a>

          {/* Hamburger mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-white shadow-hard-xs md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={cx(
                  'absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform duration-200',
                  open && 'translate-y-[7px] rotate-45',
                )}
              />
              <span
                className={cx(
                  'absolute left-0 top-[6px] h-0.5 w-5 bg-ink transition-opacity duration-200',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cx(
                  'absolute bottom-0 left-0 h-0.5 w-5 bg-ink transition-transform duration-200',
                  open && '-translate-y-[7px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile — CSS max-height transition, sempre no DOM per screen reader */}
      <nav
        id="mobile-nav"
        aria-hidden={!open}
        className={cx(
          'overflow-hidden border-ink bg-cream transition-[max-height] duration-200 ease-in-out md:hidden',
          open ? 'max-h-96 border-t-2' : 'max-h-0',
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-3">
          {NAV.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink transition-[background-color,color,transform] duration-150 hover:bg-peach hover:text-coral motion-safe:active:scale-[0.97]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
