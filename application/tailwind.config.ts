import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greyBlack: "#222426",
        bluishGray: "#374151",
        grayishBlue: "#4B5563",
        almostBlack: "rgba(27, 33, 36, 0.9)",
        turquoise: "#0392a8",
        danger: "#E53935",
        primary: "#0392a8",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
