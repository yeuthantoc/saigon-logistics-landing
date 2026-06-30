// =============================================================
// Class tokens cho design system "sticker / neo-brutalist".
// Viết literal đầy đủ để Tailwind không bị purge nhầm.
// =============================================================

/** Ghép class, bỏ falsy. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

// Thẻ chuẩn: bo góc, viền 2px ink, bóng cứng.
export const CARD =
  'rounded-2xl border-2 border-ink/60 bg-white shadow-hard';

// Nút lớn: viền 2px, bóng cứng 4px, nhấn xuống khi active.
export const BTN_BASE =
  'group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink/60 px-5 py-3 text-[15px] font-bold font-sans transition-all duration-100 shadow-hard-sm hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0_#251a12] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#251a12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2';

export type BtnVariant = 'coral' | 'teal' | 'white' | 'ink' | 'whiteTeal';

const VARIANT: Record<BtnVariant, string> = {
  coral: 'bg-coral text-white hover:bg-coral-dark',
  teal: 'bg-teal text-white hover:bg-teal/90',
  white: 'bg-white text-ink hover:bg-cream',
  ink: 'bg-ink text-white hover:bg-ink/90',
  whiteTeal: 'bg-white text-teal hover:bg-cream',
};

export function btn(variant: BtnVariant = 'coral', extra?: string): string {
  return cx(BTN_BASE, VARIANT[variant], extra);
}

// Badge / chip dạng pill, viền 2px, bóng nhỏ.
export const BADGE =
  'inline-flex items-center gap-2 rounded-full border-2 border-ink/60 px-3 py-1 text-sm font-semibold shadow-hard-xs';

// Chip tin cậy (nền trắng).
export const CHIP =
  'inline-flex items-center gap-1.5 rounded-full border-2 border-ink/60 bg-white px-3 py-1.5 text-sm font-semibold shadow-hard-xs';
