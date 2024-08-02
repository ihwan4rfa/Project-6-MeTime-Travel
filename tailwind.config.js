/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
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
        primaryyellow: "#F1A501",
        yellowprimary: "#F1A501",
        yellowhover: "#F19101",
        primarygreen: "#10b981",
        primarygray: "#5E6282",
      },
      boxShadow: {
        'card': '0 35px 50px -26px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 10px 40px -15px rgba(0, 0, 0, 0.15)',
        'navbar': '0 20px 40px -26px rgba(0, 0, 0, 0.15)',
        'navbar2': '0 20px 40px -23px rgba(0, 0, 0, 0.15)',
        'navbar3': '0 20px 40px -20px rgba(0, 0, 0, 0.15)',
        'label': '0 5px 20px -8px rgba(0, 0, 0, 0.1)',
        'hoverlabel': '0 5px 20px -8px rgba(0, 0, 0, 0.15)',
        'button': '0 6px 25px -8px rgba(0, 0, 0, 0.1)',
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
      },
      scale: {
        '103': '1.03',
      }
    },
    screens: {
      'xs': '490px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
  }
};