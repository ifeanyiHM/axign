import { PieDataItem } from "@/components/dashboard/PieChartComponent";
import { LinkItem } from "@/components/layout/DashboardLayout";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

export const pieData: PieDataItem[] = [
  { name: "Completed", value: 9, color: "#059669" }, // green
  { name: "In Progress", value: 7, color: "#1e40af" }, // blue
  { name: "Pending Review", value: 8, color: "#64748b" }, // slate
  { name: "Overdue", value: 4, color: "#b91c1c" }, // red
  { name: "Not Started", value: 3, color: "#38bdf8" }, // 👈 soft gray-slate
];

export const navItems: LinkItem[] = [
  {
    href: "/dashboard/employee",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/employee/mytask",
    label: "My Tasks",
    icon: ListTodo,
  },
  {
    href: "/dashboard/employee/overview",
    label: "Overview",
    icon: BarChart3,
  },
  {
    href: "/dashboard/employee/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/dashboard/employee/settings",
    label: "Settings",
    icon: Settings,
  },
];
