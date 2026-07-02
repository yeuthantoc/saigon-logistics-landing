import { Fragment } from 'react';
import { STEPS } from '@/lib/content';

export default function ProcessSteps() {
  return (
    <section id="theo-doi" className="reveal cv-auto border-y-2 border-ink bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Gửi hàng chỉ 4 bước
          </h2>
          <p className="mt-2 text-ink-soft">
            Đơn giản như nhắn tin — phần khó để tụi mình lo.
          </p>
        </div>

        <div className="mt-9 flex flex-col gap-5 md:flex-row md:items-stretch md:gap-2">
          {STEPS.map((s, i) => (
            <Fragment key={s.title}>
              <div className="flex-1 rounded-2xl border-2 border-white/15 bg-white/[0.04] p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="emoji flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-cream bg-coral text-2xl shadow-hard-xs"
                    aria-hidden
                  >
                    {s.icon}
                  </span>
                  <span className="rounded-full border-2 border-white/25 px-2.5 py-0.5 font-display text-xs font-bold tracking-wide text-ink-soft">
                    BƯỚC {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="hidden items-center justify-center md:flex"
                >
                  <span className="font-display text-3xl font-extrabold text-coral-light">
                    →
                  </span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
