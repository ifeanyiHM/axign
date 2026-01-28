import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { LucideIcon } from "lucide-react";
import React from "react";

export type StatusItem = {
  title: string;
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
        type StatColor = "green" | "yellow" | "blue" | "red";
        const iconColors: StatColor[] = ["green", "yellow", "blue", "red"];
        const colorKey = iconColors[i];
        const colorClasses = colors.stats[colorKey];
        return (
          <div
            key={i}
            className={`flex justify-between items-start p-4 sm:px-6 sm:py-4 rounded-md ${colors.bgCard} border ${colors.border} text-center sm:text-left`}
          >
            <div>
              <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
                {stat.title}
              </p>
              <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">
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
