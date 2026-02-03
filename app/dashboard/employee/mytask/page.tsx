"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ArrowUpDown,
  AlertTriangle,
  ListTodo,
  CircleCheckBig,
} from "lucide-react";
import { myTasksData, myTaskStats, navItems } from "../data";
import FiltersandActions from "@/components/dashboard/FiltersandActions";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusCard from "@/components/dashboard/StatusCard";

const statusColors: Record<string, string> = {
  "Not Started": "bg-slate-800/30 border-slate-700/50 text-slate-400",
  "In Progress": "bg-blue-900/30 border-blue-800/50 text-blue-400",
  Completed: "bg-emerald-900/30 border-emerald-800/50 text-emerald-400",
  "Pending Review": "bg-purple-900/30 border-purple-800/50 text-purple-400",
};

const priorityColors: Record<string, string> = {
  High: "bg-red-600/50 shadow-[0_0_0_1px_rgba(239,68,68,0.7)]",
  Medium: "bg-amber-600/50 shadow-[0_0_0_1px_rgba(245,158,11,0.7)]",
  Low: "bg-emerald-600/50 shadow-[0_0_0_1px_rgba(16,185,129,0.7)]",
};

type ViewMode = "table" | "grid";
type SortField = "dueDate" | "priority" | "status" | "progress";
type SortOrder = "asc" | "desc";

