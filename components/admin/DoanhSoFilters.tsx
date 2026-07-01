'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cx } from '@/lib/ui';
import { FIELD_SM } from '@/lib/admin/ui';
import type { Period } from '@/lib/admin/dates';

const TABS: { key: Period; label: string }[] = [
  { key: 'today', label: 'Hôm nay' },
  { key: '7d', label: '7 ngày' },
  { key: '30d', label: '30 ngày' },
  { key: 'month', label: 'Tháng này' },
  { key: 'quarter', label: 'Quý này' },
];

export default function DoanhSoFilters({
  period,
  from,
  to,
}: {
  period: Period;
  from?: string;
  to?: string;
}) {
  const router = useRouter();
  const [f, setF] = useState(from ?? '');
  const [t, setT] = useState(to ?? '');

  function setPeriod(p: Period) {
    router.push(`/admin/doanh-so?period=${p}`);
  }

  function applyCustom() {
    if (!f || !t) return;
    router.push(`/admin/doanh-so?period=custom&from=${f}&to=${t}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap gap-1 rounded-xl border-2 border-ink bg-white p-1 shadow-hard-xs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPeriod(tab.key)}
            className={cx(
              'rounded-lg px-3 py-1.5 text-sm font-bold transition-colors',
              period === tab.key ? 'bg-coral text-white' : 'text-ink hover:bg-cream',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <input type="date" value={f} onChange={(e) => setF(e.target.value)} className={FIELD_SM} />
        <span className="text-muted">→</span>
        <input type="date" value={t} onChange={(e) => setT(e.target.value)} className={FIELD_SM} />
        <button
          onClick={applyCustom}
          className={cx(
            'rounded-lg border-2 border-ink px-3 py-1 text-sm font-bold shadow-hard-xs',
            period === 'custom' ? 'bg-coral text-white' : 'bg-white text-ink hover:bg-cream',
          )}
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}
