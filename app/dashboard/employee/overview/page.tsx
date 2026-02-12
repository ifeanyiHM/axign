"use client";

import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  CheckCircle2,
  Clock,
  Activity,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  ListTodo,
  CircleCheckBig,
  AlertTriangle,
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
import Header from "@/components/dashboard/Header";
import StatusCard from "@/components/dashboard/StatusCard";
import { useTask } from "@/context/TaskContext";
import { useTaskStats } from "@/hooks/useTaskStats";
import { PieDataItem } from "@/components/dashboard/PieChartComponent";
import { priorityColors } from "@/utils/constant";
import { useMemo } from "react";

// ─── Helper Functions ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateWeeklyActivity = (tasks: any[]) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay()); // Start from Sunday

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
      completed: dayTasks.length,
      hoursLogged: dayTasks.reduce((sum, t) => sum + (t.hoursLogged || 0), 0),
    };
  });

  return weeklyData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateMonthlyTrend = (tasks: any[]) => {
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  const today = new Date();

  return months.map((month, index) => {
    const monthDate = new Date(
      today.getFullYear(),
      today.getMonth() - (6 - index),
      1,
    );
    const nextMonth = new Date(
      today.getFullYear(),
      today.getMonth() - (5 - index),
      1,
    );

    const monthTasks = tasks.filter((task) => {
      const createdDate = new Date(task.createdAt);
      return createdDate >= monthDate && createdDate < nextMonth;
    });

    const completedTasks = monthTasks.filter((t) => t.status === "Completed");

    return {
      month,
      completed: completedTasks.length,
      assigned: monthTasks.length,
    };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateTasksByCategory = (tasks: any[]) => {
  const categoryColors: Record<string, string> = {
    Audit: "#3b82f6",
    Documentation: "#10b981",
    Training: "#f59e0b",
    Reporting: "#8b5cf6",
    Maintenance: "#ef4444",
    Assessment: "#06b6d4",
    default: "#64748b",
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
const getRecentMilestones = (tasks: any[]) => {
  const milestoneTasks = tasks
    .filter(
      (task) => task.status === "Completed" || task.status === "Pending Review",
    )
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 3);

  return milestoneTasks.map((task) => ({
    id: task.id,
    title: task.title,
    category: task.category,
    completedDate: new Date(task.updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: task.status,
  }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUpcomingDeadlines = (tasks: any[]) => {
  const today = new Date();

  const upcomingTasks = tasks
    .filter((task) => task.status !== "Completed")
    .map((task) => {
      const dueDate = new Date(task.dueDate);
      const daysLeft = Math.ceil(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      return {
        id: task.id,
        title: task.title,
        dueDate: dueDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        daysLeft,
        priority: task.priority,
        progress: task.progress,
      };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  return upcomingTasks;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

  const { myTasks } = useTask();
  const myTaskStats = useTaskStats();

  // ✨ Calculate dynamic data from myTasks
  const weeklyActivity = useMemo(
    () => calculateWeeklyActivity(myTasks),
    [myTasks],
  );
  const monthlyTrend = useMemo(() => calculateMonthlyTrend(myTasks), [myTasks]);
  const tasksByCategory = useMemo(
    () => calculateTasksByCategory(myTasks),
    [myTasks],
  );
  const recentMilestones = useMemo(
    () => getRecentMilestones(myTasks),
    [myTasks],
  );
  const upcomingDeadlines = useMemo(
    () => getUpcomingDeadlines(myTasks),
    [myTasks],
  );

  // Calculate total hours from actual tasks
  const totalHoursLogged = useMemo(
    () => myTasks.reduce((sum, task) => sum + (task.hoursLogged || 0), 0),
    [myTasks],
  );

  const estimatedTotalHours = useMemo(
    () => myTasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0),
    [myTasks],
  );

  // Shared chart style helpers
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

  const statsConfig = [
    {
      label: "Total Tasks",
      value: myTaskStats.total,
      icon: ListTodo,
    },
    {
      label: "In Progress",
      value: myTaskStats.inProgress,
      icon: Clock,
    },
    {
      label: "Completed",
      value: myTaskStats.completed,
      icon: CircleCheckBig,
    },
    {
      label: "Overdue",
      value: myTaskStats.overdue,
      icon: AlertTriangle,
    },
  ];

  // Derived stats
  const totalAssigned = myTaskStats.total;
  const totalCompleted = myTaskStats.completed;
  const completionRate =
    totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0;
  const hoursUtilization =
    estimatedTotalHours > 0
      ? Math.round((totalHoursLogged / estimatedTotalHours) * 100)
      : 0;

  const taskStatusBreakdown: PieDataItem[] = [
    { name: "Completed", value: myTaskStats.completed, color: "#059669" },
    { name: "In Progress", value: myTaskStats.inProgress, color: "#1e40af" },
    { name: "Pending Review", value: myTaskStats.pending, color: "#64748b" },
    { name: "Overdue", value: myTaskStats.overdue, color: "#b91c1c" },
    { name: "Not Started", value: myTaskStats.notStarted, color: "#38bdf8" },
  ].filter((item) => item.value > 0); // Only show statuses with tasks

  return (
    <DashboardLayout links={navItems}>
      {/* Header */}
      <Header
        title="Overview"
        subtitle="Your personal performance and task summary"
        className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
      />
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-0`}>
        {/* Stats Overview */}
        <StatusCard status={statsConfig} />

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
                className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
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
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-blue-400 transition-all duration-700"
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
            {taskStatusBreakdown.length > 0 ? (
              <>
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
                        className="w-2.5 h-2.5 rounded-full shrink-0"
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
              </>
            ) : (
              <div className="h-52 flex items-center justify-center">
                <p className={colors.textMuted}>No tasks yet</p>
              </div>
            )}
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
            {tasksByCategory.length > 0 ? (
              <div className="space-y-3.5">
                {tasksByCategory.map((cat) => {
                  const total = tasksByCategory.reduce(
                    (s, c) => s + c.value,
                    0,
                  );
                  const pct = Math.round((cat.value / total) * 100);
                  return (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs sm:text-sm font-medium">
                          {cat.name}
                        </span>
                        <span className="text-xs font-semibold">
                          {cat.value}
                        </span>
                      </div>
                      <div
                        className={`relative h-2 rounded-full overflow-hidden ${barBg}`}
                      >
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: cat.color,
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
            {upcomingDeadlines.length > 0 ? (
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
                        className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}
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
                          {task.daysLeft} day{task.daysLeft !== 1 ? "s" : ""}{" "}
                          left
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-1 max-w-35">
                        <div
                          className={`flex-1 h-1.5 rounded-full overflow-hidden ${barBg}`}
                        >
                          <div
                            className="h-full rounded-full bg-linear-to-r from-blue-500 to-blue-400 transition-all duration-500"
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
            ) : (
              <div className="h-52 flex items-center justify-center">
                <p className={colors.textMuted}>No upcoming deadlines</p>
              </div>
            )}
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
            {recentMilestones.length > 0 ? (
              <>
                <div className="space-y-3">
                  {recentMilestones.map((m) => (
                    <div
                      key={m.id}
                      className={`flex items-start gap-3 rounded-lg border ${colors.border} p-3 sm:p-4`}
                    >
                      {/* Icon circle */}
                      <div
                        className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${m.status === "Completed" ? "bg-emerald-500/15" : "bg-purple-500/15"}`}
                      >
                        {m.status === "Completed" ? (
                          <CheckCircle2
                            size={18}
                            className="text-emerald-400"
                          />
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
                        className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${
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
                      {
                        recentMilestones.filter((m) => m.status === "Completed")
                          .length
                      }{" "}
                      completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className={`text-xs ${colors.textMuted}`}>
                      {
                        recentMilestones.filter(
                          (m) => m.status === "Pending Review",
                        ).length
                      }{" "}
                      pending review
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-52 flex items-center justify-center">
                <p className={colors.textMuted}>No milestones yet</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(OverviewPage, { role: "employee" });
