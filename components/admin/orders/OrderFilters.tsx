'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { FIELD, FIELD_SM } from '@/lib/admin/ui';
import { ORDER_STATUS_KEYS, ORDER_STATUS_META } from '@/lib/admin/status';
import { RATE_KEYS, RATES } from '@/lib/rates';

export interface OrderFilterValues {
  q?: string;
  status?: string;
  route?: string;
  assigned?: string;
  period?: string;
}

export default function OrderFilters({
  values,
  sales,
  isAdmin,
}: {
  values: OrderFilterValues;
  sales: { id: string; name: string }[];
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState(values.q ?? '');

  function apply(next: Partial<OrderFilterValues>) {
    const merged = { ...values, q, ...next };
    const sp = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v && v !== 'all') sp.set(k, String(v));
    });
    router.push(`/admin/don-hang?${sp.toString()}`);
  }

  return (
    <div className="rounded-2xl border-2 border-ink bg-white p-3 shadow-hard-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply({});
        }}
        className="flex flex-wrap items-center gap-2"
      >
        <div className="relative flex-1 min-w-[180px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm mã tracking / tên / SĐT…"
            className={`${FIELD} pl-8`}
          />
        </div>

        <select value={values.status ?? 'all'} onChange={(e) => apply({ status: e.target.value })} className={FIELD_SM}>
          <option value="all">Tất cả trạng thái</option>
          {ORDER_STATUS_KEYS.map((s) => (
            <option key={s} value={s}>
              {ORDER_STATUS_META[s].label}
            </option>
          ))}
        </select>

        <select value={values.route ?? 'all'} onChange={(e) => apply({ route: e.target.value })} className={FIELD_SM}>
          <option value="all">Tất cả tuyến</option>
          {RATE_KEYS.map((k) => (
            <option key={k} value={k}>
              {RATES[k].name}
            </option>
          ))}
        </select>

        {isAdmin && (
          <select value={values.assigned ?? 'all'} onChange={(e) => apply({ assigned: e.target.value })} className={FIELD_SM}>
            <option value="all">Tất cả sale</option>
            {sales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}

        <select value={values.period ?? 'all'} onChange={(e) => apply({ period: e.target.value })} className={FIELD_SM}>
          <option value="all">Mọi thời gian</option>
          <option value="today">Hôm nay</option>
          <option value="7d">7 ngày</option>
          <option value="30d">30 ngày</option>
        </select>
      </form>
    </div>
  );
}
