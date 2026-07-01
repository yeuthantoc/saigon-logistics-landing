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

  // Thông tin pháp lý (E-E-A-T signal) — THAY BẰNG DỮ LIỆU THẬT trước khi go-live.
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || 'Công ty TNHH SAIGON LOGISTICS',
  address: process.env.NEXT_PUBLIC_ADDRESS || 'Quận 1, TP. Hồ Chí Minh, Việt Nam',
  taxCode: process.env.NEXT_PUBLIC_TAX_CODE || '0000000000',

  // Đối tác vận chuyển hiển thị ở Footer (trust signal)
  carriers: ['DHL', 'FedEx', 'UPS'] as string[],
} as const;
