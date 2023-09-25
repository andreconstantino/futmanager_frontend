/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "blue-fut-paz":"#004b85", //004b85
        "blue-fut-paz-900":"#023d6b" //#023d6b
      }
    },
  },
  plugins: [],
}