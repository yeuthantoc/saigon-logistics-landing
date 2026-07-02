import { lpBtn } from '@/lib/landing-1a';
import CtaLink from './CtaLink';
import TrackingBar from './TrackingBar';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-lp-blue-soft to-white">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-4 pb-14 pt-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
        {/* Cột trái: copy + CTA + tra cứu */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-lp-orange-tint px-3.5 py-[7px] text-[13px] font-bold text-lp-orange">
            <span className="emoji" aria-hidden>🚀</span> Chuyên tuyến Express quốc tế
          </div>

          <h1 className="mb-[18px] text-4xl font-extrabold leading-[1.12] text-lp-navy sm:text-5xl lg:text-[52px]">
            Gửi hàng đi quốc tế{' '}
            <br className="hidden lg:inline" />
            nhanh như <span className="text-lp-blue">chớp</span>,{' '}
            <br className="hidden lg:inline" />
            thuế lo <span className="text-lp-orange">trọn gói</span>
          </h1>

          <p className="mb-7 max-w-[480px] text-[17.5px] leading-[1.6] text-lp-body">
            Vận chuyển express đi Mỹ, Úc, Châu Âu &amp; toàn cầu. Giao nhanh bao
            thuế DDP — người nhận không phải trả thêm bất kỳ chi phí nào.
          </p>

          <div className="mb-[34px] flex flex-wrap gap-3.5">
            <CtaLink
              href="#lien-he"
              source="landing1a_hero_quote"
              className={lpBtn('primary', 'px-[30px] py-[15px] text-base shadow-lp-btn')}
            >
              Nhận báo giá ngay
            </CtaLink>
            <CtaLink
              href="#bang-gia"
              source="landing1a_hero_pricing"
              className={lpBtn('ghost', 'px-[30px] py-[15px] text-base')}
            >
              Xem bảng giá
            </CtaLink>
          </div>

          <TrackingBar />
        </div>

        {/* Cột phải: minh họa (placeholder theo handoff) + 2 chip nổi */}
        <div className="relative">
          {/* TODO(handoff): thay bằng minh họa thật (máy bay + kiện hàng vui tươi) */}
          <div className="flex h-[380px] items-center justify-center rounded-[24px] border-[1.5px] border-dashed border-[#a9c4e8] bg-[repeating-linear-gradient(45deg,#e3edfb_0_14px,#eef4fd_14px_28px)]">
            <span className="rounded-md bg-white px-3 py-1.5 font-mono text-[13px] text-[#5a7398]">
              minh họa: máy bay + kiện hàng vui tươi
            </span>
          </div>

          <div className="absolute left-2 top-[22px] flex items-center gap-2.5 rounded-[14px] bg-white px-[18px] py-3 shadow-lp-chip lg:-left-[18px]">
            <span className="emoji text-[22px]" aria-hidden>✈️</span>
            <div>
              <div className="text-sm font-bold text-lp-navy">SGN → LAX</div>
              <div className="text-xs text-lp-muted">Chỉ 3–5 ngày</div>
            </div>
          </div>

          <div className="absolute bottom-[26px] right-2 flex items-center gap-2.5 rounded-[14px] bg-white px-[18px] py-3 shadow-lp-chip lg:-right-[14px]">
            <span className="emoji text-[22px]" aria-hidden>✅</span>
            <div>
              <div className="text-sm font-bold text-lp-navy">Bao thuế DDP</div>
              <div className="text-xs text-lp-muted">Người nhận 0 đồng</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
