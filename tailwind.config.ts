import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // ✅ Required for next-themes to work correctly
  darkMode: 'class',

  theme: {
    extend: {
      /* ==============================
       * COLORS CONFIGURATION
       * ============================== */
      colors: {
        light: {
          primary: '#ffffff', // White background for light mode
          secondary: '#f9fafb',
          accent: '#9333ea', // Purple accent
          text: '#111827',   // Dark text color
        },
        dark: {
          primary: '#111827', // Deep gray for dark background
          secondary: '#1f2937',
          accent: '#22c55e',  // Green accent
          text: '#f3f4f6',    // Light text
        },
      },

      /* ==============================
       * FONT FAMILY
       * ============================== */
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sahel: ['Sahel', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        rtl: ['Sahel', 'system-ui', 'sans-serif'], // Used for Farsi RTL
      },

      /* ==============================
       * ANIMATIONS
       * ============================== */
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

      /* ==============================
       * KEYFRAMES
       * ============================== */
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

      /* ==============================
       * BACKDROP BLUR
       * ============================== */
      backdropBlur: {
        xs: '2px',
      },

      /* ==============================
       * SPACING
       * ============================== */
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },

  /* ==============================
   * PLUGINS
   * ============================== */
  plugins: [],
}

export default config
