// Helper refresh session + bảo vệ /admin, gọi từ middleware.ts (root).
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Chưa cấu hình Supabase: cho qua để phần public của site vẫn chạy.
  // (Trang /admin sẽ tự báo lỗi cấu hình khi truy cập.)
  if (!url || !anon) return response;

  const supabase = createServerClient<Database>(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // QUAN TRỌNG: getUser() làm mới token nếu hết hạn.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Chặn /admin/* nếu chưa đăng nhập → về trang đăng nhập.
  if (path.startsWith('/admin') && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dang-nhap';
    redirectUrl.searchParams.set('next', path);
    return NextResponse.redirect(redirectUrl);
  }

  // Đã đăng nhập mà vào trang login → đưa thẳng vào dashboard.
  if (path === '/dang-nhap' && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/admin/crm';
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
