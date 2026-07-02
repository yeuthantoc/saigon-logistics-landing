import Image from 'next/image';
import { LP } from '@/lib/landing-1a';
import TelLink from './TelLink';

export default function Footer() {
  return (
    <footer className="bg-lp-navy-deep">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-3 px-4 py-7 sm:flex-row sm:px-8 lg:px-12">
        <div className="flex items-center gap-2.5">
          <Image
            src={LP.logo}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="text-[13px] text-lp-placeholder">
            © 2026 Saigon Logistics · TP. Hồ Chí Minh
          </span>
        </div>
        <span className="text-[13px] text-lp-placeholder">
          Hotline 24/7:{' '}
          <TelLink source="landing1a_footer" className="font-bold text-white hover:underline">
            {LP.hotline}
          </TelLink>
        </span>
      </div>
    </footer>
  );
}
