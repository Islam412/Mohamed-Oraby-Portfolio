/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ألوان الوضع المظلم
        dark: {
          primary: '#0a0a0a',
          secondary: '#121212',
          card: '#1a1a1a',
          text: '#ffffff',
          textSecondary: '#b0b0b0',
          textMuted: '#888888',
          border: 'rgba(201, 168, 76, 0.15)',
        },
        // ألوان الوضع الفاتح
        light: {
          primary: '#f8f6f0',
          secondary: '#f0ede6',
          card: '#ffffff',
          text: '#1a1a1a',
          textSecondary: '#4a4a4a',
          textMuted: '#888888',
          border: 'rgba(201, 168, 76, 0.2)',
        },
        gold: '#c9a84c',
        goldLight: '#f0d080',
        goldDark: '#b8963a',
        primary: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          dark: '#000000',
        },
        secondary: {
          DEFAULT: '#121212',
          light: '#1e1e1e',
          dark: '#0a0a0a',
        },
        card: {
          DEFAULT: '#1a1a1a',
          light: '#242424',
          dark: '#111111',
        },
        textPrimary: '#ffffff',
        textSecondary: '#b0b0b0',
        textMuted: '#888888',
        border: 'rgba(201, 168, 76, 0.15)',
        accent: '#c9a84c',
        accentHover: '#d4b85a',
        accentLight: '#f0d080',
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 4s ease-in-out infinite',
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
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        borderGlow: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
}