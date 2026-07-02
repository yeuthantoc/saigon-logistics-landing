'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, PackageSearch } from 'lucide-react';
import { btn } from '@/lib/ui';
import { FIELD } from '@/lib/admin/ui';
import { fmtDate } from '@/lib/admin/format';
import { OrderBadge } from '@/components/admin/StatusBadge';
import Timeline from '@/components/admin/orders/Timeline';
import type { OrderStatus } from '@/lib/database.types';

interface PublicOrder {
  tracking_code: string;
  status: OrderStatus;
  status_history: { status: OrderStatus; note: string; timestamp: string }[];
  estimated_delivery: string | null;
  route_name: string;
  customer_name: string;
  created_at: string;
}

export default function TrackingLookup({ initialCode = '' }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode);
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const lookup = useCallback(async (raw: string) => {
    const c = raw.trim();
    if (!c) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const res = await fetch(`/api/tracking/${encodeURIComponent(c)}`);
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setError(
          json.error === 'not_found'
            ? 'Không tìm thấy đơn với mã này. Kiểm tra lại giúp bạn nhé.'
            : json.error === 'not_configured'
              ? 'Hệ thống tra cứu chưa sẵn sàng.'
              : 'Có lỗi xảy ra, thử lại sau.',
        );
        return;
      }
      setOrder(json.order as PublicOrder);
    } catch {
      setError('Không kết nối được máy chủ.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCode) lookup(initialCode);
  }, [initialCode, lookup]);

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          lookup(code);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-2" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập mã tracking, VD: SG-ABC123"
            className={`${FIELD} pl-10 h-12 text-base uppercase`}
            autoFocus
          />
        </div>
        <button type="submit" disabled={loading} className={btn('coral', 'h-12 disabled:opacity-60')}>
          {loading ? 'Đang tra…' : 'Tra cứu'}
        </button>
      </form>

      {error && (
        <div className="rounded-2xl border-2 border-ink bg-red-100 p-4 text-sm font-semibold text-ink shadow-hard-sm">
          {error}
        </div>
      )}

      {order && (
        <div className="rounded-2xl border-2 border-ink bg-white p-5 shadow-hard">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink/15 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Mã đơn</p>
              <p className="font-display text-xl font-extrabold text-ink">{order.tracking_code}</p>
            </div>
            <OrderBadge status={order.status} />
          </div>

          <dl className="grid grid-cols-2 gap-y-3 py-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">Khách hàng</dt>
              <dd className="mt-0.5 text-ink">{order.customer_name}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">Tuyến</dt>
              <dd className="mt-0.5 text-ink">{order.route_name}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-muted">Giao dự kiến</dt>
              <dd className="mt-0.5 text-ink">{fmtDate(order.estimated_delivery)}</dd>
            </div>
          </dl>

          <div className="border-t-2 border-ink/15 pt-4">
            <h3 className="mb-4 font-display text-lg font-bold text-ink">Hành trình đơn hàng</h3>
            <Timeline history={order.status_history.map((e) => ({ ...e, updated_by: null }))} />
          </div>
        </div>
      )}

      {!order && !error && !loading && (
        <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-ink/40 bg-white/60 p-8 text-center text-muted">
          <PackageSearch className="h-10 w-10" />
          <p className="text-sm">Nhập mã tracking để xem hành trình đơn hàng của bạn.</p>
        </div>
      )}
    </div>
  );
}
