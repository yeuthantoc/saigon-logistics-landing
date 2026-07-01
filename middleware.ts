import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Bảo vệ /admin/* và xử lý redirect ở /dang-nhap.
  matcher: ['/admin/:path*', '/dang-nhap'],
};
