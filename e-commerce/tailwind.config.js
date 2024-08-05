/** @type {import('tailwindcss').Config} */
export default  {
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
        focused: "#3a3a3a",
        subheader: "#f9f1e7",
        headers: '#333',
        paragraph: '#666',
        carousel: '#fcf8f3'
      }, 
    },
  },
  plugins: [],
}
