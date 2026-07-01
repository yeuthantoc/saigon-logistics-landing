'use client';

import { SITE } from '@/lib/site';
import { track } from '@/lib/analytics';

/**
 * Liên hệ nổi toàn site — mount 1 lần ở layout.
 * Mobile: thanh dính đáy full-width (2 nút to, dễ bấm bằng ngón cái).
 * Desktop: 2 nút tròn nổi góc phải, hiện label khi hover/focus.
 */
export default function FloatingContact() {
  return (
    <>
      {/* Mobile: thanh dính đáy */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t-2 border-ink bg-cream/95 px-3 pt-2 backdrop-blur supports-[backdrop-filter]:bg-cream/80 md:hidden"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={`tel:${SITE.hotlineTel}`}
          onClick={() => track('contact', { method: 'phone', source: 'floating_mobile' })}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-ink bg-ink py-3 text-sm font-bold text-white shadow-hard-sm transition-transform duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-xs"
        >
          <span className="emoji" aria-hidden>
            📞
          </span>
          Gọi ngay
        </a>
        <a
          href={SITE.zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('contact', { method: 'zalo', source: 'floating_mobile' })}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-ink bg-teal py-3 text-sm font-bold text-white shadow-hard-sm transition-transform duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-xs"
        >
          <span className="emoji" aria-hidden>
            💬
          </span>
          Chat Zalo
        </a>
      </div>

      {/* Desktop/tablet: nút tròn nổi, hiện label khi hover */}
      <div className="fixed bottom-6 right-6 z-30 hidden flex-col items-end gap-3 md:flex">
        <a
          href={SITE.zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo ngay"
          onClick={() => track('contact', { method: 'zalo', source: 'floating_desktop' })}
          className="group flex h-14 items-center rounded-full border-2 border-ink bg-teal text-white shadow-hard transition-[box-shadow,transform] duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-hard-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center text-2xl" aria-hidden>
            💬
          </span>
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-200 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
            <span className="overflow-hidden whitespace-nowrap pr-5 text-sm font-bold">
              Chat Zalo ngay
            </span>
          </span>
        </a>

        <a
          href={`tel:${SITE.hotlineTel}`}
          aria-label={`Gọi ${SITE.hotline}`}
          onClick={() => track('contact', { method: 'phone', source: 'floating_desktop' })}
          className="group flex h-14 items-center rounded-full border-2 border-ink bg-ink text-white shadow-hard transition-[box-shadow,transform] duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-hard-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center text-2xl" aria-hidden>
            📞
          </span>
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-200 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
            <span className="overflow-hidden whitespace-nowrap pr-5 text-sm font-bold">
              Gọi {SITE.hotline}
            </span>
          </span>
        </a>
      </div>
    </>
  );
}
