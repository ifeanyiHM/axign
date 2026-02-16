import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import HeaderSkeleton from "./HeaderSkeleton";
import Skeleton from "./Skeleton";
import { CircleUserRound } from "lucide-react";

export function UserProfileSkeleton() {
  const { theme } = useTheme();
  const colors = themes[theme];

  const baseClasses = theme === "light" ? "text-gray-200" : "text-gray-700/50";

  return (
    <>
      {/* Header Skeleton */}
      <HeaderSkeleton
        className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
        hasButton={false}
      />

      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-0`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Profile Card & Quick Stats */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Avatar & Info */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <div className="flex flex-col items-center space-y-2">
                {/* Avatar */}
                <CircleUserRound
                  className={`w-24 h-24 sm:w-32 sm:h-32 bg-none ${baseClasses} rounded-full`}
                />
                {/* Name */}
                <div className="mt-3 flex gap-2 w-32 sm:w-40">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />{" "}
                </div>
                {/* Position */}
                <Skeleton className="h-2 mt-1.5 w-24 sm:w-32 rounded-md" />
                {/* ID */}
                <Skeleton className="h-2 w-20 sm:w-28 rounded-md" />
                <div className="w-full mt-4 pt-4 border-t space-y-2">
                  {/* Member since */}
                  <Skeleton className="h-4 w-24 rounded-md" />
                  {/* Status */}
                  <Skeleton className="h-4 w-32 rounded-md" />{" "}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6 space-y-3`}
            >
              <Skeleton className="h-5 w-32 rounded-md mb-2" />{" "}
              {/* Quick Stats Title */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`p-3 ${colors.bgSidebar} rounded-lg border ${colors.border}`}
                >
                  <Skeleton className="h-3 w-20 rounded-md mb-1" />{" "}
                  {/* Label */}
                  <Skeleton className="h-6 w-12 rounded-md" /> {/* Value */}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details Cards */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Personal Information Skeleton */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              {/* Header with Icon and Title */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-9 h-9 rounded-lg" />{" "}
                  {/* Icon placeholder */}
                  <Skeleton className="h-5 w-40 rounded-md" />{" "}
                  {/* Title placeholder */}
                </div>
                <Skeleton className="h-10 w-32 sm:w-36 rounded-lg" />{" "}
                {/* Edit Profile button */}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-3 w-1/3 rounded-sm mb-2" />
                    <Skeleton className="h-8 w-full rounded-lg" /> {/* Input */}
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div className="mt-6">
                <Skeleton className="h-3 w-1/3 rounded-sm mb-2" />
                <Skeleton className="h-14 w-full rounded-lg" /> {/* Textarea */}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                <Skeleton className="h-10 w-32 sm:w-40 rounded-lg" />{" "}
                {/* Save button */}
                <Skeleton className="h-10 w-32 sm:w-40 rounded-lg" />{" "}
                {/* Cancel button */}
              </div>
            </div>

            {/* Organization Skeleton */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <Skeleton className="h-5 w-32 rounded-md mb-4" />{" "}
              {/* Section Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-6 w-full rounded-md"
                  /> /* Fields */
                ))}
              </div>
            </div>

            {/* Security Skeleton */}
            <div
              className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
            >
              <Skeleton className="h-5 w-32 rounded-md mb-4" />{" "}
              {/* Section Title */}
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-12 w-full rounded-lg mb-3"
                /> /* Password fields/buttons */
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
