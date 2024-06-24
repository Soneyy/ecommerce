const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
        lato: ['"Lato"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#544c5d",
        "primary-dark": "#0D0E43",
        "primary-light": "#E7E6EF",
        secondary: {
          100: "#FB2E86",
          200: "#a78bfa",
          300:"#9333ea"
        },
      },
      screens: {
        sm: "576px", // mobile landscape mode
        md: "768px", // tablet
        lg: "1024px", // laptop without side numerical keypad
        xl: "1280px", // normal desktop
        xxl: "1400px", // huge monitor
      },
    },
  },
  plugins: [],
};
