/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  darkMode: 'media', // Disable dark mode
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
