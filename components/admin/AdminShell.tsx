'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  LineChart,
  Package,
  Settings,
  LogOut,
} from 'lucide-react';
import { cx } from '@/lib/ui';
import { ROLE_LABEL } from '@/lib/admin/status';
import type { UserRole } from '@/lib/database.types';

interface NavItem {
  href: string;
  label: string;
  icon: typeof Users;
  badge?: number;
  adminOnly?: boolean;
}

export default function AdminShell({
  userName,
  role,
  newLeadCount,
  children,
}: {
  userName: string;
  role: UserRole;
  newLeadCount: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const nav: NavItem[] = [
    { href: '/admin/crm', label: 'CRM', icon: Users, badge: newLeadCount },
    { href: '/admin/doanh-so', label: 'Doanh số', icon: LineChart },
    { href: '/admin/don-hang', label: 'Đơn hàng', icon: Package },
    { href: '/admin/cai-dat', label: 'Cài đặt', icon: Settings, adminOnly: true },
  ].filter((i) => !i.adminOnly || role === 'admin');

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="min-h-screen bg-slate-50 text-ink md:flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-slate-200">
        <div className="px-5 py-5 border-b border-slate-200">
          <Link href="/" className="font-display text-lg font-extrabold text-ink">
            SAIGON LOGISTICS
          </Link>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{userName}</p>
              <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                {ROLE_LABEL[role]}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-coral/10 text-coral'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-ink',
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-coral px-1.5 py-0.5 text-[11px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-ink transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      {/* Header mobile */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 text-ink">
        <Link href="/" className="font-display text-base font-extrabold">
          SAIGON LOGISTICS
        </Link>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            {ROLE_LABEL[role]}
          </span>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              aria-label="Đăng xuất"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </header>

      {/* Nội dung */}
      <main className="flex-1 md:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-10">{children}</div>
      </main>

      {/* Bottom nav mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 grid grid-cols-4 border-t border-slate-200 bg-white">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                'relative flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold',
                active ? 'text-coral' : 'text-slate-500',
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
              {item.badge ? (
                <span className="absolute right-1/4 top-1 rounded-full bg-coral px-1 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
