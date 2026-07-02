// =============================================================
// Nhãn + màu badge cho trạng thái lead & đơn hàng, và flow chuyển trạng thái.
// Class badge viết literal đầy đủ để Tailwind không purge nhầm.
// Phong cách tối giản: pill mềm (nền nhạt + chữ đậm màu), không viền/bóng.
// =============================================================
import type { LeadStatus, OrderStatus, LeadSource, UserRole } from '@/lib/database.types';

const BADGE_BASE =
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap';

export interface StatusMeta {
  label: string;
  badge: string; // class đầy đủ (đã gồm BADGE_BASE)
}

export const LEAD_STATUS_META: Record<LeadStatus, StatusMeta> = {
  new:    { label: 'Mới',        badge: `${BADGE_BASE} bg-amber-100 text-amber-800` },
  called: { label: 'Đã gọi',     badge: `${BADGE_BASE} bg-blue-100 text-blue-700` },
  quoted: { label: 'Đã báo giá', badge: `${BADGE_BASE} bg-teal/10 text-teal` },
  won:    { label: 'Chốt ✓',     badge: `${BADGE_BASE} bg-green-100 text-green-700` },
  lost:   { label: 'Không chốt', badge: `${BADGE_BASE} bg-slate-100 text-slate-600` },
};

export const ORDER_STATUS_META: Record<OrderStatus, StatusMeta> = {
  received:         { label: 'Đã tiếp nhận',   badge: `${BADGE_BASE} bg-slate-100 text-slate-600` },
  picked_up:        { label: 'Đã lấy hàng',    badge: `${BADGE_BASE} bg-blue-100 text-blue-700` },
  in_transit:       { label: 'Đang vận chuyển', badge: `${BADGE_BASE} bg-amber-100 text-amber-800` },
  customs:          { label: 'Đang thông quan', badge: `${BADGE_BASE} bg-orange-100 text-orange-700` },
  out_for_delivery: { label: 'Đang giao',      badge: `${BADGE_BASE} bg-teal/10 text-teal` },
  delivered:        { label: 'Đã giao ✓',      badge: `${BADGE_BASE} bg-green-100 text-green-700` },
  failed:           { label: 'Giao thất bại',  badge: `${BADGE_BASE} bg-red-100 text-red-700` },
};

export const LEAD_STATUS_KEYS: LeadStatus[] = ['new', 'called', 'quoted', 'won', 'lost'];
export const ORDER_STATUS_KEYS: OrderStatus[] = [
  'received', 'picked_up', 'in_transit', 'customs', 'out_for_delivery', 'delivered', 'failed',
];

export const LEAD_SOURCE_LABEL: Record<LeadSource, string> = {
  web: 'Website', zalo: 'Zalo', hotline: 'Hotline', direct: 'Trực tiếp',
};

export const ROLE_LABEL: Record<UserRole, string> = {
  admin: 'Quản trị', sale: 'Sale', viewer: 'Chỉ xem',
};

// Flow hợp lệ: từ trạng thái hiện tại → các trạng thái kế tiếp cho phép chọn.
export const ORDER_FLOW: Record<OrderStatus, OrderStatus[]> = {
  received:         ['picked_up', 'failed'],
  picked_up:        ['in_transit', 'failed'],
  in_transit:       ['customs', 'out_for_delivery', 'failed'],
  customs:          ['out_for_delivery', 'failed'],
  out_for_delivery: ['delivered', 'failed'],
  delivered:        [],
  failed:           ['picked_up', 'in_transit'], // cho phép thử lại
};

export function nextOrderStatuses(current: OrderStatus): OrderStatus[] {
  return ORDER_FLOW[current] ?? [];
}
