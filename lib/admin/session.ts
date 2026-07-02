// Helper lấy user + profile hiện tại trong Server Components / Route Handlers.
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Profile } from '@/lib/database.types';

export interface SessionUser {
  id: string;
  email: string | null;
  profile: Profile | null;
}

/** Lấy user đang đăng nhập + profile. Trả null nếu chưa đăng nhập. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  return { id: user.id, email: user.email ?? null, profile };
}

/** Bắt buộc đăng nhập — nếu chưa thì redirect về /dang-nhap. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect('/dang-nhap');
  return user;
}

/** Bắt buộc role admin — nếu không phải admin thì redirect về CRM. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.profile?.role !== 'admin') redirect('/admin/crm');
  return user;
}

export function isAdmin(user: SessionUser | null): boolean {
  return user?.profile?.role === 'admin';
}

/** Dùng trong Route Handler: trả admin user hoặc null (để trả 401/403). */
export async function getApiAdmin(): Promise<SessionUser | null> {
  const user = await getSessionUser();
  return isAdmin(user) ? user : null;
}
