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
        'search-bg': 'linear-gradient(to bottom , rgba(46, 16, 101, 0.65), rgba(30, 27, 75)), url("/footer.png")',
        'footer-bg': "url('/footer.png')",
      },
    },
  },
  plugins: [],
}
