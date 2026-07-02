import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isValidVNPhone, normalizePhone } from '@/lib/validation';
import { createAdminClient, isSupabaseConfigured } from '@/lib/supabase/admin';
import { sendZaloNotify, leadWelcomeMessage } from '@/lib/zalo';
import type { LeadSource } from '@/lib/database.types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Rate limit (in-memory, theo IP): tối đa 3 lead / 1 giờ ---
// Lưu ý: serverless mỗi instance có bộ nhớ riêng & reset — chỉ chặn spam nhẹ.
const WINDOW_MS = 60 * 60 * 1000; // 1 giờ
const MAX_HITS = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > MAX_HITS;
}

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

const LeadSchema = z.object({
  name: z.string().max(120).optional(),
  phone: z.string().min(6).max(20),
  route: z.string().max(10).optional(),
  routeName: z.string().max(120).optional(),
  weight: z.number().nullable().optional(),
  note: z.string().max(1000).optional(),
  source: z.string().max(20).optional(),
  website: z.string().optional(), // honeypot
});

const ALLOWED_SOURCES: LeadSource[] = ['web', 'zalo', 'hotline', 'direct'];
function normSource(s?: string): LeadSource {
  return (ALLOWED_SOURCES.includes(s as LeadSource) ? s : 'web') as LeadSource;
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }
  const body = parsed.data;

  // 1) Honeypot: bot điền field ẩn → giả vờ OK.
  if (body.website && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  // 2) Rate limit
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  // 3) Validate phone VN
  const phone = (body.phone || '').trim();
  if (!isValidVNPhone(phone)) {
    return NextResponse.json({ ok: false, error: 'invalid_phone' }, { status: 400 });
  }

  const name = (body.name || '').slice(0, 120).trim() || '(chưa có tên)';
  const normPhone = normalizePhone(phone);
  const lead = {
    name,
    phone: normPhone,
    route: body.route || '',
    routeName: body.routeName || '',
    weight: typeof body.weight === 'number' ? body.weight : null,
    note: (body.note || '').slice(0, 1000).trim(),
    source: normSource(body.source),
    receivedAt: new Date().toISOString(),
  };

  // 4) Lưu vào Supabase (service_role, bỏ qua RLS).
  let saved = false;
  if (isSupabaseConfigured()) {
    try {
      const admin = createAdminClient();
      const { error } = await admin.from('leads').insert({
        name: lead.name,
        phone: lead.phone,
        route: lead.route,
        weight_kg: lead.weight,
        note: lead.note || null,
        source: lead.source,
        status: 'new',
      });
      if (error) throw error;
      saved = true;
    } catch (err) {
      console.error('[LEAD] supabase insert failed:', err);
    }
  }

  // 5) Zalo notify khách (best-effort; no-op nếu chưa cấu hình token).
  //    Lưu ý: Zalo OA cần user_id, SĐT thô chỉ gửi được nếu khách đã tương tác OA.
  sendZaloNotify(lead.phone, leadWelcomeMessage(lead.name)).catch(() => {});

  // 6) Mirror sang các kênh cũ (webhook/resend/telegram) để dự phòng.
  try {
    const delivered = await deliver(lead);
    if (!saved && !delivered) {
      console.log('[LEAD] (chưa cấu hình kênh nào) →', lead);
    }
  } catch (err) {
    console.error('[LEAD] delivery failed:', err);
    // Nếu đã lưu Supabase thì vẫn coi là thành công.
    if (!saved) {
      return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}

type Lead = {
  name: string;
  phone: string;
  routeName: string;
  weight: number | null;
  note: string;
  source: string;
  receivedAt: string;
};

/** Trả true nếu đã gửi qua ít nhất 1 kênh. Throw nếu kênh được cấu hình nhưng lỗi. */
async function deliver(lead: Lead): Promise<boolean> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const tgToken = process.env.TELEGRAM_BOT_TOKEN;

  if (webhook) {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return true;
  }

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM || 'lead@saigon-logistics.vn',
        to: process.env.LEAD_EMAIL_TO || 'sale@saigon-logistics.vn',
        subject: `🆕 Lead mới: ${lead.name} – ${lead.phone}`,
        text: leadAsText(lead),
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
    return true;
  }

  if (tgToken && process.env.TELEGRAM_CHAT_ID) {
    const res = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: leadAsText(lead) }),
    });
    if (!res.ok) throw new Error(`telegram ${res.status}`);
    return true;
  }

  return false;
}

function leadAsText(lead: Lead): string {
  return [
    '🆕 LEAD MỚI — SAIGON LOGISTICS',
    `Họ tên: ${lead.name}`,
    `SĐT/Zalo: ${lead.phone}`,
    `Tuyến: ${lead.routeName || '-'}`,
    `Cân nặng: ${lead.weight ? lead.weight + ' kg' : '-'}`,
    `Ghi chú: ${lead.note || '-'}`,
    `Nguồn: ${lead.source}`,
    `Lúc: ${lead.receivedAt}`,
  ].join('\n');
}
