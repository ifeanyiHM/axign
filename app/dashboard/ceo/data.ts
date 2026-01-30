import { PieDataItem } from "@/components/dashboard/PieChartComponent";
import { TaskTableItem } from "@/components/dashboard/TaskTable";
import { LinkItem } from "@/components/layout/DashboardLayout";
import {
  LayoutDashboard,
  ListTodo,
  FileBarChart,
  Users,
  Settings,
  Plus,
  // BarChart3,
  Clock,
  AlertTriangle,
  CircleCheckBig,
} from "lucide-react";

export const stats = [
  {
    title: "Total Tasks",
    value: 247,
    icon: ListTodo,
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

export const recentTasks: TaskTableItem[] = [
  {
    id: "T-011",
    title: "Conduct ISO 9001 Audit for Access Bank",
    assignedBy: "Mr Badmus",
    assignedTo: "Aisha Bello",
    dueDate: "2026-02-05",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "T-012",
    title: "Update Risk Register QHSE",
    assignedBy: "Mr Badmus",
    assignedTo: "Michael Okoro",
    dueDate: "2026-02-10",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: "T-043",
    title: "Safety Training Session Prep",
    assignedBy: "Mr Badmus",
    assignedTo: "Fatima Yusuf",
    dueDate: "2026-01-30",
    priority: "High",
    status: "Completed",
  },
  {
    id: "T-044",
    title: "Client Report Submission",
    assignedBy: "Mr Badmus",
    assignedTo: "David Adebayo",
    dueDate: "2026-02-01",
    priority: "Low",
    status: "Pending Review",
  },
  {
    id: "T-022",
    title: "Update Risk Register QHSE",
    assignedBy: "Mr Badmus",
    assignedTo: "Michael Okoro",
    dueDate: "2026-02-10",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: "T-047",
    title: "Safety Training Session Prep",
    assignedBy: "Mr Badmus",
    assignedTo: "Fatima Yusuf",
    dueDate: "2026-01-30",
    priority: "High",
    status: "Completed",
  },
];

export const pieData: PieDataItem[] = [
  { name: "Completed", value: 184, color: "#059669" },
  { name: "In Progress", value: 43, color: "#1e40af" },
  { name: "Not Started", value: 20, color: "#64748b" },
];

export const links: LinkItem[] = [
  { href: "/dashboard/ceo", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/ceo/tasks", label: "All Tasks", icon: ListTodo },
  { href: "/dashboard/ceo/create", label: "Create Task", icon: Plus },
  { href: "/dashboard/ceo/reports", label: "Reports", icon: FileBarChart },
  { href: "/dashboard/ceo/employees", label: "Employees", icon: Users },
  { href: "/dashboard/ceo/settings", label: "Settings", icon: Settings },
];
