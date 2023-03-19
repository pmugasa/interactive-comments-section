/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: " #5B5B9B",
        background: "#F5F6FA",
      },
    },
  },
  plugins: [],
};
