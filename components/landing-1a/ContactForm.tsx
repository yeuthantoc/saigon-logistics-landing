'use client';

import { useRef, useState } from 'react';
import { isValidVNPhone } from '@/lib/validation';
import { track } from '@/lib/analytics';
import { LP, LP_INPUT } from '@/lib/landing-1a';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Form liên hệ landing 1a — gửi vào cùng pipeline lead của site
 * (POST /api/lead → Supabase + kênh notify). Tuyến gửi là text tự do → note.
 */
export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [route, setRoute] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [phoneError, setPhoneError] = useState('');
  const honeypot = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot: bot điền → giả vờ thành công, không gửi.
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
          note: route.trim(),
          source: 'web',
          website: honeypot.current?.value || '',
        }),
      });

      if (!res.ok) throw new Error('request_failed');

      track('generate_lead', { source: 'landing1a_form' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[18px] bg-white p-7 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lp-blue text-xl font-bold text-white">
          ✓
        </div>
        <p className="text-[15.5px] font-bold text-lp-navy">
          Đã nhận yêu cầu — chúng tôi sẽ gọi lại trong 15 phút.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-3 rounded-[18px] bg-white p-7"
    >
      <label htmlFor="lp-name" className="sr-only">
        Họ và tên
      </label>
      <input
        id="lp-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Họ và tên"
        autoComplete="name"
        className={LP_INPUT}
      />

      <label htmlFor="lp-phone" className="sr-only">
        Số điện thoại / Zalo
      </label>
      <input
        id="lp-phone"
        type="tel"
        required
        inputMode="tel"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          if (phoneError) setPhoneError('');
        }}
        placeholder="Số điện thoại / Zalo"
        autoComplete="tel"
        aria-invalid={!!phoneError}
        aria-describedby={phoneError ? 'lp-phone-err' : undefined}
        className={LP_INPUT}
      />
      {phoneError && (
        <p id="lp-phone-err" role="alert" className="text-sm font-medium text-lp-orange">
          {phoneError}
        </p>
      )}

      <label htmlFor="lp-route" className="sr-only">
        Tuyến gửi
      </label>
      <input
        id="lp-route"
        type="text"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
        placeholder="Tuyến gửi (VD: đi Mỹ, 5kg quần áo)"
        className={LP_INPUT}
      />

      {/* Honeypot chống spam — ẩn với người dùng thật */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="lp-website">Website</label>
        <input
          id="lp-website"
          ref={honeypot}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-lp-orange">
          Gửi chưa thành công. Vui lòng thử lại hoặc gọi hotline {LP.hotline}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-[10px] bg-lp-blue py-3.5 text-[15.5px] font-bold text-white transition duration-150 ease-out hover:-translate-y-px hover:bg-[#2b66c5] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? 'Đang gửi…' : 'Nhận báo giá miễn phí'}
      </button>
    </form>
  );
}
