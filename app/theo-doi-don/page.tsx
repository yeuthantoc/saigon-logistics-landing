import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import TrackingLookup from '@/components/TrackingLookup';

export const metadata: Metadata = {
  title: `Theo dõi đơn hàng | ${SITE.name}`,
  description:
    'Tra cứu hành trình đơn hàng quốc tế của bạn theo mã tracking — cập nhật trạng thái realtime từ SAIGON LOGISTICS.',
  alternates: { canonical: '/theo-doi-don' },
};

export default async function TheoDoiDonPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-lg font-extrabold text-ink">
            {SITE.name}
          </Link>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Theo dõi đơn hàng
          </h1>
          <p className="mt-2 text-muted">
            Nhập mã tracking để xem trạng thái và hành trình đơn hàng quốc tế của bạn.
          </p>
        </div>

        <TrackingLookup initialCode={code ?? ''} />

        <p className="mt-8 text-center text-sm text-muted-2">
          Chưa có mã? Liên hệ hotline{' '}
          <a href={`tel:${SITE.hotlineTel}`} className="font-bold text-coral hover:underline">
            {SITE.hotline}
          </a>{' '}
          hoặc Zalo để được hỗ trợ.
        </p>
      </div>
    </main>
  );
}
