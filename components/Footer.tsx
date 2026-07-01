import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="cv-auto border-t-2 border-ink bg-ink text-ink-soft">
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
            <div className="text-sm text-ink-soft">{SITE.tagline}</div>
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
          <span className="px-2 text-ink-soft/50">·</span>
          <a
            href={`tel:${SITE.hotlineTel}`}
            className="font-semibold text-white underline-offset-2 hover:underline"
          >
            Hotline {SITE.hotline}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs leading-relaxed text-ink-soft/80 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-semibold text-ink-soft">{SITE.legalName}</div>
            <div>
              MST {SITE.taxCode} · {SITE.address}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-ink-soft/60">Đối tác vận chuyển:</span>
            <span className="font-semibold text-ink-soft">
              {SITE.carriers.join(' · ')}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-ink-soft/70 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {SITE.name}. Gửi hàng đi Mỹ, Úc, Canada, châu Âu, Nhật, Hàn,
            Singapore &amp; toàn cầu.
          </div>
          <div className="flex gap-4">
            <Link href="/ve-chung-toi" className="hover:text-white hover:underline">
              Về chúng tôi
            </Link>
            <Link href="/chinh-sach-boi-thuong" className="hover:text-white hover:underline">
              Chính sách bồi thường
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
