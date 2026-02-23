"use client";

import { useState, useMemo } from "react";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { useTask } from "@/context/TaskContext";
import { useUser } from "@/context/UserContext";
import {
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "../data";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/primitives/form/SelectField";
import StatusCard from "@/components/dashboard/StatusCard";
import ReportsPageSkeleton from "@/components/skeletons/ReportsPageSkeleton";

// ─── Helper Functions ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateMonthlyPerformance = (tasks: any[]) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();

  return months.map((month, index) => {
    const monthStart = new Date(currentYear, index, 1);
    const monthEnd = new Date(currentYear, index + 1, 0);

    const monthTasks = tasks.filter((task) => {
      const createdDate = new Date(task.createdAt);
      return createdDate >= monthStart && createdDate <= monthEnd;
    });

    return {
      month,
      completed: monthTasks.filter((t) => t.status === "Completed").length,
      inProgress: monthTasks.filter((t) => t.status === "In Progress").length,
      notStarted: monthTasks.filter((t) => t.status === "Not Started").length,
    };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateTasksByCategory = (tasks: any[]) => {
  const categoryColors: Record<string, string> = {
    Audit: "#2563EB",
    Documentation: "#15803D",
    Training: "#D97706",
    Reporting: "#7C3AED",
    Maintenance: "#DC2626",
    Assessment: "#0E7490",
    default: "#64748B",
  };

  const categoryCounts: Record<string, number> = {};

  tasks.forEach((task) => {
    const category = task.category || "Other";
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
    color: categoryColors[name] || categoryColors.default,
  }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateTasksByStatus = (tasks: any[]) => {
  const statusColors = {
    Completed: "#064E3B4D",
    "In Progress": "#1E3A8A99",
    "Not Started": "#064E3B99",
    "Pending Review": "#581C8799",
    Overdue: "#b91c1c",
  };

  const statusCounts: Record<string, number> = {
    Completed: 0,
    "In Progress": 0,
    "Not Started": 0,
    "Pending Review": 0,
  };

  tasks.forEach((task) => {
    const status = task.status;
    if (statusCounts.hasOwnProperty(status)) {
      statusCounts[status]++;
    }
  });

  return (
    Object.entries(statusCounts)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value,
        color: statusColors[name as keyof typeof statusColors],
      }))
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const calculateEmployeePerformance = (tasks: any[], users: any[]) => {
  const employeeStats: Record<
    string,
    { completed: number; assigned: number; name: string }
  > = {};

  tasks.forEach((task) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    task.assignedTo.forEach((assignee: any) => {
      if (!employeeStats[assignee.id]) {
        employeeStats[assignee.id] = {
          name: assignee.name,
          completed: 0,
          assigned: 0,
        };
      }

      employeeStats[assignee.id].assigned++;
      if (task.status === "Completed") {
        employeeStats[assignee.id].completed++;
      }
    });
  });

  return Object.values(employeeStats)
    .map((emp) => ({
      ...emp,
      rating:
        emp.assigned > 0
          ? Number((4 + emp.completed / emp.assigned).toFixed(1))
          : 4.0,
    }))
    .sort((a, b) => b.completed / b.assigned - a.completed / a.assigned)
    .slice(0, 5);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateWeeklyProgress = (tasks: any[]) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const weeklyData = daysOfWeek.map((day, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);

    const dayTasks = tasks.filter((task) => {
      const updatedDate = new Date(task.updatedAt);
      return (
        updatedDate.toDateString() === date.toDateString() &&
        task.status === "Completed"
      );
    });

    return {
      day,
      tasks: dayTasks.length,
      hours: dayTasks.reduce((sum, t) => sum + (t.hoursLogged || 0), 0),
    };
  });

  return weeklyData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateDepartmentStats = (tasks: any[]) => {
  const categories = [
    "Quality Assurance",
    "Environmental",
    "Health & Safety",
    "Compliance",
    "Documentation",
    "Risk Management",
  ];

  return categories
    .map((department) => {
      const deptTasks = tasks.filter((task) =>
        task.category
          ?.toLowerCase()
          .includes(department.toLowerCase().split(" ")[0]),
      );

      const completed = deptTasks.filter(
        (t) => t.status === "Completed",
      ).length;
      const completion =
        deptTasks.length > 0
          ? Math.round((completed / deptTasks.length) * 100)
          : 0;

      return {
        department,
        tasks: deptTasks.length,
        completion,
      };
    })
    .filter((dept) => dept.tasks > 0);
};

type ReportPeriod = "week" | "month" | "quarter" | "year";

function ReportsPage() {
  const { theme } = useTheme();
  const colors = themes[theme];
  const { allTasks, loading } = useTask();
  const { organizationStaffs } = useUser();

  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>("month");

  // ✨ Calculate dynamic data from allTasks
  const monthlyPerformance = useMemo(
    () => calculateMonthlyPerformance(allTasks),
    [allTasks],
  );
  const tasksByCategory = useMemo(
    () => calculateTasksByCategory(allTasks),
    [allTasks],
  );
  const tasksByStatus = useMemo(
    () => calculateTasksByStatus(allTasks),
    [allTasks],
  );
  const employeePerformance = useMemo(
    () => calculateEmployeePerformance(allTasks, organizationStaffs),
    [allTasks, organizationStaffs],
  );
  const weeklyProgress = useMemo(
    () => calculateWeeklyProgress(allTasks),
    [allTasks],
  );
  const departmentStats = useMemo(
    () => calculateDepartmentStats(allTasks),
    [allTasks],
  );

  // Calculate stats from real data
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(
    (t) => t.status === "Completed",
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const avgTasksPerEmployee =
    organizationStaffs.length > 0
      ? Math.round(totalTasks / organizationStaffs.length)
      : 0;

  // Calculate on-time delivery
  const tasksWithDeadlines = allTasks.filter((t) => t.status === "Completed");
  const onTimeTasks = tasksWithDeadlines.filter((t) => {
    const completed = new Date(t.updatedAt);
    const deadline = new Date(t.dueDate);
    return completed <= deadline;
  });
  const onTimeDelivery =
    tasksWithDeadlines.length > 0
      ? Math.round((onTimeTasks.length / tasksWithDeadlines.length) * 100)
      : 0;

  const periodOptions = [
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "This Quarter", value: "quarter" },
    { label: "This Year", value: "year" },
  ];

  // Chart tooltip style
  const tooltipStyle = {
    backgroundColor:
      theme === "light" ? "#ffffff" : theme === "blue" ? "#1e3a8a" : "#1f2937",
    border: `1px solid ${theme === "light" ? "#e5e7eb" : theme === "blue" ? "#1e40af" : "#374151"}`,
    borderRadius: "8px",
    color: theme === "light" ? "#111827" : "#f3f4f6",
  };

  const axisStroke = theme === "light" ? "#6b7280" : "#9ca3af";

  const statsConfig = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
    },
    {
      label: "Completion Rate (%)",
      value: completionRate,
      icon: CheckCircle2,
    },
    {
      label: "Tasks Per Employee",
      value: avgTasksPerEmployee,
      icon: Users,
    },
    {
      label: "On-Time Delivery (%)",
      value: onTimeDelivery,
      icon: Clock,
    },
  ];

  if (loading) {
    return <ReportsPageSkeleton />;
  }

  return (
    <DashboardLayout links={links}>
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b ${colors.border} my-3 sm:my-4 px-3 sm:px-4 md:px-6`}
      >
        <Header
          title="Reports & Analytics"
          subtitle="Track performance, analyze trends, and generate insights"
          className=""
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Period Selector */}
          <SelectField
            value={selectedPeriod}
            onValueChange={(val) => setSelectedPeriod(val as ReportPeriod)}
            options={periodOptions}
            placeholder="Choose period"
            icon={<Calendar size={16} />}
            selectClassName={`w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-sm ${colors.border} ${colors.bg}`}
          />

          {/* Export Button */}
          <Button
            variant={theme === "light" ? "secondary" : "ghost"}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`} rounded-lg text-sm`}
          >
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </div>

      {/* main */}
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-0`}>
        {/* Key Metrics */}
        <StatusCard status={statsConfig} />

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Monthly Performance */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                  Monthly Performance
                </h3>
                <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
                  Task completion over time
                </p>
              </div>
              <BarChart3
                size={20}
                className={`${colors.textMuted} sm:w-6 sm:h-6`}
              />
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="month"
                    stroke={axisStroke}
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke={axisStroke} style={{ fontSize: "12px" }} />
                  <Tooltip cursor={false} contentStyle={tooltipStyle} />
                  <Legend />
                  <Bar
                    dataKey="completed"
                    fill="#10b981"
                    name="Completed"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="inProgress"
                    fill="#3b82f6"
                    name="In Progress"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="notStarted"
                    fill="#6b7280"
                    name="Not Started"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tasks by Status */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                  Tasks by Status
                </h3>
                <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
                  Current distribution
                </p>
              </div>
              <PieChartIcon
                size={20}
                className={`${colors.textMuted} sm:w-6 sm:h-6`}
              />
            </div>
            {tasksByStatus.length > 0 ? (
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tasksByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="none"
                      strokeWidth={0}
                    >
                      {tasksByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 sm:h-80 flex items-center justify-center">
                <p className={colors.textMuted}>No tasks yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Weekly Progress */}
          <div
            className={`lg:col-span-2 ${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                  Weekly Progress
                </h3>
                <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
                  Tasks completed and hours logged
                </p>
              </div>
              <Activity
                size={20}
                className={`${colors.textMuted} sm:w-6 sm:h-6`}
              />
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProgress}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="day"
                    stroke={axisStroke}
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke={axisStroke} style={{ fontSize: "12px" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="tasks"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorTasks)"
                    name="Tasks Completed"
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorHours)"
                    name="Hours Logged"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tasks by Category */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-1">
                Tasks by Category
              </h3>
              <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
                Distribution across departments
              </p>
            </div>
            {tasksByCategory.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {tasksByCategory.map((category) => {
                  const total = tasksByCategory.reduce(
                    (sum, c) => sum + c.value,
                    0,
                  );
                  const percentage = Math.round((category.value / total) * 100);

                  return (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium">
                          {category.name}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold">
                          {category.value}
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-500/50 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center">
                <p className={colors.textMuted}>No tasks yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Employee Performance */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-1">
                Employee Performance
              </h3>
              <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
                Top performers this {selectedPeriod}
              </p>
            </div>
            {employeePerformance.length > 0 ? (
              <div className="space-y-3">
                {employeePerformance.map((employee, index) => {
                  const completionRate =
                    employee.assigned > 0
                      ? Math.round(
                          (employee.completed / employee.assigned) * 100,
                        )
                      : 0;

                  return (
                    <div
                      key={employee.name}
                      className={`flex items-center justify-between p-3 sm:p-4 ${colors.bgSidebar} border ${colors.border} rounded-lg`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm sm:text-base truncate">
                            {employee.name}
                          </p>
                          <p className={`text-xs ${colors.textMuted}`}>
                            {employee.completed}/{employee.assigned} completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <p className="text-sm sm:text-base font-bold">
                            {completionRate}%
                          </p>
                          <p className={`text-xs ${colors.textMuted}`}>
                            ⭐ {employee.rating}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded ${
                            completionRate >= 90
                              ? "bg-emerald-900/30 text-emerald-400"
                              : completionRate >= 75
                                ? "bg-blue-900/30 text-blue-400"
                                : "bg-amber-900/30 text-amber-400"
                          }`}
                        >
                          {completionRate >= 90 ? (
                            <ArrowUpRight size={14} />
                          ) : completionRate >= 75 ? (
                            <TrendingUp size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center">
                <p className={colors.textMuted}>No employee data yet</p>
              </div>
            )}
          </div>

          {/* Department Statistics */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-1">
                Department Statistics
              </h3>
              <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
                Performance by department
              </p>
            </div>
            {departmentStats.length > 0 ? (
              <div className="space-y-3">
                {departmentStats.map((dept) => (
                  <div
                    key={dept.department}
                    className={`p-3 sm:p-4 ${colors.bgSidebar} border ${colors.border} rounded-lg`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm sm:text-base">
                        {dept.department}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold">
                        {dept.tasks} tasks
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                            dept.completion >= 90
                              ? "bg-emerald-500"
                              : dept.completion >= 80
                                ? "bg-blue-500"
                                : "bg-amber-500"
                          }`}
                          style={{ width: `${dept.completion}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold shrink-0">
                        {dept.completion}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-52 flex items-center justify-center">
                <p className={colors.textMuted}>No department data yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(ReportsPage, { role: "ceo" });
