# SAIGON LOGISTICS — Kế hoạch 30 ngày lên top SEO / AEO / GEO

> Cập nhật: Tháng 6/2025  
> Mục tiêu: Index toàn bộ 7 URL → top 10 long-tail → featured snippet → AI citation

---

## Phân tích điểm xuất phát

| Yếu tố | Hiện trạng | Mục tiêu 30 ngày |
|---|---|---|
| Domain age | Mới | — (không thể thay đổi) |
| Structured data | FAQPage, Organization, Service | + BreadcrumbList, LocalBusiness, PriceSpec |
| Số URL đã index | ~1 (trang chủ) | 8–10 URL |
| Core Web Vitals | SSG → nhanh | LCP < 2s, INP < 200ms |
| Backlink | 0 | 15–25 chất lượng |

---

## TUẦN 1 (Ngày 1–7) — Kỹ thuật & Foundation

### Mục tiêu: Cho Google crawl & index đúng toàn bộ site

**Ngày 1 — Google Search Console + Analytics**
- [ ] Xác minh GSC bằng meta tag (thêm vào `app/layout.tsx`)
- [ ] Submit `sitemap.xml` lên GSC
- [ ] Kết nối GA4 với GSC để xem search queries
- [ ] Setup Goal Conversion: form lead submit = `generate_lead`

**Ngày 2 — Breadcrumb Schema**

Thêm vào `app/tuyen/[slug]/page.tsx`:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://yourdomain.com" },
    { "@type": "ListItem", "position": 2, "name": "Tuyến đi", "item": "https://yourdomain.com/tuyen" },
    { "@type": "ListItem", "position": 3, "name": "Gửi hàng đi Mỹ", "item": "https://yourdomain.com/tuyen/gui-hang-di-my" }
  ]
}
```

**Ngày 3 — LocalBusiness Schema (trang chủ)**

```json
{
  "@type": "LocalBusiness",
  "name": "SAIGON LOGISTICS",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "VN",
    "addressLocality": "TP. Hồ Chí Minh"
  },
  "priceRange": "$$",
  "openingHours": "Mo-Su 07:00-22:00",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Dịch vụ gửi hàng quốc tế"
  }
}
```

**Ngày 4 — Core Web Vitals audit**
- [ ] Chạy PageSpeed Insights cho trang chủ và 1 trang tuyến
- [ ] Thêm `fetchpriority="high"` vào ảnh cờ đầu tiên (above-the-fold)
- [ ] Đảm bảo không có layout shift (font đã dùng `next/font` → OK)

**Ngày 5 — Canonical & hreflang**
- [ ] Kiểm tra mỗi trang tuyến có `<link rel="canonical">` đúng URL
- [ ] Đảm bảo `lang="vi"` trong `<html>` (đã có trong layout)
- [ ] Không có duplicate content giữa trang chủ và trang tuyến

**Ngày 6 — robots.txt kiểm tra**

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://yourdomain.com/sitemap.xml
```

**Ngày 7 — Request indexing**

Dùng GSC "URL Inspection" → "Request Indexing" cho:
- [ ] `/` — trang chủ
- [ ] `/tuyen/gui-hang-di-my`
- [ ] `/tuyen/gui-hang-di-uc`
- [ ] `/tuyen/gui-hang-di-canada`
- [ ] `/tuyen/gui-hang-di-chau-au`
- [ ] `/tuyen/gui-hang-di-nhat-han`
- [ ] `/tuyen/gui-hang-di-singapore`

---

## TUẦN 2 (Ngày 8–14) — On-Page SEO & AEO

### Mục tiêu: Capture featured snippets và People Also Ask boxes

### Keyword map (1 keyword chính / trang)

| URL | Primary keyword | Intent | Difficulty |
|---|---|---|---|
| `/` | chuyển phát nhanh quốc tế | Transactional | Cao |
| `/tuyen/gui-hang-di-my` | **gửi hàng đi Mỹ** | Transactional | Trung bình |
| `/tuyen/gui-hang-di-uc` | **gửi hàng đi Úc** | Transactional | Thấp |
| `/tuyen/gui-hang-di-canada` | **gửi hàng đi Canada** | Transactional | Thấp |
| `/tuyen/gui-hang-di-chau-au` | **gửi hàng đi châu Âu** | Transactional | Thấp |
| `/tuyen/gui-hang-di-nhat-han` | **gửi hàng đi Nhật** | Transactional | Thấp |
| `/tuyen/gui-hang-di-singapore` | **gửi hàng đi Singapore** | Transactional | Rất thấp |

