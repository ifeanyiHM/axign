"use client";

import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "@/app/dashboard/ceo/data";
import Skeleton from "./Skeleton";
// import { links } from "../data";
// import Skeleton from "@/components/primitives/Skeleton";

export default function CreateTaskPageSkeleton() {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <DashboardLayout links={links}>
      <div className={`${colors.bg} ${colors.text} pt-4 px-4 sm:p-6`}>
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <Skeleton className="h-8 w-24 mb-3 rounded-md" /> {/* Back button */}
          <div className="py-2">
            <Skeleton className="h-6 w-64 mb-2 rounded-md" />
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* MAIN FORM */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* BASIC INFO */}
              <div className={`${colors.bgCard} rounded-lg p-4 sm:p-6`}>
                <Skeleton className="h-5 w-48 mb-4 rounded-md" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-28 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>

              {/* ASSIGNMENT */}
              <div className={`${colors.bgCard} rounded-lg p-4 sm:p-6`}>
                <Skeleton className="h-5 w-56 mb-4 rounded-md" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full rounded-lg" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>

                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>

              {/* TAGS & ATTACHMENTS */}
              <div className={`${colors.bgCard} rounded-lg p-4 sm:p-6`}>
                <Skeleton className="h-5 w-56 mb-4 rounded-md" />
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-20 rounded-full" />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1 rounded-lg" />
                    <Skeleton className="h-10 w-12 rounded-lg" />
                  </div>

                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
              </div>

              {/* MOBILE ACTIONS */}
              <div className="lg:hidden space-y-3 sticky bottom-0 bg-gray-950 p-4 -mx-4 border-t border-gray-800">
                <Skeleton className="h-12 w-full rounded-lg" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            </div>

            {/* SIDEBAR (DESKTOP) */}
            <div className="hidden lg:block space-y-6 sticky top-6 self-start">
              {/* OPTIONS */}
              <div className={`${colors.bgCard} rounded-lg p-6`}>
                <Skeleton className="h-6 w-32 mb-4 rounded-md" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>

              {/* SUMMARY */}
              <div className={`${colors.bgCard} rounded-lg p-6`}>
                <Skeleton className="h-6 w-28 mb-4 rounded-md" />
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24 rounded-md" />
                      <Skeleton className="h-4 w-12 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>

              {/* DESKTOP BUTTONS */}
              <div className="space-y-3">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
