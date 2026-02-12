import { LinkItem } from "@/components/layout/DashboardLayout";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

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
