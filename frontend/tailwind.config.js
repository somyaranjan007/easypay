/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-yellow": "#FFCC6F",
        "app-red": "#EA7364",
        "app-light-blue": "#8EC8DB",
        "app-blue": "#5D73F1",
        "app-gray": "#9C9C9C",
        "app-brown": "#665243",
      },
      backgroundImage: {
        "app-gradient": `url("/app-gradient.svg")`,
        "public-gradient": `url("/public-gradient.svg")`,
        "private-gradient": `url("/private-gradient.svg")`,
        "withdraw-gradient": `linear-gradient(103deg, rgba(250,221,182,1) 0%, rgba(148,131,108,1) 100%)`,
      },
    },
  },
  plugins: [],
});
