import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#ffffff",
        ink: "#111111",
        muted: "#545454",
        line: "#d6dce5",
        paper: "#fbfbf7",
        accent: "#e9e9d2",
        brand: "#00694e"
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
