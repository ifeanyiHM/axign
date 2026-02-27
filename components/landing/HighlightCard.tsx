import { theme } from "@/utils/constants";
import React from "react";

type HighlightCardProps = {
  title: string;
  items: React.ReactNode[];
  className?: string;
  isListStyle?: boolean;
};

export const HighlightCard = ({
  title,
  items,
  className = "",
  isListStyle = true,
}: HighlightCardProps) => {
  return (
    <div
      style={{
        backgroundColor: theme.darkCard,
        borderColor: theme.darkBorder,
      }}
      className={`relative rounded-3xl p-8 border shadow-xl shadow-gray-900/30 ${className}`}
    >
      {/* Gradient overlay */}
      <div
        style={{
          background: `linear-gradient(to bottom right, ${theme.accent}1A, transparent)`,
        }}
        className="absolute inset-0 rounded-3xl pointer-events-none"
      />

      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>

      <ul className="space-y-3 text-gray-400 text-sm">
        {items.map((item, index) =>
          isListStyle ? (
            <li
              key={index}
              className="flex items-baseline xl:items-center gap-2"
            >
              <span
                style={{ backgroundColor: theme.accent }}
                className="w-1.5 h-1.5 rounded-full shrink-0"
              />

              {item}
            </li>
          ) : (
            <li key={index} className="flex items-baseline gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-semibold">
                {index + 1}
              </span>
              {item}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
