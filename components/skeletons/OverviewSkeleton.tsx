"use client";

import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChartSkeleton from "./ChartSkeleton";
import StatusCardSkeleton from "./StatusCardSkeleton";
import { navItems } from "@/app/dashboard/employee/data";
import Skeleton from "./Skeleton";
import HeaderSkeleton from "./HeaderSkeleton";

export default function OverviewSkeletonPage() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <DashboardLayout links={navItems}>
      <div
        className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-6 space-y-5`}
      >
        <HeaderSkeleton />

        {/* ── Stats Overview */}
        <StatusCardSkeleton />

        {/* ── Progress Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5 animate-pulse`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <div className="flex items-end gap-3 mb-3">
                <Skeleton className="h-10 w-20 rounded" />
                <Skeleton className="h-4 w-32 rounded mb-1" />
              </div>
              <div
                className={`w-full h-2.5 rounded-full overflow-hidden ${colors.bgCard}`}
              >
                <Skeleton className="h-full rounded-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </section>

        {/* ── Charts Row 1 */}
        <section className="grid grid-cols-2 gap-4 sm:gap-5">
          {/* Weekly Activity Skeleton */}
          <ChartSkeleton type="line" />

          {/* Status Donut Skeleton */}
          <ChartSkeleton type="pie" />
        </section>
      </div>
    </DashboardLayout>
  );
}
