/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'search-bg': 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgb(214 211 209)), url("/searchBG.png")',
        'footer-bg': "url('/footer.png')",
      },
    },
  },
  plugins: [],
}
