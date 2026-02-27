import { theme } from "@/utils/constants";
import React from "react";

interface LandingCardDashboard {
  Icon?: React.ElementType;
  title: string;
  description: string;
  className?: string;
  iconColors?: string;
}

export default function LandingCard({
  Icon,
  title,
  description,
  className = "",
  iconColors = "",
}: LandingCardDashboard) {
  return (
    <div
      className={`group relative bg-white rounded-2xl p-8 lg:p-6 xl:p-8 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {/* Accent top bar on hover */}
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      {Icon && (
        <div
          style={{ ["--dark" as string]: theme.darkCard }}
          className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 mb-6 group-hover:bg-(--dark) transition-colors duration-300 ${iconColors}`}
        >
          <Icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-950 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