> **Chiến lược 30 ngày:** Ưu tiên 4 tuyến competition thấp nhất (SG, Úc, Nhật, Canada).  
> Mỹ và EU cần 60–90 ngày do cạnh tranh cao hơn.

**Ngày 8–9 — Long-tail keyword expansion**

Mỗi tuyến cần phủ các variant (ví dụ tuyến Mỹ):

| Variant keyword | Vị trí đặt |
|---|---|
| gửi hàng đi Mỹ mất bao lâu | FAQ (đã có ✓) |
| gửi hàng đi Mỹ bao nhiêu tiền 1kg | RouteHighlight section |
| hàng gì không được gửi đi Mỹ | FAQ (đã có ✓) |
| gửi đồ đi Mỹ | Alt text, heading phụ |
| ship hàng đi Mỹ | Intro paragraph |
| cước phí gửi hàng đi Mỹ 2025 | Meta description |

**Ngày 10 — Title tag tối ưu**

Thêm năm (freshness signal) + số cụ thể (tăng CTR):

```
Cũ:  Gửi Hàng Đi Mỹ (USA) Nhanh & Rẻ | SAIGON LOGISTICS
Mới: Gửi Hàng Đi Mỹ 2025 — Từ 290k/kg, Giao 4–6 Ngày | SAIGON LOGISTICS
```

**Ngày 11 — FAQ mở rộng cho AEO**

Google ưu tiên featured snippet khi answer ngắn + có số liệu. Thêm 2 FAQ về giá vào mỗi tuyến:

```
Q: Gửi 1kg hàng đi Mỹ hết bao nhiêu tiền?
A: Cước phí gửi hàng đi Mỹ từ 290.000đ/kg (chưa gồm phụ phí).
   Hàng 2kg ≈ 700.000đ, hàng 5kg ≈ 1.570.000đ. Báo giá chính xác qua Zalo.

Q: Gửi 1kg hàng đi Singapore hết bao nhiêu tiền?
A: Từ 160.000đ/kg. Hàng 2kg ≈ 400.000đ, hàng 5kg ≈ 880.000đ.
```

> Câu trả lời ≤ 50 từ + số liệu cụ thể = Google ưu tiên cho Position 0.

**Ngày 12 — Internal linking**

Mỗi trang tuyến cần link tới:
- [ ] Trang chủ (qua logo — đổi `href="#top"` thành `href="/"` trên route pages)
- [ ] 2–3 tuyến liên quan (đã có `OtherRoutes` ✓)
- [ ] Dùng anchor text đa dạng: "gửi hàng đi Mỹ", "tuyến USA", "chuyển phát Mỹ"

**Ngày 13 — OG Image động (next/og)**

Tạo `app/tuyen/[slug]/opengraph-image.tsx` để mỗi tuyến có ảnh OG riêng:

```tsx
// app/tuyen/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { ROUTES } from '@/lib/routes'

export default async function Image({ params }) {
  const route = ROUTES.find(r => r.slug === params.slug)
  return new ImageResponse(
    <div style={{ background: '#ef5226', color: 'white', fontSize: 48 }}>
      {route.h1}
    </div>
  )
}
```

**Ngày 14 — Review & đo lường tuần 1+2**
- [ ] GSC: số URL đã index
- [ ] Coverage errors có không?
- [ ] Rich Results Test: FAQPage schema hiển thị đúng?
- [ ] Search "gửi hàng đi Singapore" → trang có xuất hiện chưa?

---

## TUẦN 3 (Ngày 15–21) — Content Authority & GEO

### Mục tiêu: Được AI (ChatGPT Search, Perplexity, Google AI Overview) trích dẫn

**GEO hoạt động thế nào:**

AI Overview (Google), ChatGPT Search, Perplexity ưu tiên source có:
1. Structured data rõ ràng → đã có FAQPage, Organization ✓
2. Thông tin cụ thể, có số liệu, có ngày cập nhật
3. Được nhiều site khác nhắc đến (authority signal)
4. HTTPS, load nhanh, không có misinformation

**Ngày 15–16 — Trang hub `/tuyen`**

