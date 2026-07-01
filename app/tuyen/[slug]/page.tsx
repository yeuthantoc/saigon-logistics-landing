import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ROUTES } from '@/lib/routes';
import { RATES } from '@/lib/rates';
import { SITE } from '@/lib/site';

import Header from '@/components/Header';
import HeroTuyen from '@/components/HeroTuyen';
import TrustStrip from '@/components/TrustStrip';
import RouteHighlight from '@/components/RouteHighlight';
import Tips from '@/components/Tips';
import FaqSection from '@/components/FaqSection';
import Audience from '@/components/Audience';
import ProcessSteps from '@/components/ProcessSteps';
import CtaBand from '@/components/CtaBand';
import OtherRoutes from '@/components/OtherRoutes';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';
import TrackPageView from '@/components/TrackPageView';

const AREA_SERVED: Record<string, string | string[]> = {
  us: 'US',
  au: 'AU',
  ca: 'CA',
  eu: ['DE', 'FR', 'GB', 'NL', 'IT', 'ES', 'BE', 'PL', 'SE', 'DK'],
  jp: ['JP', 'KR'],
  sg: 'SG',
};

function parseEta(eta: string): { min: number; max: number } {
  const m = eta.match(/(\d+)[–-](\d+)/);
  return m ? { min: +m[1], max: +m[2] } : { min: 3, max: 7 };
}

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return ROUTES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = ROUTES.find((r) => r.slug === slug);
  if (!route) return {};
  return {
    title: route.title,
    description: route.description,
    keywords: [route.keyword, 'gửi hàng đi nước ngoài', 'chuyển phát nhanh quốc tế', 'SAIGON LOGISTICS'],
    alternates: { canonical: `/tuyen/${route.slug}` },
    openGraph: {
      title: route.title,
      description: route.description,
    },
  };
}

export default async function TuyenPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const route = ROUTES.find((r) => r.slug === slug);
  if (!route) notFound();

  const rate = RATES[route.rateKey];
  const { min: etaMin, max: etaMax } = parseEta(rate.eta);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tuyến gửi hàng',
            item: `${SITE.url}/tuyen`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: route.h1,
            item: `${SITE.url}/tuyen/${route.slug}`,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${SITE.url}/tuyen/${route.slug}#service`,
        name: route.h1,
        description: route.description,
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: AREA_SERVED[route.rateKey] ?? route.country,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'VND',
          availability: 'https://schema.org/InStock',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: String(rate.perKg),
            priceCurrency: 'VND',
            unitCode: 'KGM',
            unitText: 'kg',
          },
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          businessDays: {
            '@type': 'QuantitativeValue',
            minValue: etaMin,
            maxValue: etaMax,
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: route.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <TrackPageView event="view_route" params={{ route_slug: route.slug }} />
      <Header />
      <main>
        <HeroTuyen
          slug={route.slug}
          country={route.country}
          eta={route.eta}
          priceFrom={route.priceFrom}
          h1={route.h1}
          intro={route.intro}
          rateKey={route.rateKey}
        />
        <TrustStrip />
        <RouteHighlight route={route} rate={rate} />
        <Tips country={route.country} tips={route.tips} />
        <FaqSection faqs={route.faqs} />
        <Audience />
        <ProcessSteps />
        <CtaBand />
        <OtherRoutes currentSlug={route.slug} />
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
