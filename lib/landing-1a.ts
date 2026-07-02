// =============================================================
// Landing option 1a — "Sáng & thân thiện"
// (docs/design_handoff_landing_1a/README.md)
// Toàn bộ copy, số liệu và class token của landing 1a nằm ở đây;
// component trong components/landing-1a/ chỉ trình bày.
// =============================================================

import type { RateKey } from './rates';

// Hotline theo handoff (số thật của client) — tách khỏi SITE.hotline
// để không ảnh hưởng site hiện tại khi 2 design chạy song song.
export const LP = {
  hotline: '0911 326 989',
  hotlineTel: '0911326989',
  brand: 'SAIGON LOGISTICS',
  tagline: 'PRESTIGE · QUALITY · SUCCESS',
  logo: '/landing-1a/logo.png',
} as const;

// --- Điều hướng (smooth-scroll tới id section) ---
export const LP_NAV = [
  { label: 'Dịch vụ', href: '#dich-vu' },
  { label: 'Bảng giá', href: '#bang-gia' },
  { label: 'Tra cứu đơn', href: '#tra-cuu' },
  { label: 'Liên hệ', href: '#lien-he' },
] as const;

// --- Stats band ---
export const LP_STATS = [
  { value: '12+', label: 'năm kinh nghiệm', highlight: false },
  { value: '50.000+', label: 'đơn hàng mỗi năm', highlight: false },
  { value: '25+', label: 'quốc gia phủ tuyến', highlight: false },
  { value: '98%', label: 'giao đúng hẹn', highlight: true },
] as const;

// --- Dịch vụ (card xen kẽ xanh / cam) ---
export interface LpService {
  emoji: string;
  title: string;
  body: string;
  tone: 'blue' | 'orange';
}

export const LP_SERVICES: LpService[] = [
  {
    emoji: '🌏',
    title: 'Vận tải quốc tế',
    body: 'Đường bay & đường biển đi Mỹ, Úc, EU, Á — nhận hàng tận nơi tại TP.HCM.',
    tone: 'blue',
  },
  {
    emoji: '⚡',
    title: 'Express hỏa tốc',
    body: 'Chuyên tuyến express 3–5 ngày, ưu tiên bay thẳng, theo dõi realtime.',
    tone: 'orange',
  },
  {
    emoji: '🛃',
    title: 'Giao nhanh bao thuế',
    body: 'Trọn gói thuế & thủ tục hải quan — giá chốt một lần, không phát sinh.',
    tone: 'blue',
  },
  {
    emoji: '📦',
    title: 'DDP tận cửa',
    body: 'Delivered Duty Paid — người nhận chỉ việc mở cửa nhận hàng.',
    tone: 'orange',
  },
];

// --- Bảng giá ---
// ⚠️ GIÁ PLACEHOLDER theo handoff — xác nhận giá thật trước khi go-live.
// Cờ dùng flagcdn (flagUrl trong lib/rates.ts) thay cho emoji của reference:
// emoji cờ không render trên Windows (chỉ hiện chữ "US"/"AU"/"EU").
export interface LpPrice {
  flagKey: RateKey;
  name: string;
  price: string;
  checklist: string[];
  cta: string;
  popular: boolean;
}

export const LP_PRICING: LpPrice[] = [
  {
    flagKey: 'us',
    name: 'Đi Mỹ',
    price: '6,9$',
    checklist: ['3–5 ngày làm việc', 'Bao thuế trọn gói', 'Bồi thường 100% giá trị khai'],
    cta: 'Báo giá tuyến Mỹ',
    popular: false,
  },
  {
    flagKey: 'au',
    name: 'Đi Úc',
    price: '5,5$',
    checklist: ['3–4 ngày làm việc', 'Bao thuế trọn gói', 'Nhận cả thực phẩm khô'],
    cta: 'Báo giá tuyến Úc',
    popular: true,
  },
  {
    flagKey: 'eu',
    name: 'Đi Châu Âu',
    price: '7,5$',
    checklist: ['4–6 ngày làm việc', 'Bao thuế trọn gói', 'Phủ 27 nước EU + UK'],
    cta: 'Báo giá tuyến EU',
    popular: false,
  },
];

