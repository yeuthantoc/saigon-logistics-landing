import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        cream:         '#fff6ed',
        ink:           '#251a12',
        coral:         '#ef5226',
        'coral-dark':  '#d8420f',
        'coral-light': '#ff8b5e',
        teal:          '#0e7c6b',
        'teal-tint':   '#dcf0ec',
        peach:         '#fce9de',
        muted:         '#6b5d52',
        'muted-2':     '#8a7a6c',
        'ink-soft':    '#c4b5a8',

        // ---- Landing option 1a (docs/design_handoff_landing_1a) ----
        // Namespace lp-* để không đụng palette mặc định (orange, blue-50…)
        // và token hiện có (muted). Tên gốc trong handoff ghi ở comment.
        'lp-navy':        '#10233f', // navy — heading, panel CTA tối
        'lp-navy-deep':   '#0b1a30', // navy-deep — nền footer
        'lp-blue':        '#2f6fd6', // primary — nút, stats band, giá
        'lp-blue-tint':   '#eef4fd', // primary-tint — chip/nút tint
        'lp-blue-soft':   '#f4f8fe', // blue-50 — nền section & card
        'lp-blue-pale':   '#c9dcf8', // label trên nền primary (stats)
        'lp-orange':      '#e8641f', // orange — badge, tra cứu, hotline
        'lp-orange-tint': '#fdeee4', // orange-tint — nền card cam
        'lp-gold':        '#f2a51a', // gold — sao đánh giá
        'lp-gold-light':  '#ffd28a', // gold-light — stat nổi bật, giá card đậm
        'lp-slate':       '#31435e', // link nav, chữ quote
        'lp-body':        '#4a5b74', // body hero
        'lp-body-2':      '#5a6c86', // body card/FAQ
        'lp-muted':       '#7a8ba3', // chữ phụ
        'lp-placeholder': '#8ea1bc', // placeholder, chữ footer
        'lp-line':        '#e8edf5', // viền navbar
        'lp-line-2':      '#e2eaf6', // viền card giá / FAQ
        'lp-line-3':      '#dde7f4', // viền input / tracking bar
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        hard:        '6px 6px 0 #251a12',
        'hard-sm':   '4px 4px 0 #251a12',
        'hard-lg':   '9px 9px 0 #251a12',
        'hard-xs':   '2px 2px 0 #251a12',
        'hard-hover':'5px 5px 0 #251a12',

        // ---- Landing option 1a — bóng mềm (soft shadow) ----
        'lp-btn':  '0 8px 20px rgba(47,111,214,.3)',   // nút primary
        'lp-chip': '0 10px 26px rgba(16,35,63,.14)',   // chip nổi trên hero
        'lp-pop':  '0 16px 36px rgba(47,111,214,.32)', // card giá "phổ biến nhất"
        'lp-bar':  '0 4px 14px rgba(16,35,63,.05)',    // thanh tra cứu vận đơn
      },
    },
  },
  plugins: [],
};

export default config;
