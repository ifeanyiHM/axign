"use client";

import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  Target,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
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
import { navItems } from "../data";
import DashboardLayout from "@/components/layout/DashboardLayout";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const weeklyActivity = [
  { day: "Mon", completed: 2, hoursLogged: 7.5 },
  { day: "Tue", completed: 3, hoursLogged: 8.2 },
  { day: "Wed", completed: 1, hoursLogged: 6.8 },
  { day: "Thu", completed: 4, hoursLogged: 9.1 },
  { day: "Fri", completed: 2, hoursLogged: 7.9 },
  { day: "Sat", completed: 1, hoursLogged: 3.5 },
  { day: "Sun", completed: 0, hoursLogged: 0 },
];

const monthlyTrend = [
  { month: "Aug", completed: 8, assigned: 10 },
  { month: "Sep", completed: 11, assigned: 13 },
  { month: "Oct", completed: 9, assigned: 12 },
  { month: "Nov", completed: 13, assigned: 15 },
  { month: "Dec", completed: 10, assigned: 11 },
  { month: "Jan", completed: 14, assigned: 16 },
  { month: "Feb", completed: 4, assigned: 6 },
];

const tasksByCategory = [
  { name: "Audit", value: 2, color: "#3b82f6" },
  { name: "Documentation", value: 1, color: "#10b981" },
  { name: "Training", value: 1, color: "#f59e0b" },
  { name: "Reporting", value: 1, color: "#8b5cf6" },
  { name: "Maintenance", value: 1, color: "#ef4444" },
  { name: "Assessment", value: 1, color: "#06b6d4" },
];

const taskStatusBreakdown = [
  { name: "Completed", value: 1, color: "#10b981" },
  { name: "In Progress", value: 3, color: "#3b82f6" },
  { name: "Pending Review", value: 1, color: "#8b5cf6" },
  { name: "Not Started", value: 1, color: "#6b7280" },
];

