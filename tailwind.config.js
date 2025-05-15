/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        hasna: {
          purple: '#7432B4',
        },
      },
      aspectRatio: {
        '1/1': '1 / 1',
      },
    },
  },
  plugins: [],
};