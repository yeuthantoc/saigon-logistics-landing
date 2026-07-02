import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getApiAdmin } from '@/lib/admin/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_KEYS = [
  'lead_webhook_url',
  'zalo_oa_token',
  'zalo_template_lead',
  'zalo_template_order',
] as const;

// GET /api/admin/settings — admin. Trả toàn bộ app_settings dạng object.
export async function GET() {
  const admin = await getApiAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  const supabase = await createClient();
  const { data } = await supabase.from('app_settings').select('key, value');
  const settings: Record<string, string> = {};
  (data ?? []).forEach((row) => {
    if (row.value != null) settings[row.key] = row.value;
  });
  return NextResponse.json({ ok: true, settings });
}

const PutSchema = z.object({
  settings: z.record(z.string(), z.string()),
});

// PUT /api/admin/settings — admin. Upsert các key hợp lệ.
export async function PUT(req: Request) {
  const admin = await getApiAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  const parsed = PutSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  const rows = Object.entries(parsed.data.settings)
    .filter(([k]) => (ALLOWED_KEYS as readonly string[]).includes(k))
    .map(([key, value]) => ({ key, value }));

  if (rows.length === 0) {
    return NextResponse.json({ ok: false, error: 'no_valid_keys' }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from('app_settings').upsert(rows, { onConflict: 'key' });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
