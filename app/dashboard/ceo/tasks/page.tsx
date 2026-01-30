"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  Search,
  Filter,
  Download,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpDown,
  X,
  Check,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links, stats } from "../data";
import StatusCard from "@/components/dashboard/StatusCard";
import InputField from "@/components/primitives/form/InputField";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/primitives/form/SelectField";

// Mock data - Replace with real API calls
const allTasks = [
  {
    id: "T-001",
    title: "Conduct ISO 9001 Audit for Access Bank",
    description: "Complete annual ISO 9001 certification audit",
    assignedTo: { name: "Aisha Bello", avatar: "AB" },
    dueDate: "2026-02-05",
    priority: "High",
    status: "In Progress",
    category: "Audit",
    progress: 65,
    createdAt: "2026-01-15",
    tags: ["ISO", "Banking", "Compliance"],
  },
  {
    id: "T-002",
    title: "Update Risk Register QHSE",
    description: "Quarterly update of risk assessment documentation",
    assignedTo: { name: "Michael Okoro", avatar: "MO" },
    dueDate: "2026-02-10",
    priority: "Medium",
    status: "Not Started",
    category: "Documentation",
    progress: 0,
    createdAt: "2026-01-20",
    tags: ["QHSE", "Risk Management"],
  },
  {
    id: "T-003",
    title: "Safety Training Session Prep",
    description: "Prepare materials for monthly safety training",
    assignedTo: { name: "Fatima Yusuf", avatar: "FY" },
    dueDate: "2026-01-30",
    priority: "High",
    status: "Completed",
    category: "Training",
    progress: 100,
    createdAt: "2026-01-10",
    tags: ["Safety", "Training"],
  },
  {
    id: "T-004",
    title: "Client Report Submission",
    description: "Submit monthly compliance report to GT Bank",
    assignedTo: { name: "David Adebayo", avatar: "DA" },
    dueDate: "2026-02-01",
    priority: "Medium",
    status: "Pending Review",
    category: "Reporting",
    progress: 90,
    createdAt: "2026-01-18",
    tags: ["Reporting", "Banking"],
  },
  {
    id: "T-005",
    title: "Equipment Calibration",
    description: "Calibrate testing equipment as per schedule",
    assignedTo: { name: "Aisha Bello", avatar: "AB" },
    dueDate: "2026-02-15",
    priority: "Low",
    status: "In Progress",
    category: "Maintenance",
    progress: 30,
    createdAt: "2026-01-22",
    tags: ["Equipment", "Maintenance"],
  },
  {
    id: "T-006",
    title: "Environmental Impact Assessment",
    description: "Conduct EIA for new client project",
    assignedTo: { name: "Michael Okoro", avatar: "MO" },
    dueDate: "2026-02-20",
    priority: "High",
    status: "In Progress",
    category: "Assessment",
    progress: 45,
    createdAt: "2026-01-25",
    tags: ["Environment", "Assessment"],
  },
  {
    id: "T-007",
    title: "Update ISO Documentation",
    description: "Review and update ISO 14001 procedures",
    assignedTo: { name: "Fatima Yusuf", avatar: "FY" },
    dueDate: "2026-02-12",
    priority: "Medium",
    status: "Not Started",
    category: "Documentation",
    progress: 0,
    createdAt: "2026-01-26",
    tags: ["ISO", "Documentation"],
  },
  {
    id: "T-008",
    title: "Staff Performance Review",
    description: "Quarterly performance evaluation",
    assignedTo: { name: "David Adebayo", avatar: "DA" },
    dueDate: "2026-02-08",
    priority: "Medium",
    status: "In Progress",
    category: "HR",
    progress: 55,
    createdAt: "2026-01-12",
    tags: ["HR", "Performance"],
  },
];

