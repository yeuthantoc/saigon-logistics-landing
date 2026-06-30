'use client';

import { useMemo, useState } from 'react';
import { RATES, RATE_KEYS, flagUrl, estimate, fmtVnd, type RateKey } from '@/lib/rates';
import { openLeadForm, track } from '@/lib/analytics';
import { btn } from '@/lib/ui';

export default function RateEstimator() {
  const [country, setCountry] = useState<RateKey>('us');
  const [weight, setWeight] = useState(2);

  const est = useMemo(() => estimate(country, weight), [country, weight]);
  const rate = RATES[country];

  return (
    <div className="rounded-3xl border-2 border-ink/60 bg-white p-5 shadow-hard-lg sm:p-6">
      <div className="flex items-start gap-2">
        <span className="emoji text-2xl" aria-hidden>
          🧮
        </span>
        <div>
          <h2 className="font-display text-xl font-extrabold text-ink">
            Ước tính cước nhanh
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            Tham khảo nhanh — sale sẽ báo giá chính xác theo loại hàng.
          </p>
        </div>
      </div>

      {/* Quốc gia */}
      <label className="mt-5 block">
        <span className="mb-1.5 block text-sm font-semibold text-ink">
          Gửi đi đâu?
        </span>
        <div className="flex items-center gap-3">
          <img
            src={flagUrl(country, 40)}
            srcSet={`${flagUrl(country, 40)} 1x, ${flagUrl(country, 80)} 2x`}
            width={40}
            height={30}
            alt={RATES[country].name}
            className="flex-shrink-0 rounded"
          />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as RateKey)}
            className="w-full appearance-none rounded-xl border-2 border-ink/60 bg-cream px-4 py-3 text-base font-semibold text-ink shadow-hard-xs focus:outline-none focus:ring-2 focus:ring-coral"
          >
            {RATE_KEYS.map((key) => (
              <option key={key} value={key}>
                {RATES[key].name}
              </option>
            ))}
          </select>
        </div>
      </label>

      {/* Cân nặng */}
      <label className="mt-4 block">
        <span className="mb-1.5 flex items-center justify-between text-sm font-semibold text-ink">
          <span>Cân nặng</span>
          <span className="rounded-full border-2 border-ink/60 bg-coral-light px-2.5 py-0.5 font-display text-sm font-bold shadow-hard-xs">
            {weight} kg
          </span>
        </span>
        <input
          type="range"
          min={0.5}
          max={30}
          step={0.5}
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
          aria-label="Cân nặng (kg)"
          className="h-2 w-full cursor-pointer appearance-none rounded-full border-2 border-ink/60 bg-peach accent-coral"
        />
        <div className="mt-1 flex justify-between text-xs font-medium text-muted2">
          <span>0,5 kg</span>
          <span>30 kg</span>
        </div>
      </label>

      {/* Kết quả */}
      <div className="mt-5 rounded-2xl border-2 border-ink/60 bg-teal-tint p-4">
        <div className="flex items-end justify-between gap-3">
          <span className="text-sm font-semibold text-ink">Ước tính cước</span>
          <span className="font-display text-3xl font-extrabold leading-none text-teal">
            {fmtVnd(est)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 border-t-2 border-dashed border-ink/30 pt-2 text-sm">
          <span className="font-semibold text-ink">Thời gian dự kiến</span>
          <span className="font-bold text-ink">{rate.eta}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          track('select_content', { content_type: 'estimator', source: 'estimator' });
          openLeadForm({ route: country, weight, source: 'estimator' });
        }}
        className={btn('teal', 'mt-4 w-full')}
      >
        <span className="emoji">💬</span> Để sale báo giá chính xác qua Zalo
      </button>
      <p className="mt-2 text-center text-xs text-muted2">
        * Giá ước tính, chưa gồm phụ phí theo loại hàng &amp; mùa cao điểm.
      </p>
    </div>
  );
}
