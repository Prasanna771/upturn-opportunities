/** @type {import('tailwindcss').Config} */
module.exports = {
  // REMOVED: The 'darkMode: "class"' line has been deleted
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        heading: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};