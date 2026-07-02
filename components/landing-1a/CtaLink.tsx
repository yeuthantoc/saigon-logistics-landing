'use client';

import { track } from '@/lib/analytics';

/** Anchor CTA (scroll tới section) có kèm analytics — landing 1a. */
export default function CtaLink({
  href,
  source,
  params = {},
  className,
  children,
}: {
  href: string;
  source: string;
  params?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={() => track('cta_click', { source, ...params })}
      className={className}
    >
      {children}
    </a>
  );
}
