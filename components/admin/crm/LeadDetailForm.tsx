'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { btn } from '@/lib/ui';
import { FIELD, LABEL } from '@/lib/admin/ui';
import { LEAD_STATUS_KEYS, LEAD_STATUS_META } from '@/lib/admin/status';
import { toDatetimeLocal } from '@/lib/admin/format';
import type { Lead, LeadStatus } from '@/lib/database.types';

export default function LeadDetailForm({
  lead,
  sales,
}: {
  lead: Lead;
  sales: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [assignedTo, setAssignedTo] = useState<string>(lead.assigned_to ?? '');
  const [quotedPrice, setQuotedPrice] = useState<string>(
    lead.quoted_price != null ? String(lead.quoted_price) : '',
  );
  const [followUp, setFollowUp] = useState<string>(toDatetimeLocal(lead.follow_up_at));
  const [note, setNote] = useState<string>(lead.internal_note ?? '');
  const [noteSaved, setNoteSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pending, startTransition] = useTransition();

  async function patch(payload: Record<string, unknown>): Promise<boolean> {
    const res = await fetch(`/api/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  }

  async function saveNote() {
    if (note === (lead.internal_note ?? '')) return;
    const ok = await patch({ internal_note: note });
    if (ok) {
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 1500);
      startTransition(() => router.refresh());
    }
  }

  async function saveFields(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const ok = await patch({
      status,
      assigned_to: assignedTo || null,
      quoted_price: quotedPrice ? Number(quotedPrice) : null,
      follow_up_at: followUp ? new Date(followUp).toISOString() : null,
    });
    setSaving(false);
    if (!ok) {
      alert('Lưu thất bại.');
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-5">
      <form onSubmit={saveFields} className="space-y-4 rounded-2xl border-2 border-ink bg-white p-4 shadow-hard">
        <h3 className="font-display text-lg font-bold text-ink">Cập nhật lead</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL}>Trạng thái</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as LeadStatus)} className={FIELD}>
              {LEAD_STATUS_KEYS.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_META[s].label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL}>Sale phụ trách</label>
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className={FIELD}>
              <option value="">— Chưa gán —</option>
              {sales.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL}>Giá đã báo (VNĐ)</label>
            <input
              type="number"
              min={0}
              value={quotedPrice}
              onChange={(e) => setQuotedPrice(e.target.value)}
              className={FIELD}
              placeholder="0"
            />
          </div>

          <div>
            <label className={LABEL}>Follow-up lúc</label>
            <input
              type="datetime-local"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className={FIELD}
            />
          </div>
        </div>

        <button type="submit" disabled={saving || pending} className={btn('coral', 'disabled:opacity-60')}>
          {saving ? 'Đang lưu…' : 'Lưu thay đổi'}
        </button>
      </form>

      <div className="rounded-2xl border-2 border-ink bg-white p-4 shadow-hard">
        <div className="mb-1 flex items-center justify-between">
          <label className={LABEL}>Ghi chú nội bộ (diễn biến cuộc gọi)</label>
          {noteSaved && <span className="text-xs font-bold text-teal">Đã lưu ✓</span>}
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={saveNote}
          rows={4}
          className={FIELD}
          placeholder="VD: Đã gọi 10:15, khách hẹn gửi 20kg quà Tết đi Mỹ, sẽ chốt cuối tuần…"
        />
        <p className="mt-1 text-xs text-muted-2">Tự lưu khi rời khỏi ô.</p>
      </div>
    </div>
  );
}
