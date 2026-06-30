import { SITE } from '@/lib/site';
import { TRUST_CHIPS } from '@/lib/content';
import { CHIP } from '@/lib/ui';
import LeadButton from './LeadButton';
import ContactLink from './ContactLink';
import RateEstimator from './RateEstimator';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16 lg:gap-14">
        {/* Cột trái */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink/60 bg-coral-light px-3.5 py-1.5 text-sm font-bold text-ink shadow-hard-xs">
            <span className="emoji">🚀</span> Gửi hôm nay, người thân nhận sau 3–5
            ngày
          </span>

          <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-[2.9rem] lg:text-[3rem]">
            Gửi đồ đi nước ngoài, cứ để{' '}
            <span className="inline-block -rotate-[1.5deg] rounded-xl border-2 border-ink/60 bg-coral px-2.5 py-0.5 text-white shadow-hard-sm">
              tụi mình lo!
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Từ thùng quà cho mẹ đến đơn hàng xuất khẩu — SAIGON LOGISTICS gói gọn
            từ A tới Z. Báo giá minh bạch, đóng gói cẩn thận, lo trọn thủ tục hải
            quan, bạn chỉ việc nhắn Zalo.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LeadButton variant="coral" source="hero" className="text-base">
              Nhận báo giá trong 5 phút →
            </LeadButton>
            <ContactLink
              href={`tel:${SITE.hotlineTel}`}
              method="phone"
              source="hero"
              variant="white"
              className="text-base"
            >
              <span className="emoji">📞</span> Hotline {SITE.hotline}
            </ContactLink>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {TRUST_CHIPS.map((chip) => (
              <li key={chip} className={CHIP}>
                <span className="font-bold text-teal">✓</span> {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Cột phải — widget */}
        <div className="md:pl-2">
          <RateEstimator />
        </div>
      </div>
    </section>
  );
}
