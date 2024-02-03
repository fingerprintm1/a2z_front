/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },

      colors: {
        transparent: "transparent",
        current: "currentColor",
        fp1: "#ffbb22",
        fp2: "#3939ff",
        fp3: "#ff3636",
        fpDark1: "#111827",
        fpDark2: "#25293C",
        fpDark3: "#212438",
        fpBlack: "#1c1d1f",
        fpLightGray: "#B8B8B8",
        fpDarkGray: "#919191",
        fpLightBack: "#e6e6e6",
        success: "#3FDB77",
        error: "#FF375B",
        warning: "#FF9040",
        info: "#00ACD8",
      },
      boxShadow: {
        dev: "0 0 12px rgba(0, 0, 0, 0.3)",
      },
      screens: {
        sm: {max: "1024px"},
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
