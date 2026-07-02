import { LP_PARTNERS } from '@/lib/landing-1a';

export default function Partners() {
  return (
    <section className="border-t border-[#eef2f8] bg-white">
      <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-8 lg:px-12">
        <div className="mb-[22px] text-center text-[13px] font-semibold tracking-[.1em] text-lp-placeholder">
          ĐỐI TÁC VẬN CHUYỂN &amp; KHÁCH HÀNG TIÊU BIỂU
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {LP_PARTNERS.map((n) => (
            <span
              key={n}
              className="rounded-[10px] bg-lp-blue-soft px-[26px] py-3 text-base font-extrabold tracking-[.06em] text-[#9fb2cc]"
            >
              {n}
            </span>
          ))}
          {/* TODO(handoff): thay 2 chip placeholder bằng logo khách hàng thật */}
          {[1, 2].map((i) => (
            <span
              key={i}
              className="rounded-[10px] bg-lp-blue-soft px-[26px] py-3 font-mono text-[13px] text-[#9fb2cc]"
            >
              logo khách hàng
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
