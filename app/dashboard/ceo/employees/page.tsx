"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  MoreVertical,
  Eye,
  Trash2,
  Users,
  UserCheck,
  UserX,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "../data";
import StatusCard from "@/components/dashboard/StatusCard";
import FiltersandActions from "@/components/dashboard/FiltersandActions";
import Header from "@/components/dashboard/Header";
import { useUser } from "@/context/UserContext";
import { capitalize } from "@/utils/format";
import Avatar from "@/components/dashboard/Avatar";
import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";
import StatusCardSkeleton from "@/components/skeletons/StatusCardSkeleton";
import FiltersAndActionsSkeleton from "@/components/skeletons/FiltersAndActionSkeleton";
import EmployeeCardSkeleton from "@/components/skeletons/EmployeeCardSkeleton";
import InviteEmployeeModal from "@/components/modal/InviteEmployeeModal";

const statusColors: Record<string, string> = {
  active: "bg-emerald-600",
  inactive: "bg-rose-600",
  onleave: "bg-slate-500",
};

type ViewMode = "table" | "grid";
type SortField = "name" | "position" | "department" | "joinDate" | "status";
type SortOrder = "asc" | "desc";

function EmployeesPage() {
  const { organizationStaffs, loadingOrgStaffs } = useUser();
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
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Filter and sort employees
  const filteredEmployees = organizationStaffs.filter((employee) => {
    const matchesSearch =
      employee.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.position?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || employee.userActiveStatus === selectedStatus;
    const matchesDepartment =
      selectedDepartment === "all" ||
      employee.department === selectedDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "name":
        comparison = (a.username || "").localeCompare(b.username || "");
        break;
      case "position":
        comparison = (a.position || "").localeCompare(b.position || "");
        break;
      case "department":
        comparison = (a.department || "").localeCompare(b.department || "");
        break;
      case "joinDate":
        {
          if (!a.createdAt || !b.createdAt) {
            throw new Error("Missing createdAt for sorting");
          }
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        break;
      case "status":
        comparison = a.userActiveStatus.localeCompare(b.userActiveStatus);
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

  const employeeStats = organizationStaffs.reduce(
    (acc, employee) => {
      acc.total += 1;

      if (employee.userActiveStatus === "active") acc.active += 1;
      if (employee.userActiveStatus === "onleave") acc.onLeave += 1;
      if (employee.userActiveStatus === "inactive") acc.inactive += 1;

      return acc;
    },
    {
      total: 0,
      active: 0,
      onLeave: 0,
      inactive: 0,
    },
  );

  const statsConfig = [
    {
      label: "Total Employees",
      value: employeeStats.total,
      icon: Users,
    },
    {
      label: "Active",
      value: employeeStats.active,
      icon: UserCheck,
    },
    {
      label: "On Leave",
      value: employeeStats.onLeave,
      icon: Clock,
    },
    {
      label: "Inactive",
      value: employeeStats.inactive,
      icon: UserX,
    },
  ];

  return (
    <DashboardLayout links={links}>
      <InviteEmployeeModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      {/* Header */}
      {loadingOrgStaffs ? (
        <HeaderSkeleton className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6" />
      ) : (
        <Header
          title="Employees"
          subtitle="Manage your team members and their information"
          buttonTitle="Add Employee"
          icon={UserPlus}
          onClick={() => setIsInviteModalOpen(true)}
          className="border-b py-4 sm:py-5 px-3 sm:px-4 md:px-6"
        />
      )}
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 md:px-6 md:py-0`}>
        {/* Stats Overview */}
        {loadingOrgStaffs ? (
          <StatusCardSkeleton />
        ) : (
          <StatusCard status={statsConfig} />
        )}

        {/* Filters and Actions */}
        {loadingOrgStaffs ? (
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
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            viewMode={viewMode}
            setViewMode={setViewMode}
            clearFilters={clearFilters}
            label="active"
          >
            Showing {sortedEmployees.length} of {organizationStaffs.length}{" "}
            employees
          </FiltersandActions>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div
            className={`${colors.bgCard} rounded-lg overflow-hidden`}
            style={{ boxShadow: colors.cardShadow }}
          >
            <div className={`overflow-x-auto ${colors.scrollbar}`}>
              <table className="w-full min-w-240">
                <thead
                  className={`${colors.bgSidebar} border-b ${colors.border}`}
                >
                  <tr>
                    {/* <th className="px-3 py-3 sm:py-4 text-left"> */}
                    <th className="px-3 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Staffs
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("position")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Position
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left">
                      <button
                        onClick={() => handleSort("department")}
                        className="flex items-center gap-2 font-semibold text-xs sm:text-sm"
                      >
                        Department
                        <ArrowUpDown size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                      Contact
                    </th>
                    <th className="px-3 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">
                      Tasks
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEmployees.map((employee) => (
                    <tr
                      key={employee._id}
                      className={`border-b ${colors.border} ${colors.tableHover}`}
                    >
                      <td className="px-3 py-3 sm:py-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            avatar={employee.avatar}
                            name={employee?.username}
                            className="w-9 h-9 sm:w-10 sm:h-10"
                          />
                          <div className="min-w-0">
                            <div className="font-medium text-xs sm:text-sm">
                              {employee.username}
                            </div>
                            <div
                              className={`text-xs ${colors.textMuted} truncate`}
                            >
                              {employee?.userStatus === "employee"
                                ? `EMP-${(employee?._id).slice(0, 4)}`
                                : `CEO-${(employee?._id).slice(0, 4)}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm">
                          {employee.position}
                        </div>
                      </td>
                      <td className="px-3 py-3 sm:py-4 truncate">
                        <span
                          className={`px-2 sm:px-3 py-1 ${colors.bgSidebar} border ${colors.border} rounded-full text-xs font-medium`}
                        >
                          {employee.department}
                        </span>
                      </td>
                      <td className="px-3 py-3 sm:py-4">
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
                      <td className="px-3 py-3 sm:py-4">
                        <div className="text-xs sm:text-sm">
                          <div className="font-medium">
                            {employee.tasksCompleted}/{employee.tasksAssigned}
                          </div>
                          <div className={`text-xs ${colors.textMuted}`}>
                            Completed
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 sm:py-4">
                        <span
                          className={`inline-block truncate text-white px-3 py-1 rounded-full text-xs font-medium ${statusColors[employee.userActiveStatus]}`}
                        >
                          {capitalize(
                            employee.userActiveStatus === "onleave"
                              ? "on leave"
                              : employee.userActiveStatus,
                          )}
                        </span>
                      </td>
                      <td className="px-3 py-3 sm:py-4">
                        <div className="flex items-center gap-1">
                          <button
                            className={`p-1.5 sm:p-2 ${colors.hover} rounded-lg`}
                            title="View Details"
                          >
                            <Eye size={14} className="sm:w-4 sm:h-4" />
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
        {loadingOrgStaffs ? (
          <EmployeeCardSkeleton />
        ) : (
          viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {sortedEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className={`${colors.bgCard} rounded-xl p-4 sm:p-5 border ${colors.border} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group`}
                  style={{ boxShadow: colors.cardShadow }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        avatar={employee.avatar}
                        name={employee?.username}
                        className="w-12 h-12 sm:w-14 sm:h-14"
                      />

                      <div>
                        <h3 className="font-semibold text-sm sm:text-base leading-tight">
                          {employee.username}
                        </h3>
                        <p className={`text-xs ${colors.textMuted}`}>
                          {employee?.userStatus === "employee"
                            ? `EMP-${(employee?._id).slice(0, 4)}`
                            : `CEO-${(employee?._id).slice(0, 4)}`}
                        </p>
                      </div>
                    </div>

                    <button
                      className={`p-2 rounded-lg ${colors.hover} opacity-0 group-hover:opacity-100 transition-opacity`}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Role */}
                  <div className={`pb-4 mb-4 border-b ${colors.border}`}>
                    <div className="flex items-start gap-2 mb-2">
                      <Briefcase
                        size={14}
                        className={`${colors.textMuted} mt-0.5`}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {employee.position}
                        </p>
                        <p className={`text-xs ${colors.textMuted}`}>
                          {employee.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <MapPin size={14} className={`${colors.textMuted}`} />
                      <p className="text-xs sm:text-sm">{employee.location}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div
                    className={`pb-4 mb-4 border-b ${colors.border} space-y-2`}
                  >
                    <div className="flex items-center gap-2">
                      <Mail size={14} className={`${colors.textMuted}`} />
                      <p className="text-xs sm:text-sm truncate">
                        {employee.email}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={14} className={`${colors.textMuted}`} />
                      <p className="text-xs sm:text-sm">{employee.phone}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`rounded-lg p-3 border ${colors.border}`}>
                      <p className={`text-xs ${colors.textMuted}`}>Tasks</p>
                      <p className="text-lg font-semibold mt-1">
                        {employee.tasksCompleted}/{employee.tasksAssigned}
                      </p>
                      <p className={`text-xs ${colors.textMuted}`}>Completed</p>
                    </div>

                    <div className={`rounded-lg p-3 border ${colors.border}`}>
                      <p className={`text-xs ${colors.textMuted}`}>Rating</p>
                      <p className="text-lg font-semibold mt-1">
                        {employee.performanceRating}
                      </p>
                      <p className={`text-xs ${colors.textMuted}`}>
                        Performance
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs ${colors.textMuted}`}>Joined</p>
                      <p className="text-xs sm:text-sm font-medium">
                        {employee.createdAt
                          ? new Date(employee.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </p>
                    </div>

                    <span
                      className={` px-3 py-1 rounded-full text-white text-xs font-medium border ${statusColors[employee.userActiveStatus]}`}
                    >
                      {capitalize(
                        employee.userActiveStatus === "onleave"
                          ? "on leave"
                          : employee.userActiveStatus,
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Empty State */}
        {!loadingOrgStaffs && sortedEmployees.length === 0 && (
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
