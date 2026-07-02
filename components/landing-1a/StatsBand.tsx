import { LP_STATS } from '@/lib/landing-1a';

export default function StatsBand() {
  return (
    <section className="bg-lp-blue">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-6 px-4 py-[34px] text-center sm:px-8 lg:grid-cols-4 lg:px-12">
        {LP_STATS.map((s) => (
          <div key={s.label}>
            <div
              className={`text-4xl font-extrabold ${
                s.highlight ? 'text-lp-gold-light' : 'text-white'
              }`}
            >
              {s.value}
            </div>
            <div className="text-[13.5px] font-medium text-lp-blue-pale">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
