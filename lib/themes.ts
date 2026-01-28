export const themes = {
  dark: {
    // Main backgrounds - Very dark, almost black
    bg: "bg-[#0a0a0a]",
    bgCard: "bg-[#141414]",
    bgSidebar: "bg-[#0f0f0f]",

    // Borders - Subtle dark borders
    border: "border-[#1f1f1f]",

    // Text colors
    text: "text-gray-100",
    textMuted: "text-gray-500",

    // Interactive elements
    hover: "hover:bg-[#1a1a1a]",
    active: "bg-[#1f1f1f]",

    // Input fields
    input: "bg-[#161616] border-[#242424] text-white placeholder:text-white/50",
    select: "border-[#242424] bg-[#161616]",
    button: "bg-white text-black",

    // Table
    tableHover: "hover:bg-[#161616]",

    // Stats cards
    stats: {
      green: "text-green-400 ",
      yellow: "text-yellow-400",
      blue: "text-blue-400",
      red: "text-red-400",
    },
  },

  light: {
    // Main backgrounds
    bg: "bg-gray-50",
    bgCard: "bg-white",
    bgSidebar: "bg-white",

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
    button: "bg-blue-600 hover:bg-blue-700 text-white",

    // Table
    tableHover: "hover:bg-gray-50",

    // Stats cards
    stats: {
      green: "text-green-700",
      yellow: "text-yellow-700",
      blue: "text-blue-700",
      red: "text-red-700",
    },
  },

  blue: {
    // Main backgrounds - This is your old dark theme (gray-based)
    bg: "bg-slate-950",
    bgCard: "bg-[#090f1f]",
    bgSidebar: "bg-[#090f1f]",

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
    button: "bg-white hover:bg-blue-700 text-black font-semibold",

    // Table
    tableHover: "hover:bg-gray-800/50",

    // Stats cards
    stats: {
      green: "text-green-400",
      yellow: "text-yellow-400",
      blue: "text-blue-400",
      red: "text-red-400",
    },
  },
};

export type ThemeColors = typeof themes.dark;
// ```

// ## Key Changes:

// ### **Dark Theme (New - True Black)**
// - Background: `#0a0a0a` (very dark, almost pure black)
// - Cards: `#141414` (slightly lighter dark)
// - Sidebar: `#0f0f0f` (between main bg and cards)
// - Borders: `#1f1f1f` (subtle dark borders)
// - Minimal opacity on stat cards for cleaner look
// - More subtle hover states

// ### **Light Theme (Unchanged)**
// - Clean white and light gray
// - Good contrast for readability

// ### **Blue Theme (Your Old Dark Theme)**
// - The previous gray-950/gray-900 colors
// - Maintained the exact styling you had before

// ## Visual Comparison:

// **Dark Mode (`#0a0a0a`):**
// ```
// Background: Almost pure black (#0a0a0a)
// Cards: Very dark gray (#141414)
// Feel: OLED-friendly, high contrast, modern
// ```

// **Blue Mode (Previous Dark):**
// ```
// Background: Dark gray (gray-950)
// Cards: Medium dark gray (gray-900)
// Feel: Softer, less intense, classic dark mode
// ```

// **Light Mode:**
// ```
// Background: Light gray (gray-50)
// Cards: Pure white
// Feel: Clean, bright, professional

// export const themes = {
//   dark: {
//     // Main backgrounds
//     bg: "bg-gray-950",
//     bgCard: "bg-gray-900",
//     bgSidebar: "bg-gray-900",

//     // Borders
//     border: "border-gray-800",

//     // Text colors
//     text: "text-gray-100",
//     textMuted: "text-gray-400",

//     // Interactive elements
//     hover: "hover:bg-gray-800",
//     active: "bg-blue-900/40 text-blue-400",

//     // Input fields
//     input: "bg-gray-800 border-gray-700 text-white",

//     // Table
//     tableHover: "hover:bg-gray-800/50",

//     // Stats cards
//     stats: {
//       green: "bg-green-500/20 text-green-400",
//       yellow: "bg-yellow-500/20 text-yellow-400",
//       blue: "bg-blue-500/20 text-blue-400",
//       red: "bg-red-500/20 text-red-400",
//     },
//   },

//   light: {
//     // Main backgrounds
//     bg: "bg-gray-50",
//     bgCard: "bg-white",
//     bgSidebar: "bg-white",

//     // Borders
//     border: "border-gray-200",

//     // Text colors
//     text: "text-gray-900",
//     textMuted: "text-gray-600",

//     // Interactive elements
//     hover: "hover:bg-gray-100",
//     active: "bg-blue-100 text-blue-600",

//     // Input fields
//     input: "bg-gray-50 border-gray-300 text-gray-900",

//     // Table
//     tableHover: "hover:bg-gray-50",

//     // Stats cards
//     stats: {
//       green: "bg-green-100 text-green-700",
//       yellow: "bg-yellow-100 text-yellow-700",
//       blue: "bg-blue-100 text-blue-700",
//       red: "bg-red-100 text-red-700",
//     },
//   },

//   blue: {
//     // Main backgrounds
//     bg: "bg-blue-950",
//     bgCard: "bg-blue-900/50",
//     bgSidebar: "bg-blue-900",

//     // Borders
//     border: "border-blue-800",

//     // Text colors
//     text: "text-blue-50",
//     textMuted: "text-blue-300",

//     // Interactive elements
//     hover: "hover:bg-blue-800/50",
//     active: "bg-blue-700 text-blue-100",

//     // Input fields
//     input: "bg-blue-800/50 border-blue-700 text-blue-50",

//     // Table
//     tableHover: "hover:bg-blue-800/30",

//     // Stats cards
//     stats: {
//       green: "bg-green-500/20 text-green-300",
//       yellow: "bg-yellow-500/20 text-yellow-300",
//       blue: "bg-blue-500/30 text-blue-200",
//       red: "bg-red-500/20 text-red-300",
//     },
//   },
// };

// export type ThemeColors = typeof themes.dark;
