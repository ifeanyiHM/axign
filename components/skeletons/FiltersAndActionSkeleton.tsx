import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Skeleton from "./Skeleton";

export default function FiltersAndActionsSkeleton() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <>
      {/* Main Card */}
      <div
        className={`${colors.bgCard} rounded-lg p-3 sm:p-4 sm:py-6 mb-4 sm:mb-6`}
        style={{ boxShadow: colors.cardShadow }}
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Search + Actions Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-9 py-2 sm:py-0">
            {/* Search */}
            <div className="flex-1 relative">
              <Skeleton className="h-4 sm:h-5 w-full rounded-sm" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-7">
              <div className="flex items-center gap-3">
                {/* Filter Button */}
                <Skeleton className="h-4 w-12 sm:w-20 rounded-sm" />

                {/* Export Button */}
                <Skeleton className="h-4 w-12 sm:w-20 rounded-sm" />
              </div>

              {/* Desktop View Toggle */}
              <div
                className={`hidden sm:flex gap-3 ${colors.bgCard} p-1 rounded-lg`}
              >
                <Skeleton className="h-3 w-14 rounded-sm" />
                <Skeleton className="h-3 w-14 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-3 sm:mb-4">
        <Skeleton className="h-3 w-40" />
      </div>

      {/* Mobile View Toggle */}
      <div className="sm:hidden flex gap-4 mb-4 p-1 rounded-lg">
        <Skeleton className="h-6 w-full rounded-xs" />
        <Skeleton className="h-6 w-full rounded-xs" />
      </div>
    </>
  );
}
