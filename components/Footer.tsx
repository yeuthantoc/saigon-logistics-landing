import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-on-dark">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-cream bg-coral font-display text-2xl font-extrabold text-white"
          >
            S
          </span>
          <div className="leading-tight">
            <div className="font-display text-base font-extrabold text-white">
              {SITE.name}
            </div>
            <div className="text-sm text-on-dark">{SITE.tagline}</div>
          </div>
        </div>

        <div className="text-sm sm:text-right">
          <a
            href={SITE.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline-offset-2 hover:underline"
          >
            Zalo: {SITE.zaloPhone}
          </a>
          <span className="px-2 text-on-dark/50">·</span>
          <a
            href={`tel:${SITE.hotlineTel}`}
            className="font-semibold text-white underline-offset-2 hover:underline"
          >
            Hotline {SITE.hotline}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-on-dark/70">
          © {SITE.name}. Gửi hàng đi Mỹ, Úc, Canada, châu Âu, Nhật, Hàn,
          Singapore &amp; toàn cầu.
        </div>
      </div>
    </footer>
  );
}
