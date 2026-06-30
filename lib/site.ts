// =============================================================
// Thông tin doanh nghiệp — THAY ĐỔI Ở ĐÂY.
// Giá trị mặc định dùng được ngay; có thể override bằng env NEXT_PUBLIC_*.
// =============================================================

const hotline = process.env.NEXT_PUBLIC_HOTLINE || '1900 6886';
const zaloPhone = process.env.NEXT_PUBLIC_ZALO_PHONE || '0901234567';

export const SITE = {
  name: 'SAIGON LOGISTICS',
  tagline: 'Gửi trọn niềm tin đi khắp thế giới',

  // Hotline hiển thị + dạng dùng cho href="tel:"
  hotline,
  hotlineTel: hotline.replace(/[^\d+]/g, ''),

  // Zalo
  zaloPhone,
  zaloLink: `https://zalo.me/${zaloPhone}`,

  // URL gốc (dùng cho metadata, sitemap, OG)
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://saigon-logistics.vercel.app',

  email: 'sale@saigon-logistics.vn',
} as const;
