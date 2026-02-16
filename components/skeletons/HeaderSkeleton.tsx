import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Skeleton from "./Skeleton";

interface HeaderSkeletonProps {
  className?: string;
  hasButton?: boolean;
}

export default function HeaderSkeleton({
  className,
  hasButton = true,
}: HeaderSkeletonProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <header
      className={`${className} ${colors.border} md:flex justify-between items-center mb-4 sm:mb-6`}
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-2 md:gap-4 py-1">
        <Skeleton className="h-4 w-48 sm:w-56 rounded-md" /> {/* Title */}
        <Skeleton className="h-2 w-32 sm:w-40 rounded-md" /> {/* Subtitle */}
      </div>

      {/* Optional Button */}
      {hasButton && (
        <Skeleton className="mt-2 md:mt-0 h-3 md:h-6 w-24 sm:w-28 rounded-lg" />
      )}
    </header>
  );
}