const statusColors: Record<string, string> = {
  "Not Started": "bg-slate-800/30 border-slate-700/50",
  "In Progress": "bg-blue-900/30 border-blue-800/50",
  Completed: "bg-emerald-900/30 border-emerald-800/50",
  "Pending Review": "bg-purple-900/30 border-purple-800/50",
};

const priorityColors: Record<string, string> = {
  High: "bg-red-600/50 shadow-[0_0_0_1px_rgba(239,68,68,0.7)]",
  Medium: "bg-amber-600/50 shadow-[0_0_0_1px_rgba(245,158,11,0.7)]",
  Low: "bg-emerald-600/50 shadow-[0_0_0_1px_rgba(16,185,129,0.7)]",
};

type ViewMode = "table" | "grid";
type SortField = "dueDate" | "priority" | "status" | "createdAt" | "title";
type SortOrder = "asc" | "desc";

function AllTasksPage() {
  const { theme } = useTheme();
  const colors = themes[theme];

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
      task.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase());
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
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 size={16} />;
      case "In Progress":
        return <Clock size={16} />;
      case "Pending Review":
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
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

  return (
    <DashboardLayout links={links}>
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:p-6`}>
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl font-bold">All Tasks</h1>
          <p className={`${colors.textMuted} text-sm`}>
            Manage and track all tasks across your organization
          </p>
        </div>

        {/* Stats Overview */}
        <StatusCard status={stats} />

        {/* Filters and Actions */}
        <div
          className={`${colors.bgCard} rounded-lg p-3 sm:p-4 mb-4 sm:mb-6`}
          style={{ boxShadow: colors.cardShadow }}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search and Main Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.textMuted}`}
                  size={18}
                />
                <InputField
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 text-sm border-0 ${colors.input}`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Filter Toggle */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowFilters(!showFilters);
                    setShowMobileFilters(!showMobileFilters);
                  }}
                  className={`text-xs sm:text-sm relative ${colors.hover}`}
                >
                  <Filter size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Filters</span>
                  {hasActiveFilters && (
                    <span className="absolute right-12 -top-0.5 md:-top-1 md:-right-1 sm:static sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                      {
                        [
                          selectedStatus !== "all",
                          selectedPriority !== "all",
                          selectedCategory !== "all",
                        ].filter(Boolean).length
                      }
                    </span>
                  )}
                </Button>

                {/* Export */}
                <Button
                  variant="ghost"
                  className={`text-xs sm:text-sm ${colors.hover}`}
                >
                  <Download size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Export</span>
                </Button>

                {/* View Toggle - Desktop Only */}
                <div
                  className={`hidden sm:flex gap-1 ${colors.bgCard} p-1 rounded-lg border ${colors.border}`}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode("table")}
                    className={`${colors.hover} px-3 py-1 rounded text-sm`}
                  >
                    Table {viewMode === "table" && <Check size={12} />}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode("grid")}
                    className={`${colors.hover} px-3 py-1 rounded text-sm`}
                  >
                    Grid {viewMode === "grid" && <Check size={12} />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter Dropdowns - Desktop */}
            {showFilters && (
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-400">
                <SelectField
                  label="Status"
                  containerClassName="sm:gap-2"
                  value={selectedStatus}
                  selectClassName={`w-full ${colors.text} border-0 px-3 py-2 text-sm ${colors.select}`}
                  labelClassName={`${colors.textMuted}`}
                  onValueChange={(value) => setSelectedStatus(value)}
                  options={[
                    { label: "All Statues", value: "all" },
                    { label: "Not Started", value: "Not Started" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Pending Review", value: "Pending Review" },
                    { label: "Completed", value: "Completed" },
                  ]}
                />

                <SelectField
                  label="Priority"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  labelClassName={`${colors.textMuted}`}
                  value={selectedPriority}
                  onValueChange={(value) => setSelectedPriority(value)}
                  options={[
                    { label: "All Priorities", value: "all" },
                    { label: "High", value: "High" },
                    { label: "Medium", value: "Medium" },
                    { label: "Low", value: "Low" },
                  ]}
                />

                <SelectField
                  label="Category"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  labelClassName={`${colors.textMuted}`}
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                  options={[
                    { label: "All Categories", value: "all" },
                    { label: "Audit", value: "Audit" },
                    { label: "Documentation", value: "Documentation" },
                    { label: "Training", value: "Training" },
                    { label: "Reporting", value: "Reporting" },
                    { label: "Maintenance", value: "Maintenance" },
                    { label: "Assessment", value: "Assessment" },
                    { label: "HR", value: "HR" },
                  ]}
                />
              </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap flex-col md:flex-row md:items-center gap-2 pt-2 sm:pt-3 border-t border-gray-400">
                <span className={`text-xs sm:text-sm ${colors.textMuted}`}>
                  Active filters:
                </span>
                {selectedStatus !== "all" && (
                  <span
                    className={`flex self-start items-center gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                  >
                    Status: {selectedStatus}
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setSelectedStatus("all")}
                      className={`${colors.hover}`}
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </Button>
                  </span>
                )}
                {selectedPriority !== "all" && (
                  <span
                    className={`flex items-center self-start gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                  >
                    Priority: {selectedPriority}
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setSelectedPriority("all")}
                      className={`${colors.hover}`}
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </Button>
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span
                    className={`flex items-center self-start gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                  >
                    Category: {selectedCategory}
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setSelectedCategory("all")}
                      className={`${colors.hover}`}
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </Button>
                  </span>
                )}
                <Button
                  size="icon-xs"
                  className={`${colors.button} mr-auto md:mr-0 md:ml-auto w-auto px-3 rounded py-2 text-xs sm:text-sm`}
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilters && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40 sm:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <div
              className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden ${colors.bgCard} rounded-t-2xl p-4 border-t ${colors.border} max-h-[80vh] overflow-y-auto`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X size={24} />
                </Button>
              </div>

              <div className="space-y-4">
                <SelectField
                  label="Status"
                  containerClassName="sm:gap-2"
                  value={selectedStatus}
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  onValueChange={(value) => setSelectedStatus(value)}
                  options={[
                    { label: "All Statues", value: "all" },
                    { label: "Not Started", value: "Not Started" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Pending Review", value: "Pending Review" },
                    { label: "Completed", value: "Completed" },
                  ]}
                />

                <SelectField
                  label="Priority"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  value={selectedPriority}
                  onValueChange={(value) => setSelectedPriority(value)}
                  options={[
                    { label: "All Priorities", value: "all" },
                    { label: "High", value: "High" },
                    { label: "Medium", value: "Medium" },
                    { label: "Low", value: "Low" },
                  ]}
                />

                <SelectField
                  label="Category"
                  containerClassName="sm:gap-2"
                  selectClassName={`w-full border-0 px-3 py-2 text-sm ${colors.select}`}
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value)}
                  options={[
                    { label: "All Categories", value: "all" },
                    { label: "Audit", value: "Audit" },
                    { label: "Documentation", value: "Documentation" },
                    { label: "Training", value: "Training" },
                    { label: "Reporting", value: "Reporting" },
                    { label: "Maintenance", value: "Maintenance" },
                    { label: "Assessment", value: "Assessment" },
                    { label: "HR", value: "HR" },
                  ]}
                />

                <div className="flex gap-2 pt-2">
                  <Button
                    className={`flex-1 px-4 py-2 ${colors.button} rounded-lg`}
                    onClick={() => {
                      clearFilters();
                      setShowMobileFilters(false);
                    }}
                  >
                    Clear all
                  </Button>
                  <Button
                    onClick={() => setShowMobileFilters(false)}
                    className={`flex-1 px-4 py-2 ${colors.button} rounded-lg`}
                  >
                    Apply filters
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Results Count */}
        <div className="mb-3 sm:mb-4">
          <p className={`${colors.textMuted} text-sm`}>
            Showing {sortedTasks.length} of {allTasks.length} tasks
          </p>
        </div>

        {/* View Mode Toggle - Mobile Only */}
        <div className={`sm:hidden flex gap-2 mb-4 p-1 rounded-lg`}>
          <Button
            onClick={() => setViewMode("table")}
            className={`w-full rounded text-sm ${colors.button}`}
          >
            Table {viewMode === "table" && <CheckCircle2 size={18} />}
          </Button>
          <Button
            onClick={() => setViewMode("grid")}
            className={`w-full rounded text-sm ${colors.button}`}
          >
            Grid {viewMode === "grid" && <CheckCircle2 size={18} />}
          </Button>
        </div>

        {/* Table View */}
        {viewMode === "table" && (
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
                    <th className="px-3 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("title")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Task
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                      Assigned To
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("dueDate")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Due Date
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("priority")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Priority
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("status")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Status
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                      Progress
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTasks.map((task) => (
                    <tr
                      key={task.id}
                      className={`border-b ${colors.border} ${colors.tableHover}`}
                    >
                      <td className="px-3 py-3 sm:py-4">
                        <div className="">
                          <div className="font-medium text-xs sm:text-sm">
                            {task.title}
                          </div>
                          <div className={`text-xs ${colors.textMuted}`}>
                            {task.id} • {task.category}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 sm:py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold shrink-0">
                            {task.assignedTo.avatar}
                          </div>
                          <span className="text-xs sm:text-sm hidden sm:inline">
                            {task.assignedTo.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 sm:py-4">
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
                      <td className="px-3 py-3 sm:py-4">
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

                      <td className="px-3 py-3 sm:py-4">
                        <span
                          className={`inline-flex truncate items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs border ${statusColors[task.status]}`}
                        >
                          {getStatusIcon(task.status)}
                          <span className="hidden sm:inline">
                            {task.status}
                          </span>
                        </span>
                      </td>

                      <td className="px-3 py-3 sm:py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-1.5 sm:h-2 min-w-10">
                            <div
                              className="bg-blue-600 h-1.5 sm:h-2 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <span className="text-xs sm:text-sm whitespace-nowrap">
                            {task.progress}%
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            className={`p-1.5 sm:p-2 ${colors.hover} rounded-lg`}
                            title="View Details"
                          >
                            <Eye size={14} className="sm:w-4 sm:h-4" />
                          </button>

                          <button
                            className={`p-1.5 sm:p-2 ${colors.hover} rounded-lg hidden sm:block`}
                            title="Edit Task"
                          >
                            <Edit size={14} className="sm:w-4 sm:h-4" />
                          </button>

                          <button
                            className="p-1.5 sm:p-2 hover:bg-red-900/30 rounded-lg text-red-400 hidden sm:block"
                            title="Delete Task"
                          >
                            <Trash2 size={14} className="sm:w-4 sm:h-4" />
                          </button>

                          <button
                            className={`p-1.5 sm:p-2 ${colors.hover} rounded-lg sm:hidden`}
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
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
                      {task.id} • {task.category}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`p-1 ${colors.hover} rounded shrink-0 ml-2`}
                  >
                    <MoreVertical size={16} />
                  </Button>
                </div>

                {/* Description */}
                <p
                  className={`text-xs sm:text-sm ${colors.textMuted} line-clamp-3 mb-3`}
                >
                  {task.description}
                </p>

                {/* Tags */}
                {task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {task.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 ${colors.bgSidebar} rounded text-xs`}
                      >
                        {tag}
                      </span>
                    ))}
                    {task.tags.length > 2 && (
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
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold">
                      {task.assignedTo.avatar}
                    </div>
                    <span className="text-xs sm:text-sm truncate">
                      {task.assignedTo.name}
                    </span>
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
                  <div className="bg-gray-700 rounded-full h-1.5 sm:h-2 w-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
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
