import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendZaloNotify, orderUpdateMessage } from '@/lib/zalo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/don-hang/[id]/notify — gửi lại thông báo Zalo trạng thái hiện tại (thủ công).
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const { data: order } = await supabase
    .from('orders')
    .select('tracking_code, customer_phone, status')
    .eq('id', id)
    .maybeSingle();
  if (!order) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const result = await sendZaloNotify(
    order.customer_phone,
    orderUpdateMessage(order.tracking_code, order.status),
  );

  if (result.skipped) {
    return NextResponse.json({ ok: false, error: 'zalo_not_configured' }, { status: 400 });
  }
  return NextResponse.json({ ok: result.ok, result });
}
