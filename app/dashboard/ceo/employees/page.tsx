"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  Search,
  Filter,
  Download,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  Users,
  UserCheck,
  UserX,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "../data";

// Mock data - Replace with real API calls
const allEmployees = [
  {
    id: "EMP-001",
    name: "Aisha Bello",
    email: "aisha.bello@company.com",
    phone: "+234 801 234 5678",
    position: "Senior Quality Auditor",
    department: "Quality Assurance",
    location: "Lagos, Nigeria",
    status: "Active",
    joinDate: "2023-03-15",
    avatar: "AB",
    tasksAssigned: 12,
    tasksCompleted: 8,
    performanceRating: 4.5,
  },
  {
    id: "EMP-002",
    name: "Michael Okoro",
    email: "michael.okoro@company.com",
    phone: "+234 802 345 6789",
    position: "Environmental Consultant",
    department: "Environmental",
    location: "Port Harcourt, Nigeria",
    status: "Active",
    joinDate: "2022-11-20",
    avatar: "MO",
    tasksAssigned: 10,
    tasksCompleted: 7,
    performanceRating: 4.2,
  },
  {
    id: "EMP-003",
    name: "Fatima Yusuf",
    email: "fatima.yusuf@company.com",
    phone: "+234 803 456 7890",
    position: "Safety Officer",
    department: "Health & Safety",
    location: "Abuja, Nigeria",
    status: "Active",
    joinDate: "2023-01-10",
    avatar: "FY",
    tasksAssigned: 15,
    tasksCompleted: 12,
    performanceRating: 4.8,
  },
  {
    id: "EMP-004",
    name: "David Adebayo",
    email: "david.adebayo@company.com",
    phone: "+234 804 567 8901",
    position: "Compliance Manager",
    department: "Compliance",
    location: "Lagos, Nigeria",
    status: "Active",
    joinDate: "2021-08-05",
    avatar: "DA",
    tasksAssigned: 8,
    tasksCompleted: 6,
    performanceRating: 4.3,
  },
  {
    id: "EMP-005",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+234 805 678 9012",
    position: "Documentation Specialist",
    department: "Documentation",
    location: "Lagos, Nigeria",
    status: "Active",
    joinDate: "2023-05-18",
    avatar: "SJ",
    tasksAssigned: 9,
    tasksCompleted: 9,
    performanceRating: 5.0,
  },
  {
    id: "EMP-006",
    name: "Emmanuel Okafor",
    email: "emmanuel.okafor@company.com",
    phone: "+234 806 789 0123",
    position: "Risk Analyst",
    department: "Risk Management",
    location: "Abuja, Nigeria",
    status: "On Leave",
    joinDate: "2022-06-12",
    avatar: "EO",
    tasksAssigned: 5,
    tasksCompleted: 3,
    performanceRating: 4.0,
  },
  {
    id: "EMP-007",
    name: "Grace Nwosu",
    email: "grace.nwosu@company.com",
    phone: "+234 807 890 1234",
    position: "Training Coordinator",
    department: "Training",
    location: "Port Harcourt, Nigeria",
    status: "Active",
    joinDate: "2023-09-22",
    avatar: "GN",
    tasksAssigned: 11,
    tasksCompleted: 8,
    performanceRating: 4.6,
  },
  {
    id: "EMP-008",
    name: "Ibrahim Musa",
    email: "ibrahim.musa@company.com",
    phone: "+234 808 901 2345",
    position: "Equipment Technician",
    department: "Maintenance",
    location: "Kano, Nigeria",
    status: "Inactive",
    joinDate: "2020-04-30",
    avatar: "IM",
    tasksAssigned: 3,
    tasksCompleted: 2,
    performanceRating: 3.8,
  },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-900/30 border-emerald-800/50 text-emerald-400",
  "On Leave": "bg-amber-900/30 border-amber-800/50 text-amber-400",
  Inactive: "bg-slate-800/30 border-slate-700/50 text-slate-400",
};

type ViewMode = "table" | "grid";
type SortField = "name" | "position" | "department" | "joinDate" | "status";
type SortOrder = "asc" | "desc";

