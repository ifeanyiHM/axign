"use client";

import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Skeleton from "./Skeleton";

export default function QuickCreateTaskSkeleton() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <section
      className={`${colors.bgCard} rounded-xl p-5 sm:p-6 h-fit`}
      style={{ boxShadow: colors.cardShadow }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-5 w-40 rounded-md" />
      </div>

      {/* Form */}
      <div className="space-y-3 sm:space-y-4">
        {/* Task Title */}
        <Skeleton className="h-10 w-full rounded-lg" />

        {/* Description textarea (rows=4 equivalent) */}
        <Skeleton className="h-24 w-full rounded-lg" />

        {/* Assign select */}
        <Skeleton className="h-10 w-full rounded-lg" />

        {/* Date + Priority */}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        {/* Submit button */}
        <Skeleton className="h-10 w-full rounded-lg mt-0.5" />
      </div>
    </section>
  );
}
