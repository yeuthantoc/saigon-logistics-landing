import { LP_SERVICES } from '@/lib/landing-1a';

export default function Services() {
  return (
    <section id="dich-vu" className="scroll-mt-4 bg-white">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-8 lg:px-12">
        <div className="mb-10 text-center">
          <div className="mb-2.5 text-[13.5px] font-bold tracking-[.12em] text-lp-orange">
            DỊCH VỤ
          </div>
          <h2 className="text-3xl font-extrabold text-lp-navy sm:text-[34px]">
            Bạn cần gửi gì, chúng tôi lo trọn
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LP_SERVICES.map((s) => (
            <div
              key={s.title}
              className={`flex flex-col gap-3 rounded-[18px] px-[22px] py-[26px] ${
                s.tone === 'blue' ? 'bg-lp-blue-soft' : 'bg-lp-orange-tint'
              }`}
            >
              <div
                className={`flex h-[52px] w-[52px] items-center justify-center rounded-[14px] text-2xl ${
                  s.tone === 'blue' ? 'bg-lp-blue' : 'bg-lp-orange'
                }`}
              >
                <span className="emoji" aria-hidden>{s.emoji}</span>
              </div>
              <div className="text-[17px] font-bold text-lp-navy">{s.title}</div>
              <div className="text-[13.5px] leading-[1.55] text-lp-body-2">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
