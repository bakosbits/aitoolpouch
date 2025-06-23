/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#3F3F44',
        brandLight: '#F7F7F7',
      },
    },
  },
  plugins: [],
}
