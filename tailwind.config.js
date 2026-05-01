/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#06060a',
        surface: '#0d0d14',
        accent: '#A78BFA',
        accent2: '#F472B6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(167,139,250,0.4)',
        'glow-sm': '0 0 20px -8px rgba(167,139,250,0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marker-pulse': 'markerPulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        markerPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
