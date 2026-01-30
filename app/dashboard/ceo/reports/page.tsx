"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Users,
  CheckCircle2,
  Clock,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
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

// Mock data
const monthlyPerformance = [
  { month: "Jan", completed: 45, inProgress: 12, notStarted: 8 },
  { month: "Feb", completed: 52, inProgress: 15, notStarted: 6 },
  { month: "Mar", completed: 48, inProgress: 18, notStarted: 10 },
  { month: "Apr", completed: 61, inProgress: 14, notStarted: 5 },
  { month: "May", completed: 55, inProgress: 20, notStarted: 8 },
  { month: "Jun", completed: 67, inProgress: 16, notStarted: 7 },
  { month: "Jul", completed: 72, inProgress: 22, notStarted: 6 },
  { month: "Aug", completed: 68, inProgress: 19, notStarted: 9 },
  { month: "Sep", completed: 75, inProgress: 17, notStarted: 8 },
  { month: "Oct", completed: 82, inProgress: 21, notStarted: 7 },
  { month: "Nov", completed: 78, inProgress: 24, notStarted: 8 },
  { month: "Dec", completed: 85, inProgress: 18, notStarted: 7 },
];

const tasksByCategory = [
  { name: "Audit", value: 45, color: "#3b82f6" },
  { name: "Documentation", value: 32, color: "#10b981" },
  { name: "Training", value: 28, color: "#f59e0b" },
  { name: "Reporting", value: 38, color: "#8b5cf6" },
  { name: "Maintenance", value: 22, color: "#ef4444" },
  { name: "Assessment", value: 35, color: "#06b6d4" },
];

const tasksByStatus = [
  { name: "Completed", value: 184, color: "#10b981" },
  { name: "In Progress", value: 43, color: "#3b82f6" },
  { name: "Not Started", value: 20, color: "#6b7280" },
  { name: "Pending Review", value: 15, color: "#8b5cf6" },
];

const employeePerformance = [
  { name: "Aisha Bello", completed: 28, assigned: 32, rating: 4.5 },
  { name: "Michael Okoro", completed: 25, assigned: 30, rating: 4.2 },
  { name: "Fatima Yusuf", completed: 32, assigned: 35, rating: 4.8 },
  { name: "David Adebayo", completed: 22, assigned: 28, rating: 4.3 },
  { name: "Sarah Johnson", completed: 30, assigned: 30, rating: 5.0 },
];

const weeklyProgress = [
  { day: "Mon", tasks: 12, hours: 8.5 },
  { day: "Tue", tasks: 15, hours: 9.2 },
  { day: "Wed", tasks: 18, hours: 10.1 },
  { day: "Thu", tasks: 14, hours: 8.8 },
  { day: "Fri", tasks: 20, hours: 11.3 },
  { day: "Sat", tasks: 8, hours: 5.5 },
  { day: "Sun", tasks: 5, hours: 3.2 },
];

const departmentStats = [
  { department: "Quality Assurance", tasks: 45, completion: 87 },
  { department: "Environmental", tasks: 38, completion: 82 },
  { department: "Health & Safety", tasks: 52, completion: 91 },
  { department: "Compliance", tasks: 40, completion: 78 },
  { department: "Documentation", tasks: 35, completion: 94 },
  { department: "Risk Management", tasks: 28, completion: 85 },
];

type ReportPeriod = "week" | "month" | "quarter" | "year";

