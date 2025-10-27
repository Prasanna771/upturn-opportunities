/** @type {import('tailwindcss').Config} */
module.exports = {

  
  
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ... other colors
        'upturn-blue': '#007BFF', // <-- ADD THIS LINE (or use your own hex code)
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        heading: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};