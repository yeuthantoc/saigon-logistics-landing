import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { sendZaloNotify, orderUpdateMessage } from '@/lib/zalo';
import { ORDER_STATUS_KEYS } from '@/lib/admin/status';
import type { OrderStatus, StatusHistoryEntry } from '@/lib/database.types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PatchSchema = z.object({
  status: z.enum(ORDER_STATUS_KEYS as [OrderStatus, ...OrderStatus[]]),
  note: z.string().max(1000).optional(),
});

export async function PATCH(
  req: Request,
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

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  const parsed = PatchSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }
  const { status, note } = parsed.data;

  // Lấy order hiện tại (RLS lo phân quyền).
  const { data: order, error: fetchErr } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (fetchErr || !order) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  // Append vào status_history.
  const entry: StatusHistoryEntry = {
    status,
    note: note || '',
    timestamp: new Date().toISOString(),
    updated_by: user.id,
  };
  const history = [...(order.status_history ?? []), entry];

  const update: {
    status: OrderStatus;
    status_history: StatusHistoryEntry[];
    actual_delivery?: string;
  } = { status, status_history: history };
  if (status === 'delivered') update.actual_delivery = entry.timestamp;

  const { data: updated, error: updErr } = await supabase
    .from('orders')
    .update(update)
    .eq('id', id)
    .select('*')
    .single();
  if (updErr) {
    return NextResponse.json({ ok: false, error: updErr.message }, { status: 400 });
  }

  // Zalo notify khách (best-effort).
  const zalo = await sendZaloNotify(
    updated.customer_phone,
    orderUpdateMessage(updated.tracking_code, status, note),
  );

  return NextResponse.json({ ok: true, order: updated, zalo });
}
