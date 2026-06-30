import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ROUTES } from '@/lib/routes';
import { RATES } from '@/lib/rates';

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
    </>
  );
}
