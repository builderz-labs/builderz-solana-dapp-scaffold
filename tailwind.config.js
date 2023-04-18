module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {

      },
      colors: {


      },
      animation: {

      },
      screens: {
 
      },
 
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
