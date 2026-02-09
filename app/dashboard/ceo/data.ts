import { PieDataItem } from "@/components/dashboard/PieChartComponent";
import { LinkItem } from "@/components/layout/DashboardLayout";
import {
  LayoutDashboard,
  ListTodo,
  FileBarChart,
  Users,
  Settings,
  Plus,
  User,
} from "lucide-react";

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  assignedTo: { id: ""; name: string; avatar: string };
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Pending Review" | "Completed";
  category:
    | "Audit"
    | "Documentation"
    | "Training"
    | "Reporting"
    | "Maintenance"
    | "Assessment"
    | "HR";
  progress: number;
  //createdAt: string;
  tags: string[];
};

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
  { href: "/dashboard/ceo/profile", label: "My Profile", icon: User },
  { href: "/dashboard/ceo/settings", label: "Settings", icon: Settings },
];
