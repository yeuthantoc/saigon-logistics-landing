'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { track } from '@/lib/analytics';
import { lpBtn } from '@/lib/landing-1a';

/**
 * Thanh tra cứu vận đơn trong hero — submit chuyển sang trang
 * /theo-doi-don (hệ tracking thật của site) kèm mã đơn.
 */
export default function TrackingBar() {
  const [code, setCode] = useState('');
  const router = useRouter();

  return (
    <form
      id="tra-cuu"
      onSubmit={(e) => {
        e.preventDefault();
        const c = code.trim();
        if (!c) return;
        track('tracking_lookup', { source: 'landing1a_hero' });
        router.push(`/theo-doi-don?code=${encodeURIComponent(c)}`);
      }}
      className="flex max-w-[480px] scroll-mt-8 items-center gap-2.5 rounded-full border-[1.5px] border-lp-line-3 bg-white p-2 pl-[22px] shadow-lp-bar"
    >
      <label htmlFor="lp-tracking" className="sr-only">
        Mã vận đơn
      </label>
      <input
        id="lp-tracking"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Nhập mã vận đơn của bạn…"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-[15px] text-lp-navy placeholder:text-lp-placeholder focus:outline-none"
      />
      <button
        type="submit"
        className={lpBtn('orange', 'shrink-0 px-6 py-[11px] text-[14.5px]')}
      >
        Tra cứu <span className="emoji" aria-hidden>🔍</span>
      </button>
    </form>
  );
}
