// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "[data-theme='dark']", ".dark"], // already supports dark:
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light theme (default when .light is active)
        background: {
          DEFAULT: "#ffffff",
          950: "#f8f9fa",
        },
        foreground: "#111827",
        primary: "#3b82f6",
        // Dark theme
        "dark-background": "#0f172a",
        "dark-foreground": "#f1f5f9",
        // Blue theme
        "blue-background": "#0e1a38",
        "blue-foreground": "#e0f2fe",
        "blue-primary": "#60a5fa",
      },
    },
  },
  plugins: [],
};
