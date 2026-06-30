// =============================================================
// Bảng cước tham khảo + công thức tính.
// CHỈNH GIÁ Ở ĐÂY — mọi nơi (widget, lưới tuyến) đều đọc từ file này.
// =============================================================

export type RateKey = 'us' | 'au' | 'ca' | 'eu' | 'jp' | 'sg';

export interface Rate {
  name: string;
  base: number; // phí cố định (VND)
  perKg: number; // đơn giá mỗi kg (VND)
  eta: string; // thời gian dự kiến
}

export const RATES: Record<RateKey, Rate> = {
  us: { name: 'Mỹ (USA)', base: 120000, perKg: 290000, eta: '4–6 ngày' },
  au: { name: 'Úc', base: 110000, perKg: 250000, eta: '3–5 ngày' },
  ca: { name: 'Canada', base: 130000, perKg: 310000, eta: '5–7 ngày' },
  eu: { name: 'Châu Âu (EU/UK)', base: 120000, perKg: 270000, eta: '4–6 ngày' },
  jp: { name: 'Nhật & Hàn', base: 90000, perKg: 190000, eta: '2–4 ngày' },
  sg: { name: 'Singapore', base: 80000, perKg: 160000, eta: '2–3 ngày' },
};

/** URL ảnh cờ từ flagcdn.com — key trùng với mã quốc gia ISO 3166-1 alpha-2. */
export function flagUrl(key: RateKey, w: 24 | 40 | 48 | 80 | 96 = 40): string {
  const h = Math.round(w * 0.75);
  return `https://flagcdn.com/${w}x${h}/${key}.png`;
}

// Thứ tự hiển thị cố định cho select & lưới tuyến.
export const RATE_KEYS: RateKey[] = ['us', 'au', 'ca', 'eu', 'jp', 'sg'];

/** est = round((base + perKg * weightKg) / 1000) * 1000 */
export function estimate(key: RateKey, weightKg: number): number {
  const r = RATES[key];
  return Math.round((r.base + r.perKg * weightKg) / 1000) * 1000;
}

/** Định dạng VND: 290000 -> "290.000₫" */
export function fmtVnd(n: number): string {
  return n.toLocaleString('vi-VN') + '₫';
}

/** Giá rút gọn dạng "290k" để hiển thị trên thẻ tuyến. */
export function fmtShortVnd(n: number): string {
  if (n >= 1000) return Math.round(n / 1000).toLocaleString('vi-VN') + 'k';
  return n.toLocaleString('vi-VN') + '₫';
}

// Danh sách tuyến phổ biến (đọc từ RATES, đúng thứ tự RATE_KEYS).
export const ROUTES = RATE_KEYS.map((key) => ({ key, ...RATES[key] }));
