'use client';

import { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { UserPlus, Save, Send, Ban, ShieldCheck } from 'lucide-react';
import { btn, cx } from '@/lib/ui';
import { FIELD, LABEL, TH, TD } from '@/lib/admin/ui';
import { ROLE_LABEL } from '@/lib/admin/status';
import { fmtDate } from '@/lib/admin/format';
import { fmtVnd } from '@/lib/rates';
import type { UserRole } from '@/lib/database.types';

export interface RateRow {
  route: string;
  name: string;
  base: number;
  per_kg: number;
  eta: string | null;
}

const TAB_TRIGGER =
  'rounded-xl border-2 border-ink px-4 py-2 text-sm font-bold shadow-hard-xs data-[state=active]:bg-coral data-[state=active]:text-white bg-white text-ink';

export default function SettingsTabs({
  initialRates,
  zaloEnvConfigured,
}: {
  initialRates: RateRow[];
  zaloEnvConfigured: boolean;
}) {
  return (
    <Tabs.Root defaultValue="users" className="space-y-5">
      <Tabs.List className="flex flex-wrap gap-2">
        <Tabs.Trigger value="users" className={TAB_TRIGGER}>
          Tài khoản
        </Tabs.Trigger>
        <Tabs.Trigger value="notify" className={TAB_TRIGGER}>
          Thông báo
        </Tabs.Trigger>
        <Tabs.Trigger value="rates" className={TAB_TRIGGER}>
          Bảng giá cước
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="users">
        <UsersPanel />
      </Tabs.Content>
      <Tabs.Content value="notify">
        <NotifyPanel zaloEnvConfigured={zaloEnvConfigured} />
      </Tabs.Content>
      <Tabs.Content value="rates">
        <RatesPanel initial={initialRates} />
      </Tabs.Content>
    </Tabs.Root>
  );
}

// ---------------- Tab 1: Users ----------------

interface UserItem {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  banned: boolean;
}

function UsersPanel() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('sale');
  const [inviting, setInviting] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const json = await res.json().catch(() => ({}));
    setUsers(json.ok ? json.users : []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });
    const json = await res.json().catch(() => ({}));
    setInviting(false);
    if (!json.ok) {
      alert('Mời thất bại: ' + (json.error ?? res.status));
      return;
    }
    setEmail('');
    alert('Đã gửi lời mời qua email.');
    load();
  }

  async function patch(id: string, payload: { role?: UserRole; banned?: boolean }) {
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...payload }),
    });
    const json = await res.json().catch(() => ({}));
    if (!json.ok) {
      alert('Cập nhật thất bại: ' + (json.error ?? res.status));
      return;
    }
    load();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={invite} className="flex flex-wrap items-end gap-2 rounded-2xl border-2 border-ink bg-white p-4 shadow-hard">
        <div className="flex-1 min-w-[200px]">
          <label className={LABEL}>Mời user qua email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nhanvien@saigon-logistics.vn"
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL}>Vai trò</label>
          <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className={FIELD}>
            <option value="sale">Sale</option>
            <option value="viewer">Chỉ xem</option>
            <option value="admin">Quản trị</option>
          </select>
        </div>
        <button type="submit" disabled={inviting} className={btn('coral', 'disabled:opacity-60')}>
          <UserPlus className="h-4 w-4" /> {inviting ? 'Đang mời…' : 'Mời'}
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border-2 border-ink bg-white shadow-hard">
        <table className="w-full min-w-[640px] border-collapse">
          <thead className="border-b-2 border-ink bg-cream">
            <tr>
              <th className={TH}>Tên</th>
              <th className={TH}>Email</th>
              <th className={TH}>Vai trò</th>
              <th className={TH}>Ngày tạo</th>
              <th className={TH}>Trạng thái</th>
              <th className={TH}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className={`${TD} text-center text-muted`} colSpan={6}>
                  Đang tải…
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-ink/15">
                  <td className={`${TD} font-semibold`}>{u.full_name || '—'}</td>
                  <td className={TD}>{u.email}</td>
                  <td className={TD}>
                    <select
                      value={u.role}
                      onChange={(e) => patch(u.id, { role: e.target.value as UserRole })}
                      className="rounded-lg border-2 border-ink bg-white px-2 py-1 text-xs font-semibold shadow-hard-xs"
                    >
                      {(Object.keys(ROLE_LABEL) as UserRole[]).map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABEL[r]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={TD}>{fmtDate(u.created_at)}</td>
                  <td className={TD}>
                    {u.banned ? (
                      <span className="text-xs font-bold text-red-600">Đã khoá</span>
                    ) : (
                      <span className="text-xs font-bold text-teal">Hoạt động</span>
                    )}
                  </td>
                  <td className={TD}>
                    <button
                      onClick={() => patch(u.id, { banned: !u.banned })}
                      className="inline-flex items-center gap-1 rounded-lg border-2 border-ink bg-white px-2 py-1 text-xs font-bold shadow-hard-xs hover:-translate-y-[1px]"
                    >
                      {u.banned ? <ShieldCheck className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                      {u.banned ? 'Mở khoá' : 'Khoá'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------- Tab 2: Notify ----------------

function NotifyPanel({ zaloEnvConfigured }: { zaloEnvConfigured: boolean }) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testPhone, setTestPhone] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/settings');
      const json = await res.json().catch(() => ({}));
      setSettings(json.ok ? json.settings : {});
      setLoading(false);
    })();
  }, []);

  function set(key: string, value: string) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  async function save() {
    setSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    alert(json.ok ? 'Đã lưu cấu hình.' : 'Lưu thất bại: ' + (json.error ?? ''));
  }

  async function test() {
    if (!testPhone) return;
    const res = await fetch('/api/admin/settings/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone }),
    });
    const json = await res.json().catch(() => ({}));
    if (json.error === 'zalo_not_configured') {
      alert('Chưa cấu hình ZALO_OA_TOKEN trong biến môi trường.');
      return;
    }
    alert(json.ok ? 'Đã gửi tin thử.' : 'Gửi thất bại.');
  }

  if (loading) return <p className="text-sm text-muted">Đang tải…</p>;

  return (
    <div className="space-y-4 rounded-2xl border-2 border-ink bg-white p-4 shadow-hard">
      <div>
        <label className={LABEL}>Zalo OA Token</label>
        <input
          type="password"
          value={settings.zalo_oa_token ?? ''}
          onChange={(e) => set('zalo_oa_token', e.target.value)}
          placeholder="••••••••"
          className={FIELD}
        />
        <p className="mt-1 text-xs text-muted-2">
          {zaloEnvConfigured
            ? 'Đang dùng ZALO_OA_TOKEN từ biến môi trường (ưu tiên hơn giá trị lưu ở đây).'
            : 'Chưa có token trong biến môi trường. Đặt ZALO_OA_TOKEN trong .env để bật gửi tự động.'}
        </p>
      </div>

      <div>
        <label className={LABEL}>Webhook URL nhận lead (Google Sheet)</label>
        <input
          value={settings.lead_webhook_url ?? ''}
          onChange={(e) => set('lead_webhook_url', e.target.value)}
          placeholder="https://script.google.com/…"
          className={FIELD}
        />
      </div>

      <div>
        <label className={LABEL}>Template tin — Lead mới</label>
        <textarea
          rows={2}
          value={settings.zalo_template_lead ?? ''}
          onChange={(e) => set('zalo_template_lead', e.target.value)}
          className={FIELD}
          placeholder="Xin chào [tên]! SAIGON LOGISTICS đã nhận yêu cầu báo giá…"
        />
      </div>

      <div>
        <label className={LABEL}>Template tin — Cập nhật đơn</label>
        <textarea
          rows={2}
          value={settings.zalo_template_order ?? ''}
          onChange={(e) => set('zalo_template_order', e.target.value)}
          className={FIELD}
          placeholder="Đơn hàng [tracking] của bạn: [trạng thái]…"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t-2 border-ink/15 pt-3">
        <button onClick={save} disabled={saving} className={btn('coral', 'disabled:opacity-60')}>
          <Save className="h-4 w-4" /> {saving ? 'Đang lưu…' : 'Lưu cấu hình'}
        </button>
        <div className="flex items-center gap-1">
          <input
            value={testPhone}
            onChange={(e) => setTestPhone(e.target.value)}
            placeholder="SĐT/Zalo user_id test"
            className="rounded-lg border-2 border-ink bg-white px-2 py-1.5 text-sm shadow-hard-xs"
          />
          <button
            onClick={test}
            className="inline-flex items-center gap-1 rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm font-bold shadow-hard-xs hover:-translate-y-[1px]"
          >
            <Send className="h-4 w-4" /> Test
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Tab 3: Rates ----------------

function RatesPanel({ initial }: { initial: RateRow[] }) {
  const [rates, setRates] = useState<RateRow[]>(initial);
  const [saving, setSaving] = useState(false);

  function edit(route: string, field: 'base' | 'per_kg' | 'eta', value: string) {
    setRates((rs) =>
      rs.map((r) =>
        r.route === route
          ? { ...r, [field]: field === 'eta' ? value : Number(value) || 0 }
          : r,
      ),
    );
  }

  async function save() {
    setSaving(true);
    const res = await fetch('/api/rates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rates: rates.map((r) => ({ route: r.route, base: r.base, per_kg: r.per_kg, eta: r.eta ?? '' })),
      }),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    alert(json.ok ? 'Đã lưu bảng giá.' : 'Lưu thất bại: ' + (json.error ?? ''));
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border-2 border-ink bg-white shadow-hard">
        <table className="w-full min-w-[560px] border-collapse">
          <thead className="border-b-2 border-ink bg-cream">
            <tr>
              <th className={TH}>Tuyến</th>
              <th className={TH}>Phí cố định (VNĐ)</th>
              <th className={TH}>Giá / kg (VNĐ)</th>
              <th className={TH}>ETA</th>
              <th className={TH}>Xem trước /1kg</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => (
              <tr key={r.route} className="border-b border-ink/15">
                <td className={`${TD} font-semibold`}>{r.name}</td>
                <td className={TD}>
                  <input
                    type="number"
                    value={r.base}
                    onChange={(e) => edit(r.route, 'base', e.target.value)}
                    className="w-28 rounded-lg border-2 border-ink bg-white px-2 py-1 text-sm shadow-hard-xs"
                  />
                </td>
                <td className={TD}>
                  <input
                    type="number"
                    value={r.per_kg}
                    onChange={(e) => edit(r.route, 'per_kg', e.target.value)}
                    className="w-28 rounded-lg border-2 border-ink bg-white px-2 py-1 text-sm shadow-hard-xs"
                  />
                </td>
                <td className={TD}>
                  <input
                    value={r.eta ?? ''}
                    onChange={(e) => edit(r.route, 'eta', e.target.value)}
                    className="w-24 rounded-lg border-2 border-ink bg-white px-2 py-1 text-sm shadow-hard-xs"
                  />
                </td>
                <td className={TD}>{fmtVnd(r.base + r.per_kg)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-2">
          Lưu ý: widget ước tính trên landing đọc từ <code>/api/rates</code> khi được nối; cập nhật tại đây sẽ phản ánh sau khi tích hợp.
        </p>
        <button onClick={save} disabled={saving} className={btn('coral', 'disabled:opacity-60')}>
          <Save className="h-4 w-4" /> {saving ? 'Đang lưu…' : 'Lưu bảng giá'}
        </button>
      </div>
    </div>
  );
}
