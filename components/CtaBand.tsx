import { SITE } from '@/lib/site';
import LeadButton from './LeadButton';
import ContactLink from './ContactLink';

export default function CtaBand() {
  return (
    <section id="bao-gia" className="reveal cv-auto mx-auto max-w-6xl scroll-mt-20 px-4 py-14 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-coral px-6 py-10 text-white shadow-hard-lg sm:px-10 md:py-12">
        {/* hoạ tiết */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-2 border-white/20"
        />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1 text-sm font-bold text-ink shadow-hard-xs">
            <span className="emoji">⏱</span> Phản hồi trong 5 phút — kể cả ngoài giờ
          </span>

          <h2 className="mt-4 font-display text-[1.75rem] font-extrabold leading-[1.2] tracking-tight sm:text-[2.1rem] sm:leading-tight">
            Cần báo giá cước hôm nay?
          </h2>
          <p className="mt-2 text-lg text-white/90">
            Để lại thông tin, sale của SAIGON LOGISTICS gọi lại ngay.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ContactLink
              href={SITE.zaloLink}
              method="zalo"
              source="cta_band"
              variant="whiteTeal"
              className="btn-shine text-base"
            >
              <span className="emoji emoji-wiggle">💬</span> Chat Zalo ngay
            </ContactLink>
            <ContactLink
              href={`tel:${SITE.hotlineTel}`}
              method="phone"
              source="cta_band"
              variant="ink"
              className="text-base"
            >
              <span className="emoji">📞</span> {SITE.hotline}
            </ContactLink>
          </div>

          <LeadButton
            plain
            source="cta_band_fallback"
            className="mt-3 text-sm font-semibold text-white/85 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white"
          >
            Không dùng Zalo? Để lại SĐT — sale gọi lại ngay
          </LeadButton>
        </div>
      </div>
    </section>
  );
}