function MyTasksPage() {
  const { theme } = useTheme();
  const colors = themes[theme];

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("dueDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter and sort tasks
  const filteredTasks = myTasksData.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.category &&
        task?.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      selectedStatus === "all" || task.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "dueDate":
        comparison =
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case "priority":
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        comparison =
          priorityOrder[a.priority as keyof typeof priorityOrder] -
          priorityOrder[b.priority as keyof typeof priorityOrder];
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      case "progress":
        comparison = a.progress - b.progress;
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setSelectedStatus("all");
    setSelectedPriority("all");
  };

  const hasActiveFilters =
    selectedStatus !== "all" || selectedPriority !== "all";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 size={16} className="text-emerald-400" />;
      case "In Progress":
        return <Clock size={16} className="text-blue-400" />;
      case "Pending Review":
        return <AlertCircle size={16} className="text-purple-400" />;
      default:
        return <Clock size={16} className="text-slate-400" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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

  return (
    <DashboardLayout links={navItems}>
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:p-6`}>
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
            My Tasks
          </h1>
          <p className={`${colors.textMuted} text-sm sm:text-base`}>
            Manage and track your assigned tasks
          </p>
        </div>

        {/* Stats Overview */}
        <StatusCard status={statsConfig} />

        {/* Filters and Actions */}
        <FiltersandActions
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
          hasActiveFilters={hasActiveFilters}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          viewMode={viewMode}
          setViewMode={setViewMode}
          clearFilters={clearFilters}
          label="not started"
        >
          Showing {sortedTasks.length} of {myTasksData.length} tasks
        </FiltersandActions>

        {/* grid View */}
        {viewMode === "grid" && (
          <div className="space-y-3 sm:space-y-4">
            {sortedTasks.map((task) => {
              const daysUntilDue = getDaysUntilDue(task.dueDate);
              const isOverdue = daysUntilDue < 0 && task.status !== "Completed";
              const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;

              return (
                <div
                  key={task.id}
                  className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5 hover:shadow-lg transition-all duration-200 cursor-pointer group`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`text-xs font-medium ${colors.textMuted}`}
                        >
                          {task.id}
                        </span>
                        <span
                          className={`px-2 py-0.5 ${colors.bgSidebar} rounded text-xs font-medium`}
                        >
                          {task.category}
                        </span>
                        {isOverdue && (
                          <span className="px-2 py-0.5 bg-red-900/30 border border-red-800/50 text-red-400 rounded text-xs font-medium">
                            Overdue
                          </span>
                        )}
                        {isDueSoon && task.status !== "Completed" && (
                          <span className="px-2 py-0.5 bg-amber-900/30 border border-amber-800/50 text-amber-400 rounded text-xs font-medium">
                            Due Soon
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm ${colors.textMuted} line-clamp-2`}
                      >
                        {task.description}
                      </p>
                    </div>
                    <button
                      className={`p-2 ${colors.hover} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0`}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Metadata */}
                  <div
                    className={`flex items-center justify-between py-3 border-t border-b ${colors.border} mb-3`}
                  >
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar
                          size={14}
                          className={`${colors.textMuted} shrink-0`}
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-medium">
                            {new Date(task.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                          <p className={`text-xs ${colors.textMuted}`}>
                            {isOverdue
                              ? `${Math.abs(daysUntilDue)} days overdue`
                              : `${daysUntilDue} days left`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock
                          size={14}
                          className={`${colors.textMuted} shrink-0`}
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-medium">
                            {task.hoursLogged}/{task.estimatedHours}h
                          </p>
                          <p className={`text-xs ${colors.textMuted}`}>
                            Logged
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  {/* Progress and Status */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status}
                      </span>

                      {/* <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs sm:text-sm">
                          <MessageSquare
                            size={14}
                            className={colors.textMuted}
                          />
                          <span>{task.comments}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs sm:text-sm">
                          <Paperclip size={14} className={colors.textMuted} />
                          <span>{task.attachments}</span>
                        </div>
                      </div> */}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-medium ${colors.textMuted}`}
                        >
                          Progress
                        </span>
                        <span className="text-sm font-semibold">
                          {task.progress}%
                        </span>
                      </div>
                      <div className="relative bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {task.tags && task?.tags?.length > 0 && (
                    <div
                      className={`flex flex-wrap gap-1.5 mt-3 pt-3 border-t ${colors.border}`}
                    >
                      {task?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 ${colors.bgSidebar} border ${colors.border} rounded text-xs`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} overflow-hidden`}
          >
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead
                  className={`${colors.bgSidebar} border-b ${colors.border}`}
                >
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("dueDate")}
                        className="flex items-center gap-1 hover:text-blue-400"
                      >
                        Task
                        {sortField === "dueDate" && (
                          <ArrowUpDown
                            size={14}
                            className={sortOrder === "asc" ? "" : "rotate-180"}
                          />
                        )}
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("status")}
                        className="flex items-center gap-1 hover:text-blue-400"
                      >
                        Status
                        {sortField === "status" && (
                          <ArrowUpDown
                            size={14}
                            className={sortOrder === "asc" ? "" : "rotate-180"}
                          />
                        )}
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("priority")}
                        className="flex items-center gap-1 hover:text-blue-400"
                      >
                        Priority
                        {sortField === "priority" && (
                          <ArrowUpDown
                            size={14}
                            className={sortOrder === "asc" ? "" : "rotate-180"}
                          />
                        )}
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      <button
                        onClick={() => handleSort("progress")}
                        className="flex items-center gap-1 hover:text-blue-400"
                      >
                        Progress
                        {sortField === "progress" && (
                          <ArrowUpDown
                            size={14}
                            className={sortOrder === "asc" ? "" : "rotate-180"}
                          />
                        )}
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Time
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {sortedTasks.map((task) => {
                    const daysUntilDue = getDaysUntilDue(task.dueDate);
                    const isOverdue =
                      daysUntilDue < 0 && task.status !== "Completed";
                    const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;

                    return (
                      <tr
                        key={task.id}
                        className={`hover:bg-gray-800/30 transition-colors cursor-pointer`}
                      >
                        {/* Task */}
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-xs font-medium ${colors.textMuted}`}
                                >
                                  {task.id}
                                </span>
                                {isOverdue && (
                                  <span className="px-1.5 py-0.5 bg-red-900/30 border border-red-800/50 text-red-400 rounded text-xs">
                                    Overdue
                                  </span>
                                )}
                                {isDueSoon && task.status !== "Completed" && (
                                  <span className="px-1.5 py-0.5 bg-amber-900/30 border border-amber-800/50 text-amber-400 rounded text-xs">
                                    Due Soon
                                  </span>
                                )}
                              </div>
                              <p className="font-medium text-sm mb-1 hover:text-blue-400 transition-colors">
                                {task.title}
                              </p>
                              <p
                                className={`text-xs ${colors.textMuted} line-clamp-1`}
                              >
                                {task.description}
                              </p>
                              {/* <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1 text-xs">
                                  <MessageSquare
                                    size={12}
                                    className={colors.textMuted}
                                  />
                                  <span>{task.comments}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                  <Paperclip
                                    size={12}
                                    className={colors.textMuted}
                                  />
                                  <span>{task.attachments}</span>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 ${colors.bgSidebar} rounded text-xs font-medium`}
                          >
                            {task.category}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}
                          >
                            {getStatusIcon(task.status)}
                            {task.status}
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
                          >
                            {task.priority}
                          </span>
                        </td>

                        {/* Due Date */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className={colors.textMuted} />
                            <div>
                              <p className="text-sm font-medium">
                                {new Date(task.dueDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                              <p
                                className={`text-xs ${isOverdue ? "text-red-400" : colors.textMuted}`}
                              >
                                {isOverdue
                                  ? `${Math.abs(daysUntilDue)} days overdue`
                                  : `${daysUntilDue} days left`}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Progress */}
                        <td className="px-4 py-4">
                          <div className="w-32">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold">
                                {task.progress}%
                              </span>
                            </div>
                            <div className="relative bg-gray-700/50 rounded-full h-2 overflow-hidden">
                              <div
                                className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Time */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className={colors.textMuted} />
                            <div>
                              <p className="text-sm font-medium">
                                {task.hoursLogged}/{task.estimatedHours}h
                              </p>
                              <p className={`text-xs ${colors.textMuted}`}>
                                Logged
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-center">
                          <button className={`p-2 ${colors.hover} rounded-lg`}>
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden divide-y divide-gray-700/50">
              {sortedTasks.map((task) => {
                const daysUntilDue = getDaysUntilDue(task.dueDate);
                const isOverdue =
                  daysUntilDue < 0 && task.status !== "Completed";
                const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;

                return (
                  <div
                    key={task.id}
                    className="p-4 hover:bg-gray-800/30 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className={`text-xs font-medium ${colors.textMuted}`}
                          >
                            {task.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 ${colors.bgSidebar} rounded text-xs`}
                          >
                            {task.category}
                          </span>
                          {isOverdue && (
                            <span className="px-2 py-0.5 bg-red-900/30 border border-red-800/50 text-red-400 rounded text-xs">
                              Overdue
                            </span>
                          )}
                          {isDueSoon && task.status !== "Completed" && (
                            <span className="px-2 py-0.5 bg-amber-900/30 border border-amber-800/50 text-amber-400 rounded text-xs">
                              Due Soon
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm mb-1">
                          {task.title}
                        </h3>
                        <p
                          className={`text-xs ${colors.textMuted} line-clamp-2`}
                        >
                          {task.description}
                        </p>
                      </div>
                      <button className={`p-2 ${colors.hover} rounded-lg`}>
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className={`text-xs ${colors.textMuted} mb-1`}>
                          Status
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[task.status]}`}
                        >
                          {getStatusIcon(task.status)}
                          {task.status}
                        </span>
                      </div>
                      <div>
                        <p className={`text-xs ${colors.textMuted} mb-1`}>
                          Priority
                        </p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div>
                        <p className={`text-xs ${colors.textMuted} mb-1`}>
                          Due Date
                        </p>
                        <p className="text-xs font-medium">
                          {new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${colors.textMuted} mb-1`}>
                          Time Logged
                        </p>
                        <p className="text-xs font-medium">
                          {task.hoursLogged}/{task.estimatedHours}h
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${colors.textMuted}`}>
                          Progress
                        </span>
                        <span className="text-xs font-semibold">
                          {task.progress}%
                        </span>
                      </div>
                      <div className="relative bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    {/* <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-700/50">
                      <div className="flex items-center gap-1 text-xs">
                        <MessageSquare size={12} className={colors.textMuted} />
                        <span>{task.comments}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Paperclip size={12} className={colors.textMuted} />
                        <span>{task.attachments}</span>
                      </div>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {sortedTasks.length === 0 && (
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-12 text-center`}
          >
            <div className="max-w-md mx-auto">
              <div
                className={`w-16 h-16 ${colors.bgSidebar} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <CheckCircle2 size={32} className={colors.textMuted} />
              </div>
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className={`${colors.textMuted} mb-4`}>
                {searchQuery || hasActiveFilters
                  ? "Try adjusting your search or filters"
                  : "You don't have any tasks assigned yet"}
              </p>
              {(searchQuery || hasActiveFilters) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    clearFilters();
                  }}
                  className={`${colors.button} px-6 py-2 rounded-lg`}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default withAuth(MyTasksPage, { role: "employee" });
