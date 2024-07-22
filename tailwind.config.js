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
        volkhov: "Volkhov"
      },
      colors: {
        primaryblue: "#029BC5",
        bluehover: "#007798",
        primaryblack: "#212832",
        primaryred: "#DF6951",
        redhover: "#BF4F39",
        primaryyellow: '#F1A501',
        yellowhover: '#F19101',
        secondaryyellow: '#FFF1DA',
        primarygreen: '#10b981',
        primarygray: '#5E6282',
      },
      boxShadow: {
        'cardfacilities': '0 35px 50px -20px rgba(0, 0, 0, 0.2)',
        'dropdown': '0 10px 40px -12px rgba(0, 0, 0, 0.2)',
        'navbar': '0 20px 40px -26px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        typing: "typing 3s steps(35) infinite alternate, blink .6s infinite"
      }
    }
  }
};