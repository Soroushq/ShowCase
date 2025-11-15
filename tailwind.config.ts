import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#ffffff',
          secondary: '#f9fafb',
          accent: '#9333ea',
          text: '#111827',
        },
        dark: {
          primary: '#111827',
          secondary: '#1f2937',
          accent: '#22c55e',
          text: '#f3f4f6',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sahel: ['var(--font-sahel)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        rtl: ['var(--font-sahel)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': ['clamp(0.75rem, 0.68rem + 0.5vw, 0.875rem)', { lineHeight: '1.4' }],
        'fluid-sm': ['clamp(0.8125rem, 0.72rem + 0.6vw, 0.9375rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(0.875rem, 0.8rem + 0.6vw, 1rem)', { lineHeight: '1.6' }],
        'fluid-lg': ['clamp(1rem, 0.9rem + 0.8vw, 1.25rem)', { lineHeight: '1.4' }],
        'fluid-xl': ['clamp(1.125rem, 1rem + 1vw, 1.5rem)', { lineHeight: '1.3' }],
        'fluid-2xl': ['clamp(1.25rem, 1.05rem + 1.8vw, 1.875rem)', { lineHeight: '1.2' }],
        'fluid-3xl': ['clamp(1.5rem, 1.15rem + 2.6vw, 2.25rem)', { lineHeight: '1.15' }],
        'fluid-4xl': ['clamp(1.75rem, 1.3rem + 3.4vw, 2.75rem)', { lineHeight: '1.1' }],
      },
      spacing: {
        'fluid-pt': 'clamp(2.5rem, 2rem + 2vw, 4rem)',
        'fluid-pb': 'clamp(2.5rem, 2rem + 2vw, 4rem)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'skill-fill': 'skillFill 2s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        skillFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--skill-width)' },
        },
      },
    },
  },
  plugins: [],
}

export default config