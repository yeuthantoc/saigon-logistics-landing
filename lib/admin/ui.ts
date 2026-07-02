// Class tokens dùng chung cho UI admin (form, bảng, panel).
// Phong cách tối giản (SaaS): phẳng, viền hairline, không đổ bóng, nền trắng/xám nhạt.
// Viết literal đầy đủ để Tailwind không purge nhầm.

// Input / select / textarea
// text-base trên mobile (≥16px) để iOS Safari không tự zoom khi focus; sm: thu về 14px.
export const FIELD =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base sm:text-sm font-sans text-ink placeholder:text-slate-400 focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral disabled:opacity-60';

// Select nhỏ dùng inline trong bảng
export const FIELD_SM =
  'rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral';

// Nhãn field
export const LABEL = 'block text-xs font-semibold text-slate-500 mb-1';

// Panel/card nội dung admin
export const PANEL = 'rounded-lg border border-slate-200 bg-white';

// Thẻ KPI/stat
export const STAT_CARD =
  'rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-1';

// Nút chính (submit form) — solid coral, phẳng
export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white hover:bg-coral-dark transition-colors disabled:opacity-60';

// Nút phụ (outline) — viền hairline, nền trắng
export const BTN_GHOST =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60';

// Nút nhỏ (icon action)
export const BTN_ICON =
  'inline-flex items-center justify-center rounded-md border border-slate-300 bg-white h-8 w-8 text-slate-600 hover:bg-slate-50 hover:text-ink transition-colors';

// Hàng bảng
export const TH =
  'px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 whitespace-nowrap';
export const TD = 'px-3 py-2 text-sm text-ink align-middle';