function EmployeesPage() {
  const { theme } = useTheme();
  const colors = themes[theme];

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get unique departments
  const departments = Array.from(
    new Set(allEmployees.map((emp) => emp.department)),
  ).sort();

  // Filter and sort employees
  const filteredEmployees = allEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || employee.status === selectedStatus;
    const matchesDepartment =
      selectedDepartment === "all" ||
      employee.department === selectedDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "position":
        comparison = a.position.localeCompare(b.position);
        break;
      case "department":
        comparison = a.department.localeCompare(b.department);
        break;
      case "joinDate":
        comparison =
          new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
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
    setSelectedDepartment("all");
  };

  const hasActiveFilters =
    selectedStatus !== "all" || selectedDepartment !== "all";

  const activeEmployees = allEmployees.filter(
    (e) => e.status === "Active",
  ).length;
  const onLeaveEmployees = allEmployees.filter(
    (e) => e.status === "On Leave",
  ).length;
  const inactiveEmployees = allEmployees.filter(
    (e) => e.status === "Inactive",
  ).length;

  return (
    <DashboardLayout links={links}>
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:p-6`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
              Employees
            </h1>
            <p className={`${colors.textMuted} text-sm sm:text-base`}>
              Manage your team members and their information
            </p>
          </div>
          <button
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 ${colors.button} rounded-lg font-medium text-sm sm:text-base`}
          >
            <UserPlus size={18} className="sm:w-5 sm:h-5" />
            Add Employee
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm ${colors.textMuted} mb-1`}>
                  Total Employees
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {allEmployees.length}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${colors.stats.blue}`}>
                <Users size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm ${colors.textMuted} mb-1`}>
                  Active
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {activeEmployees}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${colors.stats.green}`}>
                <UserCheck size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm ${colors.textMuted} mb-1`}>
                  On Leave
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {onLeaveEmployees}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${colors.stats.yellow}`}>
                <Clock size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div
            className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs sm:text-sm ${colors.textMuted} mb-1`}>
                  Inactive
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  {inactiveEmployees}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${colors.stats.red}`}>
                <UserX size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div
          className={`${colors.bgCard} rounded-lg border ${colors.border} p-3 sm:p-4 mb-4 sm:mb-6`}
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
                <input
                  type="text"
                  placeholder="Search employees by name, email, or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 text-sm ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Filter Toggle */}
                <button
                  onClick={() => {
                    setShowFilters(!showFilters);
                    setShowMobileFilters(!showMobileFilters);
                  }}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 ${colors.button} rounded-lg text-xs sm:text-sm relative`}
                >
                  <Filter size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Filters</span>
                  {hasActiveFilters && (
                    <span className="absolute -top-1 -right-1 sm:static sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                      {
                        [
                          selectedStatus !== "all",
                          selectedDepartment !== "all",
                        ].filter(Boolean).length
                      }
                    </span>
                  )}
                </button>

                {/* Export */}
                <button
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 ${colors.button} rounded-lg text-xs sm:text-sm`}
                >
                  <Download size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Export</span>
                </button>

                {/* View Toggle */}
                <div
                  className={`hidden sm:flex gap-1 ${colors.bgCard} p-1 rounded-lg border ${colors.border}`}
                >
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-3 py-1 rounded text-sm ${viewMode === "table" ? colors.button : colors.button}`}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1 rounded text-sm ${viewMode === "grid" ? colors.button : colors.button}`}
                  >
                    Grid
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Dropdowns - Desktop */}
            {showFilters && (
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-700">
                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${colors.textMuted}`}
                  >
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={`w-full px-3 py-2 text-sm ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${colors.textMuted}`}
                  >
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className={`w-full px-3 py-2 text-sm ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-3 border-t border-gray-700">
                <span className={`text-xs sm:text-sm ${colors.textMuted}`}>
                  Active filters:
                </span>
                {selectedStatus !== "all" && (
                  <span
                    className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                  >
                    Status: {selectedStatus}
                    <button onClick={() => setSelectedStatus("all")}>
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </span>
                )}
                {selectedDepartment !== "all" && (
                  <span
                    className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 ${colors.bgCard} border ${colors.border} rounded-full text-xs sm:text-sm`}
                  >
                    Department: {selectedDepartment}
                    <button onClick={() => setSelectedDepartment("all")}>
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm text-blue-400 hover:text-blue-300"
                >
                  Clear all
                </button>
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
                <button onClick={() => setShowMobileFilters(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${colors.textMuted}`}
                  >
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={`w-full px-3 py-2 text-sm ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${colors.textMuted}`}
                  >
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className={`w-full px-3 py-2 text-sm ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      clearFilters();
                      setShowMobileFilters(false);
                    }}
                    className={`flex-1 px-4 py-2 ${colors.button} rounded-lg`}
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className={`flex-1 px-4 py-2 ${colors.button} rounded-lg`}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Results Count */}
        <div className="mb-3 sm:mb-4">
          <p className={`${colors.textMuted} text-sm`}>
            Showing {sortedEmployees.length} of {allEmployees.length} employees
          </p>
        </div>

        {/* View Mode Toggle - Mobile Only */}
        <div
          className={`sm:hidden flex gap-2 mb-4 ${colors.bgCard} p-1 rounded-lg border ${colors.border}`}
        >
          <button
            onClick={() => setViewMode("table")}
            className={`flex-1 px-3 py-2 rounded text-sm ${viewMode === "table" ? colors.button : colors.button}`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex-1 px-3 py-2 rounded text-sm ${viewMode === "grid" ? colors.button : colors.button}`}
          >
            Grid
          </button>
        </div>

        {/* Table View */}
        {viewMode === "table" && (
          <div
            className={`${colors.bgCard} rounded-lg border ${colors.border} overflow-hidden`}
          >
            <div className={`overflow-x-auto ${colors.scrollbar}`}>
              <table className="w-full min-w-225">
                <thead
                  className={`${colors.bgSidebar} border-b ${colors.border}`}
                >
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Employee
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("position")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Position
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("department")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Department
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                      Contact
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                      Tasks
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("status")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Status
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className={`border-b ${colors.border} ${colors.tableHover}`}
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-sm font-semibold text-white shadow-md shrink-0">
                            {employee.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-xs sm:text-sm">
                              {employee.name}
                            </div>
                            <div
                              className={`text-xs ${colors.textMuted} truncate`}
                            >
                              {employee.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm">
                          {employee.position}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span
                          className={`px-2 sm:px-3 py-1 ${colors.bgSidebar} border ${colors.border} rounded-full text-xs font-medium`}
                        >
                          {employee.department}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                            <Mail
                              size={12}
                              className={`${colors.textMuted} sm:w-3.5 sm:h-3.5`}
                            />
                            <span className="truncate max-w-37.5">
                              {employee.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                            <Phone
                              size={12}
                              className={`${colors.textMuted} sm:w-3.5 sm:h-3.5`}
                            />
                            <span>{employee.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm">
                          <div className="font-medium">
                            {employee.tasksCompleted}/{employee.tasksAssigned}
                          </div>
                          <div className={`text-xs ${colors.textMuted}`}>
                            Completed
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusColors[employee.status]}`}
                        >
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            className={`p-1.5 sm:p-2 ${colors.hover} rounded-lg`}
                            title="View Details"
                          >
                            <Eye size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button
                            className={`p-1.5 sm:p-2 ${colors.hover} rounded-lg hidden sm:block`}
                            title="Edit Employee"
                          >
                            <Edit size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button
                            className={`p-1.5 sm:p-2 hover:bg-red-900/30 rounded-lg text-red-400 hidden sm:block`}
                            title="Delete Employee"
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
            {sortedEmployees.map((employee) => (
              <div
                key={employee.id}
                className={`${colors.bgCard} rounded-xl border ${colors.border} p-4 sm:p-5 hover:shadow-lg transition-all duration-200 cursor-pointer group`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg font-semibold text-white shadow-lg">
                      {employee.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base group-hover:text-blue-400 transition-colors">
                        {employee.name}
                      </h3>
                      <p className={`text-xs ${colors.textMuted}`}>
                        {employee.id}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`p-2 ${colors.hover} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* Position & Department */}
                <div className={`pb-4 mb-4 border-b ${colors.border}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <Briefcase
                      size={14}
                      className={`${colors.textMuted} mt-0.5 shrink-0`}
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-medium">
                        {employee.position}
                      </p>
                      <p className={`text-xs ${colors.textMuted}`}>
                        {employee.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin
                      size={14}
                      className={`${colors.textMuted} shrink-0`}
                    />
                    <p className="text-xs sm:text-sm">{employee.location}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div
                  className={`pb-4 mb-4 border-b ${colors.border} space-y-2`}
                >
                  <div className="flex items-center gap-2">
                    <Mail
                      size={14}
                      className={`${colors.textMuted} shrink-0`}
                    />
                    <p className="text-xs sm:text-sm truncate">
                      {employee.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone
                      size={14}
                      className={`${colors.textMuted} shrink-0`}
                    />
                    <p className="text-xs sm:text-sm">{employee.phone}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div
                    className={`${colors.bgSidebar} rounded-lg p-3 border ${colors.border}`}
                  >
                    <p className={`text-xs ${colors.textMuted} mb-1`}>Tasks</p>
                    <p className="text-lg font-bold">
                      {employee.tasksCompleted}/{employee.tasksAssigned}
                    </p>
                    <p className={`text-xs ${colors.textMuted}`}>Completed</p>
                  </div>
                  <div
                    className={`${colors.bgSidebar} rounded-lg p-3 border ${colors.border}`}
                  >
                    <p className={`text-xs ${colors.textMuted} mb-1`}>Rating</p>
                    <p className="text-lg font-bold">
                      ⭐ {employee.performanceRating}
                    </p>
                    <p className={`text-xs ${colors.textMuted}`}>Performance</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${colors.textMuted} mb-1`}>Joined</p>
                    <p className="text-xs sm:text-sm font-medium">
                      {new Date(employee.joinDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[employee.status]}`}
                  >
                    {employee.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedEmployees.length === 0 && (
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
              No employees found
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
export default withAuth(EmployeesPage, { role: "ceo" });
