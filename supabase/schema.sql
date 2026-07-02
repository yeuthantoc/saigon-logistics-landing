-- =============================================================
-- SAIGON LOGISTICS — Admin Dashboard schema
-- Chạy toàn bộ file này trong Supabase SQL Editor (một lần).
-- Bật RLS toàn bộ; chỉ admin đọc/ghi tất cả, sale chỉ thấy dữ liệu được assign.
-- =============================================================

-- -------------------------------------------------------------
-- 0. Helper: kiểm tra role admin (SECURITY DEFINER để không đệ quy RLS)
-- -------------------------------------------------------------
-- Vì policy trên bảng profiles cần truy vấn chính profiles để biết role,
-- ta dùng hàm security definer (bỏ qua RLS) để tránh vòng lặp policy.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- -------------------------------------------------------------
-- 1. profiles (thông tin sale/admin) — 1-1 với auth.users
-- -------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        text default 'sale',     -- 'admin' | 'sale' | 'viewer'
  phone       text,
  avatar_url  text,
  created_at  timestamptz default now()
);

-- -------------------------------------------------------------
-- 2. leads (từ form landing page)
-- -------------------------------------------------------------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  phone         text not null,
  route         text not null,          -- 'us'|'au'|'ca'|'eu'|'jp'|'sg'
  weight_kg     numeric,
  note          text,
  source        text default 'web',     -- 'web'|'zalo'|'hotline'|'direct'
  status        text default 'new',     -- 'new'|'called'|'quoted'|'won'|'lost'
  assigned_to   uuid references auth.users(id) on delete set null,
  internal_note text,
  quoted_price  numeric,                -- giá đã báo (VNĐ)
  follow_up_at  timestamptz,
  updated_at    timestamptz default now()
);

-- -------------------------------------------------------------
-- 3. orders (đơn hàng đã chốt từ lead)
-- -------------------------------------------------------------
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz default now(),
  lead_id           uuid references public.leads(id) on delete set null,
  tracking_code     text unique not null,
  customer_name     text not null,
  customer_phone    text not null,
  route             text not null,
  weight_kg         numeric not null,
  price             numeric not null,     -- giá thu thực tế (VNĐ)
  status            text default 'received',
    -- 'received'|'picked_up'|'in_transit'|'customs'|'out_for_delivery'|'delivered'|'failed'
  status_history    jsonb default '[]'::jsonb,  -- [{status, note, timestamp, updated_by}]
  sender_address    text,
  receiver_address  text,
  receiver_country  text,
  estimated_delivery date,
  actual_delivery   timestamptz,
  assigned_to       uuid references auth.users(id) on delete set null,
  note              text,
  updated_at        timestamptz default now()
);

-- -------------------------------------------------------------
-- 4. rate_config (bảng cước — nguồn cho widget landing qua /api/rates)
-- -------------------------------------------------------------
create table if not exists public.rate_config (
  route      text primary key,           -- 'us'|'au'|'ca'|'eu'|'jp'|'sg'
  name       text not null,
  base       numeric not null,           -- phí cố định (VNĐ)
  per_kg     numeric not null,           -- đơn giá mỗi kg (VNĐ)
  eta        text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

-- -------------------------------------------------------------
-- 5. app_settings (cấu hình key/value: Zalo token, webhook, template...)
-- -------------------------------------------------------------
create table if not exists public.app_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz default now()
);

-- -------------------------------------------------------------
-- 6. Indexes
-- -------------------------------------------------------------
create index if not exists leads_status_idx      on public.leads(status);
create index if not exists leads_route_idx       on public.leads(route);
create index if not exists leads_assigned_idx    on public.leads(assigned_to);
create index if not exists leads_created_idx      on public.leads(created_at desc);
create index if not exists orders_status_idx     on public.orders(status);
create index if not exists orders_tracking_idx   on public.orders(tracking_code);
create index if not exists orders_created_idx    on public.orders(created_at desc);
create index if not exists orders_assigned_idx   on public.orders(assigned_to);

-- -------------------------------------------------------------
-- 7. Trigger: tự cập nhật updated_at
-- -------------------------------------------------------------
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at before update on public.leads
  for each row execute function public.update_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders
  for each row execute function public.update_updated_at();

-- -------------------------------------------------------------
-- 8. Trigger: tự tạo profile khi có user mới (mặc định role 'sale')
--    → user ĐẦU TIÊN cần nâng lên 'admin' thủ công (xem README).
-- -------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'sale')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- -------------------------------------------------------------
-- 9. RLS
-- -------------------------------------------------------------
alter table public.profiles    enable row level security;
alter table public.leads       enable row level security;
alter table public.orders      enable row level security;
alter table public.rate_config enable row level security;
alter table public.app_settings enable row level security;

-- profiles: user tự đọc/ghi profile mình; admin đọc/ghi tất cả (cho quản lý user + dropdown assign)
drop policy if exists own_profile   on public.profiles;
drop policy if exists admin_profiles on public.profiles;
create policy own_profile    on public.profiles for all
  using (id = auth.uid()) with check (id = auth.uid());
create policy admin_profiles on public.profiles for all
  using (public.is_admin()) with check (public.is_admin());

-- leads: admin all; sale chỉ thấy/ghi lead được assign
drop policy if exists admin_all_leads on public.leads;
drop policy if exists sale_own_leads  on public.leads;
create policy admin_all_leads on public.leads for all
  using (public.is_admin()) with check (public.is_admin());
create policy sale_own_leads  on public.leads for all
  using (assigned_to = auth.uid()) with check (assigned_to = auth.uid());

-- orders: admin all; sale chỉ thấy/ghi đơn được assign
drop policy if exists admin_all_orders on public.orders;
drop policy if exists sale_own_orders  on public.orders;
create policy admin_all_orders on public.orders for all
  using (public.is_admin()) with check (public.is_admin());
create policy sale_own_orders  on public.orders for all
  using (assigned_to = auth.uid()) with check (assigned_to = auth.uid());

-- rate_config: mọi authenticated user đọc; chỉ admin ghi
drop policy if exists read_rates  on public.rate_config;
drop policy if exists admin_rates on public.rate_config;
create policy read_rates  on public.rate_config for select using (true);
create policy admin_rates on public.rate_config for all
  using (public.is_admin()) with check (public.is_admin());

-- app_settings: chỉ admin đọc/ghi (chứa token nhạy cảm)
drop policy if exists admin_settings on public.app_settings;
create policy admin_settings on public.app_settings for all
  using (public.is_admin()) with check (public.is_admin());

-- -------------------------------------------------------------
-- 10. Seed bảng cước ban đầu (khớp lib/rates.ts hiện tại)
-- -------------------------------------------------------------
insert into public.rate_config (route, name, base, per_kg, eta, sort_order) values
  ('us', 'Mỹ (USA)',         120000, 290000, '4–6 ngày', 1),
  ('au', 'Úc',               110000, 250000, '3–5 ngày', 2),
  ('ca', 'Canada',           130000, 310000, '5–7 ngày', 3),
  ('eu', 'Châu Âu (EU/UK)',  120000, 270000, '4–6 ngày', 4),
  ('jp', 'Nhật & Hàn',        90000, 190000, '2–4 ngày', 5),
  ('sg', 'Singapore',         80000, 160000, '2–3 ngày', 6)
on conflict (route) do nothing;
