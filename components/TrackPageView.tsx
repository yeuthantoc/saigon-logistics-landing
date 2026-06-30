'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

interface Props {
  event: string;
  params?: Record<string, string>;
}

/** Bắn GA4 event khi component mount (page view phía client). */
export default function TrackPageView({ event, params }: Props) {
  useEffect(() => {
    track(event, params ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
