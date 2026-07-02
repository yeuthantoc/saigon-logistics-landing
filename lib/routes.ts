// =============================================================
// Data 6 tuyến landing page — nguồn sự thật duy nhất.
// Mỗi tuyến có slug riêng, nội dung SEO độc lập.
// =============================================================

import type { RateKey } from './rates';

export interface RouteData {
  slug: string;
  country: string;
  flag: string;
  rateKey: RateKey;
  eta: string;
  priceFrom: string;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  faqs: { q: string; a: string }[];
  tips: string[];
}

export const ROUTES: RouteData[] = [
  {
    slug: 'gui-hang-di-my',
    country: 'Mỹ (USA)',
    flag: '🇺🇸',
    rateKey: 'us',
    eta: '4–6 ngày',
    priceFrom: '290.000₫/kg',
    keyword: 'gửi hàng đi Mỹ',
    title: 'Gửi Hàng Đi Mỹ 2026 — Từ 290k/kg, Giao 4–6 Ngày',
    description:
      'Dịch vụ gửi hàng đi Mỹ từ Việt Nam — door-to-door 4–6 ngày, giá từ 290.000₫/kg, lấy hàng tận nơi tại TP.HCM & Hà Nội, hỗ trợ hải quan trọn gói.',
    h1: 'Gửi Hàng Đi Mỹ — nhanh, rẻ, tận cửa',
    intro:
      'Chuyển phát nhanh từ Việt Nam đi Mỹ (USA) chỉ 4–6 ngày làm việc. SAIGON LOGISTICS lấy hàng tận nhà, đóng gói chuẩn quốc tế, lo trọn thủ tục hải quan Mỹ, giao tận địa chỉ người nhận.',
    faqs: [
      {
        q: 'Gửi 1kg hàng đi Mỹ hết bao nhiêu tiền?',
        a: 'Cước gửi hàng đi Mỹ từ 290.000₫/kg (chưa gồm phụ phí). Hàng 2kg ≈ 700.000₫, hàng 5kg ≈ 1.570.000₫. Báo giá chính xác theo loại hàng trong 5 phút qua Zalo.',
      },
      {
        q: 'Gửi hàng đi Mỹ mất bao nhiêu ngày?',
        a: 'Thông thường 4–6 ngày làm việc qua dịch vụ express door-to-door.',
      },
      {
        q: 'Gửi hàng đi Mỹ cần giấy tờ gì?',
        a: 'Bạn chỉ cần cung cấp tên, địa chỉ người nhận, số điện thoại và mô tả hàng hoá. SAIGON LOGISTICS lo toàn bộ chứng từ hải quan.',
      },
      {
        q: 'Hàng gì không được gửi đi Mỹ?',
        a: 'Hàng cấm theo quy định CBP Mỹ: vũ khí, hàng giả, thực phẩm tươi sống không có giấy phép, pin lithium rời. Sale sẽ tư vấn cụ thể.',
      },
      {
        q: 'Có theo dõi đơn hàng realtime không?',
        a: 'Có. Sau khi gửi bạn nhận mã tracking và tra cứu trực tiếp trên website hoặc qua Zalo.',
      },
    ],
    tips: [
      'Đóng gói chắc chắn, dán nhãn rõ ràng để tránh chậm thông quan tại Mỹ.',
      'Khai báo đúng giá trị hàng hoá — hàng trên 800 USD có thể phát sinh thuế nhập khẩu phía Mỹ.',
      'Gửi thực phẩm khô (trà, cà phê, bánh kẹo) cần khai báo đầy đủ thành phần.',
    ],
  },
  {
    slug: 'gui-hang-di-uc',
    country: 'Úc (Australia)',
    flag: '🇦🇺',
    rateKey: 'au',
    eta: '3–5 ngày',
    priceFrom: '250.000₫/kg',
    keyword: 'gửi hàng đi Úc',
    title: 'Gửi Hàng Đi Úc 2026 — Từ 250k/kg, Giao 3–5 Ngày',
    description:
      'Dịch vụ gửi hàng đi Úc từ Việt Nam — door-to-door 3–5 ngày, giá từ 250.000₫/kg, lấy hàng tận nơi tại TP.HCM & Hà Nội, hỗ trợ hải quan trọn gói.',
    h1: 'Gửi Hàng Đi Úc — đến tay trong 3–5 ngày',
    intro:
      'Chuyển phát nhanh từ Việt Nam sang Úc (Australia) chỉ 3–5 ngày. Úc kiểm tra hải quan nghiêm ngặt — SAIGON LOGISTICS khai báo đúng, đóng gói chuẩn, hạn chế tối đa rủi ro bị giữ hàng.',
    faqs: [
      {
        q: 'Gửi 1kg hàng đi Úc hết bao nhiêu tiền?',
        a: 'Cước gửi hàng đi Úc từ 250.000₫/kg (chưa gồm phụ phí). Hàng 2kg ≈ 610.000₫, hàng 5kg ≈ 1.360.000₫. Báo giá chính xác theo loại hàng trong 5 phút qua Zalo.',
      },
      {
        q: 'Gửi hàng đi Úc mất bao lâu?',
        a: '3–5 ngày làm việc qua dịch vụ express.',
      },
      {
        q: 'Hải quan Úc có khó không?',
        a: 'Úc kiểm soát sinh phẩm và thực phẩm rất nghiêm. SAIGON LOGISTICS tư vấn danh sách hàng được phép và chuẩn bị chứng từ đúng chuẩn DAFF.',
      },
      {
        q: 'Gửi thực phẩm đi Úc được không?',
        a: 'Một số thực phẩm khô đóng gói công nghiệp được phép. Thực phẩm tươi sống, hạt giống, sản phẩm gỗ tự nhiên bị cấm. Hỏi sale để xác nhận.',
      },
      {
        q: 'Cân nặng tối đa một kiện là bao nhiêu?',
        a: 'Tối đa 70kg/kiện. Hàng nặng hơn cần tách hoặc báo trước để sắp xếp xe tải.',
      },
    ],
    tips: [
      'Không gửi mật ong, sữa tươi, trái cây tươi — bị tịch thu và phạt nặng tại Úc.',
      'Khai báo đầy đủ thành phần thực phẩm bằng tiếng Anh.',
      'Hàng có giá trị trên 1.000 AUD phát sinh thuế GST phía Úc.',
    ],
  },
  {
    slug: 'gui-hang-di-canada',
    country: 'Canada',
    flag: '🇨🇦',
    rateKey: 'ca',
    eta: '5–7 ngày',
    priceFrom: '310.000₫/kg',
    keyword: 'gửi hàng đi Canada',
    title: 'Gửi Hàng Đi Canada 2026 — Từ 310k/kg, Giao 5–7 Ngày',
    description:
      'Dịch vụ gửi hàng đi Canada từ Việt Nam — door-to-door 5–7 ngày, giá từ 310.000₫/kg, lấy hàng tận nơi, hỗ trợ hải quan trọn gói.',
    h1: 'Gửi Hàng Đi Canada — door-to-door 5–7 ngày',
    intro:
      'Chuyển phát nhanh từ Việt Nam sang Canada 5–7 ngày. SAIGON LOGISTICS phủ toàn bộ các tỉnh Canada (Ontario, BC, Quebec, Alberta...), lo thủ tục CBSA, giao tận cửa nhà.',
    faqs: [
      {
        q: 'Gửi 1kg hàng đi Canada hết bao nhiêu tiền?',
        a: 'Cước gửi hàng đi Canada từ 310.000₫/kg (chưa gồm phụ phí). Hàng 2kg ≈ 750.000₫, hàng 5kg ≈ 1.680.000₫. Báo giá chính xác theo loại hàng trong 5 phút qua Zalo.',
      },
      {
        q: 'Gửi hàng đi Canada mất bao nhiêu ngày?',
        a: '5–7 ngày làm việc qua dịch vụ express.',
      },
      {
        q: 'Thuế nhập khẩu Canada tính thế nào?',
        a: 'Hàng dưới 20 CAD miễn thuế. Trên ngưỡng này CBSA thu thuế theo biểu tariff. Sale sẽ tư vấn trước khi gửi.',
      },
      {
        q: 'Gửi được đến vùng nông thôn Canada không?',
        a: 'Có. Chúng tôi giao toàn bộ postal code Canada qua đối tác UPS/FedEx/Purolator.',
      },
      {
        q: 'Có thể gửi hàng thương mại không?',
        a: 'Có. Với đơn thương mại cần thêm commercial invoice và packing list. Sale hỗ trợ chuẩn bị.',
      },
    ],
    tips: [
      'Ghi rõ HS code nếu gửi hàng thương mại để tránh chậm thông quan.',
      'Hàng điện tử cần có serial number và invoice chứng minh nguồn gốc.',
      'Gửi thực phẩm chế biến sẵn cần nhãn tiếng Anh/Pháp đầy đủ thành phần.',
    ],
  },
  {
    slug: 'gui-hang-di-chau-au',
    country: 'Châu Âu (EU / UK)',
    flag: '🇪🇺',
    rateKey: 'eu',
    eta: '4–6 ngày',
    priceFrom: '270.000₫/kg',
    keyword: 'gửi hàng đi châu Âu',
    title: 'Gửi Hàng Đi Châu Âu 2026 — Từ 270k/kg, Giao 4–6 Ngày',
    description:
      'Dịch vụ gửi hàng đi châu Âu từ Việt Nam — door-to-door 4–6 ngày, giá từ 270.000₫/kg, phủ 30+ quốc gia EU và UK.',
    h1: 'Gửi Hàng Đi Châu Âu — 30+ quốc gia, 4–6 ngày',
    intro:
      'Chuyển phát nhanh từ Việt Nam sang EU và UK: Đức, Pháp, Anh, Hà Lan, Ý, Tây Ban Nha... chỉ 4–6 ngày. Một lần gửi, SAIGON LOGISTICS thông quan EU và giao tận địa chỉ.',
    faqs: [
      {
        q: 'Gửi 1kg hàng đi châu Âu hết bao nhiêu tiền?',
        a: 'Cước gửi hàng đi châu Âu (EU/UK) từ 270.000₫/kg (chưa gồm phụ phí). Hàng 2kg ≈ 660.000₫, hàng 5kg ≈ 1.470.000₫. Báo giá chính xác theo loại hàng trong 5 phút qua Zalo.',
      },
      {
        q: 'Gửi hàng đi Đức / Anh / Pháp mất bao lâu?',
        a: '4–6 ngày làm việc, tuỳ quốc gia cụ thể.',
      },
      {
        q: 'Brexit ảnh hưởng gì đến gửi hàng đi Anh?',
        a: 'Từ 2021 UK tách khỏi EU, cần khai báo hải quan riêng. SAIGON LOGISTICS xử lý UK như một tuyến độc lập, không phát sinh thêm thủ tục với bạn.',
      },
      {
        q: 'Quy định VAT EU là gì?',
        a: 'Hàng trên 150 EUR nhập khẩu vào EU phát sinh VAT. Chúng tôi tư vấn cách khai báo hợp lý để tránh rủi ro.',
      },
      {
        q: 'Gửi được những nước nào ở châu Âu?',
        a: 'Toàn bộ 27 nước EU + UK, Na Uy, Thuỵ Sĩ, Iceland.',
      },
    ],
    tips: [
      'Khai báo đúng giá trị hàng (EUR) — hàng trên 150 EUR phát sinh import VAT phía EU.',
      'Nhãn hàng cần tiếng Anh hoặc ngôn ngữ nước nhận để thông quan nhanh.',
      'Gửi thực phẩm sang EU cần certificate xuất xứ với một số mặt hàng (trà, cà phê, gia vị).',
    ],
  },
  {
    slug: 'gui-hang-di-nhat-han',
    country: 'Nhật Bản & Hàn Quốc',
    flag: '🇯🇵',
    rateKey: 'jp',
    eta: '2–4 ngày',
    priceFrom: '190.000₫/kg',
    keyword: 'gửi hàng đi Nhật Hàn',
    title: 'Gửi Hàng Đi Nhật & Hàn 2026 — Từ 190k/kg, Giao 2–4 Ngày',
    description:
      'Dịch vụ gửi hàng đi Nhật, Hàn từ Việt Nam — door-to-door 2–4 ngày, giá từ 190.000₫/kg, lấy hàng tận nơi.',
    h1: 'Gửi Hàng Đi Nhật & Hàn — chỉ 2–4 ngày',
    intro:
      'Tuyến Nhật Bản và Hàn Quốc là tuyến nhanh nhất của SAIGON LOGISTICS — chỉ 2–4 ngày door-to-door. Phù hợp gửi quà, thực phẩm, mỹ phẩm, hàng thương mại cho cộng đồng người Việt đang học và làm việc tại Nhật, Hàn.',
    faqs: [
      {
        q: 'Gửi 1kg hàng đi Nhật hết bao nhiêu tiền?',
        a: 'Cước gửi hàng đi Nhật, Hàn từ 190.000₫/kg (chưa gồm phụ phí). Hàng 2kg ≈ 470.000₫, hàng 5kg ≈ 1.040.000₫. Báo giá chính xác theo loại hàng trong 5 phút qua Zalo.',
      },
      {
        q: 'Gửi hàng đi Nhật mất bao lâu?',
        a: '2–3 ngày làm việc qua dịch vụ express.',
      },
      {
        q: 'Gửi hàng đi Hàn mất bao lâu?',
        a: '2–4 ngày làm việc.',
      },
      {
        q: 'Gửi thực phẩm Việt đi Nhật được không?',
        a: 'Thực phẩm đóng gói công nghiệp có nhãn tiếng Nhật/Anh được phép. Hải sản tươi, thịt tươi bị cấm. Sale tư vấn danh sách cụ thể.',
      },
      {
        q: 'Cộng đồng du học sinh có ưu đãi không?',
        a: 'Có gói giá ưu đãi cho du học sinh gửi định kỳ. Liên hệ sale để được báo giá theo sản lượng.',
      },
    ],
    tips: [
      'Nhật yêu cầu nhãn thực phẩm tiếng Nhật — hỏi sale danh sách mặt hàng cần nhãn phụ.',
      'Hàn Quốc kiểm tra nghiêm mỹ phẩm — cần invoice và certificate of analysis với một số sản phẩm.',
      'Gửi quà dưới 10 nghìn JPY/50 USD thường miễn thuế nhập khẩu.',
    ],
  },
  {
    slug: 'gui-hang-di-singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    rateKey: 'sg',
    eta: '2–3 ngày',
    priceFrom: '160.000₫/kg',
    keyword: 'gửi hàng đi Singapore',
    title: 'Gửi Hàng Đi Singapore 2026 — Từ 160k/kg, Giao 2–3 Ngày',
    description:
      'Dịch vụ gửi hàng đi Singapore từ Việt Nam — door-to-door 2–3 ngày, giá từ 160.000₫/kg, tuyến nhanh nhất Đông Nam Á.',
    h1: 'Gửi Hàng Đi Singapore — tuyến nhanh nhất, 2–3 ngày',
    intro:
      'Singapore là tuyến gần và nhanh nhất — chỉ 2–3 ngày, giá cạnh tranh từ 160.000₫/kg. SAIGON LOGISTICS lấy hàng tận nơi tại TP.HCM và Hà Nội, thông quan Singapore nhanh gọn, giao tận địa chỉ.',
    faqs: [
      {
        q: 'Gửi 1kg hàng đi Singapore hết bao nhiêu tiền?',
        a: 'Cước gửi hàng đi Singapore từ 160.000₫/kg (chưa gồm phụ phí). Hàng 2kg ≈ 400.000₫, hàng 5kg ≈ 880.000₫. Báo giá chính xác theo loại hàng trong 5 phút qua Zalo.',
      },
      {
        q: 'Gửi hàng đi Singapore mất bao lâu?',
        a: '2–3 ngày làm việc qua dịch vụ express.',
      },
      {
        q: 'Singapore có thuế nhập khẩu không?',
        a: 'Từ 2024 ngưỡng miễn GST bị bãi bỏ — mọi hàng nhập khẩu đều tính GST 9%. Sale tư vấn cụ thể.',
      },
      {
        q: 'Gửi chất lỏng đi Singapore được không?',
        a: 'Được với điều kiện đóng gói đúng quy cách, khai báo rõ thành phần. Chất lỏng dễ cháy bị cấm.',
      },
      {
        q: 'Gửi hàng thương mại TMĐT đi Singapore?',
        a: 'Có. Rất phù hợp cho seller Shopee/Lazada Singapore. Sale hỗ trợ bulk shipment theo tuần.',
      },
    ],
    tips: [
      'Singapore kiểm tra chặt điện tử — cần invoice rõ model và serial number.',
      'Không gửi chewing gum — bị cấm tại Singapore.',
      'Hàng có battery lithium cần khai báo IATA section II để không bị từ chối vận chuyển.',
    ],
  },
];

/** Tra slug theo rateKey — dùng trong RouteGrid để tạo link. */
export const SLUG_BY_KEY = Object.fromEntries(
  ROUTES.map((r) => [r.rateKey, r.slug]),
) as Record<string, string>;
