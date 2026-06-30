import { ImageResponse } from 'next/og';

export const alt = 'SAIGON LOGISTICS — Gửi hàng đi Mỹ, Úc, Âu & quốc tế';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FONT_BASE =
  'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/bevietnampro';

export default async function Image() {
  // Nhúng font có dấu tiếng Việt; nếu fetch lỗi vẫn render (fallback mặc định).
  let fonts: { name: string; data: ArrayBuffer; weight: 600 | 800 }[] = [];
  try {
    const [extraBold, semiBold] = await Promise.all([
      fetch(`${FONT_BASE}/BeVietnamPro-ExtraBold.ttf`).then((r) => r.arrayBuffer()),
      fetch(`${FONT_BASE}/BeVietnamPro-SemiBold.ttf`).then((r) => r.arrayBuffer()),
    ]);
    fonts = [
      { name: 'BeVietnam', data: extraBold, weight: 800 },
      { name: 'BeVietnam', data: semiBold, weight: 600 },
    ];
  } catch {
    fonts = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#fff6ed',
          padding: '64px',
          fontFamily: 'BeVietnam',
          border: '16px solid #251a12',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 84,
              height: 84,
              backgroundColor: '#ef5226',
              border: '5px solid #251a12',
              borderRadius: 18,
              color: '#fff',
              fontSize: 52,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: '#251a12',
              letterSpacing: -1,
            }}
          >
            SAIGON LOGISTICS
          </div>
        </div>

        {/* Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#251a12',
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Gửi hàng đi Mỹ, Úc, Âu &amp; quốc tế
          </div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                backgroundColor: '#ef5226',
                color: '#fff',
                fontSize: 34,
                fontWeight: 800,
                padding: '8px 22px',
                borderRadius: 14,
                border: '4px solid #251a12',
                transform: 'rotate(-1.5deg)',
              }}
            >
              Báo giá cước trong 5 phút
            </div>
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: '#6b5d52',
          }}
        >
          Đóng gói · Hải quan · Giao tận cửa · Theo dõi realtime
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
