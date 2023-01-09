/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      colors: {
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        lightGrayishBlue: "hsl(234, 39%, 85%)",
      },
    },
  },
  plugins: [],
};
