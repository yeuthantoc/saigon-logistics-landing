'use client';

import { useState } from 'react';
import { SITE } from '@/lib/site';
import { NAV } from '@/lib/content';
import { btn } from '@/lib/ui';
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
              className="text-sm font-semibold text-ink/80 transition-colors hover:text-coral"
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
            aria-label="Mở menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-ink bg-white shadow-hard-xs md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}
              />
              <span
                className={`absolute left-0 top-[6px] h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile xổ xuống */}
      {open && (
        <nav className="border-t-2 border-ink bg-cream px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-peach"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
