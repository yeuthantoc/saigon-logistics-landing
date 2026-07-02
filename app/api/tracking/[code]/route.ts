import { NextResponse } from 'next/server';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin';
import { RATES, type RateKey } from '@/lib/rates';
import type { StatusHistoryEntry } from '@/lib/database.types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/tracking/[code] — công khai, KHÔNG cần auth.
// Chỉ trả thông tin an toàn cho khách; KHÔNG lộ giá, sale, ghi chú nội bộ.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const trackingCode = decodeURIComponent(code).trim().toUpperCase();

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const admin = createAdminClient();
  const { data: order } = await admin
    .from('orders')
    .select('tracking_code, status, status_history, estimated_delivery, route, customer_name, created_at')
    .eq('tracking_code', trackingCode)
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  // Chỉ giữ status + note + timestamp trong lịch sử (bỏ updated_by).
  const history = (order.status_history ?? []).map((e: StatusHistoryEntry) => ({
    status: e.status,
    note: e.note,
    timestamp: e.timestamp,
  }));

  // Che bớt tên khách (chỉ để khách nhận ra đúng đơn của mình).
  const maskedName = maskName(order.customer_name);

  return NextResponse.json({
    ok: true,
    order: {
      tracking_code: order.tracking_code,
      status: order.status,
      status_history: history,
      estimated_delivery: order.estimated_delivery,
      route_name: RATES[order.route as RateKey]?.name ?? order.route,
      customer_name: maskedName,
      created_at: order.created_at,
    },
  });
}

function maskName(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .map((w) => (w.length <= 1 ? w : w[0] + '*'.repeat(Math.min(w.length - 1, 3))))
    .join(' ');
}
