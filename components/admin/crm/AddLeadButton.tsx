'use client';

// Nút "+ Thêm lead" — sale nhập nhanh khách chat Zalo / gọi hotline vào CRM.
// Native <dialog> (focus trap + Escape có sẵn), style tối giản theo lib/admin/ui.

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { RATES, RATE_KEYS, type RateKey } from '@/lib/rates';
import { LEAD_SOURCE_LABEL } from '@/lib/admin/status';
import { FIELD, LABEL, PANEL, BTN_PRIMARY, BTN_GHOST } from '@/lib/admin/ui';
import type { LeadSource } from '@/lib/database.types';

const SOURCE_KEYS: LeadSource[] = ['zalo', 'hotline', 'direct', 'web'];

export default function AddLeadButton() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [route, setRoute] = useState<RateKey>('us');
  const [weight, setWeight] = useState('');
  const [source, setSource] = useState<LeadSource>('zalo');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openModal() {
    setError(null);
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  function resetForm() {
    setName('');
    setPhone('');
    setWeight('');
    setNote('');
    setSource('zalo');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        route,
        weight_kg: weight ? Number(weight) : null,
        source,
        note: note.trim() || undefined,
      }),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok || !json.ok) {
      setError(
        json.error === 'invalid_phone'
          ? 'Số điện thoại chưa đúng. Ví dụ: 0901 234 567'
          : `Lưu thất bại: ${json.error ?? res.status}`,
      );
      return;
    }

    resetForm();
    closeModal();
    router.refresh();
  }

  return (
    <>
      <button type="button" onClick={openModal} className={BTN_PRIMARY}>
        <Plus className="h-4 w-4" /> Thêm lead
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="add-lead-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <div className={`relative w-full max-w-md ${PANEL} p-5`}>
            <button
              type="button"
              onClick={closeModal}
              aria-label="Đóng"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 id="add-lead-title" className="font-display text-lg font-bold text-ink">
              Thêm lead thủ công
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Khách chat Zalo / gọi hotline — nhập vào để không lọt khỏi phễu.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label htmlFor="al-name" className={LABEL}>
                  Họ tên *
                </label>
                <input
                  id="al-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={FIELD}
                />
              </div>

              <div>
                <label htmlFor="al-phone" className={LABEL}>
                  SĐT / Zalo *
                </label>
                <input
                  id="al-phone"
                  required
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0901 234 567"
                  className={FIELD}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="al-route" className={LABEL}>
                    Tuyến
                  </label>
                  <select
                    id="al-route"
                    value={route}
                    onChange={(e) => setRoute(e.target.value as RateKey)}
                    className={FIELD}
                  >
                    {RATE_KEYS.map((k) => (
                      <option key={k} value={k}>
                        {RATES[k].name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="al-weight" className={LABEL}>
                    Cân nặng (kg)
                  </label>
                  <input
                    id="al-weight"
                    type="number"
                    min={0.1}
                    step={0.5}
                    inputMode="decimal"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="VD: 5"
                    className={FIELD}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="al-source" className={LABEL}>
                  Nguồn
                </label>
                <select
                  id="al-source"
                  value={source}
                  onChange={(e) => setSource(e.target.value as LeadSource)}
                  className={FIELD}
                >
                  {SOURCE_KEYS.map((s) => (
                    <option key={s} value={s}>
                      {LEAD_SOURCE_LABEL[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="al-note" className={LABEL}>
                  Ghi chú
                </label>
                <textarea
                  id="al-note"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Loại hàng, nội dung đã trao đổi…"
                  className={FIELD}
                />
              </div>

              {error && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={closeModal} className={BTN_GHOST}>
                  Huỷ
                </button>
                <button type="submit" disabled={saving} className={BTN_PRIMARY}>
                  {saving ? 'Đang lưu…' : 'Lưu lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
