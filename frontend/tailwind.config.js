/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "signup-bg": "url('/src/assets/x_logo.png')",
        "pg-image": "url('/src/assets/pg.png')",
        "login-image": "url('/src/assets/login-image.jpg')",
        "piggy-img": "url('/src/assets/pg.jpg')",
      },
      backgroundSize: {
        50: "50%",
        75: "75%",
      },
      colors: {
        Dark: "#1F1F22", //#1B1B1E
      },
    },
  },
  plugins: [],
};
