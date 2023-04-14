/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: "Source Sans Pro, sans-serif",
      },
      width: {
        99: "calc(100vw - 1rem)",
      },
    },
    fontFamily: {
      display: "Overpass, sans-serif",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
    themes: [
      {
        mythemes: {
          primary: "#e42024",
          secondary: "#d74871",
          accent: "#d9b88e",
        },
      },
    ],
  },
}
