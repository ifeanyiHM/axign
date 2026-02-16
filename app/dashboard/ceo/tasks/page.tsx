"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  Search,
  Calendar,
  Clock,
  ArrowUpDown,
  Plus,
  ListTodo,
  CircleCheckBig,
  AlertTriangle,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "../data";
import StatusCard from "@/components/dashboard/StatusCard";
import { Button } from "@/components/ui/button";
import FiltersandActions from "@/components/dashboard/FiltersandActions";
import Header from "@/components/dashboard/Header";
import { getStatusIcon, priorityColors, statusColors } from "@/utils/constant";
import { useTask } from "@/context/TaskContext";
import Avatar from "@/components/dashboard/Avatar";
import { useTaskStats } from "@/hooks/useTaskStats";
import TaskActionMenu from "@/components/dashboard/TaskActionMenu";
import { useRouter } from "next/navigation";
import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";
import StatusCardSkeleton from "@/components/skeletons/StatusCardSkeleton";
import FiltersAndActionsSkeleton from "@/components/skeletons/FiltersAndActionSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

type ViewMode = "table" | "grid";
type SortField = "dueDate" | "priority" | "status" | "createdAt" | "title";
type SortOrder = "asc" | "desc";

function AllTasksPage() {
  const { theme } = useTheme();
  const colors = themes[theme];

  const { allTasks, deleteTask, loading } = useTask();
  const myTaskStats = useTaskStats();

  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("dueDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter and sort tasks
  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo
        .map((assignee) => assignee.name.toLowerCase())
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || task.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;
    const matchesCategory =
      selectedCategory === "all" || task.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
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
      case "createdAt":
        comparison =
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
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
    setSelectedCategory("all");
  };

  const hasActiveFilters =
    selectedStatus !== "all" ||
    selectedPriority !== "all" ||
    selectedCategory !== "all";

  const statsConfig = [
    {
      label: "Total Tasks",
      value: myTaskStats.total,
      icon: ListTodo,
    },
    {
      label: "Pending",
      value: myTaskStats.pending,
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

  const router = useRouter();

  return (
    <DashboardLayout links={links}>
      {/* Header */}

      {loading ? (
        <HeaderSkeleton className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6" />
      ) : (
        <Header
          title="All Tasks"
          subtitle="Manage and track all tasks across your organization"
          buttonTitle="Create Task"
          icon={Plus}
          className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
          onClick={() => router.push("/dashboard/ceo/create")}
        />
      )}
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-0`}>
        {/* Stats Overview */}
        {loading ? <StatusCardSkeleton /> : <StatusCard status={statsConfig} />}

        {/* Filters and Actions */}
        {loading ? (
          <FiltersAndActionsSkeleton />
        ) : (
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
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            viewMode={viewMode}
            setViewMode={setViewMode}
            clearFilters={clearFilters}
            label="not started"
          >
            Showing {sortedTasks.length} of {allTasks.length} tasks
          </FiltersandActions>
        )}

        {/* Table View */}
        {loading ? (
          <TableSkeleton />
        ) : (
          viewMode === "table" && (
            <div
              className={`${colors.bgCard} rounded-lg overflow-hidden`}
              style={{ boxShadow: colors.cardShadow }}
            >
              <div className="overflow-x-auto">
                <table className="min-w-240 w-full">
                  <thead
                    className={`${colors.bgSidebar} border-b ${colors.border}`}
                  >
                    <tr>
                      <th className="px-2 sm:pl-3 sm:pr-0 py-3 sm:py-4 text-left">
                        <Button
                          variant={"ghost"}
                          onClick={() => handleSort("title")}
                          className="flex py-0 px-0 hover:bg-0 items-center gap-2 font-semibold text-xs sm:text-sm"
                        >
                          Task
                          <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                        </Button>
                      </th>
                      <th className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                        Assigned To
                      </th>
                      <th className="px-2 sm:px-3 py-3 sm:py-4 text-left">
                        <Button
                          variant={"ghost"}
                          onClick={() => handleSort("dueDate")}
                          className="flex py-0 px-0 hover:bg-0  items-center gap-2 font-semibold text-xs sm:text-sm"
                        >
                          Due Date
                          <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                        </Button>
                      </th>
                      <th className="px-2 sm:px-3 py-3 sm:py-4 text-left">
                        <Button
                          variant={"ghost"}
                          onClick={() => handleSort("priority")}
                          className="flex py-0 px-0 hover:bg-0  items-center gap-2 font-semibold text-xs sm:text-sm"
                        >
                          Priority
                          <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                        </Button>
                      </th>
                      <th className="px-2 sm:px-3 py-3 sm:py-4 text-left">
                        <Button
                          variant={"ghost"}
                          onClick={() => handleSort("status")}
                          className="flex py-0 px-0 hover:bg-0 items-center gap-2 font-semibold text-xs sm:text-sm"
                        >
                          Status
                          <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                        </Button>
                      </th>
                      <th className="px-2 sm:pl-0 sm:pr-7 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                        Progress
                      </th>
                      <th className="px-2 sm:px-3 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTasks.map((task, index) => (
                      <tr
                        key={index}
                        className={`border-b cursor-pointer ${colors.border} ${colors.tableHover}`}
                      >
                        <td className="px-2 sm:pl-3 sm:pr-0 py-3 sm:py-4">
                          <div title={task.title}>
                            <div className="font-medium text-xs sm:text-sm">
                              {task.title.length > 30
                                ? `${task.title.slice(0, 30)}...`
                                : task.title}
                            </div>
                            <div className={`text-xs ${colors.textMuted}`}>
                              {`T-${task.id.slice(0, 4)}`} • {task.category}
                            </div>
                          </div>
                        </td>
                        <td className="px-2 sm:px-3 py-3 sm:py-4 space-y-1">
                          {task.assignedTo.map((assignee, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Avatar
                                avatar={assignee.avatar}
                                name={assignee.name}
                                className="w-6 h-6 sm:w-8 sm:h-8"
                              />
                              <span className="text-xs truncate sm:inline">
                                {assignee.name}
                              </span>
                            </div>
                          ))}
                        </td>
                        <td className="px-2 sm:px-3 py-3 sm:py-4">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Calendar
                              size={14}
                              className={`${colors.textMuted} shrink-0 sm:w-4 sm:h-4`}
                            />
                            <span className="text-xs sm:text-sm whitespace-nowrap">
                              {new Date(task.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-3 py-3 sm:py-4">
                          <span
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs ${
                              task.priority === "High"
                                ? "bg-red-600/50 shadow-[0_0_4px_rgba(239,68,68,0.5)]"
                                : task.priority === "Medium"
                                  ? "bg-amber-600/50 shadow-[0_0_4px_rgba(245,158,11,0.5)]"
                                  : "bg-emerald-600/50 shadow-[0_0_4px_rgba(16,185,129,0.5)]"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>

                        <td className="px-2 sm:px-3 py-3 sm:py-4">
                          <span
                            className={`inline-flex truncate items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs border ${statusColors[task.status]}`}
                          >
                            {getStatusIcon(task.status)}
                            <span className="">{task.status}</span>
                          </span>
                        </td>

                        <td className="px-2 sm:pl-0 sm:pr-7 py-3 sm:py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 min-w-10 md:min-w-20">
                              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-slate-500 transition-all"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>

                            <span className="text-xs font-medium tabular-nums">
                              {task.progress}%
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-4 relative">
                          <TaskActionMenu
                            taskId={task.id}
                            editUrl={`/dashboard/ceo/tasks/${task.id}`}
                            onDelete={deleteTask}
                            colors={colors}
                            index={index}
                            taskLength={sortedTasks.length}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {sortedTasks.map((task, index) => (
              <div
                key={index}
                className={`${colors.bgCard} rounded-xl p-4 sm:p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between`}
                style={{ boxShadow: colors.cardShadow }}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1">
                      {task.title}
                    </h3>
                    <p className={`text-xs ${colors.textMuted} truncate`}>
                      {`T-${task.id.slice(0, 7)}`} • {task.category}
                    </p>
                  </div>
                  <TaskActionMenu
                    taskId={task.id}
                    editUrl={`/dashboard/ceo/tasks/${task.id}`}
                    onDelete={deleteTask}
                    colors={colors}
                    index={index}
                    taskLength={sortedTasks.length}
                  />
                </div>

                {/* Description */}
                <p
                  className={`text-xs sm:text-sm ${colors.textMuted} line-clamp-3 mb-3`}
                >
                  {task.description}
                </p>

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {task.tags?.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-0.5 ${colors.bgSidebar} rounded text-xs`}
                      >
                        {tag}
                      </span>
                    ))}
                    {task.tags && task.tags?.length > 2 && (
                      <span
                        className={`px-2 py-0.5 ${colors.bgSidebar} rounded text-xs`}
                      >
                        +{task.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mb-3 gap-3">
                  <div className="space-y-1">
                    {task.assignedTo.map((assignee, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Avatar
                          avatar={assignee.avatar}
                          name={assignee.name}
                          className="w-6 h-6 sm:w-8 sm:h-8"
                        />
                        <span className="text-xs sm:text-sm truncate">
                          {assignee.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Calendar
                      size={14}
                      className={`${colors.textMuted} shrink-0 sm:w-4 sm:h-4`}
                    />
                    <span>
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Status & Priority */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs border ${statusColors[task.status]}`}
                  >
                    {getStatusIcon(task.status)}
                    <span className="truncate">{task.status}</span>
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs ${colors.textMuted}`}>
                      Progress
                    </span>
                    <span className="text-xs font-medium">
                      {task.progress}%
                    </span>
                  </div>
                  <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2 w-full overflow-hidden">
                    <div
                      className="bg-slate-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedTasks.length === 0 && (
          <div
            className={`${colors.bgCard} rounded-lg border ${colors.border} p-8 sm:p-12 text-center`}
          >
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${colors.bgSidebar} flex items-center justify-center mx-auto mb-3 sm:mb-4`}
            >
              <Search
                size={24}
                className={`${colors.textMuted} sm:w-8 sm:h-8`}
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              No tasks found
            </h3>
            <p className={`${colors.textMuted} text-sm sm:text-base`}>
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
export default withAuth(AllTasksPage, { role: "ceo" });
