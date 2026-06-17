import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (mode-aware, backed by CSS vars in index.css)
        bg: "var(--color-bg)",
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
          sunken: "var(--color-surface-sunken)"
        },
        ink: {
          DEFAULT: "var(--color-text)",
          soft: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)"
        },
        line: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)"
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          ink: "var(--color-primary-ink)",
          on: "var(--color-on-primary)"
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          on: "var(--color-on-accent)"
        },
        panel: {
          DEFAULT: "var(--color-panel)",
          on: "var(--color-on-panel)"
        },
        focus: "var(--color-focus)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-error)",
        info: "var(--color-info)",
        // Static brand ramps (mode-independent literal stops)
        emerald: {
          50: "#e9f5f0", 100: "#c7e8dc", 200: "#94d4c0", 300: "#5cbda0", 400: "#27a082",
          500: "#008a65", 600: "#00785a", 700: "#00614a", 800: "#064b3a", 900: "#0b382c"
        },
        stone: {
          paper: "#faf8f3", 100: "#e8e3d8", 200: "#d7d1c2", 300: "#bbb4a2", 400: "#948c7b",
          500: "#6f6757", 600: "#524b3e", 700: "#3a352c", 800: "#262220", 900: "#161310"
        },
        clay: { 400: "#d9774e", 500: "#c25a3a", 600: "#a6492e" }
      },
      fontFamily: {
        display: ['"Anton"', '"Arial Narrow"', "Impact", "sans-serif"],
        sans: ['"Hanken Grotesk"', '"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    }
  },
  plugins: []
} satisfies Config;
