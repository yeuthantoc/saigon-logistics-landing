import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE } from '@/lib/site';
import { btn, CARD } from '@/lib/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Chính Sách Bồi Thường',
  description:
    `Chính sách bồi thường khi gửi hàng quốc tế tại ${SITE.name}: mức bồi thường, điều kiện, quy trình khiếu nại minh bạch.`,
  alternates: { canonical: '/chinh-sach-boi-thuong' },
};

const POLICY_ITEMS = [
  {
    title: 'Hàng thất lạc',
    desc: 'Bồi thường tối đa theo giá trị khai báo trên vận đơn, không vượt quá mức bảo hiểm đã mua (nếu có).',
  },
  {
    title: 'Hàng hư hỏng do vận chuyển',
    desc: 'Bồi thường theo tỷ lệ thiệt hại thực tế, có biên bản giám định kèm hình ảnh khi nhận hàng.',
  },
  {
    title: 'Giao trễ so với ETA',
    desc: 'Hoàn một phần phí vận chuyển theo số ngày trễ nếu nguyên nhân từ phía đơn vị vận chuyển.',
  },
  {
    title: 'Không áp dụng',
    desc: 'Hàng cấm gửi theo quy định hải quan nước nhận, khai báo sai giá trị/nội dung, hoặc chậm trễ do hải quan giữ hàng kiểm tra.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/chinh-sach-boi-thuong`,
      url: `${SITE.url}/chinh-sach-boi-thuong`,
      name: 'Chính Sách Bồi Thường',
      inLanguage: 'vi',
      isPartOf: { '@id': `${SITE.url}/#organization` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Chính sách bồi thường',
            item: `${SITE.url}/chinh-sach-boi-thuong`,
          },
        ],
      },
    },
  ],
};

export default function CompensationPolicyPage() {
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
                <li className="font-semibold text-ink">Chính sách bồi thường</li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Chính Sách Bồi Thường
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              {SITE.name} cam kết minh bạch trong xử lý sự cố vận chuyển. Dưới đây là
              các trường hợp và mức bồi thường áp dụng.{' '}
              <time dateTime="2026-07" className="text-sm text-muted-2">
                Cập nhật: Tháng 7/2026
              </time>
            </p>
          </div>
        </section>

        <section className="cv-auto bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
            <div className="grid gap-5 sm:grid-cols-2">
              {POLICY_ITEMS.map((item) => (
                <div key={item.title} className={`${CARD} p-6`}>
                  <h2 className="font-display text-lg font-extrabold text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 space-y-4 text-base leading-relaxed text-ink">
              <h2 className="font-display text-2xl font-extrabold text-ink">
                Quy trình khiếu nại
              </h2>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Liên hệ hotline hoặc Zalo trong vòng 48 giờ kể từ khi phát hiện sự cố.</li>
                <li>Cung cấp mã vận đơn, hình ảnh/video hàng hoá và mô tả sự cố.</li>
                <li>SAIGON LOGISTICS xác minh với đối tác vận chuyển trong 3–5 ngày làm việc.</li>
                <li>Hoàn tất bồi thường qua chuyển khoản hoặc trừ vào đơn hàng kế tiếp.</li>
              </ol>
              <p className="text-sm text-muted-2">
                Chính sách áp dụng cho đơn hàng gửi qua {SITE.name}, phối hợp cùng đối
                tác {SITE.carriers.join(', ')}. Liên hệ sale để biết chi tiết mức bảo
                hiểm theo từng loại hàng.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <a href={SITE.zaloLink} target="_blank" rel="noopener noreferrer" className={btn('coral')}>
                <span className="emoji">💬</span> Chat Zalo khiếu nại
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
