import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Phone } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { RATES, type RateKey, fmtVnd } from '@/lib/rates';
import { fmtDate, fmtDateTime } from '@/lib/admin/format';
import { OrderBadge } from '@/components/admin/StatusBadge';
import Timeline from '@/components/admin/orders/Timeline';
import OrderStatusUpdate from '@/components/admin/orders/OrderStatusUpdate';

export const dynamic = 'force-dynamic';

function routeName(route: string): string {
  return RATES[route as RateKey]?.name ?? route;
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order } = await supabase.from('orders').select('*').eq('id', id).maybeSingle();
  if (!order) notFound();

  // Tên người cập nhật cho timeline (RLS: sale chỉ đọc profile mình → có thể trống, không sao).
  const { data: profiles } = await supabase.from('profiles').select('id, full_name');
  const names: Record<string, string> = {};
  (profiles ?? []).forEach((p) => {
    names[p.id] = p.full_name || 'Người dùng';
  });

  const info: [string, React.ReactNode][] = [
    ['SĐT khách', <a key="p" href={`tel:${order.customer_phone}`} className="font-semibold text-teal hover:underline">{order.customer_phone}</a>],
    ['Tuyến', routeName(order.route)],
    ['Cân nặng', `${order.weight_kg} kg`],
    ['Giá thu', fmtVnd(order.price)],
    ['Nước nhận', order.receiver_country || '—'],
    ['Giao dự kiến', fmtDate(order.estimated_delivery)],
    ['Ngày tạo', fmtDateTime(order.created_at)],
    ['Đã giao lúc', order.actual_delivery ? fmtDateTime(order.actual_delivery) : '—'],
  ];

  return (
    <div className="space-y-5">
      <Link href="/admin/don-hang" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Về danh sách đơn
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-extrabold text-ink font-mono">{order.tracking_code}</h1>
          <OrderBadge status={order.status} />
        </div>
        <a href={`tel:${order.customer_phone}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          <Phone className="h-4 w-4" /> Gọi khách
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {/* Thông tin đơn */}
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-3 font-display text-lg font-bold text-ink">Thông tin đơn — {order.customer_name}</h3>
            <dl className="grid grid-cols-2 gap-y-3 text-sm">
              {info.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k}</dt>
                  <dd className="mt-0.5 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Địa chỉ gửi</p>
                <p className="mt-1 text-sm text-ink">{order.sender_address || '—'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Địa chỉ nhận</p>
                <p className="mt-1 text-sm text-ink">{order.receiver_address || '—'}</p>
              </div>
            </div>
            {order.note && <p className="mt-3 text-sm text-slate-500">Ghi chú: {order.note}</p>}
          </div>

          {/* Timeline */}
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-4 font-display text-lg font-bold text-ink">Lịch sử trạng thái</h3>
            <Timeline history={order.status_history ?? []} names={names} />
          </div>
        </div>

        {/* Cập nhật trạng thái */}
        <OrderStatusUpdate id={order.id} current={order.status} />
      </div>
    </div>
  );
}
