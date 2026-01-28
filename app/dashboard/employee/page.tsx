// app/(protected)/employee/dashboard/page.tsx
"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useAuth } from "@/context/AuthContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  User,
  Settings,
  LogOut,
  Search,
  Filter,
  Menu,
  X,
  ClipboardList,
  Clock,
  Loader2,
  CircleCheckBig,
} from "lucide-react";
import Image from "next/image";
import StatusCard from "@/components/dashboard/StatusCard";

const personalStats = [
  {
    title: "Total Assigned",
    value: 28,
    icon: ClipboardList,
  },
  {
    title: "Pending",
    value: 12,
    icon: Clock,
  },
  {
    title: "In Progress",
    value: 7,
    icon: Loader2,
  },
  {
    title: "Completed",
    value: 9,
    icon: CircleCheckBig,
  },
];

const myTasks = [
  {
    id: "T-011",
    title: "Conduct ISO 9001 Audit for Access Bank",
    assignedBy: "Mr. Badmos",
    dueDate: "2026-02-05",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "T-015",
    title: "Prepare Safety Training Materials",
    assignedBy: "Mr. Badmos",
    dueDate: "2026-02-12",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: "T-022",
    title: "Update Client Risk Assessment",
    assignedBy: "Mr. Badmos",
    dueDate: "2026-01-30",
    priority: "High",
    status: "Completed",
  },
  {
    id: "T-027",
    title: "QHSE Report Review",
    assignedBy: "Mr. Badmos",
    dueDate: "2026-02-03",
    priority: "Medium",
    status: "In Progress",
  },
];

const pieData = [
  { name: "Completed", value: 9, color: "#22c55e" },
  { name: "In Progress", value: 7, color: "#a855f7" },
  { name: "Pending", value: 8, color: "#eab308" },
  { name: "Overdue", value: 4, color: "#ef4444" },
];

const statusColors: Record<string, string> = {
  "Not Started": "bg-gray-600 text-gray-200",
  "In Progress": "bg-purple-600 text-white",
  Completed: "bg-green-600 text-white",
};

function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-gray-800 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 h-screen xl:w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:flex lg:flex-col overflow-y-auto`}
      >
        <div className="p-4 sm:px-6 sm:py-8 border-b border-gray-800">
          <Image
            src="/axign_logoo.png"
            alt="CCG logo"
            width={120}
            height={60}
            priority
          />
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          <a
            href="#"
            className="flex items-center px-3 py-3 rounded-lg bg-blue-900/40 text-blue-400"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-800"
          >
            <ListTodo className="w-5 h-5 mr-3" />
            My Tasks
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-800"
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Overview
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-800"
          >
            <User className="w-5 h-5 mr-3" />
            Profile
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-800"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-3 rounded-lg hover:bg-red-900/30 text-red-400"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="p-4 sm:p-6 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">My Dashboard</h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Welcome back, {user?.username || "Mr. Badmos"}
            </p>
          </div>
        </header>

        <div className="p-4 sm:p-6">
          {/* Personal Stats Cards */}
          <StatusCard status={personalStats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {/* Task Status Pie Chart */}
            <section className="bg-gray-900 rounded-xl p-5 sm:p-6 border border-gray-800">
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                My Task Status
              </h3>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* My Tasks Table */}
            <section className="custom-scrollbar max-h-100 overflow-y-scroll lg:max-h-112.25 xl:col-span-2 bg-gray-900 rounded-xl py-5 sm:py-6 border border-gray-800 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 pl-5 pr-3 sm:pl-6 sm:pr-4">
                <h3 className="text-base sm:text-lg font-semibold">My Tasks</h3>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-xs sm:text-sm">
                    <Search size={16} /> Search
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-xs sm:text-sm">
                    <Filter size={16} /> Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-150 text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gray-800  pl-5 pr-3 sm:pl-6 sm:pr-4">
                      <th className="pl-6 pr-2 sm:pl-7 py-3 text-left">ID</th>
                      <th className="py-3 px-2 text-left">Title</th>
                      <th className="py-3 px-2 text-left">Assigned</th>
                      <th className="py-3 px-2 text-left">Due</th>
                      <th className="py-3 px-2 text-left">Priority</th>
                      <th className="py-3 pl-2 pr-4 sm:pr-5 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="border-b border-gray-800 hover:bg-gray-800/50   "
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
                          {task.assignedBy}
                        </td>
                        <td className="py-3 px-2 truncate">{task.dueDate}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              task.priority === "High"
                                ? "bg-red-600"
                                : "bg-yellow-600"
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
        </div>
      </main>
    </div>
  );
}

export default withAuth(EmployeeDashboard, { role: "employee" });
