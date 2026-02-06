// tailwind.config.ts
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  darkMode: ["class", "[data-theme='dark']", ".dark"],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,

        // your custom tokens
        background: {
          DEFAULT: "#ffffff",
          950: "#f8f9fa",
        },
        foreground: "#111827",
        primary: "#3b82f6",

        "dark-background": "#0f172a",
        "dark-foreground": "#f1f5f9",

        "blue-background": "#0e1a38",
        "blue-foreground": "#e0f2fe",
        "blue-primary": "#60a5fa",
      },
    },
  },
  plugins: [],
};
