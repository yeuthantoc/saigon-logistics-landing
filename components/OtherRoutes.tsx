import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { flagUrl, fmtShortVnd, RATES } from '@/lib/rates';

interface Props {
  currentSlug: string;
}

const PRICE_COLORS = ['text-coral', 'text-teal'];

export default function OtherRoutes({ currentSlug }: Props) {
  const others = ROUTES.filter((r) => r.slug !== currentSlug);

  return (
    <section className="reveal cv-auto border-t-2 border-ink bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Xem thêm tuyến khác
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((r, i) => {
            const rate = RATES[r.rateKey];
            return (
              <Link
                key={r.slug}
                href={`/tuyen/${r.slug}`}
                className="group flex flex-col items-start rounded-2xl border-2 border-ink bg-white p-5 shadow-hard-sm transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                <img
                  src={flagUrl(r.rateKey, 48)}
                  srcSet={`${flagUrl(r.rateKey, 48)} 1x, ${flagUrl(r.rateKey, 96)} 2x`}
                  width={48}
                  height={36}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="rounded"
                />
                <h3 className="mt-3 font-display text-xl font-extrabold text-ink">
                  {r.country}
                </h3>
                <p className="mt-1 text-sm font-medium text-muted">
                  {rate.eta} · door-to-door
                </p>
                <div className="mt-4 flex w-full items-end justify-between">
                  <span className="text-sm text-muted-2">từ</span>
                  <span
                    className={`font-display text-2xl font-extrabold ${PRICE_COLORS[i % PRICE_COLORS.length]}`}
                  >
                    {fmtShortVnd(rate.perKg)}
                    <span className="text-base font-bold text-ink">/kg</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
