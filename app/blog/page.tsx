import type { Metadata } from 'next';
import Link from 'next/link';

import { BLOG_POSTS } from '@/lib/blog';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Cẩm Nang Gửi Hàng Quốc Tế',
  description:
    'Cẩm nang gửi hàng quốc tế: hàng cấm gửi đi Mỹ, cách đóng gói đúng chuẩn, quy định hải quan — cập nhật liên tục từ SAIGON LOGISTICS.',
  alternates: { canonical: '/blog' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}/blog`,
      name: 'Cẩm Nang Gửi Hàng Quốc Tế',
      url: `${SITE.url}/blog`,
      inLanguage: 'vi',
      provider: { '@id': `${SITE.url}/#organization` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Cẩm nang', item: `${SITE.url}/blog` },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'Danh sách bài viết cẩm nang',
      numberOfItems: BLOG_POSTS.length,
      itemListElement: BLOG_POSTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.title,
        url: `${SITE.url}/blog/${p.slug}`,
      })),
    },
  ],
};

export default function BlogHubPage() {
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
                <li className="font-semibold text-ink">Cẩm nang</li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Cẩm Nang Gửi Hàng Quốc Tế
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              Kiến thức thực tế về hàng cấm, đóng gói, hải quan — giúp bạn gửi hàng
              quốc tế an toàn và đúng quy định.
            </p>
          </div>
        </section>

        <section className="cv-auto bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
            <div className="grid gap-6 sm:grid-cols-2">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border-2 border-ink bg-white p-6 shadow-hard transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                >
                  <h2 className="font-display text-lg font-extrabold text-ink group-hover:text-coral">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t-2 border-ink/10 pt-4">
                    <time dateTime={post.updated} className="text-xs text-muted-2">
                      Cập nhật {post.updatedLabel}
                    </time>
                    <span className="text-sm font-semibold text-teal group-hover:underline">
                      Đọc tiếp →
                    </span>
                  </div>
                </Link>
              ))}
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
