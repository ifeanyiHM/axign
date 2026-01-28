"use client";

import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import {
  Check,
  FileBarChart,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  Moon,
  Plus,
  Settings,
  Sun,
  Users,
  Waves,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CEOSettingsPage() {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const colors = themes[theme];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const themeOptions = [
    {
      id: "dark" as const,
      name: "Dark Mode",
      description: "Dark theme for comfortable viewing",
      icon: Moon,
      preview: "bg-gradient-to-br from-gray-900 to-gray-950",
    },
    {
      id: "light" as const,
      name: "Light Mode",
      description: "Bright and clean interface",
      icon: Sun,
      preview: "bg-gradient-to-br from-gray-50 to-white",
    },
    {
      id: "blue" as const,
      name: "Blue Mode",
      description: "Ocean blue themed interface",
      icon: Waves,
      preview: "bg-gradient-to-br from-blue-900 to-blue-950",
    },
  ];

  const links = [
    { href: "/dashboard/ceo", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/ceo/tasks", label: "All Tasks", icon: ListTodo },
    { href: "/dashboard/ceo/tasks/create", label: "Create Task", icon: Plus },
    { href: "/dashboard/ceo/reports", label: "Reports", icon: FileBarChart },
    { href: "/dashboard/ceo/employees", label: "Employees", icon: Users },
    { href: "/dashboard/ceo/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`flex min-h-screen ${colors.bg} ${colors.text}`}>
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
          {/* <Link
            href="/dashboard/ceo"
            className={`flex items-center px-3 py-3 rounded-lg ${colors.active}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/ceo/tasks"
            className={`flex items-center px-3 py-3 rounded-lg ${colors.hover}`}
          >
            <ListTodo className="w-5 h-5 mr-3" />
            All Tasks
          </Link>
          <Link
            href="/dashboard/ceo/tasks/create"
            className={`flex items-center px-3 py-3 rounded-lg ${colors.hover}`}
          >
            <Plus className="w-5 h-5 mr-3" />
            Create Task
          </Link>
          <Link
            href="/dashboard/ceo/reports"
            className={`flex items-center px-3 py-3 rounded-lg ${colors.hover}`}
          >
            <FileBarChart className="w-5 h-5 mr-3" />
            Reports
          </Link>
          <Link
            href="/dashboard/ceo/employees"
            className={`flex items-center px-3 py-3 rounded-lg ${colors.hover}`}
          >
            <Users className="w-5 h-5 mr-3" />
            Employees
          </Link>
          <Link
            href="/dashboard/ceo/settings"
            className={`flex items-center px-3 py-3 rounded-lg ${colors.hover}`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link> */}
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

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className={colors.textMuted}>
              Customize your dashboard appearance and preferences
            </p>
          </div>

          {/* Theme Selection */}
          <div
            className={`${colors.bgCard} rounded-xl p-6 ${colors.border} border`}
          >
            <h2 className="text-xl font-semibold mb-2">Theme</h2>
            <p className={`${colors.textMuted} text-sm mb-6`}>
              Choose your preferred dashboard theme
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      isActive
                        ? "border-blue-500 bg-blue-500/10"
                        : `${colors.border} ${colors.hover}`
                    }`}
                  >
                    {/* Preview */}
                    <div
                      className={`w-full h-24 rounded-md mb-4 ${option.preview} flex items-center justify-center`}
                    >
                      <Icon
                        size={32}
                        className={
                          option.id === "light"
                            ? "text-gray-700"
                            : "text-gray-200"
                        }
                      />
                    </div>

                    {/* Details */}
                    <div className="text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{option.name}</h3>
                        {isActive && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className={`text-xs ${colors.textMuted}`}>
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`${colors.bgCard} rounded-xl p-6 ${colors.border} border mt-6`}
          >
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="space-y-4">
              {/* Preview Card */}
              <div className={`p-4 rounded-lg ${colors.border} border`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Sample Card</h3>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs">
                    Active
                  </span>
                </div>
                <p className={colors.textMuted}>
                  This is how your cards will look with the selected theme.
                </p>
              </div>

              {/* Preview Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg ${colors.stats.green} border ${colors.border}`}
                >
                  <p className="text-xs mb-1">Completed</p>
                  <p className="text-2xl font-bold">184</p>
                </div>
                <div
                  className={`p-4 rounded-lg ${colors.stats.blue} border ${colors.border}`}
                >
                  <p className="text-xs mb-1">In Progress</p>
                  <p className="text-2xl font-bold">43</p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Settings (Optional) */}
          <div
            className={`${colors.bgCard} rounded-xl p-6 ${colors.border} border mt-6`}
          >
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className={`text-sm ${colors.textMuted}`}>
                    Receive email updates about tasks
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium">Task Reminders</h3>
                  <p className={`text-sm ${colors.textMuted}`}>
                    Get reminded about upcoming deadlines
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CEOSettingsPage, { role: "ceo" });
