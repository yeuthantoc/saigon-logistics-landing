import { ImageResponse } from 'next/og';
import { ROUTES } from '@/lib/routes';
import { SITE } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return ROUTES.map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const route = ROUTES.find((r) => r.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#fff6ed',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 56,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              border: '3px solid #251a12',
              background: '#ef5226',
              color: 'white',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 800, color: '#251a12' }}>
            {SITE.name}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 58,
            fontWeight: 800,
            color: '#251a12',
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {route?.h1 ?? SITE.name}
        </div>
        {route && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              marginTop: 36,
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: '14px 28px',
                borderRadius: 14,
                border: '3px solid #251a12',
                background: '#ef5226',
                color: 'white',
                fontSize: 34,
                fontWeight: 800,
              }}
            >
              Từ {route.priceFrom.replace('₫', 'đ')}
            </div>
            <div
              style={{
                display: 'flex',
                padding: '14px 28px',
                borderRadius: 14,
                border: '3px solid #251a12',
                background: 'white',
                color: '#0e7c6b',
                fontSize: 34,
                fontWeight: 800,
              }}
            >
              {route.eta}
            </div>
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
