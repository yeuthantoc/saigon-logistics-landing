'use client';

import { ROUTES, flagUrl, fmtShortVnd } from '@/lib/rates';
import { openLeadForm, track } from '@/lib/analytics';

// Bóng cứng xoay vòng coral / teal.
const SHADOWS = [
  'shadow-[6px_6px_0_#ef5226]',
  'shadow-[6px_6px_0_#0e7c6b]',
];

export default function RouteGrid() {
  return (
    <section id="tuyen-di" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Tuyến vận chuyển phổ biến
        </h2>
        <p className="mt-2 text-muted">
          Giá tham khảo — nhắn Zalo để nhận bảng giá chi tiết theo loại hàng.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((r, i) => (
          <button
            key={r.key}
            type="button"
            onClick={() => {
              track('select_content', { content_type: 'route', source: `route_${r.key}` });
              openLeadForm({ route: r.key, source: `route_${r.key}` });
            }}
            className={`group flex flex-col items-start rounded-2xl border-2 border-ink/60 bg-white p-5 text-left transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${SHADOWS[i % SHADOWS.length]}`}
          >
            <img
              src={flagUrl(r.key, 48)}
              srcSet={`${flagUrl(r.key, 48)} 1x, ${flagUrl(r.key, 96)} 2x`}
              width={48}
              height={36}
              alt=""
              aria-hidden
              className="rounded"
            />
            <h3 className="mt-3 font-display text-xl font-extrabold text-ink">
              {r.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted">
              {r.eta} · door-to-door
            </p>
            <div className="mt-4 flex w-full items-end justify-between">
              <span className="text-sm text-muted2">từ</span>
              <span className="font-display text-2xl font-extrabold text-coral">
                {fmtShortVnd(r.perKg)}
                <span className="text-base font-bold text-ink">/kg</span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
