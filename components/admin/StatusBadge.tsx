import { LEAD_STATUS_META, ORDER_STATUS_META } from '@/lib/admin/status';
import type { LeadStatus, OrderStatus } from '@/lib/database.types';

export function LeadBadge({ status }: { status: LeadStatus }) {
  const meta = LEAD_STATUS_META[status] ?? LEAD_STATUS_META.new;
  return <span className={meta.badge}>{meta.label}</span>;
}

export function OrderBadge({ status }: { status: OrderStatus }) {
  const meta = ORDER_STATUS_META[status] ?? ORDER_STATUS_META.received;
  return <span className={meta.badge}>{meta.label}</span>;
}
