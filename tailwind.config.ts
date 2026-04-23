import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        surface: {
          void: '#05060A',
          nebula: '#0B0F1E',
          elevated: '#141829',
          ridge: '#1C2238',
        },
        brand: {
          aurora: '#4B6BFB',
          stardust: '#B19CF4',
          halo: '#7DD3FC',
        },
        ink: {
          50: '#F4F6FB',
          100: '#E5E9F2',
          200: '#CBD2E1',
          300: '#A2ABC2',
          400: '#7882A0',
          500: '#545E7B',
          600: '#3A4361',
          700: '#262D47',
          800: '#171C30',
          900: '#0B0F1E',
        },
        state: {
          success: '#34D399',
          warn: '#FBBF24',
          danger: '#F87171',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '500' }],
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '500' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '500' }],
        'display-md': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-sm': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'overline': ['0.75rem', { lineHeight: '1', letterSpacing: '0.12em' }],
      },
      spacing: {
        'section': '8rem',
        'section-lg': '12rem',
      },
      borderRadius: {
        'pill': '999px',
      },
      backgroundImage: {
        'mesh-hero': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(75,107,251,0.28), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(177,156,244,0.18), transparent 60%), radial-gradient(ellipse 70% 60% at 20% 80%, rgba(125,211,252,0.12), transparent 70%)',
        'mesh-cta': 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(75,107,251,0.35), rgba(177,156,244,0.15) 40%, transparent 70%)',
        'grid-faint': 'linear-gradient(to right, rgba(177,156,244,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(177,156,244,0.05) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-edge': '0 0 40px rgba(125, 211, 252, 0.25)',
        'glow-aurora': '0 0 60px rgba(75, 107, 251, 0.35)',
        'glow-soft': '0 0 24px rgba(177, 156, 244, 0.15)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'apple-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
