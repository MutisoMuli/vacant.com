/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#00134C',
        'navy-blue-light': '#001e73', // A lighter shade for hover effects
        'gold': '#D4AF37',
        'gold-light': '#e0c158', // A lighter shade for hover effects
        'gold-dark': '#b28f24', // A darker shade for hover effects
      },
    },
  },
  plugins: [],
}