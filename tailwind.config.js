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
       
      },
      animation: {
        slideLeft: 'slideLeft 0.5s ease-out forwards',
        slideRight: 'slideRight 0.5s ease-out forwards',
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
    },
  },
  plugins: [],
}

