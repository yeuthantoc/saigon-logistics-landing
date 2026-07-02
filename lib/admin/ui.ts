// Class tokens dùng chung cho UI admin (form, bảng, panel) — neo-brutalist.
// Viết literal đầy đủ để Tailwind không purge nhầm.

// Input / select / textarea
export const FIELD =
  'w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm font-sans text-ink shadow-hard-xs placeholder:text-muted-2 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-1 disabled:opacity-60';

// Select nhỏ dùng inline trong bảng
export const FIELD_SM =
  'rounded-lg border-2 border-ink bg-white px-2 py-1 text-xs font-semibold text-ink shadow-hard-xs focus:outline-none focus:ring-2 focus:ring-coral';

// Nhãn field
export const LABEL = 'block text-xs font-bold uppercase tracking-wide text-muted mb-1';

// Panel/card nội dung admin
export const PANEL = 'rounded-2xl border-2 border-ink bg-white shadow-hard';

// Thẻ KPI/stat
export const STAT_CARD =
  'rounded-2xl border-2 border-ink bg-white shadow-hard-sm p-4 flex flex-col gap-1';

// Nút nhỏ (icon action)
export const BTN_ICON =
  'inline-flex items-center justify-center rounded-lg border-2 border-ink bg-white h-8 w-8 shadow-hard-xs hover:-translate-y-[1px] hover:shadow-hard-sm active:translate-y-[1px] transition-all';

// Hàng bảng
export const TH =
  'px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-muted whitespace-nowrap';
export const TD = 'px-3 py-2 text-sm text-ink align-middle';
