"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  ListTodo,
  FileBarChart,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  Menu,
  X,
  BarChart3,
  Clock,
  AlertTriangle,
  CircleCheckBig,
} from "lucide-react";
import SelectField from "@/components/primitives/form/SelectField";
import { Button } from "@/components/ui/button";
import InputField from "@/components/primitives/form/InputField";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";
import StatusCard from "@/components/dashboard/StatusCard";

const stats = [
  {
    title: "Total Tasks",
    value: 247,
    icon: BarChart3,
  },
  {
    title: "Pending Tasks",
    value: 43,
    icon: Clock,
  },
  {
    title: "Completed Tasks",
    value: 184,
    icon: CircleCheckBig,
  },
  {
    title: "Overdue Tasks",
    value: 20,
    icon: AlertTriangle,
  },
];

const recentTasks = [
  {
    id: "T-011",
    title: "Conduct ISO 9001 Audit for Access Bank",
    assignedTo: "Aisha Bello",
    dueDate: "2026-02-05",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "T-012",
    title: "Update Risk Register QHSE",
    assignedTo: "Michael Okoro",
    dueDate: "2026-02-10",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: "T-043",
    title: "Safety Training Session Prep",
    assignedTo: "Fatima Yusuf",
    dueDate: "2026-01-30",
    priority: "High",
    status: "Completed",
  },
  {
    id: "T-044",
    title: "Client Report Submission",
    assignedTo: "David Adebayo",
    dueDate: "2026-02-01",
    priority: "Low",
    status: "Pending Review",
  },
  {
    id: "T-022",
    title: "Update Risk Register QHSE",
    assignedTo: "Michael Okoro",
    dueDate: "2026-02-10",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: "T-047",
    title: "Safety Training Session Prep",
    assignedTo: "Fatima Yusuf",
    dueDate: "2026-01-30",
    priority: "High",
    status: "Completed",
  },
];

const pieData = [
  { name: "Completed", value: 184, color: "#059669" }, // Emerald-600 - muted green
  { name: "In Progress", value: 43, color: "#1e40af" }, // Blue-800 - darker blue
  { name: "Not Started", value: 20, color: "#64748b" }, // Slate-500 - muted gray
];

const statusColors: Record<string, string> = {
  "Not Started": "bg-slate-700/40 border border-slate-600/50",
  "In Progress": "bg-blue-700/40 border border-blue-600/50",
  Completed: "bg-emerald-700/40 border border-emerald-600/50",
  "Pending Review": "bg-purple-700/40 border border-purple-600/50",
};

