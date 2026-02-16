"use client";

import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { Loader2, Sparkles } from "lucide-react";

interface LoadingPageProps {
  message?: string;
  submessage?: string;
  variant?: "default" | "minimal" | "branded";
}

export default function LoadingPage({
  message = "Loading",
  submessage = "Please wait while we prepare your content",
  variant = "default",
}: LoadingPageProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  if (variant === "minimal") {
    return (
      <div
        className={`min-h-screen ${colors.bg} flex items-center justify-center`}
      >
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (variant === "branded") {
    return (
      <div
        className={`min-h-screen ${colors.bg} flex items-center justify-center p-6`}
      >
        <div className="text-center space-y-6 max-w-md">
          {/* Animated Logo/Brand */}
          <div className="relative mx-auto w-20 h-20">
            {/* Outer rotating ring */}
            <div
              className="absolute inset-0 border-4 border-blue-500/20 rounded-full animate-spin"
              style={{ animationDuration: "3s" }}
            />

            {/* Middle rotating ring */}
            <div
              className="absolute inset-2 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"
              style={{ animationDuration: "1.5s" }}
            />

            {/* Inner icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
          </div>

          {/* Brand name */}
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>

          {/* Loading message */}
          <div className="space-y-2">
            <p className={`text-sm ${colors.textMuted}`}>{message}...</p>

            {/* Animated progress dots */}
            <div className="flex items-center justify-center gap-1.5">
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`min-h-screen ${colors.bg} ${colors.text} flex items-center justify-center p-6`}
    >
      <div className="text-center space-y-8 max-w-md">
        {/* Spinner Container */}
        <div className="relative mx-auto">
          {/* Outer glow effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
          </div>

          {/* Main spinner */}
          <div className="relative flex items-center justify-center">
            {/* Rotating outer ring */}
            <div className="absolute w-20 h-20 border-4 border-gray-700/30 border-t-blue-500 rounded-full animate-spin" />

            {/* Rotating inner ring (opposite direction) */}
            <div
              className="absolute w-14 h-14 border-4 border-gray-700/30 border-b-purple-500 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            />

            {/* Center icon */}
            <Loader2
              className="w-8 h-8 text-blue-400 animate-spin"
              style={{ animationDuration: "2s" }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            {message}
            <span className="inline-flex ml-1">
              <span className="animate-pulse" style={{ animationDelay: "0ms" }}>
                .
              </span>
              <span
                className="animate-pulse"
                style={{ animationDelay: "200ms" }}
              >
                .
              </span>
              <span
                className="animate-pulse"
                style={{ animationDelay: "400ms" }}
              >
                .
              </span>
            </span>
          </h2>

          <p className={`text-sm ${colors.textMuted}`}>{submessage}</p>
        </div>

        {/* Progress bar (optional) */}
        <div className="w-full max-w-xs mx-auto">
          <div className="h-1 bg-gray-700/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useTheme } from "@/context/ThemeContext";
// import { themes } from "@/lib/themes";
// import Skeleton from "@/components/primitives/Skeleton";

// export default function PageLoader({
//   title = "Loading",
//   description = "Please wait while we prepare your content.",
// }: {
//   title?: string;
//   description?: string;
// }) {
//   const { theme } = useTheme();
//   const colors = themes[theme];

//   return (
//     <div
//       className={`min-h-[70vh] flex flex-col items-center justify-center px-6 text-center ${colors.bg} ${colors.text}`}
//     >
//       {/* Animated Spinner */}
//       <div className="relative mb-6">
//         <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-transparent animate-spin" />
//       </div>

//       {/* Title */}
//       <h2 className="text-lg sm:text-xl font-semibold mb-2">
//         {title}
//       </h2>

//       {/* Description */}
//       <p className={`text-sm sm:text-base max-w-sm ${colors.textMuted}`}>
//         {description}
//       </p>

//       {/* Optional subtle skeleton preview */}
//       <div className="mt-10 w-full max-w-2xl space-y-3 opacity-60">
//         <Skeleton className="h-4 w-3/4 mx-auto rounded-md" />
//         <Skeleton className="h-4 w-2/3 mx-auto rounded-md" />
//         <Skeleton className="h-4 w-1/2 mx-auto rounded-md" />
//       </div>
//     </div>
//   );
// }
