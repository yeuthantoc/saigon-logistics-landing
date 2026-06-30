import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Bricolage_Grotesque, Be_Vietnam_Pro } from 'next/font/google';
import { SITE } from '@/lib/site';
import './globals.css';

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// next/font downloads & self-hosts fonts at build time — no Google CDN request at runtime.
// It also auto-generates font-metric overrides (size-adjust, ascent-override, etc.)
// on the fallback stack, eliminating layout shift during font swap.
const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const fontSans = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Gửi hàng đi Mỹ, Úc, Âu & quốc tế | SAIGON LOGISTICS',
    template: '%s | SAIGON LOGISTICS',
  },
  description:
    'Gửi hàng đi Mỹ, gửi hàng đi nước ngoài nhanh – an toàn – minh bạch. SAIGON LOGISTICS lo trọn đóng gói, hải quan, giao tận cửa. Báo giá cước trong 5 phút qua Zalo.',
  keywords: [
    'gửi hàng đi Mỹ',
    'gửi hàng đi nước ngoài',
    'chuyển phát nhanh quốc tế',
    'gửi hàng đi Úc',
    'gửi hàng đi Canada',
    'gửi hàng đi châu Âu',
    'gửi quà đi nước ngoài',
    'ship hàng quốc tế',
    'SAIGON LOGISTICS',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Gửi hàng đi Mỹ, Úc, Âu & quốc tế | SAIGON LOGISTICS',
    description:
      'Chuyển phát nhanh quốc tế: gửi hàng đi Mỹ, Úc, Canada, châu Âu, Nhật, Hàn, Singapore. Báo giá minh bạch trong 5 phút.',
    images: [{ url: `${SITE.url}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gửi hàng đi Mỹ, Úc, Âu & quốc tế | SAIGON LOGISTICS',
    description:
      'Chuyển phát nhanh quốc tế nhanh – an toàn – minh bạch. Báo giá cước trong 5 phút qua Zalo.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'logistics',
};

export const viewport: Viewport = {
  themeColor: '#1a6fa8',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      slogan: SITE.tagline,
      areaServed: ['US', 'AU', 'CA', 'EU', 'GB', 'JP', 'KR', 'SG'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SITE.hotlineTel,
        contactType: 'customer service',
        availableLanguage: ['vi'],
      },
    },
    {
      '@type': 'Service',
      '@id': `${SITE.url}/#service`,
      serviceType: 'Chuyển phát nhanh quốc tế',
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: 'Worldwide',
      description:
        'Dịch vụ gửi hàng đi Mỹ, Úc, Canada, châu Âu, Nhật, Hàn, Singapore: đóng gói, khai báo hải quan, giao tận cửa, theo dõi đơn realtime.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'VND',
        url: SITE.url,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <head>
        {/* Preconnect to flag CDN so first flag renders without extra DNS round-trip */}
        <link rel="preconnect" href="https://flagcdn.com" />
        {/* Preload the default (US) flag shown above the fold in RateEstimator */}
        <link rel="preload" as="image" href="https://flagcdn.com/80x60/us.png" />
        {/* Speculation Rules: prefetch same-origin pages on hover (moderate = ~200ms hover) */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prefetch: [
                {
                  where: {
                    and: [
                      { href_matches: '/*' },
                      { not: { href_matches: '/api/*' } },
                    ],
                  },
                  eagerness: 'moderate',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="no-tap-highlight" suppressHydrationWarning>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics 4 */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
