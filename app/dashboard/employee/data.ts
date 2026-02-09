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
  { name: "Completed", value: 9, color: "#059669" }, // Emerald-600 (success)
  { name: "In Progress", value: 7, color: "#1e40af" }, // Blue-800 (active)
  { name: "Pending", value: 8, color: "#64748b" }, // Slate-500 (neutral / waiting)
  { name: "Overdue", value: 4, color: "#b91c1c" }, // Red-700 (serious, muted alert)
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
