import Image from 'next/image';
import { LP, LP_NAV, lpBtn } from '@/lib/landing-1a';
import TelLink from './TelLink';

export default function Navbar() {
  return (
    <header className="border-b border-lp-line bg-white">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <Image
            src={LP.logo}
            alt={LP.brand}
            width={52}
            height={52}
            priority
            className="h-[52px] w-[52px] rounded-[10px] object-cover"
          />
          <div>
            <div className="text-[17px] font-extrabold tracking-[.02em] text-lp-navy">
              {LP.brand}
            </div>
            <div className="text-[10.5px] font-semibold tracking-[.14em] text-lp-orange">
              {LP.tagline}
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-7">
          {/* <640px: chỉ còn logo + nút gọi (theo handoff) */}
          <div className="hidden items-center gap-7 sm:flex">
            {LP_NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14.5px] font-semibold text-lp-slate transition-colors duration-150 hover:text-lp-blue"
              >
                {l.label}
              </a>
            ))}
          </div>
          <TelLink
            source="landing1a_nav"
            className={lpBtn('primary', 'px-[22px] py-[11px] text-[14.5px]')}
          >
            {/* ︎: ép ☎ render dạng text đơn sắc (trắng), không thành emoji màu */}
            <span aria-hidden>{'☎︎'}</span> {LP.hotline}
          </TelLink>
        </nav>
      </div>
    </header>
  );
}
