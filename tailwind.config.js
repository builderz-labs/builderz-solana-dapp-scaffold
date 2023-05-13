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
            "builderz-green": "#14f195",
        "builderz-blue": "#00ffd5",
      },
      animation: {

      },
      screens: {
 
      },
 
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