function ReportsPage() {
  const { theme } = useTheme();
  const colors = themes[theme];

  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>("month");
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  // Calculate stats
  const totalTasks = tasksByStatus.reduce((sum, item) => sum + item.value, 0);
  const completionRate = Math.round(
    (tasksByStatus.find((s) => s.name === "Completed")?.value ||
      0 / totalTasks) * 100,
  );
  const avgTasksPerEmployee = Math.round(
    totalTasks / employeePerformance.length,
  );

  // Calculate trends (mock)
  const completionTrend = 12.5; // +12.5% from last period
  const productivityTrend = -3.2; // -3.2% from last period
  const onTimeDelivery = 89.5; // 89.5% on-time delivery

  const periodLabels: Record<ReportPeriod, string> = {
    week: "This Week",
    month: "This Month",
    quarter: "This Quarter",
    year: "This Year",
  };

  return (
    <DashboardLayout links={links}>
      <div
        className={`min-h-screen ${colors.bg} ${colors.text} p-3 sm:p-4 md:p-6`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
              Reports & Analytics
            </h1>
            <p className={`${colors.textMuted} text-sm sm:text-base`}>
              Track performance, analyze trends, and generate insights
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Period Selector */}
            <div className="relative">
              <button
                onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                className={`w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-sm`}
              >
                <Calendar size={16} />
                <span>{periodLabels[selectedPeriod]}</span>
                <ChevronDown size={16} />
              </button>

              {showPeriodDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPeriodDropdown(false)}
                  />
                  <div
                    className={`absolute right-0 mt-2 w-48 ${colors.bgCard} border ${colors.border} rounded-lg shadow-lg z-20 overflow-hidden`}
                  >
                    {(
                      ["week", "month", "quarter", "year"] as ReportPeriod[]
                    ).map((period) => (
                      <button
                        key={period}
                        onClick={() => {
                          setSelectedPeriod(period);
                          setShowPeriodDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm ${colors.hover} ${
                          selectedPeriod === period
                            ? "bg-blue-600/20 text-blue-400"
                            : ""
                        }`}
                      >
                        {periodLabels[period]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Export Button */}
            <button
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm`}
            >
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Total Tasks */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 sm:p-3 rounded-lg ${colors.stats.blue}`}>
                <FileText size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs sm:text-sm">
                <TrendingUp size={14} />
                <span>+{completionTrend}%</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">
              {totalTasks}
            </h3>
            <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
              Total Tasks
            </p>
          </div>

          {/* Completion Rate */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 sm:p-3 rounded-lg ${colors.stats.green}`}>
                <CheckCircle2 size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs sm:text-sm">
                <TrendingUp size={14} />
                <span>+8.2%</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">
              {completionRate}%
            </h3>
            <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
              Completion Rate
            </p>
          </div>

          {/* Avg Tasks/Employee */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 sm:p-3 rounded-lg ${colors.stats.yellow}`}>
                <Users size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="flex items-center gap-1 text-red-400 text-xs sm:text-sm">
                <TrendingDown size={14} />
                <span>{Math.abs(productivityTrend)}%</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">
              {avgTasksPerEmployee}
            </h3>
            <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
              Tasks per Employee
            </p>
          </div>

          {/* On-Time Delivery */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 sm:p-3 rounded-lg ${colors.stats.green}`}>
                <Clock size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs sm:text-sm">
                <TrendingUp size={14} />
                <span>+5.1%</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">
              {onTimeDelivery}%
            </h3>
            <p className={`text-xs sm:text-sm ${colors.textMuted}`}>
              On-Time Delivery
            </p>
          </div>
        </div>

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
                    stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor:
                        theme === "light"
                          ? "#ffffff"
                          : theme === "blue"
                            ? "#1e3a8a"
                            : "#1f2937",
                      border: `1px solid ${
                        theme === "light"
                          ? "#e5e7eb"
                          : theme === "blue"
                            ? "#1e40af"
                            : "#374151"
                      }`,
                      borderRadius: "8px",
                      color: theme === "light" ? "#111827" : "#f3f4f6",
                    }}
                  />
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
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tasksByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent ?? 0 * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tasksByStatus.map((entry, index) => (
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
                      border: `1px solid ${
                        theme === "light"
                          ? "#e5e7eb"
                          : theme === "blue"
                            ? "#1e40af"
                            : "#374151"
                      }`,
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
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
                    stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor:
                        theme === "light"
                          ? "#ffffff"
                          : theme === "blue"
                            ? "#1e3a8a"
                            : "#1f2937",
                      border: `1px solid ${
                        theme === "light"
                          ? "#e5e7eb"
                          : theme === "blue"
                            ? "#1e40af"
                            : "#374151"
                      }`,
                      borderRadius: "8px",
                    }}
                  />
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
                    <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
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
            <div className="space-y-3">
              {employeePerformance.map((employee, index) => {
                const completionRate = Math.round(
                  (employee.completed / employee.assigned) * 100,
                );

                return (
                  <div
                    key={employee.name}
                    className={`flex items-center justify-between p-3 sm:p-4 ${colors.bgSidebar} border ${colors.border} rounded-lg`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(ReportsPage, { role: "ceo" });
