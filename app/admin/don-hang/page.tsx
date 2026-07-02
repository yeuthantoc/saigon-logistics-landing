import Link from 'next/link';
import { startOfDay, subDays } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { getSessionUser } from '@/lib/admin/session';
import { RATES, type RateKey, fmtVnd } from '@/lib/rates';
import { TH, TD } from '@/lib/admin/ui';
import { fmtDate } from '@/lib/admin/format';
import { OrderBadge } from '@/components/admin/StatusBadge';
import OrderFilters from '@/components/admin/orders/OrderFilters';
import type { OrderStatus } from '@/lib/database.types';

export const dynamic = 'force-dynamic';

function routeName(route: string): string {
  return RATES[route as RateKey]?.name ?? route;
}

export default async function OrdersListPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const user = await getSessionUser();
  const isAdmin = user?.profile?.role === 'admin';
  const supabase = await createClient();

  const { data: profiles } = await supabase.from('profiles').select('id, full_name').order('full_name');
  const sales = (profiles ?? []).map((p) => ({ id: p.id, name: p.full_name || 'Chưa đặt tên' }));
  const saleName = (id: string | null) => (id ? sales.find((s) => s.id === id)?.name ?? '—' : '—');

  let query = supabase.from('orders').select('*').limit(100);
  if (sp.status) query = query.eq('status', sp.status as OrderStatus);
  if (sp.route) query = query.eq('route', sp.route);
  if (sp.assigned) query = query.eq('assigned_to', sp.assigned);
  if (sp.period) {
    const now = new Date();
    const from =
      sp.period === 'today' ? startOfDay(now) : sp.period === '7d' ? startOfDay(subDays(now, 6)) : startOfDay(subDays(now, 29));
    query = query.gte('created_at', from.toISOString());
  }
  if (sp.q) {
    query = query.or(
      `tracking_code.ilike.%${sp.q}%,customer_name.ilike.%${sp.q}%,customer_phone.ilike.%${sp.q}%`,
    );
  }
  query = query.order('created_at', { ascending: false });

  const { data: orders } = await query;
  const rows = orders ?? [];

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-extrabold text-ink">Đơn hàng</h1>

      <OrderFilters
        values={{ q: sp.q, status: sp.status, route: sp.route, assigned: sp.assigned, period: sp.period }}
        sales={sales}
        isAdmin={!!isAdmin}
      />

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className={TH}>Mã tracking</th>
              <th className={TH}>Ngày tạo</th>
              <th className={TH}>Khách hàng</th>
              <th className={TH}>SĐT</th>
              <th className={TH}>Tuyến</th>
              <th className={TH}>Kg</th>
              <th className={TH}>Giá</th>
              <th className={TH}>Trạng thái</th>
              <th className={TH}>Giao dự kiến</th>
              <th className={TH}>Sale</th>
              <th className={TH}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className={TD}>
                  <Link href={`/admin/don-hang/${o.id}`} className="font-mono font-bold text-ink hover:underline">
                    {o.tracking_code}
                  </Link>
                </td>
                <td className={TD}>{fmtDate(o.created_at)}</td>
                <td className={TD}>{o.customer_name}</td>
                <td className={TD}>
                  <a href={`tel:${o.customer_phone}`} className="text-teal font-semibold hover:underline">
                    {o.customer_phone}
                  </a>
                </td>
                <td className={TD}>{routeName(o.route)}</td>
                <td className={TD}>{o.weight_kg}</td>
                <td className={TD}>{fmtVnd(o.price)}</td>
                <td className={TD}>
                  <OrderBadge status={o.status} />
                </td>
                <td className={TD}>{fmtDate(o.estimated_delivery)}</td>
                <td className={TD}>{saleName(o.assigned_to)}</td>
                <td className={TD}>
                  <Link
                    href={`/admin/don-hang/${o.id}`}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className={`${TD} text-center text-slate-500`} colSpan={11}>
                  Chưa có đơn hàng nào khớp bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
          {rows.length} đơn
        </span>
      </div>
    </div>
  );
}
