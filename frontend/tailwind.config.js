/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "signup-bg": "url('/src/assets/x_logo.png')",
      },
      colors: {
        Dark: "#1F1F22", //#1B1B1E
      },
    },
  },
  plugins: [],
};
