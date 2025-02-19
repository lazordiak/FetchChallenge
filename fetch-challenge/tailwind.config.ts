import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nightBlack: "#0A0A0A",
        whiteSmoke: "#F5F5F5",
        darkMoss: "#606C38",
        deepForest: "#283618",
        cornsilk: "#FEFAE0",
        earthYellow: "#DDA15E",
        tigersEye: "#BC6C25",
        parchment: "#F0EDE5",
      },
    },
  },
  plugins: [],
} satisfies Config;
