import type { Metadata } from 'next';
import Link from 'next/link';

import { ROUTES } from '@/lib/routes';
import { RATES, flagUrl, fmtVnd } from '@/lib/rates';
import { SITE } from '@/lib/site';
import { btn } from '@/lib/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Bảng Giá Gửi Hàng Quốc Tế 2026',
  description:
    'Bảng giá cước gửi hàng quốc tế 6 tuyến: Mỹ, Úc, Canada, châu Âu, Nhật, Singapore. Cập nhật tháng 7/2026. Door-to-door, hỗ trợ hải quan. Báo giá trong 5 phút qua Zalo.',
  keywords: [
    'bảng giá gửi hàng quốc tế',
    'cước phí gửi hàng đi nước ngoài',
    'gửi hàng quốc tế',
    'chuyển phát nhanh quốc tế',
    'SAIGON LOGISTICS',
  ],
  alternates: { canonical: '/tuyen' },
  openGraph: {
    title: 'Bảng Giá Gửi Hàng Quốc Tế 2026 | SAIGON LOGISTICS',
    description:
      'Bảng giá cước 6 tuyến quốc tế: Mỹ, Úc, Canada, EU, Nhật, Singapore. Cập nhật tháng 7/2026.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}/tuyen`,
      name: 'Bảng Giá Gửi Hàng Quốc Tế 2026',
      description:
        'Bảng giá cước 6 tuyến quốc tế từ Việt Nam: Mỹ, Úc, Canada, châu Âu, Nhật & Hàn, Singapore.',
      url: `${SITE.url}/tuyen`,
      inLanguage: 'vi',
      provider: { '@id': `${SITE.url}/#organization` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ',
            item: SITE.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Bảng giá gửi hàng quốc tế',
            item: `${SITE.url}/tuyen`,
          },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Danh sách tuyến gửi hàng quốc tế',
      numberOfItems: ROUTES.length,
      itemListElement: ROUTES.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.h1,
        url: `${SITE.url}/tuyen/${r.slug}`,
      })),
    },
  ],
};

export default function TuyenHubPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="border-b-2 border-ink bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm font-medium text-muted">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-coral">
                    Trang chủ
                  </Link>
                </li>
                <li aria-hidden className="select-none">
                  /
                </li>
                <li className="font-semibold text-ink">Tuyến gửi hàng</li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Bảng Giá Gửi Hàng
              <br className="hidden sm:block" /> Quốc Tế 2026
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              Cước phí door-to-door 6 tuyến từ Việt Nam — đã bao gồm đóng gói, hỗ trợ
              hải quan, giao tận địa chỉ người nhận.{' '}
              <time dateTime="2026-07" className="text-sm text-muted-2">
                Cập nhật: Tháng 7/2026
              </time>
            </p>
          </div>
        </section>

        {/* ── Route cards ── */}
        <section className="cv-auto bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ROUTES.map((r) => {
                const rate = RATES[r.rateKey];
                return (
                  <Link
                    key={r.slug}
                    href={`/tuyen/${r.slug}`}
                    className="group flex flex-col rounded-2xl border-2 border-ink bg-white p-6 shadow-hard transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center gap-3">
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
                      <h2 className="font-display text-xl font-extrabold text-ink">
                        {r.country}
                      </h2>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border-2 border-ink/25 bg-cream px-3 py-2.5 text-center">
                        <div className="text-xs font-medium text-muted">Thời gian</div>
                        <div className="mt-1 font-display text-base font-extrabold text-ink">
                          {rate.eta}
                        </div>
                      </div>
                      <div className="rounded-xl border-2 border-ink/25 bg-cream px-3 py-2.5 text-center">
                        <div className="text-xs font-medium text-muted">Giá từ</div>
                        <div className="mt-1 font-display text-base font-extrabold text-coral">
                          {fmtVnd(rate.perKg)}
                          <span className="text-xs font-bold text-ink">/kg</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center border-t-2 border-ink/10 pt-4">
                      <span className="text-sm font-semibold text-teal group-hover:underline">
                        Xem chi tiết &amp; báo giá →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="reveal cv-auto border-t-2 border-ink bg-coral">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center md:py-20">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Chưa biết chọn tuyến nào?
            </h2>
            <p className="mt-3 text-white/90">
              Nhắn Zalo — nhân viên tư vấn và báo giá chính xác trong 5 phút.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className={btn('white')}
              >
                <span className="emoji">💬</span> Chat Zalo ngay
              </a>
              <a href={`tel:${SITE.hotlineTel}`} className={btn('ink')}>
                <span className="emoji">📞</span> {SITE.hotline}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <LeadForm />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
