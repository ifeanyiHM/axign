import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { LucideIcon } from "lucide-react";
import React from "react";

export type StatusItem = {
  title?: string;
  label?: string;
  value: number;
  icon: LucideIcon;
};

interface StatusCardProps {
  status: StatusItem[];
}

export default function StatusCard({ status }: StatusCardProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
      {status.map((stat, i) => {
        type StatColor = "blue" | "yellow" | "green" | "red";
        const iconColors: StatColor[] = ["blue", "yellow", "green", "red"];
        const colorKey = iconColors[i];
        const colorClasses = colors.stats[colorKey];
        return (
          <div
            key={i}
            className={`flex justify-between ${stat.title ? "items-start  sm:py-4" : "items-center  sm:py-5"} p-4 sm:px-6 rounded-md ${colors.bgCard} text-center sm:text-left`}
            style={{ boxShadow: colors.cardShadow }}
          >
            <div className="flex flex-col h-full">
              <p className={`text-xs flex-1 sm:text-sm ${colors.textMuted}`}>
                {stat.title || stat.label}
              </p>
              <p className="text-2xl sm:text-2xl font-bold mt-1 sm:mt-2">
                {stat.value}
              </p>
            </div>
            <stat.icon className={`${colorClasses} text-3xl opacity-70`} />
          </div>
        );
      })}
    </section>
  );
}
