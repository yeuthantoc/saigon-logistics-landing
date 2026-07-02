import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { RATES, type RateKey, fmtVnd, estimate } from '@/lib/rates';
import { LEAD_SOURCE_LABEL } from '@/lib/admin/status';
import { fmtDateTime } from '@/lib/admin/format';
import { LeadBadge } from '@/components/admin/StatusBadge';
import LeadDetailForm from '@/components/admin/crm/LeadDetailForm';
import CreateOrderButton from '@/components/admin/crm/CreateOrderButton';
import type { LeadSource } from '@/lib/database.types';

export const dynamic = 'force-dynamic';

function routeName(route: string): string {
  return RATES[route as RateKey]?.name ?? route;
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: lead } = await supabase.from('leads').select('*').eq('id', id).maybeSingle();
  if (!lead) notFound();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .order('full_name');
  const sales = (profiles ?? []).map((p) => ({ id: p.id, name: p.full_name || 'Chưa đặt tên' }));

  const price =
    lead.quoted_price && lead.quoted_price > 0
      ? lead.quoted_price
      : lead.route in RATES
        ? estimate(lead.route as RateKey, lead.weight_kg ?? 1)
        : 0;

  const info: [string, React.ReactNode][] = [
    ['SĐT / Zalo', <a key="p" href={`tel:${lead.phone}`} className="font-semibold text-teal hover:underline">{lead.phone}</a>],
    ['Tuyến', routeName(lead.route)],
    ['Cân nặng ước tính', lead.weight_kg ? `${lead.weight_kg} kg` : '—'],
    ['Nguồn', LEAD_SOURCE_LABEL[lead.source as LeadSource] ?? lead.source],
    ['Ngày vào', fmtDateTime(lead.created_at)],
    ['Giá tham khảo', fmtVnd(price)],
  ];

  return (
    <div className="space-y-5">
      <Link href="/admin/crm" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Về danh sách
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-extrabold text-ink">{lead.name}</h1>
          <LeadBadge status={lead.status} />
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Phone className="h-4 w-4" /> Gọi
          </a>
          <a href={`https://zalo.me/${lead.phone}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <MessageCircle className="h-4 w-4" /> Zalo
          </a>
          <CreateOrderButton
            variant="full"
            lead={{
              lead_id: lead.id,
              customer_name: lead.name,
              customer_phone: lead.phone,
              route: lead.route,
              weight_kg: lead.weight_kg ?? 1,
              price,
              assigned_to: lead.assigned_to,
            }}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Thông tin lead */}
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-3 font-display text-lg font-bold text-ink">Thông tin khách</h3>
            <dl className="grid grid-cols-2 gap-y-3 text-sm">
              {info.map(([k, v]) => (
                <div key={k} className="col-span-1">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k}</dt>
                  <dd className="mt-0.5 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            {lead.note && (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ghi chú của khách</p>
                <p className="mt-1 text-sm text-ink">{lead.note}</p>
              </div>
            )}
          </div>
        </div>

        {/* Form cập nhật */}
        <LeadDetailForm lead={lead} sales={sales} />
      </div>
    </div>
  );
}
