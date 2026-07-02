# Handoff: Saigon Logistics Landing Page (Option 1a — "Sáng & thân thiện")

## Overview
Marketing landing page for **Saigon Logistics** — international express shipping from Vietnam (vận tải quốc tế, express, giao nhanh bao thuế, DDP). Target audience: individual senders, e-commerce shops, SMEs. Language: Vietnamese. Tone: friendly, playful, fast ("tốc độ").

## About the Design Files
`design-reference-1a.html` is a **design reference created in HTML with inline styles** — a prototype showing intended look and behavior, **not production code to copy directly**. Your task is to **recreate this design in the existing Next.js + Tailwind CSS codebase**, following its established patterns (App Router pages/components, Tailwind utility classes, `next/image`, `next/font`). Open the HTML file in a browser to see the target result; every measurement and color below matches it.

## Fidelity
**High-fidelity.** Recreate pixel-perfectly: exact colors, spacing, radii, and copy as specified. Desktop layout is final (1180px max content width); responsive/mobile behavior is described under "Responsive" and is left to standard Tailwind breakpoints.

## Tech notes for this codebase (Next.js + Tailwind + Cloudflare)
- Font: **Be Vietnam Pro** (weights 400–900) via `next/font/google` — supports Vietnamese subset (`subsets: ['vietnamese', 'latin']`).
- Add design tokens to `tailwind.config` (see Design Tokens) rather than hardcoding hex values in every class.
- Logo: `logo.png` (included). Use `next/image`.
- Phone CTA: `<a href="tel:0911326989">`.
- FAQ: native `<details>/<summary>` is fine, or the codebase's accordion component if one exists.
- Tracking input + contact form are **static UI in the reference** — wire them to real handlers as the product requires.
- Deployment on Cloudflare Pages/Workers is unaffected — this is a static marketing page; no server components needed beyond the default.

## Design Tokens
Colors:
- `navy` #10233F — headings, dark CTA panel
- `navy-deep` #0B1A30 — footer background
- `primary` #2F6FD6 — primary blue (buttons, stats band, prices)
- `primary-tint` #EEF4FD — light blue chip/button tint
- `blue-50` #F4F8FE — section & card background
- `orange` #E8641F — accent (badges, tra cứu button, hotline CTA)
- `orange-tint` #FDEEE4 — orange card background
- `gold` #F2A51A — star ratings; `gold-light` #FFD28A — highlight stat
- Text: body #4A5B74 / #5A6C86, muted #7A8BA3, placeholder #8EA1BC
- Borders: #E8EDF5, #E2EAF6, #DDE7F4

Typography (Be Vietnam Pro):
- H1 52px/1.12, weight 800
- H2 34px, weight 800
- Card title 17px, weight 700
- Body 17.5px hero / 14–15.5px elsewhere, line-height 1.55–1.65
- Overline labels 13.5px, weight 700, letter-spacing .12em, color orange

Spacing & shape:
- Section padding: 64px vertical, 48px horizontal; content max-width 1180px
- Radii: cards 18–20px, panels 24px, inputs 10px, buttons/pills 999px (fully rounded)
- Shadows: primary button `0 8px 20px rgba(47,111,214,.3)`; floating hero chips `0 10px 26px rgba(16,35,63,.14)`; popular pricing card `0 16px 36px rgba(47,111,214,.32)`

## Screens / Sections (top → bottom)

