import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Skeleton from "./Skeleton";
import { useMemo } from "react";

interface ChartSkeletonProps {
  type?: "bar" | "line" | "pie" | "area";
  height?: string;
}

export default function ChartSkeleton({
  type = "bar",
  height = "h-64 sm:h-80",
}: ChartSkeletonProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  // ✨ Generate random heights once using useMemo to avoid impure function during render
  const barHeights = useMemo(
    // eslint-disable-next-line react-hooks/purity
    () => Array.from({ length: 12 }, () => Math.random() * 60 + 40),
    [],
  );

  return (
    <div
      className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex-1">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton variant="circular" className="w-8 h-8" />
      </div>

      {/* Chart Area */}
      {type === "pie" ? (
        <div className={`${height} flex items-center justify-center`}>
          <Skeleton variant="circular" className="w-48 h-48" />
        </div>
      ) : type === "bar" ? (
        <div className={`${height} flex items-end justify-between gap-2 px-4`}>
          {barHeights.map((heightPercent, i) => (
            <div
              key={i}
              className={`w-full rounded-t-lg ${theme === "light" ? "bg-gray-200" : "bg-gray-700/50"} animate-pulse`}
              style={{ height: `${heightPercent}%` }}
            />
          ))}
        </div>
      ) : (
        // Line/Area chart
        <div className={`${height} relative`}>
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-11/12 h-px" />
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
}
