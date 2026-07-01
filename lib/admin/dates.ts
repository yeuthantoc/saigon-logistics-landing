// Giải quyết khoảng thời gian cho bộ lọc CRM / Doanh số.
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  startOfQuarter,
  subDays,
  differenceInMilliseconds,
} from 'date-fns';

export type Period = 'today' | '7d' | '30d' | 'month' | 'quarter' | 'custom';

export interface Range {
  from: Date;
  to: Date;
  label: string;
}

export const PERIOD_LABEL: Record<Period, string> = {
  today: 'Hôm nay',
  '7d': '7 ngày',
  '30d': '30 ngày',
  month: 'Tháng này',
  quarter: 'Quý này',
  custom: 'Tuỳ chọn',
};

export function resolveRange(
  period: Period | undefined,
  from?: string,
  to?: string,
): Range {
  const now = new Date();
  switch (period) {
    case 'today':
      return { from: startOfDay(now), to: endOfDay(now), label: PERIOD_LABEL.today };
    case '7d':
      return { from: startOfDay(subDays(now, 6)), to: endOfDay(now), label: PERIOD_LABEL['7d'] };
    case 'month':
      return { from: startOfMonth(now), to: endOfDay(now), label: PERIOD_LABEL.month };
    case 'quarter':
      return { from: startOfQuarter(now), to: endOfDay(now), label: PERIOD_LABEL.quarter };
    case 'custom': {
      const f = from ? startOfDay(new Date(from)) : startOfDay(subDays(now, 29));
      const t = to ? endOfDay(new Date(to)) : endOfDay(now);
      return { from: f, to: t, label: PERIOD_LABEL.custom };
    }
    case '30d':
    default:
      return { from: startOfDay(subDays(now, 29)), to: endOfDay(now), label: PERIOD_LABEL['30d'] };
  }
}

/** Khoảng liền trước cùng độ dài (để tính +/- %). */
export function previousRange(range: Range): Range {
  const span = differenceInMilliseconds(range.to, range.from);
  const to = new Date(range.from.getTime() - 1);
  const from = new Date(to.getTime() - span);
  return { from, to, label: 'Kỳ trước' };
}

/** % thay đổi; null nếu kỳ trước = 0 (tránh chia 0). */
export function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}
