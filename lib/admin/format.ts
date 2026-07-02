// Tiện ích format ngày giờ tiếng Việt + sinh mã tracking.
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

function toDate(input: string | Date | null | undefined): Date | null {
  if (!input) return null;
  const d = typeof input === 'string' ? parseISO(input) : input;
  return isValid(d) ? d : null;
}

/** "01/07/2026" */
export function fmtDate(input: string | Date | null | undefined): string {
  const d = toDate(input);
  return d ? format(d, 'dd/MM/yyyy', { locale: vi }) : '—';
}

/** "01/07/2026 14:30" */
export function fmtDateTime(input: string | Date | null | undefined): string {
  const d = toDate(input);
  return d ? format(d, 'dd/MM/yyyy HH:mm', { locale: vi }) : '—';
}

/** "3 ngày trước" */
export function fmtRelative(input: string | Date | null | undefined): string {
  const d = toDate(input);
  return d ? formatDistanceToNow(d, { addSuffix: true, locale: vi }) : '—';
}

/** Value cho <input type="datetime-local"> từ ISO string. */
export function toDatetimeLocal(input: string | null | undefined): string {
  const d = toDate(input);
  if (!d) return '';
  // yyyy-MM-ddTHH:mm theo giờ địa phương
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // bỏ ký tự dễ nhầm

/**
 * Sinh mã tracking dạng SG-XXXXXX (6 ký tự).
 * Nhận randomInts để không phụ thuộc Math.random (dễ test / reproducible).
 */
export function makeTrackingCode(seed?: number[]): string {
  const chars: string[] = [];
  for (let i = 0; i < 6; i++) {
    const r = seed?.[i] ?? Math.floor(Math.random() * CODE_ALPHABET.length);
    chars.push(CODE_ALPHABET[r % CODE_ALPHABET.length]);
  }
  return `SG-${chars.join('')}`;
}
