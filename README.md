# SAIGON LOGISTICS — Landing page lead-magnet

Trang phễu (lead-magnet) cho dịch vụ **chuyển phát nhanh quốc tế SAIGON LOGISTICS** — tối ưu để thu **lead (SĐT / Zalo)** cho đội sale gọi lại chào giá cước.

Tập trung vào: tốc độ tải nhanh, SEO tốt cho từ khoá *"gửi hàng đi Mỹ"*, *"gửi hàng đi nước ngoài"*, CTA rõ ràng và form lead nổi bật.

> Phong cách thiết kế: **sticker / neo-brutalist** — viền đậm `border-2`, bóng đổ cứng (không blur), màu coral thương hiệu.

---

## ✨ Tính năng

- **Widget ước tính cước nhanh** (client, có state): chọn quốc gia + kéo cân nặng → ra giá ước tính & thời gian dự kiến.
- **Form thu lead** dạng modal mở từ mọi CTA, **validate số điện thoại Việt Nam**, có trạng thái thành công + nút mở Zalo.
- **API `/api/lead`** linh hoạt: đẩy lead qua **Google Sheet webhook / Resend email / Telegram bot** (chọn 1 bằng env), kèm **honeypot + rate-limit** chống spam.
- **SEO chuẩn**: metadata đầy đủ, JSON-LD `Organization` + `Service`, `sitemap.xml`, `robots.txt`, ảnh Open Graph sinh động (`next/og`).
- **Tracking**: GA4 + Meta Pixel qua env; bắn `generate_lead` khi submit, `contact` khi bấm Zalo/hotline.
- **Responsive** mobile-first (375px → 1280px), không phụ thuộc UI library nặng — tự viết bằng TailwindCSS.

## 🧱 Tech stack

| | |
|---|---|
| Framework | **Next.js 15** (App Router, TypeScript) |
| Styling | **TailwindCSS v3** (design token trong `tailwind.config.ts`) |
| Fonts | **Bricolage Grotesque** (heading) + **Be Vietnam Pro** (body) qua `next/font` |
| Deploy | **Vercel** |

---

## 🚀 Chạy dự án

Yêu cầu Node.js ≥ 18.18.

```bash
npm install        # cài dependencies
npm run dev        # chạy dev tại http://localhost:3000
npm run build      # build production
npm run start      # chạy bản production sau khi build
```

## ⚙️ Biến môi trường

Copy `.env.example` thành `.env.local` rồi điền. **Tất cả đều tuỳ chọn** — trang vẫn chạy được khi để trống (lead sẽ được log ra console).

| Biến | Mô tả |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 Measurement ID (vd `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel ID |
| `NEXT_PUBLIC_HOTLINE` | Hotline hiển thị (vd `1900 6886`) |
| `NEXT_PUBLIC_ZALO_PHONE` | Số Zalo (dùng cho link `zalo.me/...`) |
| `NEXT_PUBLIC_SITE_URL` | URL gốc (dùng cho metadata, sitemap, OG) |
| **Nhận lead — chọn 1 kênh:** | |
| `LEAD_WEBHOOK_URL` | Webhook nhận JSON (vd Google Apps Script Web App ghi vào Google Sheet) |
| `RESEND_API_KEY` + `LEAD_EMAIL_TO` / `LEAD_EMAIL_FROM` | Gửi lead qua email bằng [Resend](https://resend.com) |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | Bắn lead vào Telegram bot |

> Thứ tự ưu tiên trong `/api/lead`: **Webhook → Resend → Telegram → log console**. Chỉ cần cấu hình một kênh.

### Cấu hình nhanh Google Sheet (khuyến nghị, miễn phí)

1. Tạo Google Sheet → `Extensions ▸ Apps Script`.
2. Dán script `doPost(e)` đọc `JSON.parse(e.postData.contents)` và `appendRow(...)`.
3. `Deploy ▸ New deployment ▸ Web app`, quyền *Anyone* → copy URL.
4. Gán URL đó vào `LEAD_WEBHOOK_URL`.

---

## 🔧 Thông tin cần thay (cho dữ liệu thật)

| Cần đổi | Ở đâu |
|---|---|
| Hotline, số/link Zalo, URL, tên, tagline | [`lib/site.ts`](lib/site.ts) hoặc env `NEXT_PUBLIC_*` |
| **Bảng giá cước** (base / perKg / ETA) | [`lib/rates.ts`](lib/rates.ts) |
| Nội dung tĩnh (thống kê, dịch vụ, quy trình, menu) | [`lib/content.ts`](lib/content.ts) |
| Logo | Hiện là ô chữ “S” coral trong [`components/Header.tsx`](components/Header.tsx) & `Footer.tsx` |

> Giá cước trong `lib/rates.ts` là **số mẫu** — chỉnh lại theo bảng giá thật trước khi go-live.

---

## 📁 Cấu trúc thư mục

```
app/
  layout.tsx            # fonts, metadata, GA4 + Meta Pixel, JSON-LD
  page.tsx              # ghép các section
  globals.css           # Tailwind + base style
  api/lead/route.ts     # nhận lead (validate, honeypot, rate-limit, đẩy kênh)
  sitemap.ts            # /sitemap.xml
  robots.ts             # /robots.txt
  opengraph-image.tsx   # ảnh OG sinh tự động
components/
  Header.tsx  Hero.tsx  RateEstimator.tsx  TrustStrip.tsx
  RouteGrid.tsx  Audience.tsx  ProcessSteps.tsx  CtaBand.tsx
  Footer.tsx  LeadForm.tsx  LeadButton.tsx  ContactLink.tsx
lib/
  rates.ts              # RATES + tính cước + format VND
  site.ts               # thông tin doanh nghiệp
  content.ts            # dữ liệu section
  analytics.ts          # track() + event bus mở form
  validation.ts         # validate SĐT Việt Nam
  ui.ts                 # class token design system
tailwind.config.ts      # màu + fontFamily + bóng cứng
```

---

## ▲ Deploy lên Vercel

1. Push repo lên GitHub.
2. Vào [vercel.com](https://vercel.com) → **Add New ▸ Project** → import repo này.
3. Framework preset tự nhận **Next.js** — giữ nguyên build command `next build`.
4. Thêm Environment Variables ở mục **Settings ▸ Environment Variables** (xem bảng trên).
5. **Deploy**. Sau khi có domain, cập nhật `NEXT_PUBLIC_SITE_URL` để metadata/sitemap dùng đúng URL.

```bash
# hoặc deploy bằng CLI
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

---

## 📄 License

Sử dụng nội bộ cho SAIGON LOGISTICS. Thay nội dung/giá/thông tin liên hệ trước khi phát hành công khai.
