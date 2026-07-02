import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  // Dùng origin của request để redirect đúng domain khi chạy local/preview.
  const origin = new URL(request.url).origin;
  return NextResponse.redirect(new URL('/dang-nhap', origin), { status: 303 });
}
