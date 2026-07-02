'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CORAL = '#ef5226';
const TEAL = '#0e7c6b';
const PIE_COLORS = [CORAL, TEAL, '#ff8b5e', '#251a12'];

// Guard: Recharts (ResponsiveContainer) cần window → chỉ render sau khi mount.
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

function ChartSkeleton() {
  return <div className="h-[280px] w-full animate-pulse rounded-lg bg-slate-100" />;
}

const GRID = '#e2e8f0'; // slate-200
const AXIS = { fontSize: 12, fill: '#64748b' } as const; // slate-500

export function LeadsPerDayChart({
  data,
}: {
  data: { date: string; leads: number; won: number }[];
}) {
  if (!useMounted()) return <ChartSkeleton />;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
        <XAxis dataKey="date" tick={AXIS} interval="preserveStartEnd" />
        <YAxis tick={AXIS} allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="leads" name="Lead vào" stroke={CORAL} strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="won" name="Chốt" stroke={TEAL} strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function RevenueByRouteChart({
  data,
}: {
  data: { route: string; revenue: number }[];
}) {
  if (!useMounted()) return <ChartSkeleton />;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
        <XAxis dataKey="route" tick={AXIS} />
        <YAxis tick={AXIS} tickFormatter={(v) => `${Math.round(v / 1_000_000)}tr`} />
        <Tooltip formatter={(v) => `${Number(v).toLocaleString('vi-VN')}₫`} />
        <Bar dataKey="revenue" name="Doanh thu" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? CORAL : TEAL} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LeadSourcePie({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  if (!useMounted()) return <ChartSkeleton />;
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) {
    return <div className="flex h-[280px] items-center justify-center text-sm text-slate-500">Chưa có dữ liệu.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={95}
          label={(e) => `${e.name}: ${e.value}`}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#fff" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
