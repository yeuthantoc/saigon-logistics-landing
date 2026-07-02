// POST /api/leads — sale/admin thêm lead thủ công từ CRM
// (khách chat Zalo / gọi hotline / walk-in không đi qua form public).
// Khác /api/lead (public): endpoint này yêu cầu đăng nhập, đi qua RLS.
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { isValidVNPhone, normalizePhone } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CreateSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(6).max(20),
  route: z.enum(['us', 'au', 'ca', 'eu', 'jp', 'sg']),
  weight_kg: z.number().positive().nullable().optional(),
  source: z.enum(['web', 'zalo', 'hotline', 'direct']).default('zalo'),
  note: z.string().max(1000).optional(),
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

  const { name, phone, route, weight_kg, source, note } = parsed.data;
  if (!isValidVNPhone(phone)) {
    return NextResponse.json({ ok: false, error: 'invalid_phone' }, { status: 400 });
  }

  // Gán mặc định cho chính người tạo — sale bắt buộc (RLS with check
  // assigned_to = auth.uid()); admin có thể reassign sau ở trang chi tiết.
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: name.trim(),
      phone: normalizePhone(phone),
      route,
      weight_kg: weight_kg ?? null,
      source,
      note: note?.trim() || null,
      status: 'new',
      assigned_to: user.id,
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, lead: data });
}