// --- Đối tác (placeholder — thay bằng logo khách hàng thật) ---
export const LP_PARTNERS = ['DHL', 'FEDEX', 'UPS'] as const;

// --- Testimonials (placeholder theo handoff — thay bằng review thật) ---
export interface LpTestimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
  tone: 'blue' | 'orange';
}

export const LP_TESTIMONIALS: LpTestimonial[] = [
  {
    quote: '“Gửi hàng cho con du học ở Cali, 4 ngày là tới, thuế lo hết. Từ giờ chỉ gửi ở đây.”',
    name: 'Cô Hạnh',
    role: 'Khách cá nhân, Q.7',
    initial: 'H',
    tone: 'blue',
  },
  {
    quote: '“Shop mình ship 200+ đơn/tháng đi Úc. Giá DDP chốt một lần nên báo giá khách cực dễ.”',
    name: 'Anh Tuấn',
    role: 'Chủ shop e-commerce',
    initial: 'T',
    tone: 'orange',
  },
  {
    quote: '“Hàng mẫu đi EU gấp cho hội chợ, team hỗ trợ giấy tờ trong 1 buổi sáng. Rất chuyên nghiệp.”',
    name: 'Chị Lan',
    role: 'Giám đốc SME xuất khẩu',
    initial: 'L',
    tone: 'blue',
  },
];

// --- FAQ ---
export const LP_FAQS = [
  {
    q: 'Bao thuế DDP nghĩa là gì?',
    a: 'Giá bạn trả đã bao gồm cước vận chuyển, thuế nhập khẩu và mọi thủ tục hải quan. Người nhận không phải đóng thêm bất kỳ khoản nào.',
  },
  {
    q: 'Thời gian giao hàng bao lâu?',
    a: 'Tuyến express: Mỹ 3–5 ngày, Úc 3–4 ngày, EU 4–6 ngày làm việc kể từ khi hàng xuất kho TP.HCM.',
  },
  {
    q: 'Những mặt hàng nào không nhận gửi?',
    a: 'Hàng cấm theo quy định hàng không & nước nhập: chất dễ cháy nổ, pin rời số lượng lớn, tiền mặt… Gọi hotline để được tư vấn từng mặt hàng cụ thể.',
  },
  {
    q: 'Theo dõi đơn hàng bằng cách nào?',
    a: 'Mỗi đơn có mã vận đơn riêng — tra cứu ngay trên website hoặc nhận cập nhật tự động qua Zalo.',
  },
] as const;

// =============================================================
// Class tokens — pill button của landing 1a.
// Hover theo handoff: đậm hơn ~8% + nhấc lên 1px, transition 150ms.
// Viết literal đầy đủ để Tailwind không purge nhầm.
// =============================================================

export const LP_BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold transition duration-150 ease-out hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-blue focus-visible:ring-offset-2';

export type LpBtnVariant = 'primary' | 'ghost' | 'orange';

const LP_BTN_VARIANT: Record<LpBtnVariant, string> = {
  // #2b66c5 / #d55c1d = màu gốc đậm hơn ~8%.
  // Shadow chỉ có ở nút primary trong hero → truyền 'shadow-lp-btn' qua extra.
  primary: 'bg-lp-blue text-white hover:bg-[#2b66c5]',
  ghost: 'bg-white text-lp-blue border-2 border-[#cdddf5] hover:bg-lp-blue-soft',
  orange: 'bg-lp-orange text-white hover:bg-[#d55c1d]',
};

export function lpBtn(variant: LpBtnVariant, extra?: string): string {
  return [LP_BTN_BASE, LP_BTN_VARIANT[variant], extra].filter(Boolean).join(' ');
}

// Input của form liên hệ + tracking (viền 1.5px, bo 10px).
export const LP_INPUT =
  'w-full rounded-[10px] border-[1.5px] border-lp-line-3 bg-white px-4 py-[13px] text-sm text-lp-navy placeholder:text-lp-placeholder focus:border-lp-blue focus:outline-none focus:ring-2 focus:ring-lp-blue/25';