Tạo `app/tuyen/page.tsx` — listing 6 tuyến với schema `CollectionPage + ItemList`:

```
URL:   /tuyen
Title: Bảng Giá Gửi Hàng Quốc Tế 2025 | SAIGON LOGISTICS
Desc:  Bảng giá cước 6 tuyến quốc tế: Mỹ, Úc, Canada, EU, Nhật, Singapore.
       Cập nhật tháng 6/2025. Báo giá trong 5 phút qua Zalo.
```

> Lý do: Google cần trang "parent" để hiểu hierarchy. AI thường trích dẫn trang bảng giá tổng hợp có dữ liệu cụ thể.

**Ngày 17 — Price Schema (GEO critical)**

Thêm `PriceSpecification` schema vào mỗi trang tuyến:

```json
{
  "@type": "Service",
  "name": "Gửi hàng đi Mỹ door-to-door",
  "provider": { "@id": "https://yourdomain.com/#organization" },
  "areaServed": "US",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "VND",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "290000",
      "priceCurrency": "VND",
      "unitCode": "KGM"
    }
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "businessDays": { "minValue": 4, "maxValue": 6 }
  }
}
```

**Ngày 18–19 — E-E-A-T signals**

Google và AI đánh giá: Experience, Expertise, Authoritativeness, Trust.

- [ ] Thêm tên công ty đầy đủ, địa chỉ, MST vào Footer
- [ ] Thêm đối tác vận chuyển: DHL, FedEx, UPS (logo + text)
- [ ] Thêm số thống kê với nguồn: "500.000+ đơn đã giao từ 2012"
- [ ] Tạo trang `/chinh-sach-boi-thuong` (trust signal quan trọng)
- [ ] Thêm trang `/ve-chung-toi` với lịch sử công ty

**Ngày 20 — Freshness signals (GEO)**

Perplexity và ChatGPT ưu tiên content có timestamp rõ ràng:

```tsx
// Thêm vào RouteHighlight hoặc Hero
<p className="text-xs text-muted-2">
  <time dateTime="2025-06">Cập nhật: Tháng 6/2025</time>
  · Giá tham khảo, liên hệ để báo giá chính xác
</p>
```

**Ngày 21 — Topical cluster: 3 bài blog hỗ trợ**

Tạo `app/blog/[slug]/page.tsx` với 3 bài đầu:

| URL | Topic | Target keyword |
|---|---|---|
| `/blog/hang-cam-gui-di-my` | Danh sách hàng cấm gửi đi Mỹ | hàng cấm gửi đi nước ngoài |
| `/blog/dong-goi-hang-quoc-te` | Cách đóng gói hàng gửi quốc tế | cách đóng gói hàng gửi đi nước ngoài |
| `/blog/hai-quan-my-quy-dinh-2025` | Quy định hải quan Mỹ 2025 | hải quan Mỹ nhập khẩu |

> Bài blog không bán hàng trực tiếp — chúng build topical authority và link ngược về trang tuyến.

---

## TUẦN 4 (Ngày 22–30) — Off-Page, Backlinks & Đo lường

### Mục tiêu: Domain Authority, 15–25 backlinks, monitor ranking

**Ngày 22 — Google Business Profile (ưu tiên cao nhất)**
- [ ] Tạo profile đầy đủ: tên, địa chỉ, SĐT, website, giờ làm việc
- [ ] Category: "Freight Forwarding Service" + "Shipping and Mailing Service"
- [ ] Đăng 3 Google Posts (mỗi tuyến 1 post với ảnh + giá)
- [ ] Request 5 đánh giá từ khách hàng cũ

> GBP là backlink DA cao nhất có thể làm trong 1 giờ. AI Overview cũng đọc GBP.

**Ngày 23–24 — Citation building**

| Nguồn | Loại | Độ khó |
|---|---|---|
| Google Business Profile | Citation | Rất dễ ✓ (ngày 22) |
| Yelp Vietnam | Citation | Dễ |
| Foursquare | Citation | Dễ |
| Diễn đàn Vietship | Forum | Dễ |
| Cộng đồng du học sinh FB | Social | Dễ |
| VietnamBiz / Cafebiz | PR | Khó |

NAP consistency (Name, Address, Phone) phải giống hệt nhau trên mọi platform.

**Ngày 25 — Wikidata entity (GEO signal mạnh)**

