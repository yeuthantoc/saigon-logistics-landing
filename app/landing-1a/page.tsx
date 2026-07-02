import type { Metadata } from 'next';
import Navbar from '@/components/landing-1a/Navbar';
import Hero from '@/components/landing-1a/Hero';
import StatsBand from '@/components/landing-1a/StatsBand';
import Services from '@/components/landing-1a/Services';
import Pricing from '@/components/landing-1a/Pricing';
import Partners from '@/components/landing-1a/Partners';
import Testimonials from '@/components/landing-1a/Testimonials';
import Faq from '@/components/landing-1a/Faq';
import ContactCta from '@/components/landing-1a/ContactCta';
import Footer from '@/components/landing-1a/Footer';

// Landing option 1a — "Sáng & thân thiện" (docs/design_handoff_landing_1a).
// Bản preview phương án thiết kế, chạy song song trang chủ hiện tại.
// noindex: tránh trùng nội dung với trang chủ khi chưa chốt phương án.
export const metadata: Metadata = {
  title: 'Gửi hàng đi quốc tế nhanh như chớp — bao thuế DDP',
  description:
    'Vận chuyển express đi Mỹ, Úc, Châu Âu & toàn cầu. Giao nhanh bao thuế DDP — người nhận không phải trả thêm bất kỳ chi phí nào.',
  robots: { index: false, follow: false },
};

export default function Landing1aPage() {
  return (
    // -mb triệt tiêu padding-bottom mobile của <body> (chỗ cho FloatingContact
    // — đã ẩn trên route này) để footer chạm đáy màn hình.
    <div className="-mb-[calc(72px_+_env(safe-area-inset-bottom))] bg-white font-sans text-lp-navy md:mb-0">
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <Services />
        <Pricing />
        <Partners />
        <Testimonials />
        <Faq />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
