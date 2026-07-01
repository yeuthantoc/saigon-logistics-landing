// =============================================================
// Zalo OA — gửi thông báo cho khách. No-op nếu chưa cấu hình ZALO_OA_TOKEN.
// =============================================================
import { SITE } from '@/lib/site';
import { ORDER_STATUS_META } from '@/lib/admin/status';
import type { OrderStatus } from '@/lib/database.types';

interface ZaloResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
  data?: unknown;
}

/**
 * Gửi tin nhắn CS qua Zalo OA. `recipient` là user_id Zalo (không phải SĐT thô —
 * Zalo OA API yêu cầu user_id; SĐT chỉ tra được nếu khách đã tương tác với OA).
 */
export async function sendZaloNotify(
  recipientUserId: string,
  message: string,
): Promise<ZaloResult> {
  const token = process.env.ZALO_OA_TOKEN;
  if (!token) return { ok: false, skipped: true };
  if (!recipientUserId) return { ok: false, error: 'missing_recipient' };

  try {
    const res = await fetch('https://openapi.zalo.me/v2.0/oa/message/cs', {
      method: 'POST',
      headers: { access_token: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { user_id: recipientUserId },
        message: { text: message },
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: `zalo ${res.status}`, data };
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown' };
  }
}

// --- Template tin nhắn ---

export function leadWelcomeMessage(name: string): string {
  return `Xin chào ${name || 'Quý khách'}! ${SITE.name} đã nhận yêu cầu báo giá của bạn. Sale sẽ liên hệ trong ít phút. Cảm ơn bạn! 📦`;
}

export function orderUpdateMessage(
  trackingCode: string,
  status: OrderStatus,
  note?: string,
): string {
  const label = ORDER_STATUS_META[status]?.label ?? status;
  const noteLine = note ? ` ${note}.` : '';
  return `Đơn hàng ${trackingCode} của bạn: ${label}.${noteLine} Tra cứu tại ${SITE.url}/theo-doi-don`;
}
