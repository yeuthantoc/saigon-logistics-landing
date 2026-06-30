'use client';

import { useEffect, useRef, useState } from 'react';
import { RATES, RATE_KEYS, flagUrl, type RateKey } from '@/lib/rates';
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
  'w-full rounded-xl border-2 border-ink/60 bg-cream px-4 py-2.5 text-base text-ink shadow-hard-xs placeholder:text-muted2 focus:outline-none focus:ring-2 focus:ring-coral';

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

  const dialogRef = useRef<HTMLDialogElement>(null);

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

  // showModal() / close() và lock scroll.
  // Native <dialog> + showModal() handles: focus trap, Escape key, aria-modal semantics.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      el.showModal();
      document.body.style.overflow = 'hidden';
    } else if (el.open) {
      el.close();
      document.body.style.overflow = '';
    }
  }, [open]);

  // Clean up scroll lock nếu component unmount khi đang mở.
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

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

  return (
    // Native <dialog> với showModal(): focus trap, Escape, top-layer z-index tự động.
    // Backdrop styled qua ::backdrop trong globals.css.
    <dialog
      ref={dialogRef}
      aria-labelledby="lead-title"
      onClose={() => setOpen(false)}
      onClick={(e) => {
        // Đóng khi click vào vùng backdrop (dialog element chính), không phải panel bên trong.
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="flex min-h-full w-full items-end justify-center sm:items-center sm:p-4">
        <div className="relative w-full max-w-md rounded-t-3xl border-2 border-ink/60 bg-cream p-5 shadow-hard-lg sm:rounded-3xl sm:p-6">
          {/* Nút đóng */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ink/60 bg-white text-lg font-bold shadow-hard-xs hover:bg-peach"
          >
            ✕
          </button>

          {status === 'success' ? (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-ink/60 bg-teal text-3xl text-white shadow-hard-sm">
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
                    autoFocus
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
                    enterKeyHint="next"
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
                    <p id="lead-phone-err" role="alert" className="mt-1 text-sm font-medium text-coral-dark">
                      {phoneError}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="lead-route" className="mb-1 block text-sm font-semibold text-ink">
                      Tuyến gửi
                    </label>
                    <div className="flex items-center gap-2">
                      <img
                        src={flagUrl(route, 24)}
                        srcSet={`${flagUrl(route, 24)} 1x, ${flagUrl(route, 48)} 2x`}
                        width={24}
                        height={18}
                        alt={RATES[route].name}
                        className="flex-shrink-0 rounded"
                      />
                      <select
                        id="lead-route"
                        value={route}
                        onChange={(e) => setRoute(e.target.value as RateKey)}
                        className={`${inputBase} appearance-none`}
                      >
                        {RATE_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {RATES[key].name}
                          </option>
                        ))}
                      </select>
                    </div>
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
                      inputMode="decimal"
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
                  <p role="alert" className="rounded-lg border-2 border-coral-dark bg-coral-light/30 px-3 py-2 text-sm font-medium text-coral-dark">
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
    </dialog>
  );
}
