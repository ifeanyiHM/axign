import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Skeleton from "./Skeleton";

export default function EmployeeCardSkeleton() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={`${colors.bgCard} rounded-xl p-4 sm:p-5 border ${colors.border}`}
          style={{ boxShadow: colors.cardShadow }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <Skeleton
                variant="circular"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
              />

              <div>
                <Skeleton className="h-2 sm:h-3 w-28 mb-4 rounded-md" />
                <Skeleton className="h-2 w-16 rounded-md" />
              </div>
            </div>
          </div>

          {/* Role */}
          <div className={`pb-4 mb-4 border-b ${colors.border}`}>
            <div className="flex items-start gap-2 mb-5">
              <Skeleton className="h-4 w-4 rounded-sm mt-0.5" />
              <div>
                <Skeleton className="h-2 w-32 mb-2 rounded-md" />
                <Skeleton className="h-2 w-24 rounded-md" />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-2 w-24 rounded-md" />
            </div>
          </div>

          {/* Contact */}
          <div className={`pb-4 mb-6 border-b ${colors.border} space-y-3`}>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-2 w-40 rounded-md" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-2 w-28 rounded-md" />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            {[1, 2].map((_, i) => (
              <div key={i} className={`rounded-lg p-3 border ${colors.border}`}>
                <Skeleton className="h-2 w-12 mb-3 rounded-md" />
                <Skeleton className="h-3 w-16 mb-2 rounded-md" />
                <Skeleton className="h-2 w-20 rounded-md" />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-2 w-14 mb-1 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>

            <Skeleton className="h-3 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