### 1. Navbar
White, bottom border #E8EDF5, padding 16px 48px, flex space-between.
- Left: logo image 52×52 rounded-[10px] + wordmark "SAIGON LOGISTICS" (17px/800, navy) with tagline "PRESTIGE · QUALITY · SUCCESS" (10.5px/600, orange, tracking .14em).
- Right: links "Dịch vụ · Bảng giá · Tra cứu đơn · Liên hệ" (14.5px/600, #31435E, gap 28px) + pill button `☎ 0911 326 989` (bg primary, white, 11px 22px).

### 2. Hero
2-col grid (1.05fr / .95fr), gap 48px, padding 64px 48px 56px, background vertical gradient #F4F8FE → #FFF.
- Badge pill: "🚀 Chuyên tuyến Express quốc tế" (bg orange-tint, orange text, 13px/700).
- H1: "Gửi hàng đi quốc tế nhanh như **chớp** (blue), thuế lo **trọn gói** (orange)".
- Sub: "Vận chuyển express đi Mỹ, Úc, Châu Âu & toàn cầu. Giao nhanh bao thuế DDP — người nhận không phải trả thêm bất kỳ chi phí nào." (max-w 480px)
- CTAs: primary pill "Nhận báo giá ngay" (bg primary + shadow) and secondary pill "Xem bảng giá" (white, 2px border #CDDDF5, blue text).
- Tracking bar: pill container (1.5px border #DDE7F4, subtle shadow) with placeholder "Nhập mã vận đơn của bạn…" + orange pill button "Tra cứu 🔍".
- Right: illustration placeholder 380px tall, rounded-3xl — **replace with a real playful illustration (plane + parcels)**; two floating white chips: "✈️ SGN → LAX / Chỉ 3–5 ngày" (top-left) and "✅ Bao thuế DDP / Người nhận 0 đồng" (bottom-right), absolutely positioned, overhanging the image edges.

### 3. Stats band
Full-width bg primary, padding 34px 48px, 4-col grid, centered.
Values 36px/800 white (last one gold-light): `12+ năm kinh nghiệm · 50.000+ đơn hàng mỗi năm · 25+ quốc gia phủ tuyến · 98% giao đúng hẹn`. Labels 13.5px #C9DCF8.

### 4. Services ("DỊCH VỤ / Bạn cần gửi gì, chúng tôi lo trọn")
White bg. Centered orange overline + H2. 4-col grid, gap 20px. Cards: rounded-[18px], padding 26px 22px, alternating bg blue-50 / orange-tint; icon tile 52×52 rounded-[14px] (bg primary or orange) with emoji; title 17px/700; body 13.5px.
Cards: 🌏 Vận tải quốc tế · ⚡ Express hỏa tốc · 🛃 Giao nhanh bao thuế · 📦 DDP tận cửa (copy in reference file).

### 5. Pricing ("BẢNG GIÁ / Giá tham khảo tuyến express")
Bg blue-50. 3 cards, gap 22px, equal height.
- 🇺🇸 Đi Mỹ — **6,9$**/kg từ — 3–5 ngày, bao thuế, bồi thường 100%
- 🇦🇺 Đi Úc — **5,5$**/kg từ — bg primary (inverted card), floating badge "PHỔ BIẾN NHẤT" (orange pill, absolutely positioned top-center), price in gold-light, big blue shadow
- 🇪🇺 Đi Châu Âu — **7,5$**/kg từ — 4–6 ngày, 27 nước EU + UK
Each card: flag emoji 30px, name 20px/800, price 34px/800 blue, checklist 13.5px, bottom pill CTA (light cards: bg primary-tint blue text; popular card: white bg blue text).
⚠️ **Prices are placeholders** — confirm real rates before shipping.

### 6. Partners strip
White, top border. Centered label "ĐỐI TÁC VẬN CHUYỂN & KHÁCH HÀNG TIÊU BIỂU" (13px/600 tracking .1em #8EA1BC). Row of chips (bg blue-50, rounded-[10px]): DHL / FEDEX / UPS as text + 2 placeholder chips — **replace with real client logos**.

### 7. Testimonials ("Khách hàng nói gì? 💬")
White bg, 3 cards (bg blue-50, rounded-[18px], padding 26px): gold stars ★★★★★, quote 14.5px, footer with 42px circle avatar (initial letter, bg blue/orange alternating) + name 14px/700 + role 12.5px muted. Quotes/names in reference file (Cô Hạnh, Anh Tuấn, Chị Lan) — **placeholder testimonials, replace with real ones**.

### 8. FAQ ("Câu hỏi thường gặp")
Bg blue-50, list max-w 760px centered, gap 12px. Items: white, rounded-[14px], border #E2EAF6, padding 18px 24px; question 15.5px/700, answer 14px/1.65 muted. First item open by default. 4 Q&As in reference (DDP meaning, delivery time, prohibited items, tracking).

### 9. Contact CTA
White section wrapping a navy (#10233F) rounded-[24px] panel, padding 48px, 2-col grid.
- Left: H2 "Gửi hàng ngay hôm nay 📦", sub "Để lại thông tin, tư vấn viên gọi lại trong 15 phút…", giant orange pill `☎ 0911 326 989` (22px/800) as `tel:` link.
- Right: white card form — 3 inputs (Họ và tên / Số điện thoại-Zalo / Tuyến gửi) + full-width blue button "Nhận báo giá miễn phí".

### 10. Footer
Bg navy-deep, padding 28px 48px, flex space-between: small logo + "© 2026 Saigon Logistics · TP. Hồ Chí Minh"; right "Hotline 24/7: **0911 326 989**" (white bold).

## Interactions & Behavior
- Nav links: smooth-scroll to sections (`Dịch vụ`→services, `Bảng giá`→pricing, `Tra cứu đơn`→hero tracking bar, `Liên hệ`→contact).
- All phone CTAs → `tel:0911326989`.
- Buttons: hover = slight darken (~8%) + translate-y-[-1px]; transition 150ms ease.
- FAQ `<details>`: only styling needed; optional chevron rotation.
- Tracking form: submit → tracking-result page/modal (backend TBD).
- Contact form: validate name + phone (VN phone regex), success state "Đã nhận yêu cầu — chúng tôi sẽ gọi lại trong 15 phút".

## Responsive (guideline, not in reference)
- <1024px: hero → 1 col (text above image), services & pricing → 2 col, stats → 2×2.
- <640px: everything 1 col; nav collapses to logo + call button; contact panel stacks.
- Tap targets ≥44px.

## State Management
None beyond form state (controlled inputs) and optional tracking-lookup fetch. No global state needed.

## Assets
- `logo.png` — Saigon Logistics logo (orange horse-cart + sun, provided by client).
- Hero illustration — **placeholder in reference**; needs a real playful illustration (plane + packages).
- Partner/client logos — placeholders; request real assets.
- Icons are emoji in the reference; may swap for an icon set (e.g. lucide-react) keeping the colored tile treatment.

## Files
- `design-reference-1a.html` — full desktop design, open in browser
- `logo.png` — brand logo
