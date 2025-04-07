/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        customPulse: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.15)' }, // Peak at 80% opacity
        },
      },
      animation: {
        slideLeft: 'slideLeft 0.5s ease-out forwards',
        slideRight: 'slideRight 0.5s ease-out forwards',
        customPulse: 'customPulse 2s ease-in-out infinite',
      },
      colors: {
        background: '#121212',
        surface: '#2E2E2E',
        textPrimary: '#EAEAEA',
        textSecondary: '#A6A6A6',
        accent: '#D0DDD0',
        button: '#EFF3EA',
        navbar: '#191919',
        border: '#2A2A2A',
      },
    }
    ,
  },
  plugins: [],
}

