# Supabase — Hướng dẫn setup Admin Dashboard

Landing page vẫn chạy bình thường khi chưa cấu hình Supabase. Phần `/admin/*` và
lưu lead vào DB chỉ hoạt động sau khi hoàn tất các bước dưới đây.

## 1. Tạo project Supabase

1. Vào https://supabase.com → **New project** (chọn region gần VN: Singapore).
2. Đợi project khởi tạo xong (~2 phút).

## 2. Chạy schema

1. Mở **SQL Editor** trong dashboard.
2. Copy toàn bộ nội dung [`schema.sql`](./schema.sql) → dán vào → **Run**.
3. Kiểm tra tab **Table Editor**: phải thấy `profiles`, `leads`, `orders`,
   `rate_config`, `app_settings`.

## 3. Lấy API keys → điền vào `.env.local`

**Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...        # anon / public
SUPABASE_SERVICE_ROLE_KEY=eyJ...            # service_role (bí mật, chỉ server)
```

> ⚠️ `service_role` bỏ qua RLS — tuyệt đối không đưa ra client / commit lên git.

## 4. Tạo user admin đầu tiên

1. **Authentication → Users → Add user** → nhập email + password (tắt "auto
   confirm" nếu muốn, nhưng nên bật để dùng ngay).
2. Trigger `handle_new_user` sẽ tự tạo row trong `profiles` với `role = 'sale'`.
3. Nâng lên admin bằng SQL Editor (thay email của bạn):

   ```sql
   update public.profiles
   set role = 'admin'
   where id = (select id from auth.users where email = 'ban@example.com');
   ```

4. Đăng nhập tại `/dang-nhap` → vào `/admin/crm`.

## 5. (Tuỳ chọn) Zalo OA notify

Điền `ZALO_OA_TOKEN` trong `.env.local` để tự động nhắn tin cho khách khi có
lead mới / cập nhật đơn. Bỏ trống thì tính năng này được bỏ qua an toàn.

## Ghi chú RLS

- **admin**: đọc/ghi tất cả (qua hàm `is_admin()` security-definer).
- **sale**: chỉ thấy/ghi lead & đơn có `assigned_to = chính họ`.
- **viewer**: chưa có policy đọc dữ liệu nghiệp vụ (theo spec) — mở rộng sau nếu cần.
- `/api/lead` dùng `service_role` để insert lead công khai (bỏ qua RLS).
