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
        cream: '#fff6ed',
        ink: '#251a12',
        coral: {
          DEFAULT: '#ef5226',
          dark: '#d8420f',
          light: '#ff8b5e',
        },
        teal: {
          DEFAULT: '#0e7c6b',
          tint: '#dcf0ec',
        },
        peach: '#fce9de',
        muted: {
          DEFAULT: '#6b5d52',
          2: '#8a7a6c',
        },
        // Chữ trên nền tối
        'on-dark': '#c4b5a8',
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        hard: '6px 6px 0 #251a12',
        'hard-sm': '4px 4px 0 #251a12',
        'hard-lg': '9px 9px 0 #251a12',
        'hard-xs': '2px 2px 0 #251a12',
      },
    },
  },
  plugins: [],
};

export default config;
