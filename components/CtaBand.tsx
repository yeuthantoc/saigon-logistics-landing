import { SITE } from '@/lib/site';
import LeadButton from './LeadButton';
import ContactLink from './ContactLink';

export default function CtaBand() {
  return (
    <section id="bao-gia" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border-2 border-ink/60 bg-coral px-6 py-10 text-white shadow-hard-lg sm:px-10 md:py-12">
        {/* hoạ tiết */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-2 border-white/20"
        />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink/60 bg-white px-3 py-1 text-sm font-bold text-ink shadow-hard-xs">
            <span className="emoji">⏱</span> Phản hồi trong 5 phút — kể cả ngoài giờ
          </span>

          <h2 className="mt-4 font-display text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.1rem]">
            Cần báo giá cước hôm nay?
          </h2>
          <p className="mt-2 text-lg text-white/90">
            Để lại thông tin, sale của SAIGON LOGISTICS gọi lại ngay.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LeadButton variant="whiteTeal" source="cta_band" className="text-base">
              <span className="emoji">💬</span> Chat Zalo ngay
            </LeadButton>
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
        </div>
      </div>
    </section>
  );
}
