"use client";

import { withAuth } from "@/utils/withAuth";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CircleCheckBig,
  ClipboardList,
  Clock,
  Loader2,
  Plus,
} from "lucide-react";
import SelectField from "@/components/primitives/form/SelectField";
import { Button } from "@/components/ui/button";
import InputField from "@/components/primitives/form/InputField";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import StatusCard from "@/components/dashboard/StatusCard";
import TaskTable from "@/components/dashboard/TaskTable";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Header from "@/components/dashboard/Header";
import PieChartComponent, {
  PieDataItem,
} from "@/components/dashboard/PieChartComponent";
import { links } from "./data";
import { useTaskStats } from "@/hooks/useTaskStats";
import { useTask } from "@/context/TaskContext";
import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";
import StatusCardSkeleton from "@/components/skeletons/StatusCardSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import ChartSkeleton from "@/components/skeletons/ChartSkeleton";

function CeoDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = themes[theme];

  const { allTasks, loading } = useTask();
  const myTaskStats = useTaskStats();

  const statsConfig = [
    {
      label: "Total Tasks",
      value: myTaskStats.total,
      icon: ClipboardList,
    },
    {
      label: "Pending",
      value: myTaskStats.pending,
      icon: Clock,
    },
    {
      label: "In Progress",
      value: myTaskStats.inProgress,
      icon: Loader2,
    },
    {
      label: "Completed",
      value: myTaskStats.completed,
      icon: CircleCheckBig,
    },
  ];

  const pieData: PieDataItem[] = [
    { name: "Completed", value: myTaskStats.completed, color: "#064E3B4D" },
    { name: "In Progress", value: myTaskStats.inProgress, color: "#1E3A8A99" },
    { name: "Pending Review", value: myTaskStats.pending, color: "#581C8799" },
    { name: "Overdue", value: myTaskStats.overdue, color: "#b91c1c" },
    { name: "Not Started", value: myTaskStats.notStarted, color: "#064E3B99" },
  ];

  //  Calculate weekly bar chart data from allTasks API
  const getWeeklyBarChartData = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Get first day of current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

    // Calculate week ranges for current month
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(firstDayOfMonth);
      weekStart.setDate(1 + i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      weeks.push({
        name: `Week ${i + 1}`,
        start: weekStart,
        end: weekEnd,
      });
    }

    // Count tasks for each week based on createdAt date
    return weeks.map((week) => {
      const weekTasks = allTasks.filter((task) => {
        const taskDate = new Date(task.createdAt);
        return taskDate >= week.start && taskDate <= week.end;
      });

      const completed = weekTasks.filter(
        (t) => t.status === "Completed",
      ).length;
      const pending = weekTasks.filter(
        (t) => t.status === "Pending Review",
      ).length;

      return {
        name: week.name,
        Completed: completed,
        Pending: pending,
      };
    });
  };

  const barChartData = getWeeklyBarChartData();

  return (
    <DashboardLayout links={links}>
      {loading ? (
        <HeaderSkeleton
          className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
          hasButton={false}
        />
      ) : (
        <Header
          user={user}
          title="My Dashboard"
          subtitle="Welcome back,"
          className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
        />
      )}
      {/* Main Content */}
      <div className="p-4 sm:px-6 sm:py-0">
        <div>
          {/* Stats Cards – stack on very small screens */}
          {loading ? (
            <StatusCardSkeleton />
          ) : (
            <StatusCard status={statsConfig} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {/* Quick Create Task */}
            <section
              className={`${colors.bgCard} rounded-xl p-5 sm:p-6 h-fit`}
              style={{ boxShadow: colors.cardShadow }}
            >
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-400" /> Quick Create Task
              </h3>
              <form className="space-y-3 sm:space-y-4">
                <InputField
                  type="text"
                  placeholder="Task Title"
                  inputClassName={`text-sm ${colors.input}`}
                />
                <textarea
                  placeholder="Description"
                  rows={4}
                  className={`w-full p-3 ${colors.input} border rounded-lg text-sm focus:outline-none`}
                />
                <SelectField
                  placeholder="Assign to..."
                  selectClassName={`text-sm ${colors.select}`}
                  options={[
                    { label: "Aisha Bello", value: "aisha" },
                    { label: "Michael Okoro", value: "michael" },
                    { label: "Fatima Yusuf", value: "fatima" },
                  ]}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    type="date"
                    inputClassName={`text-sm ${colors.input}`}
                  />
                  <SelectField
                    placeholder="Priority"
                    selectClassName={`text-sm ${colors.select}`}
                    options={[
                      { label: "High", value: "high" },
                      { label: "Medium", value: "medium" },
                      { label: "Low", value: "low" },
                    ]}
                  />
                </div>
                <Button
                  className={`w-full text-sm mt-0.5 font-semibold ${colors.button}`}
                  type="submit"
                >
                  Create Task
                </Button>
              </form>
            </section>

            {/* Recent Tasks – horizontal scroll on mobile */}

            {loading ? (
              <TableSkeleton />
            ) : (
              <TaskTable taskList={allTasks} title="Recent Tasks" />
            )}
          </div>

          {/* Charts – stack vertically on mobile */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-6 sm:mt-8">
            {/* <PieChart pieData={pieData} /> */}

            {loading ? (
              <ChartSkeleton type="pie" />
            ) : (
              <PieChartComponent pieData={pieData} title="Task Satus" />
            )}

            {loading ? (
              <ChartSkeleton type="bar" />
            ) : (
              <div
                className={`${colors.bgCard} p-5 sm:p-6 rounded-xl border ${colors.border}`}
              >
                <h3 className="text-base font-semibold mb-4">
                  Tasks This Month
                </h3>
                <div className="h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <XAxis
                        dataKey="name"
                        stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                      />
                      <YAxis
                        stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                      />
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
                      <Bar
                        dataKey="Completed"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Pending"
                        fill="#64748b"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(CeoDashboard, { role: "ceo" });