const links = [
  { href: "/dashboard/ceo", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/ceo/tasks", label: "All Tasks", icon: ListTodo },
  { href: "/dashboard/ceo/tasks/create", label: "Create Task", icon: Plus },
  { href: "/dashboard/ceo/reports", label: "Reports", icon: FileBarChart },
  { href: "/dashboard/ceo/employees", label: "Employees", icon: Users },
  { href: "/dashboard/ceo/settings", label: "Settings", icon: Settings },
];

function CeoDashboard() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const colors = themes[theme];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text} flex`}>
      {/* bg-[#181818] */}
      {/* Mobile Hamburger Button */}
      <button
        className={`fixed top-4 left-4 z-50 lg:hidden p-2 ${colors.bgCard} rounded-md`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar – hidden on mobile unless toggled */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 h-screen xl:w-64 ${colors.bgSidebar} border-r ${colors.border} transform transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:flex lg:flex-col overflow-y-auto`}
      >
        <div className={`p-4 sm:px-6 sm:py-8 border-b ${colors.border}`}>
          <Image
            src="/axign_logoo.png"
            alt="CCG logo"
            width={120}
            height={60}
            priority
          />
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center px-3 py-3 rounded-lg ${
                  isActive ? colors.active : colors.hover
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className={`p-4 border-t ${colors.border}`}>
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-3 rounded-lg hover:bg-red-900/30 text-red-400"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header
          className={`p-4 sm:p-6 border-b ${colors.border} flex justify-between items-center`}
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">CEO Dashboard</h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Welcome back, {user?.username || "Mr. Badmos"}
            </p>
          </div>
          <button
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium flex items-center gap-2 text-sm sm:text-base ${colors.button}`}
          >
            <Plus size={18} /> Create Task
          </button>
        </header>

        <div className="p-4 sm:p-6">
          {/* Stats Cards – stack on very small screens */}
          <StatusCard status={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {/* Quick Create Task */}
            <section
              className={`${colors.bgCard} rounded-xl p-5 sm:p-6 border ${colors.border} h-fit`}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-400" /> Quick Create Task
              </h3>
              <form className="space-y-3 sm:space-y-4">
                <InputField
                  type="text"
                  placeholder="Task Title"
                  inputClassName={colors.input}
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  className={`w-full p-3 ${colors.input} border rounded-lg text-sm focus:outline-none`}
                />
                <SelectField
                  placeholder="Assign to..."
                  selectClassName={colors.select}
                  options={[
                    { label: "Aisha Bello", value: "aisha" },
                    { label: "Michael Okoro", value: "michael" },
                    { label: "Fatima Yusuf", value: "fatima" },
                  ]}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField type="date" inputClassName={colors.input} />
                  <SelectField
                    placeholder="Priority"
                    selectClassName={colors.select}
                    options={[
                      { label: "High", value: "high" },
                      { label: "Medium", value: "medium" },
                      { label: "Low", value: "low" },
                    ]}
                  />
                </div>
                <Button
                  className={`w-full font-semibold ${colors.button}`}
                  type="submit"
                >
                  Create Task
                </Button>
              </form>
            </section>

            {/* Recent Tasks – horizontal scroll on mobile */}
            <section
              className={`custom-scrollbar max-h-100 overflow-y-scroll lg:max-h-112.25 xl:col-span-2 ${colors.bgCard} rounded-xl py-5 sm:py-6 border ${colors.border} overflow-hidden`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 pl-5 pr-3 sm:pl-6 sm:pr-4">
                <h3 className="text-base sm:text-lg font-semibold">
                  Recent Tasks
                </h3>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 ${colors.bgCard} ${colors.border} border rounded-lg text-xs sm:text-sm ${colors.hover}`}
                  >
                    <Search size={16} /> Search
                  </button>
                  <button
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 ${colors.bgCard} ${colors.border} border rounded-lg text-xs sm:text-sm ${colors.hover}`}
                  >
                    <Filter size={16} /> Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-150 text-xs sm:text-sm">
                  <thead>
                    <tr
                      className={`border-b ${colors.border} pl-5 pr-3 sm:pl-6 sm:pr-4`}
                    >
                      <th className="pl-6 pr-2 sm:pl-7 py-3 text-left">ID</th>
                      <th className="py-3 px-2 text-left">Title</th>
                      <th className="py-3 px-2 text-left">Assigned</th>
                      <th className="py-3 px-2 text-left">Due</th>
                      <th className="py-3 px-2 text-left">Pri</th>
                      <th className="py-3 pl-2 pr-4 sm:pr-5 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTasks.map((task) => (
                      <tr
                        key={task.id}
                        className={`border-b ${colors.border} ${colors.tableHover}`}
                      >
                        <td className="pl-6 pr-2 sm:pl-7 py-3 truncate">
                          {task.id}
                        </td>
                        <td className="py-3 px-2 font-medium">
                          <div className="lg:min-w-40 xl:min-w-0">
                            {task.title}
                          </div>
                        </td>
                        <td className="py-3 px-2 truncate max-w-35 sm:max-w-none">
                          {task.assignedTo}
                        </td>
                        <td className="py-3 px-2 truncate">{task.dueDate}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
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
                        <td className="py-3 pl-2 pr-4 sm:pr-5">
                          <span
                            className={`px-2 sm:px-3 truncate py-0.5 sm:py-1 rounded-full text-xs ${statusColors[task.status] || "bg-gray-600"}`}
                          >
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Charts – stack vertically on mobile */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-6 sm:mt-8">
            <div
              className={`${colors.bgCard} p-5 sm:p-6 rounded-xl border ${colors.border}`}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Task Status
              </h3>
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
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
                        border: `1px solid ${theme === "light" ? "#e5e7eb" : theme === "blue" ? "#1e40af" : "#374151"}`,
                        borderRadius: "8px",
                        color: theme === "light" ? "#111827" : "#f3f4f6",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className={`${colors.bgCard} p-5 sm:p-6 rounded-xl border ${colors.border}`}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Tasks This Month
              </h3>
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Week 1", Completed: 45, Pending: 12 },
                      { name: "Week 2", Completed: 52, Pending: 8 },
                      { name: "Week 3", Completed: 48, Pending: 15 },
                      { name: "Week 4", Completed: 39, Pending: 8 },
                    ]}
                  >
                    <XAxis
                      dataKey="name"
                      stroke={theme === "light" ? "#6b7280" : "#9ca3af"}
                    />
                    <YAxis stroke={theme === "light" ? "#6b7280" : "#9ca3af"} />
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
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default withAuth(CeoDashboard, { role: "ceo" });
