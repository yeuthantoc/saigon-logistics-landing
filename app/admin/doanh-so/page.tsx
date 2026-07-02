import { format, parseISO, subDays, startOfDay } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { RATES, RATE_KEYS, type RateKey, fmtVnd } from '@/lib/rates';
import { LEAD_SOURCE_LABEL } from '@/lib/admin/status';
import { resolveRange, previousRange, pctChange, type Period } from '@/lib/admin/dates';
import StatCard from '@/components/admin/StatCard';
import DoanhSoFilters from '@/components/admin/DoanhSoFilters';
import SalePerfTable, { type SaleRow } from '@/components/admin/SalePerfTable';
import { LeadsPerDayChart, RevenueByRouteChart, LeadSourcePie } from '@/components/admin/charts/Charts';
import type { LeadSource } from '@/lib/database.types';

export const dynamic = 'force-dynamic';

const PANEL = 'rounded-lg border border-slate-200 bg-white p-4';

export default async function DoanhSoPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: Period; from?: string; to?: string }>;
}) {
  const sp = await searchParams;
  const period: Period = sp.period ?? '30d';
  const range = resolveRange(period, sp.from, sp.to);
  const prev = previousRange(range);
  const supabase = await createClient();

  // --- Truy vấn song song ---
  const [leadsRes, ordersRes, leadsPrevRes, ordersPrevRes, leads30Res, profilesRes] =
    await Promise.all([
      supabase
        .from('leads')
        .select('created_at, status, source, assigned_to')
        .gte('created_at', range.from.toISOString())
        .lte('created_at', range.to.toISOString()),
      supabase
        .from('orders')
        .select('created_at, price, route, status, assigned_to')
        .gte('created_at', range.from.toISOString())
        .lte('created_at', range.to.toISOString()),
      supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', prev.from.toISOString())
        .lte('created_at', prev.to.toISOString()),
      supabase
        .from('orders')
        .select('price')
        .gte('created_at', prev.from.toISOString())
        .lte('created_at', prev.to.toISOString()),
      supabase
        .from('leads')
        .select('created_at, status')
        .gte('created_at', startOfDay(subDays(new Date(), 29)).toISOString()),
      supabase.from('profiles').select('id, full_name'),
    ]);

  const leads = leadsRes.data ?? [];
  const orders = ordersRes.data ?? [];
  const profiles = profilesRes.data ?? [];

  // --- KPI ---
  const totalLeads = leads.length;
  const prevLeads = leadsPrevRes.count ?? 0;
  const leadsDelta = pctChange(totalLeads, prevLeads);

  const won = leads.filter((l) => l.status === 'won').length;
  const lost = leads.filter((l) => l.status === 'lost').length;
  const winRate = won + lost > 0 ? Math.round((won / (won + lost)) * 100) : 0;

  const revenue = orders.reduce((s, o) => s + (o.price ?? 0), 0);
  const prevRevenue = (ordersPrevRes.data ?? []).reduce((s, o) => s + (o.price ?? 0), 0);
  const revenueDelta = pctChange(revenue, prevRevenue);

  const delivered = orders.filter((o) => o.status === 'delivered').length;

  // --- Line chart: 30 ngày gần nhất ---
  const days: { date: string; leads: number; won: number }[] = [];
  const dayIndex: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = subDays(new Date(), i);
    const key = format(d, 'yyyy-MM-dd');
    dayIndex[key] = days.length;
    days.push({ date: format(d, 'dd/MM'), leads: 0, won: 0 });
  }
  (leads30Res.data ?? []).forEach((l) => {
    const key = format(parseISO(l.created_at), 'yyyy-MM-dd');
    const idx = dayIndex[key];
    if (idx === undefined) return;
    days[idx].leads += 1;
    if (l.status === 'won') days[idx].won += 1;
  });

  // --- Bar chart: doanh thu theo tuyến ---
  const revByRoute: Record<string, number> = {};
  orders.forEach((o) => {
    revByRoute[o.route] = (revByRoute[o.route] ?? 0) + (o.price ?? 0);
  });
  const barData = RATE_KEYS.map((k) => ({
    route: RATES[k].name.split(' ')[0], // nhãn ngắn
    revenue: revByRoute[k] ?? 0,
  }));

  // --- Pie: phân bổ nguồn lead ---
  const sourceCount: Record<string, number> = {};
  leads.forEach((l) => {
    sourceCount[l.source] = (sourceCount[l.source] ?? 0) + 1;
  });
  const pieData = (Object.keys(LEAD_SOURCE_LABEL) as LeadSource[]).map((s) => ({
    name: LEAD_SOURCE_LABEL[s],
    value: sourceCount[s] ?? 0,
  }));

  // --- Bảng hiệu suất sale ---
  const saleRows: SaleRow[] = profiles.map((p) => {
    const mine = leads.filter((l) => l.assigned_to === p.id);
    const w = mine.filter((l) => l.status === 'won').length;
    const ls = mine.filter((l) => l.status === 'lost').length;
    const rev = orders.filter((o) => o.assigned_to === p.id).reduce((s, o) => s + (o.price ?? 0), 0);
    return {
      id: p.id,
      name: p.full_name || 'Chưa đặt tên',
      assigned: mine.length,
      called: mine.filter((l) => l.status !== 'new').length,
      won: w,
      rate: w + ls > 0 ? Math.round((w / (w + ls)) * 100) : 0,
      revenue: rev,
    };
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-extrabold text-ink">Doanh số</h1>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
          Kỳ: {range.label}
        </span>
      </div>

      <DoanhSoFilters period={period} from={sp.from} to={sp.to} />

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Tổng lead" value={String(totalLeads)} delta={leadsDelta} hint="so kỳ trước" />
        <StatCard label="Tỷ lệ chốt" value={`${winRate}%`} hint={`${won} chốt / ${lost} rớt`} />
        <StatCard label="Doanh thu" value={fmtVnd(revenue)} delta={revenueDelta} hint="so kỳ trước" />
        <StatCard label="Đơn giao thành công" value={String(delivered)} hint="trong kỳ" />
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={`${PANEL} lg:col-span-2`}>
          <h3 className="mb-3 font-display text-lg font-bold text-ink">Lead theo ngày (30 ngày)</h3>
          <LeadsPerDayChart data={days} />
        </div>
        <div className={PANEL}>
          <h3 className="mb-3 font-display text-lg font-bold text-ink">Doanh thu theo tuyến</h3>
          <RevenueByRouteChart data={barData} />
        </div>
        <div className={PANEL}>
          <h3 className="mb-3 font-display text-lg font-bold text-ink">Phân bổ nguồn lead</h3>
          <LeadSourcePie data={pieData} />
        </div>
      </div>

      {/* Bảng sale */}
      <div>
        <h3 className="mb-3 font-display text-lg font-bold text-ink">Hiệu suất sale</h3>
        <SalePerfTable rows={saleRows} />
      </div>
    </div>
  );
}
