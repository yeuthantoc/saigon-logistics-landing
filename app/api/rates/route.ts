import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin';
import { getApiAdmin } from '@/lib/admin/session';
import { ROUTES } from '@/lib/rates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/rates — công khai. Đọc bảng cước từ DB; fallback về lib/rates nếu chưa cấu hình.
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      source: 'static',
      rates: ROUTES.map((r) => ({ route: r.key, name: r.name, base: r.base, per_kg: r.perKg, eta: r.eta })),
    });
  }
  const admin = createAdminClient();
  const { data } = await admin
    .from('rate_config')
    .select('route, name, base, per_kg, eta, sort_order')
    .order('sort_order');
  return NextResponse.json({ ok: true, source: 'db', rates: data ?? [] });
}

const RatesSchema = z.object({
  rates: z
    .array(
      z.object({
        route: z.string().min(1).max(10),
        base: z.number().nonnegative(),
        per_kg: z.number().nonnegative(),
        eta: z.string().max(40).optional(),
      }),
    )
    .min(1),
});

// POST /api/rates — chỉ admin. Cập nhật base/per_kg/eta.
export async function POST(req: Request) {
  const admin = await getApiAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  const parsed = RatesSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  const supabase = await createClient(); // RLS admin_rates cho phép admin ghi
  for (const r of parsed.data.rates) {
    const { error } = await supabase
      .from('rate_config')
      .update({ base: r.base, per_kg: r.per_kg, eta: r.eta ?? null })
      .eq('route', r.route);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
  }
  return NextResponse.json({ ok: true });
}
