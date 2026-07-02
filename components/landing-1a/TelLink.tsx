'use client';

import { track } from '@/lib/analytics';
import { LP } from '@/lib/landing-1a';

/** Link gọi hotline landing 1a — bắn event `contact` khi bấm. */
export default function TelLink({
  source,
  className,
  children,
}: {
  source: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`tel:${LP.hotlineTel}`}
      onClick={() => track('contact', { method: 'phone', source })}
      className={className}
    >
      {children}
    </a>
  );
}
