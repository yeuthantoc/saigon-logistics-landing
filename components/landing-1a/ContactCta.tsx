import { LP } from '@/lib/landing-1a';
import TelLink from './TelLink';
import ContactForm from './ContactForm';

export default function ContactCta() {
  return (
    <section id="lien-he" className="scroll-mt-4 bg-white">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid items-center gap-8 rounded-[24px] bg-lp-navy p-6 sm:p-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="mb-3.5 text-[28px] font-extrabold text-white sm:text-[32px]">
              Gửi hàng ngay hôm nay <span className="emoji" aria-hidden>📦</span>
            </h2>
            <p className="mb-[26px] text-[15.5px] leading-[1.6] text-[#a9bcd8]">
              Để lại thông tin, tư vấn viên gọi lại trong 15 phút. Hoặc gọi
              thẳng hotline:
            </p>
            <TelLink
              source="landing1a_contact"
              className="inline-flex items-center gap-3 rounded-full bg-lp-orange px-[30px] py-4 text-[22px] font-extrabold text-white transition duration-150 ease-out hover:-translate-y-px hover:bg-[#d55c1d]"
            >
              {/* ︎: ép ☎ render dạng text đơn sắc (trắng), không thành emoji màu */}
              <span aria-hidden>{'☎︎'}</span> {LP.hotline}
            </TelLink>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
