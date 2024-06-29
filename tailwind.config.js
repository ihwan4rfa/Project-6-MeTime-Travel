/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        primaryblue: "#029BC5",
        bluehover: "#007798",
        primaryblack: "#212832",
        primaryred: "#DF6951",
        redhover: "#BF4F39"
      }
    }
  }
};