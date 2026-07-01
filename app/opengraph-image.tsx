import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 76,
              height: 76,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              border: '3px solid #251a12',
              background: '#ef5226',
              color: 'white',
              fontSize: 42,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 800, color: '#251a12' }}>
            {SITE.name}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 800,
            color: '#251a12',
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          Gửi hàng đi Mỹ, Úc, Âu &amp; quốc tế
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 30, color: '#0e7c6b', fontWeight: 700 }}>
          Nhanh · An toàn · Minh bạch — Báo giá 5 phút qua Zalo
        </div>
      </div>
    ),
    { ...size },
  );
}
