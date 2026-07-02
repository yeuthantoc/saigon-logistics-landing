'use client';

import { btn, type BtnVariant } from '@/lib/ui';
import { openLeadForm, track, type LeadPrefill } from '@/lib/analytics';
import { yieldToMain } from '@/lib/yield';

interface Props extends LeadPrefill {
  children: React.ReactNode;
  variant?: BtnVariant;
  className?: string;
  /** true = link chữ thường (không style nút) — dùng cho fallback "để lại SĐT" */
  plain?: boolean;
}

/** Nút mở form lead — giờ là phương án phụ, CTA chính điều hướng Zalo. */
export default function LeadButton({
  children,
  variant = 'coral',
  className,
  plain = false,
  route,
  weight,
  source,
}: Props) {
  return (
    <button
      type="button"
      className={plain ? className : btn(variant, className)}
      onClick={async () => {
        track('select_content', { content_type: 'lead_cta', source });
        await yieldToMain();
        openLeadForm({ route, weight, source });
      }}
    >
      {children}
    </button>
  );
}
