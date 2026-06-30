'use client';

import { btn, type BtnVariant } from '@/lib/ui';
import { track } from '@/lib/analytics';

interface Props {
  children: React.ReactNode;
  href: string;
  method: 'zalo' | 'phone';
  source?: string;
  variant?: BtnVariant;
  className?: string;
}

/** Link liên hệ (tel: hoặc zalo.me) — bắn event `contact` khi bấm. */
export default function ContactLink({
  children,
  href,
  method,
  source,
  variant = 'white',
  className,
}: Props) {
  const isZalo = method === 'zalo';
  return (
    <a
      href={href}
      target={isZalo ? '_blank' : undefined}
      rel={isZalo ? 'noopener noreferrer' : undefined}
      className={btn(variant, className)}
      onClick={() => track('contact', { method, source })}
    >
      {children}
    </a>
  );
}
