# Deploy lên Cloudflare Workers

App dùng adapter chính thức [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
để chạy Next.js 15 (App Router, SSR, API routes, middleware) trên Cloudflare Workers.

## Vì sao build cũ fail?

Deploy command `npx wrangler versions upload` cần một **Worker entry-point**.
`next build` thuần không tạo ra worker → wrangler báo *"Missing entry-point"*.
Adapter `opennextjs-cloudflare build` sẽ chạy `next build` **rồi** bundle thành
`.open-next/worker.js` + `.open-next/assets/` mà wrangler đọc qua `wrangler.jsonc`.

## Cấu hình build/deploy — KHÔNG cần đổi gì trên Dashboard

Script `npm run build` đã tự chứa: chạy `next build` **rồi** bundle sang
`.open-next/worker.js` + `.open-next/assets/`. Vì vậy pipeline mặc định chạy đúng:

| Mục | Giá trị | Ghi chú |
|---|---|---|
| **Build command** | `npm run build` | giữ nguyên — đã bao gồm bước OpenNext |
| **Deploy command** | `npx wrangler versions upload` | giữ nguyên — đọc `wrangler.jsonc` |

Chi tiết script:

```jsonc
"build": "next build && opennextjs-cloudflare build --skipNextBuild"
```

> ⚠️ KHÔNG đặt `build` = `opennextjs-cloudflare build` (không có `--skipNextBuild`)
> vì lệnh đó lại gọi `npm run build` → **đệ quy vô hạn**. Phải chạy `next build`
> trước rồi bundle với `--skipNextBuild`. Next config cũng cần `output: 'standalone'`.

## Biến môi trường trên Cloudflare

Có 2 loại, đặt ở 2 nơi khác nhau:

1. **Build-time (bắt buộc có khi build)** — các biến `NEXT_PUBLIC_*` được *nhúng*
   vào bundle client lúc build. Đặt trong **Settings → Build → Build variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (domain thật)
   - (tuỳ chọn) `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_HOTLINE`, `NEXT_PUBLIC_ZALO_PHONE`

2. **Runtime (bí mật, chỉ server)** — đặt trong **Settings → Variables and Secrets**
   (dạng *Secret*), server đọc qua `process.env`:
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ZALO_OA_TOKEN` (nếu dùng)
   - `LEAD_WEBHOOK_URL`, `RESEND_API_KEY`, `TELEGRAM_*` (nếu dùng)

> `NEXT_PUBLIC_SUPABASE_URL` / `ANON_KEY` cũng nên có ở runtime (middleware +
> server client dùng chúng). Đặt cả ở Build variables **và** Variables cho chắc.

## Deploy thủ công từ máy (tuỳ chọn)

```bash
npm run deploy        # opennextjs-cloudflare build && wrangler deploy
npm run preview       # build rồi chạy thử worker local (workerd)
```

Lần đầu chạy `wrangler` sẽ yêu cầu đăng nhập Cloudflare (`wrangler login`).

## Ghi chú kỹ thuật

- `wrangler.jsonc` bật `nodejs_compat` → `@supabase/supabase-js` (dùng
  `process.version`) chạy được; hết cảnh báo *"not supported in the Edge Runtime"*.
- `compatibility_date` = `2025-04-01`. Nâng khi cần API mới của Workers.
- Chưa bật incremental cache (R2/KV) vì hầu hết trang admin là `force-dynamic`.
  Muốn cache ISR, khai báo R2 binding trong `open-next.config.ts` + `wrangler.jsonc`.
