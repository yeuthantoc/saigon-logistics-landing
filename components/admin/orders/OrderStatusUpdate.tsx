'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Send, RefreshCw } from 'lucide-react';
import { btn } from '@/lib/ui';
import { FIELD, LABEL } from '@/lib/admin/ui';
import { ORDER_STATUS_META, nextOrderStatuses } from '@/lib/admin/status';
import type { OrderStatus } from '@/lib/database.types';

export default function OrderStatusUpdate({
  id,
  current,
}: {
  id: string;
  current: OrderStatus;
}) {
  const router = useRouter();
  const options = nextOrderStatuses(current);
  const [status, setStatus] = useState<OrderStatus | ''>(options[0] ?? '');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [, startTransition] = useTransition();

  async function update(e: React.FormEvent) {
    e.preventDefault();
    if (!status) return;
    setSaving(true);
    const res = await fetch(`/api/don-hang/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note }),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok || !json.ok) {
      alert('Cập nhật thất bại: ' + (json.error ?? res.status));
      return;
    }
    setNote('');
    startTransition(() => router.refresh());
  }

  async function resendZalo() {
    setNotifying(true);
    const res = await fetch(`/api/don-hang/${id}/notify`, { method: 'POST' });
    const json = await res.json().catch(() => ({}));
    setNotifying(false);
    if (json.error === 'zalo_not_configured') {
      alert('Chưa cấu hình ZALO_OA_TOKEN trong env.');
      return;
    }
    alert(json.ok ? 'Đã gửi thông báo Zalo.' : 'Gửi Zalo thất bại.');
  }

  return (
    <div className="rounded-2xl border-2 border-ink bg-white p-4 shadow-hard">
      <h3 className="mb-3 font-display text-lg font-bold text-ink">Cập nhật trạng thái</h3>

      {options.length === 0 ? (
        <p className="text-sm text-muted">
          Đơn đã ở trạng thái cuối ({ORDER_STATUS_META[current].label}) — không còn bước tiếp theo.
        </p>
      ) : (
        <form onSubmit={update} className="space-y-3">
          <div>
            <label className={LABEL}>Trạng thái tiếp theo</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)} className={FIELD}>
              {options.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_META[s].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL}>Ghi chú</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className={FIELD}
              placeholder="VD: Đang chờ thông quan tại sân bay LAX…"
            />
          </div>
          <button type="submit" disabled={saving} className={btn('coral', 'disabled:opacity-60')}>
            {saving ? 'Đang cập nhật…' : 'Cập nhật'}
          </button>
        </form>
      )}

      <div className="mt-4 border-t-2 border-ink/15 pt-3">
        <button
          onClick={resendZalo}
          disabled={notifying}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm font-bold shadow-hard-xs hover:-translate-y-[1px] disabled:opacity-60"
        >
          {notifying ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Gửi thông báo Zalo
        </button>
      </div>
    </div>
  );
}
