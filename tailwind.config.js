/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff0f6',
          100: '#ffe0ed',
          200: '#ffc2db',
          300: '#ffa3c8',
          400: '#ff86b6',
          500: '#F8C8DC', // blush pink
          600: '#e5496e',
          700: '#d03459',
          800: '#b02a4a',
          900: '#92243e',
        },
        secondary: {
          DEFAULT: '#D4AF37', // gold
        },
        neutral: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d9d9d9',
          300: '#c4c4c4',
          400: '#9d9d9d',
          500: '#7b7b7b',
          600: '#555555',
          700: '#434343',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}