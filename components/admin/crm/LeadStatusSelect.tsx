'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FIELD_SM } from '@/lib/admin/ui';
import { LEAD_STATUS_KEYS, LEAD_STATUS_META } from '@/lib/admin/status';
import type { LeadStatus } from '@/lib/database.types';

export default function LeadStatusSelect({
  id,
  status,
}: {
  id: string;
  status: LeadStatus;
}) {
  const router = useRouter();
  const [value, setValue] = useState<LeadStatus>(status);
  const [pending, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);

  async function onChange(next: LeadStatus) {
    const prev = value;
    setValue(next);
    setSaving(true);
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    if (!res.ok) {
      setValue(prev); // rollback
      alert('Cập nhật trạng thái thất bại.');
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <select
      value={value}
      disabled={saving || pending}
      onChange={(e) => onChange(e.target.value as LeadStatus)}
      className={`${FIELD_SM} ${saving ? 'opacity-60' : ''}`}
      aria-label="Đổi trạng thái lead"
    >
      {LEAD_STATUS_KEYS.map((s) => (
        <option key={s} value={s}>
          {LEAD_STATUS_META[s].label}
        </option>
      ))}
    </select>
  );
}
