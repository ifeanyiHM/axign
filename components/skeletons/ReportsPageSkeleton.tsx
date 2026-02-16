"use client";

import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "@/app/dashboard/ceo/data";
import StatusCardSkeleton from "./StatusCardSkeleton";
import HeaderSkeleton from "./HeaderSkeleton";
import ChartSkeleton from "./ChartSkeleton";

export default function ReportsPageSkeleton() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <DashboardLayout links={links}>
      {/* Header */}
      <HeaderSkeleton
        className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
        hasButton={true}
      />

      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-0`}>
        {/* Status Cards */}
        <StatusCardSkeleton />

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <ChartSkeleton type="line" />
          <ChartSkeleton type="pie" />
        </div>
      </div>
    </DashboardLayout>
  );
}
