/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',
        secondary: '#121212',
        card: '#1a1a1a',
        accent: '#c9a84c',
        accentHover: '#d4b85a',
        accentLight: '#f0d080',
        textPrimary: '#ffffff',
        textSecondary: '#b0b0b0',
        textMuted: '#888888',
        border: 'rgba(201, 168, 76, 0.15)',
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(201, 168, 76, 0.3)' },
          '50%': { textShadow: '0 0 40px rgba(201, 168, 76, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}