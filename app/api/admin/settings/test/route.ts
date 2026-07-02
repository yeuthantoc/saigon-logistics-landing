import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getApiAdmin } from '@/lib/admin/session';
import { sendZaloNotify } from '@/lib/zalo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TestSchema = z.object({ phone: z.string().min(6).max(20) });

// POST /api/admin/settings/test — gửi tin Zalo thử (admin).
export async function POST(req: Request) {
  const admin = await getApiAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  const parsed = TestSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  const result = await sendZaloNotify(
    parsed.data.phone,
    'Tin nhắn thử từ SAIGON LOGISTICS — cấu hình Zalo OA hoạt động! ✅',
  );
  if (result.skipped) {
    return NextResponse.json({ ok: false, error: 'zalo_not_configured' }, { status: 400 });
  }
  return NextResponse.json({ ok: result.ok, result });
}
