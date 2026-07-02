'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilePlus2 } from 'lucide-react';
import { cx } from '@/lib/ui';

export interface CreateOrderInput {
  lead_id: string;
  customer_name: string;
  customer_phone: string;
  route: string;
  weight_kg: number;
  price: number;
  assigned_to: string | null;
}

export default function CreateOrderButton({
  lead,
  variant = 'inline',
}: {
  lead: CreateOrderInput;
  variant?: 'inline' | 'full';
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function create() {
    if (!confirm(`Tạo đơn hàng cho khách ${lead.customer_name}?`)) return;
    setLoading(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    const json = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok || !json.ok) {
      alert('Tạo đơn thất bại: ' + (json.error ?? res.status));
      return;
    }
    router.push(`/admin/don-hang/${json.order.id}`);
  }

  if (variant === 'full') {
    return (
      <button
        onClick={create}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal/90 disabled:opacity-60"
      >
        <FilePlus2 className="h-4 w-4" />
        {loading ? 'Đang tạo…' : 'Tạo đơn hàng'}
      </button>
    );
  }

  return (
    <button
      onClick={create}
      disabled={loading}
      title="Tạo đơn hàng"
      className={cx(
        'inline-flex items-center gap-1 rounded-md bg-teal px-2 py-1 text-xs font-semibold text-white hover:bg-teal/90',
        loading && 'opacity-60',
      )}
    >
      <FilePlus2 className="h-3.5 w-3.5" />
      Tạo đơn
    </button>
  );
}
