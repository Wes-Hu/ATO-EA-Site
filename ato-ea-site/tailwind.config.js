/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {    
      colors: {
      'azure': '#487FC0',
      'old-gold': '#FFAE3B',
      'dark-blue': '#2F6BA4',
      'dark-gold': '#D08735',
      },
      screens: {
        'cus': '1170px',
        // => @media (min-width: 992px) { ... }
      },
    },

  },
  plugins: [],
}

