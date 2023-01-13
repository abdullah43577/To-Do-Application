/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*/*.js"],
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
        lightGrayishBlueHover: "hsl(236, 33%, 92%)",
        darkGrayishBlue: "hsl(234, 11%, 52%)",
        veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
        veryDarkGrayishBlue2: "hsl(237, 14%, 26%)",

        // primary
        brightBlue: "hsl(220, 98%, 61%)",

        // Light Background
        veryLightGray: "hsl(0, 0%, 98%)",
        veryLightGrayishBlue: "hsl(236, 33%, 92%)",
        lightGrayishBlue2: "hsl(233, 11%, 84%)",
        darkGrayishBlue2: "hsl(236, 9%, 61%)",
        veryDarkGrayishBlue3: "hsl(235, 19%, 35%)",
      },
    },
  },
  plugins: [],
};
