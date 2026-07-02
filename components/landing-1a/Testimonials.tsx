import { LP_TESTIMONIALS } from '@/lib/landing-1a';

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-8 lg:px-12">
        <h2 className="mb-9 text-center text-3xl font-extrabold text-lp-navy sm:text-[34px]">
          Khách hàng nói gì? <span className="emoji" aria-hidden>💬</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {LP_TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-3.5 rounded-[18px] bg-lp-blue-soft p-[26px]"
            >
              <div className="text-base tracking-[2px] text-lp-gold" aria-label="5 sao">
                ★★★★★
              </div>
              <blockquote className="text-[14.5px] leading-[1.65] text-lp-slate">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <div
                  className={`flex h-[42px] w-[42px] items-center justify-center rounded-full font-bold text-white ${
                    t.tone === 'blue' ? 'bg-lp-blue' : 'bg-lp-orange'
                  }`}
                  aria-hidden
                >
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-bold text-lp-navy">{t.name}</div>
                  <div className="text-[12.5px] text-lp-muted">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
