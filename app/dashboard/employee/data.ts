import { PieDataItem } from "@/components/dashboard/PieChartComponent";
import { TaskTableItem } from "@/components/dashboard/TaskTable";
import { LinkItem } from "@/components/layout/DashboardLayout";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  User,
  Settings,
  ClipboardList,
  Clock,
  Loader2,
  CircleCheckBig,
} from "lucide-react";

export const personalStats = [
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

export const myTasks: TaskTableItem[] = [
  {
    id: "T-011",
    title: "Conduct ISO 9001 Audit for Access Bank",
    assignedBy: "Mr. Badmos",
    assignedTo: "ifeanyi Iheme",
    dueDate: "2026-02-05",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "T-015",
    title: "Prepare Safety Training Materials",
    assignedBy: "Mr. Badmos",
    assignedTo: "ifeanyi Iheme",
    dueDate: "2026-02-12",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: "T-022",
    title: "Update Client Risk Assessment",
    assignedBy: "Mr. Badmos",
    assignedTo: "ifeanyi Iheme",
    dueDate: "2026-01-30",
    priority: "High",
    status: "Completed",
  },
  {
    id: "T-027",
    title: "QHSE Report Review",
    assignedBy: "Mr. Badmos",
    assignedTo: "ifeanyi Iheme",
    dueDate: "2026-02-03",
    priority: "Medium",
    status: "In Progress",
  },
];

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
