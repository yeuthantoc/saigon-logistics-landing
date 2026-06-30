import { STATS } from '@/lib/content';

export default function TrustStrip() {
  return (
    <section className="reveal-fade border-y-2 border-ink bg-teal text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-8 md:grid-cols-4 md:py-10">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-extrabold leading-none sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1.5 text-sm font-medium text-teal-tint">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
