import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE } from '@/lib/site';
import { STATS } from '@/lib/content';
import { btn, CARD } from '@/lib/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi',
  description:
    `${SITE.name} — ${SITE.legalName}, hơn 12 năm kinh nghiệm chuyển phát nhanh quốc tế từ Việt Nam đi Mỹ, Úc, Canada, châu Âu, Nhật, Hàn, Singapore.`,
  alternates: { canonical: '/ve-chung-toi' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE.url}/ve-chung-toi`,
      url: `${SITE.url}/ve-chung-toi`,
      name: 'Về Chúng Tôi',
      inLanguage: 'vi',
      mainEntity: { '@id': `${SITE.url}/#organization` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Về chúng tôi', item: `${SITE.url}/ve-chung-toi` },
        ],
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b-2 border-ink bg-cream">
          <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm font-medium text-muted">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-coral">
                    Trang chủ
                  </Link>
                </li>
                <li aria-hidden className="select-none">/</li>
                <li className="font-semibold text-ink">Về chúng tôi</li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Về {SITE.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              {SITE.legalName} — đơn vị chuyển phát nhanh quốc tế với hơn 12 năm kinh
              nghiệm, đã giao hơn 500.000 đơn hàng từ Việt Nam đến hơn 30 quốc gia.
            </p>
          </div>
        </section>

        <section className="cv-auto bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className={`${CARD} p-5 text-center`}>
                  <div className="font-display text-3xl font-extrabold text-coral">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-muted">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-14 space-y-6 text-base leading-relaxed text-ink">
              <h2 className="font-display text-2xl font-extrabold text-ink">
                Hành trình của chúng tôi
              </h2>
              <p>
                {SITE.name} thành lập với sứ mệnh giúp người Việt gửi hàng, gửi quà ra
                nước ngoài một cách nhanh chóng, minh bạch và đáng tin cậy. Từ những
                đơn hàng đầu tiên gửi cho du học sinh, chúng tôi mở rộng thành đơn vị
                phục vụ cả cá nhân lẫn doanh nghiệp xuất khẩu, với mạng lưới đối tác
                vận chuyển quốc tế uy tín: {SITE.carriers.join(', ')}.
              </p>
              <p>
                Mỗi đơn hàng đều được theo dõi realtime, đóng gói đúng chuẩn quốc tế
                và hỗ trợ trọn gói thủ tục hải quan — để khách hàng chỉ cần một việc:
                đặt hàng và chờ nhận.
              </p>

              <h2 className="font-display text-2xl font-extrabold text-ink">
                Cam kết với khách hàng
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Báo giá minh bạch, không phát sinh phí ẩn.</li>
                <li>Theo dõi đơn hàng realtime từ lúc lấy hàng đến khi giao tận tay.</li>
                <li>
                  Hỗ trợ bồi thường theo{' '}
                  <Link href="/chinh-sach-boi-thuong" className="font-semibold text-teal underline-offset-2 hover:underline">
                    chính sách bồi thường
                  </Link>{' '}
                  công khai.
                </li>
                <li>Tư vấn hải quan và quy định nhập khẩu từng quốc gia.</li>
              </ul>

              <p className="text-sm text-muted-2">
                {SITE.legalName} · MST {SITE.taxCode} · {SITE.address}
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <a href={SITE.zaloLink} target="_blank" rel="noopener noreferrer" className={btn('coral')}>
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
