import { AUDIENCE } from '@/lib/content';

const TONE: Record<string, string> = {
  peach: 'bg-peach',
  teal: 'bg-teal-tint',
};

export default function Audience() {
  return (
    <section id="dich-vu" className="reveal cv-auto border-t-2 border-ink bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Giải pháp cho từng nhu cầu
          </h2>
          <p className="mt-2 text-muted">
            Dù bạn gửi quà cho người thân hay vận hành chuỗi xuất khẩu — đều có
            gói phù hợp.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((a) => (
            <div
              key={a.title}
              className={`flex flex-col rounded-2xl border-2 border-ink p-5 shadow-hard ${TONE[a.tone]}`}
            >
              <span
                className="emoji flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink bg-white text-2xl shadow-hard-xs"
                aria-hidden
              >
                {a.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-ink">
                {a.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/80">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
