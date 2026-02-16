"use client";

import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Skeleton from "./Skeleton";
import { navItems } from "@/app/dashboard/employee/data";

export default function TaskDetailsSkeleton() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    // <DashboardLayout links={navItems}>
    <div className={`${colors.bg} ${colors.text}`}>
      {/* Header */}
      <div
        className={`sticky top-0 z-20 border-b ${colors.border} backdrop-blur-lg bg-opacity-95`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Skeleton className="w-9 h-9 rounded-lg" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-5 w-20 rounded" />
                </div>
                <Skeleton className="h-4 w-40 mt-2" />
              </div>
            </div>

            {/* Status Button */}
            <Skeleton className="h-11 w-40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mt-4 px-4 sm:px-6">
        <Skeleton className="h-9 w-28 rounded-t-lg" />
        <Skeleton className="h-9 w-24 rounded-t-lg" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border}`}
            >
              <div className={`p-6 border-b border-dashed ${colors.border}`}>
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="p-6 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Progress */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>

            {/* Assigned Team */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border}`}
            >
              <div className={`p-6 border-b border-dashed ${colors.border}`}>
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="p-6 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Overview */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border}`}
            >
              <div className={`p-6 border-b border-dashed ${colors.border}`}>
                <Skeleton className="h-4 w-28" />
              </div>

              <div className="p-6 space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="w-4 h-4 mt-1 rounded" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ownership */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border}`}
            >
              <div className={`p-6 border-b border-dashed ${colors.border}`}>
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="p-6 space-y-5">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="w-4 h-4 mt-1 rounded" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
            >
              <Skeleton className="h-4 w-16 mb-4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>

            {/* Recurring */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-4 h-4 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </DashboardLayout>
  );
}
