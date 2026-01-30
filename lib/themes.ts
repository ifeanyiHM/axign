export const themes = {
  dark: {
    // Main backgrounds
    bg: "bg-[#0a0a0a]",
    bgCard: "bg-[#141414]",
    bgSidebar: "bg-[#0f0f0f]",
    cardShadow: "0 1px 1px rgba(0, 0, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.35)",

    // Borders - Subtle dark borders
    border: "border-[#1f1f1f]",

    // Text colors
    text: "text-gray-100",
    textMuted: "text-gray-400",

    // Interactive elements
    hover: "hover:bg-[#1a1a1a]",
    active: "bg-[#1f1f1f]",

    // Input fields
    input: "bg-[#161616] border-[#242424] text-white placeholder:text-white/50",
    select: "border-[#242424] bg-[#161616]",
    button: "bg-white hover:bg-gray-200 text-black",

    // Table
    tableHover: "hover:bg-[#161616]",

    // Stats cards
    stats: {
      green: "text-green-400 ",
      yellow: "text-yellow-400",
      blue: "text-blue-400",
      red: "text-red-400",
    },

    scrollbar: "custom-scrollbar-dark",
  },

  light: {
    // Main backgrounds
    bg: "bg-gray-50",
    bgCard: "bg-white",
    bgSidebar: "bg-white",
    cardShadow: "0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.06)",

    // Borders
    border: "border-gray-200",

    // Text colors
    text: "text-gray-900",
    textMuted: "text-gray-600",

    // Interactive elements
    hover: "hover:bg-gray-100",
    active: "bg-gray-100 font-semibold",

    // Input fields
    input: "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500",
    select: "bg-gray-50 border-gray-300",
    button: "bg-gray-800 hover:bg-gray-700 text-white",

    // Table
    tableHover: "hover:bg-gray-50",

    // Stats cards
    stats: {
      green: "text-green-700",
      yellow: "text-yellow-700",
      blue: "text-blue-700",
      red: "text-red-700",
    },
    scrollbar: "custom-scrollbar-light",
  },

  blue: {
    // Main backgrounds
    bg: "bg-slate-950",
    bgCard: "bg-[#090f1f]",
    bgSidebar: "bg-[#090f1f]",
    cardShadow:
      "0 1px 2px rgba(31, 41, 55, 0.45), 0 10px 28px rgba(31, 41, 55, 0.25)",

    // Borders
    border: "border-gray-800",

    // Text colors
    text: "text-gray-100",
    textMuted: "text-gray-400",

    // Interactive elements
    hover: "hover:bg-gray-900",
    active: "bg-gray-900",

    // Input fields
    input: "bg-gray-900 border-gray-800 text-white placeholder:text-white/50",
    select: "border-gray-800 bg-gray-900",
    button:
      "bg-white hover:bg-blue-950 hover:text-gray-200 text-black font-semibold",

    // Table
    tableHover: "hover:bg-gray-800/50",

    // Stats cards
    stats: {
      green: "text-green-400",
      yellow: "text-yellow-400",
      blue: "text-blue-400",
      red: "text-red-400",
    },
    scrollbar: "custom-scrollbar-blue",
  },
};

export type ThemeColors = typeof themes.dark;
