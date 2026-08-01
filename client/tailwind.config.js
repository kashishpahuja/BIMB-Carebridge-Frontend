/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B192C',
          lightNavy: '#1E3E62',
          gold: '#C5A059',
          green: '#4E9F3D',
          lightBg: '#F8F9FA'
        }
      }
    },
  },
  plugins: [],
};