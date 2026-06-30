'use client';

import { btn, type BtnVariant } from '@/lib/ui';
import { openLeadForm, track, type LeadPrefill } from '@/lib/analytics';

interface Props extends LeadPrefill {
  children: React.ReactNode;
  variant?: BtnVariant;
  className?: string;
}

/** Nút mở form lead (dùng ở mọi CTA "Nhận báo giá / Để sale báo giá"). */
export default function LeadButton({
  children,
  variant = 'coral',
  className,
  route,
  weight,
  source,
}: Props) {
  return (
    <button
      type="button"
      className={btn(variant, className)}
      onClick={() => {
        track('select_content', { content_type: 'lead_cta', source });
        openLeadForm({ route, weight, source });
      }}
    >
      {children}
    </button>
  );
}
