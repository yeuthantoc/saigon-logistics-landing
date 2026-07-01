import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BLOG_POSTS } from '@/lib/blog';
import { ROUTES } from '@/lib/routes';
import { SITE } from '@/lib/site';
import { btn } from '@/lib/ui';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: [post.keyword, 'gửi hàng quốc tế', 'SAIGON LOGISTICS'],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = ROUTES.filter((r) => post.relatedSlugs.includes(r.slug));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Cẩm nang', item: `${SITE.url}/blog` },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `${SITE.url}/blog/${post.slug}`,
          },
        ],
      },
      {
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        author: { '@id': `${SITE.url}/#organization` },
        publisher: { '@id': `${SITE.url}/#organization` },
        dateModified: `${post.updated}-01`,
        mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
        inLanguage: 'vi',
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <section className="border-b-2 border-ink bg-cream">
          <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm font-medium text-muted">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-coral">
                    Trang chủ
                  </Link>
                </li>
                <li aria-hidden className="select-none">/</li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-coral">
                    Cẩm nang
                  </Link>
                </li>
                <li aria-hidden className="select-none">/</li>
                <li className="font-semibold text-ink">{post.title}</li>
              </ol>
            </nav>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-muted-2">
              <time dateTime={post.updated}>Cập nhật: {post.updatedLabel}</time>
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {post.intro}
            </p>
          </div>
        </section>

        <section className="cv-auto bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
            <article className="space-y-10">
              {post.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-display text-2xl font-extrabold text-ink">
                    {section.heading}
                  </h2>
                  <ul className="mt-4 list-disc space-y-2.5 pl-5 text-base leading-relaxed text-ink">
                    {section.body.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>

            {related.length > 0 && (
              <div className="mt-14 rounded-2xl border-2 border-ink bg-cream p-6 shadow-hard">
                <h2 className="font-display text-lg font-extrabold text-ink">
                  Tuyến liên quan
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/tuyen/${r.slug}`}
                      className="rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-semibold text-teal shadow-hard-xs hover:underline"
                    >
                      {r.h1} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href={SITE.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className={btn('coral')}
              >
                <span className="emoji">💬</span> Hỏi Zalo về trường hợp của bạn
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
