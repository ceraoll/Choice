/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        'darken': ['0 6px 12px rgba(0, 0, 0, 0.1)'],
        'darken-top': ['0 -6px 12px rgba(0, 0, 0, 0.1)']
      }
    },
  },
  plugins: [],
}

