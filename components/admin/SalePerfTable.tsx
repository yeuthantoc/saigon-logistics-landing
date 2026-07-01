'use client';

import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { TH, TD } from '@/lib/admin/ui';
import { fmtVnd } from '@/lib/rates';
import { cx } from '@/lib/ui';

export interface SaleRow {
  id: string;
  name: string;
  assigned: number;
  called: number;
  won: number;
  rate: number; // %
  revenue: number;
}

type SortKey = keyof Omit<SaleRow, 'id'>;

export default function SalePerfTable({ rows }: { rows: SaleRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('revenue');
  const [asc, setAsc] = useState(false);

  const sorted = [...rows].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === 'string' && typeof bv === 'string') {
      return asc ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    return asc ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  function toggle(key: SortKey) {
    if (key === sortKey) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(false);
    }
  }

  const cols: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Sale' },
    { key: 'assigned', label: 'Lead' },
    { key: 'called', label: 'Đã gọi' },
    { key: 'won', label: 'Chốt' },
    { key: 'rate', label: 'Tỷ lệ chốt' },
    { key: 'revenue', label: 'Doanh thu' },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-ink bg-white shadow-hard">
      <table className="w-full min-w-[640px] border-collapse">
        <thead className="border-b-2 border-ink bg-cream">
          <tr>
            {cols.map((c) => (
              <th key={c.key} className={TH}>
                <button
                  onClick={() => toggle(c.key)}
                  className={cx('inline-flex items-center gap-1 hover:text-ink', sortKey === c.key && 'text-ink')}
                >
                  {c.label}
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id} className="border-b border-ink/15 hover:bg-cream/50">
              <td className={`${TD} font-semibold`}>{r.name}</td>
              <td className={TD}>{r.assigned}</td>
              <td className={TD}>{r.called}</td>
              <td className={TD}>{r.won}</td>
              <td className={TD}>{r.rate}%</td>
              <td className={TD}>{fmtVnd(r.revenue)}</td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td className={`${TD} text-center text-muted`} colSpan={6}>
                Chưa có dữ liệu sale trong kỳ.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
