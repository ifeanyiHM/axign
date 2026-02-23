import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export type PieDataItem = {
  name: string;
  value: number;
  color: string;
};

interface PieChartProps {
  pieData: PieDataItem[];
  title: string;
}

export default function PieChartComponent({ pieData, title }: PieChartProps) {
  //   const { user } = useAuth();
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <div
      className={`${colors.bgCard} p-5 sm:p-6 rounded-xl`}
      style={{ boxShadow: colors.cardShadow }}
    >
      <h3 className="text-base font-semibold mb-4">{title}</h3>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              label
              stroke="none"
              strokeWidth={0}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor:
                  theme === "light"
                    ? "#ffffff"
                    : theme === "blue"
                      ? "#1e3a8a"
                      : "#1f2937",
                border: `1px solid ${theme === "light" ? "#e5e7eb" : theme === "blue" ? "#1e40af" : "#374151"}`,
                borderRadius: "8px",
                color: theme === "light" ? "#111827" : "#f3f4f6",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
