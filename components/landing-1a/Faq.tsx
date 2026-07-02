import { LP_FAQS } from '@/lib/landing-1a';

export default function Faq() {
  return (
    <section className="bg-lp-blue-soft">
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-8 lg:px-12">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-lp-navy sm:text-[34px]">
          Câu hỏi thường gặp
        </h2>

        <div className="mx-auto flex max-w-[760px] flex-col gap-3">
          {LP_FAQS.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-[14px] border border-lp-line-2 bg-white px-6 py-[18px]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-bold text-lp-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4 shrink-0 text-lp-muted transition-transform duration-200 group-open:rotate-180"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-[1.65] text-lp-body-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