AI thường trích dẫn entities có mặt trên Wikidata:
- [ ] Tạo Wikidata entry cho SAIGON LOGISTICS
- [ ] Liên kết với schema `Organization` trên website qua `sameAs`
- [ ] Đây là signal giúp ChatGPT, Perplexity nhận diện brand là thực

```json
{
  "@type": "Organization",
  "sameAs": [
    "https://www.wikidata.org/wiki/Q...",
    "https://www.google.com/maps?cid=..."
  ]
}
```

**Ngày 26–27 — Backlinks editorial**

| Chiến thuật | Mô tả |
|---|---|
| Guest post | Viết bài cho blog logistics/TMĐT, link về tuyến liên quan |
| Resource page | Tìm trang "dịch vụ gửi hàng quốc tế" đang list các công ty, xin được thêm vào |
| YouTube video | Làm video "Cách gửi hàng đi Mỹ" → link website trong description |
| Partner mention | Xin các đối tác UPS/FedEx local list trên trang của họ |

**Ngày 28–29 — A/B test meta description**

Đo CTR qua GSC. Test 2 phiên bản:

```
A: Dịch vụ gửi hàng đi Mỹ từ Việt Nam — door-to-door 4–6 ngày,
   giá từ 290.000₫/kg, lấy hàng tận nơi, hỗ trợ hải quan trọn gói.

B: Gửi hàng đi Mỹ chỉ 290k/kg ✓ Lấy tận nhà ✓ 4–6 ngày ✓
   Lo hết hải quan — Báo giá 5 phút qua Zalo. Xem bảng giá →
```

Sau 2 tuần, giữ bản có CTR cao hơn.

**Ngày 30 — Review tổng kết**

Checklist đánh giá:

- [ ] GSC: Bao nhiêu URL đã index?
- [ ] GSC: Có impression cho keyword target chưa?
- [ ] Rich Results Test: FAQPage hiển thị đúng?
- [ ] Perplexity: Search "gửi hàng đi Singapore" → có mention SAIGON LOGISTICS?
- [ ] ChatGPT Search: Tương tự
- [ ] GA4: Có lead form submission nào từ organic?
- [ ] PageSpeed: LCP < 2.5s trên mobile?
- [ ] Backlinks: Đã có ít nhất 10 links chất lượng?

---

## Kết quả kỳ vọng sau 30 ngày

| Metric | Trước | Sau 30 ngày |
|---|---|---|
| Google index | 1 trang | 8–10 trang |
| Top 10 keywords | 0 | 3–5 long-tail |
| Featured snippet (PAA) | 0 | 1–3 câu hỏi về giá |
| AI Overview citation | 0 | 1–2 lần xuất hiện |
| Backlinks | 0 | 15–25 |
| Organic leads/tháng | 0 | 5–15 |

> **Tuyến nhanh lên top nhất:** `/tuyen/gui-hang-di-singapore` và `/tuyen/gui-hang-di-uc`  
> Competition thấp, FAQ rõ ràng, schema tốt → dự kiến top 10 sau 3–4 tuần nếu index sớm.

---

## Nếu chỉ có 2 tiếng/ngày — ưu tiên theo thứ tự này

```
Tuần 1:  GSC setup → sitemap submit → request index     (1 giờ tổng)
Tuần 2:  FAQ mở rộng + title tag → Google Business      (2 giờ)
Tuần 3:  Trang /tuyen hub + bài blog đầu tiên           (3 giờ)
Tuần 4:  10 backlinks citation + Wikidata + monitor     (1 giờ/tuần)
```

---

## Phần cần code thêm (backlog)

| Task | File cần tạo/sửa | Ưu tiên |
|---|---|---|
| Trang hub `/tuyen` | `app/tuyen/page.tsx` | Cao |
| Breadcrumb schema | `app/tuyen/[slug]/page.tsx` | Cao |
| Price schema | `app/tuyen/[slug]/page.tsx` | Cao |
| OG image động | `app/tuyen/[slug]/opengraph-image.tsx` | Trung bình |
| Blog route | `app/blog/[slug]/page.tsx` | Trung bình |
| Freshness timestamp | `components/RouteHighlight.tsx` | Thấp |
| Trang `/ve-chung-toi` | `app/ve-chung-toi/page.tsx` | Thấp |
| Trang `/chinh-sach-boi-thuong` | `app/chinh-sach-boi-thuong/page.tsx` | Thấp |
