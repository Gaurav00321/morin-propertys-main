import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1A3C5E',
          secondary: '#C8922A',
          accent: '#2E7D5E',
          light: '#F5F0E8',
          surface: '#FFFFFF',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#5A6477',
          muted: '#9AA3AF',
        },
        border: '#E2E8F0',
        success: '#2E7D5E',
        warning: '#C8922A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(26,60,94,0.08)',
        'card-hover': '0 12px 40px rgba(26,60,94,0.16)',
        'cta': '0 8px 32px rgba(200,146,42,0.30)',
        'nav': '0 2px 20px rgba(26,60,94,0.08)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        'count-up': 'countUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
