// =============================================================
// Validate số điện thoại Việt Nam (dùng chung client + server).
// =============================================================

/** Bỏ khoảng trắng, dấu chấm, gạch ngang. */
export function normalizePhone(raw: string): string {
  return raw.replace(/[\s.\-()]/g, '');
}

/**
 * Hợp lệ khi:
 *  - 0xxxxxxxxx (10 số, đầu số di động 03/05/07/08/09), hoặc
 *  - +84xxxxxxxxx / 84xxxxxxxxx (bỏ số 0 đầu).
 */
export function isValidVNPhone(raw: string): boolean {
  const p = normalizePhone(raw);
  return /^(?:0|\+?84)(?:3|5|7|8|9)\d{8}$/.test(p);
}
