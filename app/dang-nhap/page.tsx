import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { PANEL } from '@/lib/admin/ui';
import LoginForm from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: `Đăng nhập | ${SITE.name}`,
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safeNext = next && next.startsWith('/admin') ? next : '/admin/crm';

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="font-display text-2xl font-extrabold text-ink"
          >
            {SITE.name}
          </Link>
          <p className="mt-1 text-sm text-muted">Khu vực quản trị nội bộ</p>
        </div>

        <div className={`${PANEL} p-6`}>
          <h1 className="mb-4 font-display text-xl font-bold text-ink">
            Đăng nhập
          </h1>
          <LoginForm next={safeNext} />
        </div>

        <p className="mt-4 text-center text-xs text-muted-2">
          Chỉ dành cho nhân viên. Quên mật khẩu? Liên hệ quản trị viên.
        </p>
      </div>
    </main>
  );
}
