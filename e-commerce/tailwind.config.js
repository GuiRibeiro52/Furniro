/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
      colors: {
        secondary: '#9F9F9F',
        botton: '#faf3ea',
        tertiary: '#898989',
        quartiary: "#f4f5f7",
        button: '#b88e2f',
        focused: "#3a3a3a"
      }, 
    },
  },
  plugins: [],
}
