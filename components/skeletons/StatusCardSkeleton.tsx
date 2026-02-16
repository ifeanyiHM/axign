import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Skeleton from "./Skeleton";

export default function StatusCardSkeleton() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`flex justify-between items-center p-4 py-5 sm:px-6 sm:py-7 rounded-md ${colors.bgCard}`}
          style={{ boxShadow: colors.cardShadow }}
        >
          {/* Left content */}
          <div className="flex flex-col gap-2 h-full">
            {/* Label */}
            <Skeleton className="h-3 w-20 sm:w-24 mb-2" />

            {/* Value */}
            <Skeleton className="h-3 w-8 sm:h-3 sm:w-8" />
          </div>

          {/* Icon */}
          <Skeleton
            variant="circular"
            className="w-5 h-5 sm:w-6 sm:h-6 opacity-70"
          />
        </div>
      ))}
    </section>
  );
}
