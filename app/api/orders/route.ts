import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { makeTrackingCode } from '@/lib/admin/format';
import type { StatusHistoryEntry } from '@/lib/database.types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CreateSchema = z.object({
  lead_id: z.string().uuid().nullable().optional(),
  customer_name: z.string().min(1).max(120),
  customer_phone: z.string().min(6).max(20),
  route: z.string().min(1).max(10),
  weight_kg: z.number().positive(),
  price: z.number().nonnegative(),
  sender_address: z.string().max(500).optional(),
  receiver_address: z.string().max(500).optional(),
  receiver_country: z.string().max(120).optional(),
  estimated_delivery: z.string().optional(), // yyyy-MM-dd
  assigned_to: z.string().uuid().nullable().optional(),
  note: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_input', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const input = parsed.data;

  const initialHistory: StatusHistoryEntry[] = [
    {
      status: 'received',
      note: 'Đơn được tạo từ lead',
      timestamp: new Date().toISOString(),
      updated_by: user.id,
    },
  ];

  // Thử vài lần phòng khi mã tracking trùng (unique).
  for (let attempt = 0; attempt < 5; attempt++) {
    const tracking_code = makeTrackingCode();
    const { data, error } = await supabase
      .from('orders')
      .insert({
        lead_id: input.lead_id ?? null,
        tracking_code,
        customer_name: input.customer_name,
        customer_phone: input.customer_phone,
        route: input.route,
        weight_kg: input.weight_kg,
        price: input.price,
        status: 'received',
        status_history: initialHistory,
        sender_address: input.sender_address ?? null,
        receiver_address: input.receiver_address ?? null,
        receiver_country: input.receiver_country ?? null,
        estimated_delivery: input.estimated_delivery || null,
        assigned_to: input.assigned_to ?? user.id,
        note: input.note ?? null,
      })
      .select('*')
      .single();

    if (!error && data) {
      // Đánh dấu lead đã 'won' nếu tạo từ lead.
      if (input.lead_id) {
        await supabase
          .from('leads')
          .update({ status: 'won' })
          .eq('id', input.lead_id);
      }
      return NextResponse.json({ ok: true, order: data });
    }

    // 23505 = unique_violation (mã tracking trùng) → thử mã khác.
    if (error && (error as { code?: string }).code === '23505') continue;

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
  }

  return NextResponse.json(
    { ok: false, error: 'tracking_code_collision' },
    { status: 500 },
  );
}
