'use client';

import { flagUrl, type Rate } from '@/lib/rates';
import { btn, CHIP } from '@/lib/ui';
import { SITE } from '@/lib/site';
import { openLeadForm, track } from '@/lib/analytics';
import { yieldToMain } from '@/lib/yield';
import type { RouteData } from '@/lib/routes';

interface Props {
  route: RouteData;
  rate: Rate;
}

const CHIPS = [
  'Door-to-door',
  'Lấy hàng tận nơi',
  'Hỗ trợ hải quan',
  'Theo dõi realtime',
] as const;

export default function RouteHighlight({ route, rate }: Props) {
  return (
    <section className="reveal cv-auto border-y-2 border-ink bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Tuyến {route.country}
        </h2>
        <p className="mt-2 text-sm text-muted-2">
          <time dateTime="2026-07">Cập nhật: Tháng 7/2026</time> · Giá tham khảo, liên hệ để
          báo giá chính xác
        </p>

        <div className="mt-8 rounded-2xl border-2 border-ink bg-white p-6 shadow-hard md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            {/* Thông tin tuyến */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <img
                  src={flagUrl(route.rateKey, 80)}
                  srcSet={`${flagUrl(route.rateKey, 80)} 1x, ${flagUrl(route.rateKey, 96)} 2x`}
                  width={80}
                  height={60}
                  alt={`Cờ ${route.country}`}
                  className="rounded shadow-hard-xs"
                />
                <div>
                  <div className="font-display text-2xl font-extrabold text-ink">
                    {route.country}
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted">
                    {rate.eta} · door-to-door
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-sm text-muted-2">từ</span>
                <span className="font-display text-3xl font-extrabold text-coral">
                  {route.priceFrom}
                </span>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2.5">
                {CHIPS.map((chip) => (
                  <li key={chip} className={CHIP}>
                    <span className="font-bold text-teal">✓</span> {chip}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA — Zalo 1 chạm; form là phương án phụ */}
            <div className="flex shrink-0 flex-col gap-3 md:min-w-[220px]">
              <a
                href={SITE.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className={btn('teal', 'btn-shine w-full justify-center')}
                onClick={() =>
                  track('contact', {
                    method: 'zalo',
                    source: `highlight_${route.rateKey}`,
                    route: route.rateKey,
                  })
                }
              >
                <span className="emoji emoji-wiggle">💬</span> Chat Zalo báo giá
              </a>
              <p className="text-center text-xs text-muted-2">
                Phản hồi trong 5 phút — kể cả ngoài giờ
              </p>
              <button
                type="button"
                className="text-center text-sm font-semibold text-muted underline decoration-ink/30 underline-offset-4 transition-colors hover:text-coral"
                onClick={async () => {
                  track('select_content', {
                    content_type: 'route_highlight',
                    source: `highlight_${route.rateKey}`,
                  });
                  await yieldToMain();
                  openLeadForm({ route: route.rateKey, source: `highlight_${route.rateKey}` });
                }}
              >
                Hoặc để lại SĐT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
