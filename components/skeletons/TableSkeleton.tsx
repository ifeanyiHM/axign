import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Skeleton from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 5,
  columns = 6,
}: TableSkeletonProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <div
      className={`${colors.bgCard} rounded-xl xl:col-span-2 border ${colors.border} overflow-hidden`}
    >
      {/* Table Header */}
      <div className={`border-b ${colors.border} p-4`}>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-3/4" />
          ))}
        </div>
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={`border-b ${colors.border} p-4 last:border-b-0`}
        >
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="flex items-center">
                {colIndex === 0 ? (
                  // First column with avatar
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circular" className="w-8 h-8" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ) : colIndex === columns - 1 ? (
                  // Last column with action button
                  <Skeleton className="h-8 w-8 rounded-lg ml-auto" />
                ) : (
                  // Regular columns
                  <Skeleton className="h-4 w-full max-w-30" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
