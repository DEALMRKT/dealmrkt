/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0b0e14",
        card: "#161b22",
        primary: "#2563eb",
      },
    },
  },
  plugins: [],
}
