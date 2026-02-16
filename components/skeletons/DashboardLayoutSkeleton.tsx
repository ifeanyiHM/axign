"use client";

import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Skeleton from "./Skeleton";

interface DashboardLayoutSkeletonProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function DashboardLayoutSkeleton({
  title = "Loading...",
  description = "Please wait while we prepare your content.",
  children,
}: DashboardLayoutSkeletonProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text} flex`}>
      {/* Mobile Hamburger Button */}
      <div
        className={`fixed top-4 right-4 z-50 lg:hidden p-2 ${colors.bgCard} rounded-md`}
      >
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 xl:w-64 h-screen ${colors.bgSidebar} border-r ${colors.border} lg:sticky lg:translate-x-0 flex flex-col overflow-y-auto`}
      >
        {/* Logo Area */}
        <div className={`p-4 sm:px-6 sm:py-6 border-b ${colors.border}`}>
          <Skeleton variant="circular" className="h-12 w-12" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`flex items-center px-3 py-3 rounded-lg ${colors.hover}`}
            >
              <Skeleton className="w-4 h-4 mr-3 rounded-sm" />
              <Skeleton className="h-3 w-40 rounded-md" />
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t ${colors.border}`}>
          <div className="flex items-center px-3 py-3 rounded-lg">
            <Skeleton className="w-4 h-4 mr-3 rounded-sm" />
            <Skeleton className="h-3 w-40 rounded-md" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children ? (
          children
        ) : (
          <div
            className={`min-h-screen flex flex-col items-center justify-center px-6 text-center ${colors.bg} ${colors.text}`}
          >
            {/* Animated Spinner */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-transparent animate-spin" />
            </div>

            {/* Title */}
            <h2 className="text-md sm:text-lg font-medium mb-2">{title}</h2>

            {/* Description */}
            <p className={`text-sm sm:text-base max-w-sm ${colors.textMuted}`}>
              {description}
            </p>

            {/* Optional subtle skeleton preview */}
            <div className="mt-10 w-full max-w-2xl space-y-3 opacity-60">
              <Skeleton className="h-4 w-3/4 mx-auto rounded-md" />
              <Skeleton className="h-4 w-2/3 mx-auto rounded-md" />
              <Skeleton className="h-4 w-1/2 mx-auto rounded-md" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
