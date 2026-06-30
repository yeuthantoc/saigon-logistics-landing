// =============================================================
// Tracking helpers (GA4 + Meta Pixel) và event bus mở form lead.
// An toàn khi không có analytics: chỉ no-op.
// =============================================================

type Params = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Bắn event tới GA4 + map sang Meta Pixel standard events. */
export function track(event: string, params: Params = {}): void {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', event, params);

  if (window.fbq) {
    if (event === 'generate_lead') window.fbq('track', 'Lead', params);
    else if (event === 'contact') window.fbq('track', 'Contact', params);
    else window.fbq('trackCustom', event, params);
  }
}

// --- Event bus để mọi nút "Nhận báo giá" mở chung 1 modal ---
export const LEAD_EVENT = 'saigon:open-lead';

export interface LeadPrefill {
  route?: string; // RateKey
  weight?: number;
  source?: string; // vị trí nút bấm (để biết CTA nào hiệu quả)
}

export function openLeadForm(detail: LeadPrefill = {}): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<LeadPrefill>(LEAD_EVENT, { detail }));
}
