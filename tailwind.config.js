/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important:"#root",
  theme: {
    extend: {
      colors:{
        "blue-fut-paz":"#004b85",
        "blue-fut-paz-400":"#004b85ad", //004b85
        "blue-fut-paz-900":"#023d6b" //#023d6b
      }
    },
  },
  plugins: [],
}