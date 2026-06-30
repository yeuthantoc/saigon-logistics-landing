'use client';

import { useEffect, useRef, useState } from 'react';
import { RATES, RATE_KEYS, type RateKey } from '@/lib/rates';
import { isValidVNPhone } from '@/lib/validation';
import { SITE } from '@/lib/site';
import {
  LEAD_EVENT,
  track,
  type LeadPrefill,
} from '@/lib/analytics';
import { btn } from '@/lib/ui';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputBase =
  'w-full rounded-xl border-2 border-ink bg-cream px-4 py-2.5 text-base text-ink shadow-hard-xs placeholder:text-muted2 focus:outline-none focus:ring-2 focus:ring-coral';

export default function LeadForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [phoneError, setPhoneError] = useState('');
  const [source, setSource] = useState('unknown');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [route, setRoute] = useState<RateKey>('us');
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');
  const honeypot = useRef<HTMLInputElement>(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  // Lắng nghe event mở form từ mọi CTA.
  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<LeadPrefill>).detail || {};
      if (detail.route && detail.route in RATES) setRoute(detail.route as RateKey);
      if (typeof detail.weight === 'number') setWeight(String(detail.weight));
      if (detail.source) setSource(detail.source);
      setStatus('idle');
      setPhoneError('');
      setOpen(true);
    }
    window.addEventListener(LEAD_EVENT, onOpen);
    return () => window.removeEventListener(LEAD_EVENT, onOpen);
  }, []);

  // Khoá scroll + đóng bằng Escape khi mở.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: bot điền -> giả vờ thành công, không gửi.
    if (honeypot.current?.value) {
      setStatus('success');
      return;
    }

    if (!isValidVNPhone(phone)) {
      setPhoneError('Số điện thoại chưa đúng. Ví dụ: 0901 234 567');
      return;
    }
    setPhoneError('');
    setStatus('submitting');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          route,
          routeName: RATES[route].name,
          weight: weight ? Number(weight) : null,
          note: note.trim(),
          source,
          website: honeypot.current?.value || '',
        }),
      });

      if (!res.ok) throw new Error('request_failed');

      track('generate_lead', {
        route,
        weight: weight ? Number(weight) : undefined,
        source,
        currency: 'VND',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-t-3xl border-2 border-ink bg-cream p-5 shadow-hard-lg sm:rounded-3xl sm:p-6"
      >
        {/* Nút đóng */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Đóng"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ink bg-white text-lg font-bold shadow-hard-xs hover:bg-peach"
        >
          ✕
        </button>

        {status === 'success' ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink bg-teal text-3xl text-white shadow-hard-sm">
              ✓
            </div>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-ink">
              Đã nhận thông tin!
            </h2>
            <p className="mt-2 text-muted">
              Sale của {SITE.name} sẽ gọi lại báo giá trong ít phút. Muốn nhanh
              hơn? Nhắn Zalo ngay nhé.
            </p>
            <a
              href={SITE.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('contact', { method: 'zalo', source: 'lead_success' })}
              className={btn('teal', 'mt-5 w-full')}
            >
              <span className="emoji">💬</span> Mở Zalo chat ngay
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 text-sm font-semibold text-muted underline-offset-2 hover:underline"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <>
            <div className="pr-10">
              <h2 id="lead-title" className="font-display text-2xl font-extrabold text-ink">
                Nhận báo giá trong 5 phút
              </h2>
              <p className="mt-1 text-sm text-muted">
                Để lại số điện thoại / Zalo, sale gọi lại báo cước chính xác theo
                loại hàng.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5" noValidate>
              <div>
                <label htmlFor="lead-name" className="mb-1 block text-sm font-semibold text-ink">
                  Họ tên
                </label>
                <input
                  id="lead-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                  className={inputBase}
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-1 block text-sm font-semibold text-ink">
                  Số điện thoại / Zalo <span className="text-coral">*</span>
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  placeholder="0901 234 567"
                  autoComplete="tel"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? 'lead-phone-err' : undefined}
                  className={inputBase}
                />
                {phoneError && (
                  <p id="lead-phone-err" className="mt-1 text-sm font-medium text-coral-dark">
                    {phoneError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="lead-route" className="mb-1 block text-sm font-semibold text-ink">
                    Tuyến gửi
                  </label>
                  <select
                    id="lead-route"
                    value={route}
                    onChange={(e) => setRoute(e.target.value as RateKey)}
                    className={`${inputBase} appearance-none`}
                  >
                    {RATE_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {RATES[key].flag} {RATES[key].name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="lead-weight" className="mb-1 block text-sm font-semibold text-ink">
                    Cân nặng (kg)
                  </label>
                  <input
                    id="lead-weight"
                    type="number"
                    min={0.1}
                    step={0.5}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="VD: 2"
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-note" className="mb-1 block text-sm font-semibold text-ink">
                  Ghi chú <span className="font-normal text-muted2">(tuỳ chọn)</span>
                </label>
                <textarea
                  id="lead-note"
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Loại hàng, địa chỉ nhận, thời gian cần gửi…"
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Honeypot chống spam — ẩn với người dùng thật */}
              <div className="absolute left-[-9999px]" aria-hidden>
                <label htmlFor="lead-website">Website</label>
                <input
                  id="lead-website"
                  ref={honeypot}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === 'error' && (
                <p className="rounded-lg border-2 border-coral-dark bg-coral-light/30 px-3 py-2 text-sm font-medium text-coral-dark">
                  Gửi chưa thành công. Vui lòng thử lại hoặc gọi hotline{' '}
                  {SITE.hotline}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={btn('coral', 'w-full text-base disabled:cursor-not-allowed disabled:opacity-70')}
              >
                {status === 'submitting' ? 'Đang gửi…' : 'Gửi & nhận báo giá →'}
              </button>

              <p className="text-center text-xs text-muted2">
                Bằng cách gửi, bạn đồng ý để {SITE.name} liên hệ tư vấn báo giá.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
