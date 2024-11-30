/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "signup-bg": "url('/src/assets/x_logo.png')",
      },
      colors: {
        Darkgrayishviolet: "#352F44",
        DarkIndigo: "#5C5470",
        Linen: "#FAF0E6",
        Lightgray: "#F7F7F7",
      },
    },
  },
  plugins: [],
};
