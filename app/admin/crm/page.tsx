import Link from 'next/link';
import { startOfDay, startOfMonth, subDays } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { getSessionUser } from '@/lib/admin/session';
import { RATES, type RateKey, fmtVnd, estimate } from '@/lib/rates';
import type { LeadStatus } from '@/lib/database.types';
import { TH, TD } from '@/lib/admin/ui';
import { fmtDate } from '@/lib/admin/format';
import StatCard from '@/components/admin/StatCard';
import { LeadBadge } from '@/components/admin/StatusBadge';
import CrmFilters from '@/components/admin/crm/CrmFilters';
import LeadStatusSelect from '@/components/admin/crm/LeadStatusSelect';
import CreateOrderButton from '@/components/admin/crm/CreateOrderButton';
import AddLeadButton from '@/components/admin/crm/AddLeadButton';

export const dynamic = 'force-dynamic';

function routeName(route: string): string {
  return RATES[route as RateKey]?.name ?? route;
}

function leadPrice(quoted: number | null, route: string, weight: number | null): number {
  if (quoted && quoted > 0) return quoted;
  if (route in RATES) return estimate(route as RateKey, weight ?? 1);
  return 0;
}

export default async function CrmListPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const user = await getSessionUser();
  const isAdmin = user?.profile?.role === 'admin';
  const supabase = await createClient();

  // Danh sách sale (RLS: admin thấy tất cả; sale chỉ thấy chính mình).
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .order('full_name');
  const sales = (profiles ?? []).map((p) => ({
    id: p.id,
    name: p.full_name || 'Chưa đặt tên',
  }));
  const saleName = (id: string | null) =>
    id ? sales.find((s) => s.id === id)?.name ?? '—' : '—';

  // --- Query danh sách lead theo bộ lọc ---
  let query = supabase.from('leads').select('*').limit(100);
  if (sp.status) query = query.eq('status', sp.status as LeadStatus);
  if (sp.route) query = query.eq('route', sp.route);
  if (sp.assigned) query = query.eq('assigned_to', sp.assigned);
  if (sp.period) {
    const now = new Date();
    const from =
      sp.period === 'today'
        ? startOfDay(now)
        : sp.period === '7d'
          ? startOfDay(subDays(now, 6))
          : startOfDay(subDays(now, 29));
    query = query.gte('created_at', from.toISOString());
  }
  if (sp.q) query = query.or(`name.ilike.%${sp.q}%,phone.ilike.%${sp.q}%`);
  query =
    sp.sort === 'followup'
      ? query.order('follow_up_at', { ascending: true, nullsFirst: false })
      : query.order('created_at', { ascending: false });

  const { data: leads } = await query;

  // --- Thống kê mini ---
  const now = new Date();
  const todayStart = startOfDay(now).toISOString();
  const monthStart = startOfMonth(now).toISOString();
  const d30 = subDays(now, 30).toISOString();

  const [todayCount, newCount, wonRes, lostRes, revenueRes] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', todayStart),
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'won').gte('created_at', d30),
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'lost').gte('created_at', d30),
    supabase.from('orders').select('price').gte('created_at', monthStart),
  ]);

  const won = wonRes.count ?? 0;
  const lost = lostRes.count ?? 0;
  const winRate = won + lost > 0 ? Math.round((won / (won + lost)) * 100) : 0;
  const revenue = (revenueRes.data ?? []).reduce((s, r) => s + (r.price ?? 0), 0);

  const rows = leads ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-ink">CRM — Quản lý lead</h1>
        <AddLeadButton />
      </div>

      {/* Thống kê mini */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Lead hôm nay" value={String(todayCount.count ?? 0)} />
        <StatCard label="Mới chưa xử lý" value={String(newCount.count ?? 0)} hint="cần liên hệ" />
        <StatCard label="Tỷ lệ chốt 30 ngày" value={`${winRate}%`} hint={`${won} chốt / ${lost} rớt`} />
        <StatCard label="Doanh thu tháng này" value={fmtVnd(revenue)} hint="từ đơn đã tạo" />
      </div>

      <CrmFilters
        values={{
          q: sp.q,
          status: sp.status,
          route: sp.route,
          assigned: sp.assigned,
          period: sp.period,
          sort: sp.sort,
        }}
        sales={sales}
        isAdmin={!!isAdmin}
      />

      {/* Bảng leads */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[820px] border-collapse">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className={TH}>Ngày vào</th>
              <th className={TH}>Tên</th>
              <th className={TH}>SĐT</th>
              <th className={TH}>Tuyến</th>
              <th className={TH}>Kg</th>
              <th className={TH}>Trạng thái</th>
              <th className={TH}>Sale</th>
              <th className={TH}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className={TD}>{fmtDate(lead.created_at)}</td>
                <td className={TD}>
                  <Link href={`/admin/crm/${lead.id}`} className="font-semibold text-ink underline-offset-2 hover:underline">
                    {lead.name}
                  </Link>
                </td>
                <td className={TD}>
                  <a href={`tel:${lead.phone}`} className="text-teal font-semibold hover:underline">
                    {lead.phone}
                  </a>
                </td>
                <td className={TD}>{routeName(lead.route)}</td>
                <td className={TD}>{lead.weight_kg ?? '—'}</td>
                <td className={TD}>
                  <LeadStatusSelect id={lead.id} status={lead.status} />
                </td>
                <td className={TD}>{saleName(lead.assigned_to)}</td>
                <td className={TD}>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/crm/${lead.id}`}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Chi tiết
                    </Link>
                    {lead.status === 'won' && (
                      <CreateOrderButton
                        lead={{
                          lead_id: lead.id,
                          customer_name: lead.name,
                          customer_phone: lead.phone,
                          route: lead.route,
                          weight_kg: lead.weight_kg ?? 1,
                          price: leadPrice(lead.quoted_price, lead.route, lead.weight_kg),
                          assigned_to: lead.assigned_to,
                        }}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className={`${TD} text-center text-slate-500`} colSpan={8}>
                  Không có lead nào khớp bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
          {rows.length} lead
        </span>
      </div>
    </div>
  );
}
