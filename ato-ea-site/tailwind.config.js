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
        'cus': '1237px',
        'cusxl': '1440px'
        // => @media (min-width: 992px) { ... }
      },
      backgroundImage: {
        'am': "url('/src/assets/AM.jpg')",
        'ato-house': "url('/src/assets/ATOHouse.png')",
        'ato-old': "url('/src/assets/ATOold.jpeg')",
        'alumni-home': "url('/src/assets/AlumniHome.jpeg')",
        'contact': "url('/src/assets/Contact.jpeg')",
        'emr': "url('/src/assets/EMR.jpg')",
        'oag': "url('/src/assets/OAG.jpg')",
        'philo': "url('/src/assets/philo/Philo.jpg')",
      },
    },

  },
  plugins: [],
}

