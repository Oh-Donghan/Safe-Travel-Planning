/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'my-bg': '#333D79',
        'my-text': '#FAEBEF',
        'my-text2': '#dda94b',
      },
      outline: {
        'normal': ['outline: 2px solid #FAEBEF', '2px'],
        'dark': ['outline: 2px solid #dda94b', '2px']
      }
    },
  },
  plugins: [],
};
