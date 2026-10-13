/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070A09',
          900: '#0B0F0E', // Deep Forest Black base
          850: '#0E1412',
          800: '#111715', // Panel / card surface
          750: '#141C18',
          700: '#17201D', // Elevated surface
          600: '#1E2B26', // Border subtle
          500: '#283832', // Border active
        },
        parchment: {
          50: '#FAF9F6',
          100: '#F7F4EB', // Warm Ivory / Parchment primary text
          200: '#EDE8DC', // Soft ivory
          300: '#DDD8CA',
          400: '#C2BCAD',
          500: '#A39D8E',
        },
        stone: {
          muted: '#8A948E',
          dim: '#636E68',
          faint: '#434D48',
        },
        emerald: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
          faint: '#064E3B',
          glow: 'rgba(16, 185, 129, 0.15)',
        },
        amber: {
          DEFAULT: '#D97706',
          light: '#F59E0B',
          soft: '#FDE68A',
          glow: 'rgba(217, 119, 6, 0.15)',
        },
        teal: {
          DEFAULT: '#0D9488',
          light: '#14B8A6',
          dark: '#115E59',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'cinematic': '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.12)',
        'glow-amber': '0 0 30px rgba(217, 119, 6, 0.12)',
        'subtle-border': 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
