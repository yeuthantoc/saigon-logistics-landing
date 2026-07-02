'use client';

import { SITE } from '@/lib/site';
import { btn, BADGE } from '@/lib/ui';
import { openLeadForm, track } from '@/lib/analytics';
import { yieldToMain } from '@/lib/yield';
import { flagUrl, type RateKey } from '@/lib/rates';
import RateEstimator from './RateEstimator';
import ContactLink from './ContactLink';

interface Props {
  slug: string;
  country: string;
  eta: string;
  priceFrom: string;
  h1: string;
  intro: string;
  rateKey: RateKey;
}

export default function HeroTuyen({ slug: _slug, country, eta, priceFrom, h1, intro, rateKey }: Props) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16 lg:gap-14">
        {/* Cột trái */}
        <div>
          <div className={`${BADGE} bg-coral-light text-ink`}>
            <span className="emoji">🚀</span>
            Door-to-door · {eta} · từ {priceFrom}
          </div>

          <h1 className="mt-5 font-display text-[2rem] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl sm:leading-[1.1] md:text-[2.7rem]">
            {h1}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              className={btn('coral', 'text-base')}
              onClick={async () => {
                track('select_content', { content_type: 'lead_cta', source: `hero_tuyen_${rateKey}` });
                await yieldToMain();
                openLeadForm({ route: rateKey, source: `hero_tuyen_${rateKey}` });
              }}
            >
              Nhận báo giá đi {country} →
            </button>
            <ContactLink
              href={`tel:${SITE.hotlineTel}`}
              method="phone"
              source={`hero_tuyen_${rateKey}`}
              variant="white"
              className="text-base"
            >
              <span className="emoji">📞</span> Hotline {SITE.hotline}
            </ContactLink>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <img
              src={flagUrl(rateKey, 40)}
              srcSet={`${flagUrl(rateKey, 40)} 1x, ${flagUrl(rateKey, 80)} 2x`}
              width={40}
              height={30}
              alt=""
              aria-hidden
              className="rounded shadow-hard-xs"
            />
            <span className="text-sm font-semibold text-muted">
              Tuyến {country}
            </span>
          </div>
        </div>

        {/* Cột phải — widget ước tính cước */}
        <div className="md:pl-2">
          <RateEstimator defaultCountry={rateKey} />
        </div>
      </div>
    </section>
  );
}
