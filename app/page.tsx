import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import RouteGrid from '@/components/RouteGrid';
import Audience from '@/components/Audience';
import ProcessSteps from '@/components/ProcessSteps';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';
import LeadForm from '@/components/LeadForm';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <RouteGrid />
        <Audience />
        <ProcessSteps />
        <CtaBand />
      </main>
      <Footer />
      <LeadForm />
    </>
  );
}
