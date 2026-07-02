import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin';
import { getApiAdmin } from '@/lib/admin/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/admin/users — danh sách user (admin).
export async function GET() {
  const admin = await getApiAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const sb = createAdminClient();
  const [{ data: authData }, { data: profiles }] = await Promise.all([
    sb.auth.admin.listUsers(),
    sb.from('profiles').select('id, full_name, role'),
  ]);

  const roleById: Record<string, string> = {};
  const nameById: Record<string, string> = {};
  (profiles ?? []).forEach((p) => {
    roleById[p.id] = p.role;
    if (p.full_name) nameById[p.id] = p.full_name;
  });

  const users = (authData?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? '',
    full_name: nameById[u.id] ?? '',
    role: roleById[u.id] ?? 'sale',
    created_at: u.created_at,
    banned: Boolean((u as { banned_until?: string | null }).banned_until),
  }));

  return NextResponse.json({ ok: true, users });
}

const InviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'sale', 'viewer']).default('sale'),
});

// POST /api/admin/users — mời user mới qua email (admin).
export async function POST(req: Request) {
  const admin = await getApiAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  const parsed = InviteSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  const sb = createAdminClient();
  const { data, error } = await sb.auth.admin.inviteUserByEmail(parsed.data.email);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  // Gán role (trigger đã tạo profile với role mặc định 'sale').
  if (data.user && parsed.data.role !== 'sale') {
    await sb.from('profiles').update({ role: parsed.data.role }).eq('id', data.user.id);
  }
  return NextResponse.json({ ok: true, userId: data.user?.id });
}

const PatchSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(['admin', 'sale', 'viewer']).optional(),
  banned: z.boolean().optional(),
});

// PATCH /api/admin/users — đổi role / vô hiệu hoá tài khoản (admin).
export async function PATCH(req: Request) {
  const admin = await getApiAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
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
  const { id, role, banned } = parsed.data;

  // Không cho tự khoá / tự hạ quyền chính mình (tránh mất quyền quản trị).
  if (id === admin.id && (banned || role !== 'admin')) {
    return NextResponse.json({ ok: false, error: 'cannot_modify_self' }, { status: 400 });
  }

  const sb = createAdminClient();
  if (role) {
    const { error } = await sb.from('profiles').update({ role }).eq('id', id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }
  if (typeof banned === 'boolean') {
    const { error } = await sb.auth.admin.updateUserById(id, {
      ban_duration: banned ? '876000h' : 'none',
    });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
