import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/admin/session';
import { createClient } from '@/lib/supabase/server';
import AdminShell from '@/components/admin/AdminShell';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Quản trị | ${SITE.name}`,
  robots: { index: false, follow: false },
};

// Admin luôn động (đọc cookie/session, dữ liệu realtime).
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Chưa cấu hình Supabase → báo rõ thay vì crash khó hiểu.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="max-w-md rounded-2xl border-2 border-ink bg-white p-6 shadow-hard">
          <h1 className="font-display text-xl font-bold text-ink">
            Chưa cấu hình Supabase
          </h1>
          <p className="mt-2 text-sm text-muted">
            Điền <code>NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> và{' '}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> trong <code>.env.local</code>,
            xem hướng dẫn tại <code>supabase/README.md</code>.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-bold text-coral underline">
            ← Về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  const user = await requireUser();
  const supabase = await createClient();

  // Đếm lead 'new' — RLS tự lọc: admin thấy tất cả, sale chỉ đếm lead của mình.
  const { count } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'new');

  const userName = user.profile?.full_name || user.email || 'Người dùng';

  return (
    <AdminShell
      userName={userName}
      role={user.profile?.role ?? 'sale'}
      newLeadCount={count ?? 0}
    >
      {children}
    </AdminShell>
  );
}
