import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--page-bg)",
        surface: "var(--surface-primary)",
        card: "var(--surface-card)",
        panel: "var(--surface-panel)",
        visual: "var(--surface-visual)",
        ink: "var(--text-primary)",
        muted: "var(--text-secondary)",
        border: "var(--border-primary)",
        accent: "var(--accent)"
      },
      fontFamily: {
        sans: ['"Inter"', '"Helvetica Neue"', "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
