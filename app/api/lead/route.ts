import { NextResponse } from 'next/server';
import { isValidVNPhone, normalizePhone } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Rate limit cơ bản (in-memory, theo IP) ---
// Lưu ý: trên serverless mỗi instance có bộ nhớ riêng & sẽ reset — đây chỉ là
// lớp chặn spam nhẹ. Muốn chắc chắn hãy dùng Upstash Ratelimit / KV.
const WINDOW_MS = 10 * 60 * 1000; // 10 phút
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  // Dọn bộ nhớ thi thoảng
  if (hits.size > 5000) hits.clear();
  return arr.length > MAX_HITS;
}

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

interface LeadPayload {
  name?: string;
  phone?: string;
  route?: string;
  routeName?: string;
  weight?: number | null;
  note?: string;
  source?: string;
  website?: string; // honeypot
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // 1) Honeypot: bot điền field ẩn -> giả vờ OK, bỏ qua.
  if (body.website && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  // 2) Rate limit
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'rate_limited' },
      { status: 429 },
    );
  }

  // 3) Validate
  const phone = (body.phone || '').trim();
  if (!isValidVNPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: 'invalid_phone' },
      { status: 400 },
    );
  }

  const lead = {
    name: (body.name || '').slice(0, 120).trim() || '(chưa có tên)',
    phone: normalizePhone(phone),
    route: body.route || '',
    routeName: body.routeName || '',
    weight: typeof body.weight === 'number' ? body.weight : null,
    note: (body.note || '').slice(0, 1000).trim(),
    source: body.source || 'unknown',
    ip,
    userAgent: req.headers.get('user-agent') || '',
    receivedAt: new Date().toISOString(),
  };

  // 4) Chuyển lead tới kênh đã cấu hình (ưu tiên Webhook -> Resend -> Telegram).
  try {
    const delivered = await deliver(lead);
    if (!delivered) {
      // Không cấu hình kênh nào: log để dev thấy, vẫn trả OK.
      console.log('[LEAD] (chưa cấu hình kênh nhận lead) →', lead);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[LEAD] delivery failed:', err);
    return NextResponse.json(
      { ok: false, error: 'delivery_failed' },
      { status: 502 },
    );
  }
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

/** Trả về true nếu đã gửi qua ít nhất 1 kênh. Throw nếu kênh được cấu hình nhưng lỗi. */
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
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
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
    const res = await fetch(
      `https://api.telegram.org/bot${tgToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: leadAsText(lead),
        }),
      },
    );
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
