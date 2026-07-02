import { LP_BTN_BASE, LP_PRICING } from '@/lib/landing-1a';
import { flagUrl } from '@/lib/rates';
import CtaLink from './CtaLink';

export default function Pricing() {
  return (
    <section id="bang-gia" className="scroll-mt-4 bg-lp-blue-soft">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-8 lg:px-12">
        <div className="mb-10 text-center">
          <div className="mb-2.5 text-[13.5px] font-bold tracking-[.12em] text-lp-orange">
            BẢNG GIÁ
          </div>
          <h2 className="mb-2.5 text-3xl font-extrabold text-lp-navy sm:text-[34px]">
            Giá tham khảo tuyến express
          </h2>
          <p className="text-[15px] text-lp-body-2">
            Giá đã bao thuế DDP · liên hệ để nhận báo giá chính xác theo cân nặng
          </p>
        </div>

        <div className="grid items-stretch gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {LP_PRICING.map((p) => (
            <div
              key={p.name}
              className={
                p.popular
                  ? 'relative flex flex-col gap-3.5 rounded-[20px] bg-lp-blue px-7 py-[30px] shadow-lp-pop'
                  : 'flex flex-col gap-3.5 rounded-[20px] border-[1.5px] border-lp-line-2 bg-white px-7 py-[30px]'
              }
            >
              {p.popular && (
                <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-lp-orange px-4 py-1.5 text-xs font-bold text-white">
                  PHỔ BIẾN NHẤT
                </div>
              )}

              {/* Cờ flagcdn thay emoji (emoji cờ không render trên Windows). Không viền theo convention. */}
              <img
                src={flagUrl(p.flagKey, 40)}
                srcSet={`${flagUrl(p.flagKey, 40)} 1x, ${flagUrl(p.flagKey, 80)} 2x`}
                width={40}
                height={30}
                alt=""
                loading="lazy"
                className="rounded"
              />
              <div
                className={`text-xl font-extrabold ${
                  p.popular ? 'text-white' : 'text-lp-navy'
                }`}
              >
                {p.name}
              </div>

              <div>
                <span
                  className={`text-[34px] font-extrabold ${
                    p.popular ? 'text-lp-gold-light' : 'text-lp-blue'
                  }`}
                >
                  {p.price}
                </span>
                <span
                  className={`text-sm ${
                    p.popular ? 'text-lp-blue-pale' : 'text-lp-muted'
                  }`}
                >
                  {' '}/kg · từ
                </span>
              </div>

              <div
                className={`text-[13.5px] leading-[1.7] ${
                  p.popular ? 'text-[#dbe8fb]' : 'text-lp-body-2'
                }`}
              >
                {p.checklist.map((c) => (
                  <div key={c}>✓ {c}</div>
                ))}
              </div>

              <CtaLink
                href="#lien-he"
                source="landing1a_pricing"
                params={{ route: p.name }}
                className={`${LP_BTN_BASE} mt-auto px-3 py-3 text-[14.5px] ${
                  p.popular
                    ? 'bg-white text-lp-blue hover:bg-lp-blue-soft'
                    : 'bg-lp-blue-tint text-lp-blue hover:bg-[#dfeafc]'
                }`}
              >
                {p.cta}
              </CtaLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