const recentMilestones = [
  {
    id: 1,
    title: "Safety Training Session Prep",
    category: "Training",
    completedDate: "Jan 30, 2026",
    status: "Completed",
  },
  {
    id: 2,
    title: "Client Report Submission",
    category: "Reporting",
    completedDate: "Feb 1, 2026",
    status: "Pending Review",
  },
  {
    id: 3,
    title: "ISO 9001 Audit – Phase 1",
    category: "Audit",
    completedDate: "Jan 28, 2026",
    status: "Completed",
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: "Conduct ISO 9001 Audit for Access Bank",
    dueDate: "Feb 5, 2026",
    daysLeft: 2,
    priority: "High",
    progress: 65,
  },
  {
    id: 2,
    title: "Update Risk Register QHSE",
    dueDate: "Feb 10, 2026",
    daysLeft: 7,
    priority: "Medium",
    progress: 0,
  },
  {
    id: 3,
    title: "Equipment Calibration",
    dueDate: "Feb 15, 2026",
    daysLeft: 12,
    priority: "Low",
    progress: 30,
  },
  {
    id: 4,
    title: "Environmental Impact Assessment",
    dueDate: "Feb 20, 2026",
    daysLeft: 17,
    priority: "High",
    progress: 45,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const priorityColors: Record<string, string> = {
  High: "bg-red-500/15 border-red-500/40 text-red-400",
  Medium: "bg-amber-500/15 border-amber-500/40 text-amber-400",
  Low: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
};

const categoryColors: Record<string, string> = {
  Audit: "bg-blue-500/15 text-blue-400",
  Documentation: "bg-emerald-500/15 text-emerald-400",
  Training: "bg-amber-500/15 text-amber-400",
  Reporting: "bg-purple-500/15 text-purple-400",
  Maintenance: "bg-red-500/15 text-red-400",
  Assessment: "bg-cyan-500/15 text-cyan-400",
};

// ─── Component ───────────────────────────────────────────────────────────────

function OverviewPage() {
  const { theme } = useTheme();
  const colors = themes[theme];

  // Derived stats
  const totalAssigned = 6;
  const totalCompleted = 1;
  const totalHoursLogged = 48;
  const estimatedTotalHours = 128;
  const completionRate = Math.round((totalCompleted / totalAssigned) * 100);
  const hoursUtilization = Math.round(
    (totalHoursLogged / estimatedTotalHours) * 100,
  );

  // Shared chart style helpers (matches CEO reports pattern exactly)
  const tooltipStyle = {
    backgroundColor:
      theme === "light" ? "#ffffff" : theme === "blue" ? "#1f2937" : "#141414",
    border: `1px solid ${
      theme === "light" ? "#e5e7eb" : theme === "blue" ? "#374151" : "#1f1f1f"
    }`,
    borderRadius: "8px",
    color: theme === "light" ? "#111827" : "#f3f4f6",
  };
  const axisStroke = theme === "light" ? "#6b7280" : "#9ca3af";
  const gridStroke = theme === "light" ? "#e5e7eb" : "#374151";
  const barBg = theme === "light" ? "bg-gray-200" : "bg-gray-700/50";

  return (
    <DashboardLayout links={navItems}>
      <div
        className={`min-h-screen ${colors.bg} ${colors.text} p-3 sm:p-4 md:p-6`}
      >
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div className="mb-5 sm:mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
            Overview
          </h1>
          <p className={`${colors.textMuted} text-sm sm:text-base`}>
            Your personal performance and task summary
          </p>
        </div>

        {/* ── Top Stats Row ─────────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {/* Tasks Assigned */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${colors.stats.blue}`}>
                <Target size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex items-center gap-1 text-blue-400 text-xs">
                <TrendingUp size={13} />
                <span>+2</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">{totalAssigned}</h3>
            <p className={`text-xs sm:text-sm ${colors.textMuted} mt-0.5`}>
              Tasks Assigned
            </p>
          </div>

          {/* Completed */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${colors.stats.green}`}>
                <CheckCircle2 size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs">
                <TrendingUp size={13} />
                <span>+1</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">{totalCompleted}</h3>
            <p className={`text-xs sm:text-sm ${colors.textMuted} mt-0.5`}>
              Completed
            </p>
          </div>

          {/* Hours Logged */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${colors.stats.yellow}`}>
                <Clock size={18} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                <TrendingDown size={13} />
                <span>-3h</span>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              {totalHoursLogged}h
            </h3>
            <p className={`text-xs sm:text-sm ${colors.textMuted} mt-0.5`}>
              Hours Logged
            </p>
          </div>

          {/* Overdue */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${colors.stats.red}`}>
                <AlertCircle size={18} className="sm:w-5 sm:h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">0</h3>
            <p className={`text-xs sm:text-sm ${colors.textMuted} mt-0.5`}>
              Overdue
            </p>
          </div>
        </section>

        {/* ── Progress Cards ────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {/* Completion Rate */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-semibold">
                  Completion Rate
                </h3>
                <p className={`text-xs ${colors.textMuted}`}>
                  Tasks finished vs assigned
                </p>
              </div>
              <Award size={20} className="text-amber-400" />
            </div>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-3xl sm:text-4xl font-bold">
                {completionRate}%
              </span>
              <span className={`text-xs ${colors.textMuted} mb-1`}>
                {totalCompleted} / {totalAssigned} tasks
              </span>
            </div>
            <div
              className={`w-full h-2.5 rounded-full overflow-hidden ${barBg}`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          {/* Time Utilization */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-semibold">
                  Time Utilization
                </h3>
                <p className={`text-xs ${colors.textMuted}`}>
                  Hours logged vs estimated
                </p>
              </div>
              <Clock size={20} className="text-blue-400" />
            </div>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-3xl sm:text-4xl font-bold">
                {hoursUtilization}%
              </span>
              <span className={`text-xs ${colors.textMuted} mb-1`}>
                {totalHoursLogged}h / {estimatedTotalHours}h
              </span>
            </div>
            <div
              className={`w-full h-2.5 rounded-full overflow-hidden ${barBg}`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700"
                style={{ width: `${hoursUtilization}%` }}
              />
            </div>
          </div>
        </section>

        {/* ── Charts Row 1: Weekly Activity (Area) + Status (Donut) ─────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
          {/* Weekly Activity */}
          <div
            className={`lg:col-span-2 ${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div>
                <h3 className="text-sm sm:text-base font-semibold">
                  Weekly Activity
                </h3>
                <p className={`text-xs ${colors.textMuted}`}>
                  Tasks completed &amp; hours logged this week
                </p>
              </div>
              <Activity size={20} className={colors.textMuted} />
            </div>
            <div className="h-56 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyActivity}>
                  <defs>
                    <linearGradient
                      id="gradCompleted"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
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
                    dataKey="completed"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#gradCompleted)"
                    name="Tasks Completed"
                  />
                  <Area
                    type="monotone"
                    dataKey="hoursLogged"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#gradHours)"
                    name="Hours Logged"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Donut */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div>
                <h3 className="text-sm sm:text-base font-semibold">
                  By Status
                </h3>
                <p className={`text-xs ${colors.textMuted}`}>
                  Current breakdown
                </p>
              </div>
              <PieChartIcon size={20} className={colors.textMuted} />
            </div>
            <div className="h-44 sm:h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={62}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {taskStatusBreakdown.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Manual legend */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2">
              {taskStatusBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={`text-xs ${colors.textMuted} truncate`}>
                    {item.name}
                  </span>
                  <span className="text-xs font-semibold ml-auto">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Charts Row 2: Monthly Trend (Line) + Category Bars ───────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
          {/* Monthly Trend */}
          <div
            className={`lg:col-span-2 ${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div>
                <h3 className="text-sm sm:text-base font-semibold">
                  Monthly Trend
                </h3>
                <p className={`text-xs ${colors.textMuted}`}>
                  Assigned vs completed over time
                </p>
              </div>
              <BarChart3 size={20} className={colors.textMuted} />
            </div>
            <div className="h-56 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis
                    dataKey="month"
                    stroke={axisStroke}
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke={axisStroke} style={{ fontSize: "12px" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="assigned"
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#6b7280" }}
                    name="Assigned"
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ r: 3.5, fill: "#10b981" }}
                    name="Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Bars */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="mb-4 sm:mb-5">
              <h3 className="text-sm sm:text-base font-semibold">
                By Category
              </h3>
              <p className={`text-xs ${colors.textMuted}`}>
                Distribution of your tasks
              </p>
            </div>
            <div className="space-y-3.5">
              {tasksByCategory.map((cat) => {
                const total = tasksByCategory.reduce((s, c) => s + c.value, 0);
                const pct = Math.round((cat.value / total) * 100);
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs sm:text-sm font-medium">
                        {cat.name}
                      </span>
                      <span className="text-xs font-semibold">{cat.value}</span>
                    </div>
                    <div
                      className={`relative h-2 rounded-full overflow-hidden ${barBg}`}
                    >
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Bottom Row: Deadlines + Milestones ────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* Upcoming Deadlines */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div>
                <h3 className="text-sm sm:text-base font-semibold">
                  Upcoming Deadlines
                </h3>
                <p className={`text-xs ${colors.textMuted}`}>
                  Tasks sorted by due date
                </p>
              </div>
              <Calendar size={20} className={colors.textMuted} />
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-lg border ${colors.border} p-3 sm:p-4 ${colors.hover} transition-colors`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-medium leading-snug">
                      {task.title}
                    </p>
                    <span
                      className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className={colors.textMuted} />
                      <span
                        className={`text-xs ${task.daysLeft <= 3 ? "text-red-400 font-semibold" : colors.textMuted}`}
                      >
                        {task.daysLeft} day{task.daysLeft !== 1 ? "s" : ""} left
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 max-w-[140px]">
                      <div
                        className={`flex-1 h-1.5 rounded-full overflow-hidden ${barBg}`}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold w-8 text-right">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Milestones */}
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-6`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div>
                <h3 className="text-sm sm:text-base font-semibold">
                  Recent Milestones
                </h3>
                <p className={`text-xs ${colors.textMuted}`}>
                  Your latest achievements
                </p>
              </div>
              <Award size={20} className="text-amber-400" />
            </div>
            <div className="space-y-3">
              {recentMilestones.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 rounded-lg border ${colors.border} p-3 sm:p-4`}
                >
                  {/* Icon circle */}
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${m.status === "Completed" ? "bg-emerald-500/15" : "bg-purple-500/15"}`}
                  >
                    {m.status === "Completed" ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : (
                      <Clock size={18} className="text-purple-400" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">
                      {m.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${categoryColors[m.category] || ""}`}
                      >
                        {m.category}
                      </span>
                      <span className={`text-xs ${colors.textMuted}`}>
                        {m.completedDate}
                      </span>
                    </div>
                  </div>
                  {/* Status badge */}
                  <span
                    className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${
                      m.status === "Completed"
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                        : "bg-purple-500/15 border-purple-500/30 text-purple-400"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick summary strip */}
            <div
              className={`mt-4 pt-4 border-t ${colors.border} flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className={`text-xs ${colors.textMuted}`}>
                  2 completed this week
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className={`text-xs ${colors.textMuted}`}>
                  1 pending review
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(OverviewPage, { role: "employee" });
