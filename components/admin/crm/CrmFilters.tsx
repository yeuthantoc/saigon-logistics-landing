'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { FIELD, FIELD_SM } from '@/lib/admin/ui';
import { LEAD_STATUS_KEYS, LEAD_STATUS_META } from '@/lib/admin/status';
import { RATE_KEYS, RATES } from '@/lib/rates';

export interface CrmFilterValues {
  q?: string;
  status?: string;
  route?: string;
  assigned?: string;
  period?: string;
  sort?: string;
}

export default function CrmFilters({
  values,
  sales,
  isAdmin,
}: {
  values: CrmFilterValues;
  sales: { id: string; name: string }[];
  isAdmin: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState(values.q ?? '');

  function apply(next: Partial<CrmFilterValues>) {
    const merged = { ...values, q, ...next };
    const sp = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v && v !== 'all') sp.set(k, String(v));
    });
    router.push(`/admin/crm?${sp.toString()}`);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          apply({});
        }}
        className="flex flex-wrap items-center gap-2"
      >
        <div className="relative flex-1 min-w-[180px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên / SĐT…"
            className={`${FIELD} pl-8`}
          />
        </div>

        <select
          value={values.status ?? 'all'}
          onChange={(e) => apply({ status: e.target.value })}
          className={FIELD_SM}
        >
          <option value="all">Tất cả trạng thái</option>
          {LEAD_STATUS_KEYS.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_META[s].label}
            </option>
          ))}
        </select>

        <select
          value={values.route ?? 'all'}
          onChange={(e) => apply({ route: e.target.value })}
          className={FIELD_SM}
        >
          <option value="all">Tất cả tuyến</option>
          {RATE_KEYS.map((k) => (
            <option key={k} value={k}>
              {RATES[k].name}
            </option>
          ))}
        </select>

        {isAdmin && (
          <select
            value={values.assigned ?? 'all'}
            onChange={(e) => apply({ assigned: e.target.value })}
            className={FIELD_SM}
          >
            <option value="all">Tất cả sale</option>
            {sales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}

        <select
          value={values.period ?? 'all'}
          onChange={(e) => apply({ period: e.target.value })}
          className={FIELD_SM}
        >
          <option value="all">Mọi thời gian</option>
          <option value="today">Hôm nay</option>
          <option value="7d">7 ngày</option>
          <option value="30d">30 ngày</option>
        </select>

        <select
          value={values.sort ?? 'newest'}
          onChange={(e) => apply({ sort: e.target.value })}
          className={FIELD_SM}
        >
          <option value="newest">Mới nhất</option>
          <option value="followup">Follow-up sớm nhất</option>
        </select>
      </form>
    </div>
  );
}
