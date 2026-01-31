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
  User,
} from "lucide-react";

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
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
  createdAt: string;
  tags: string[];
};

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
  { href: "/dashboard/ceo/profile", label: "My Profile", icon: User },
  { href: "/dashboard/ceo/settings", label: "Settings", icon: Settings },
];

export const allEmployees = [
  {
    id: "EMP-001",
    name: "Aisha Bello",
    email: "aisha.bello@company.com",
    phone: "+234 801 234 5678",
    position: "Senior Quality Auditor",
    department: "Quality Assurance",
    location: "Lagos, Nigeria",
    status: "Active",
    joinDate: "2023-03-15",
    avatar: "AB",
    tasksAssigned: 12,
    tasksCompleted: 8,
    performanceRating: 4.5,
  },
  {
    id: "EMP-002",
    name: "Michael Okoro",
    email: "michael.okoro@company.com",
    phone: "+234 802 345 6789",
    position: "Environmental Consultant",
    department: "Environmental",
    location: "Port Harcourt, Nigeria",
    status: "Active",
    joinDate: "2022-11-20",
    avatar: "MO",
    tasksAssigned: 10,
    tasksCompleted: 7,
    performanceRating: 4.2,
  },
  {
    id: "EMP-003",
    name: "Fatima Yusuf",
    email: "fatima.yusuf@company.com",
    phone: "+234 803 456 7890",
    position: "Safety Officer",
    department: "Health & Safety",
    location: "Abuja, Nigeria",
    status: "Active",
    joinDate: "2023-01-10",
    avatar: "FY",
    tasksAssigned: 15,
    tasksCompleted: 12,
    performanceRating: 4.8,
  },
  {
    id: "EMP-004",
    name: "David Adebayo",
    email: "david.adebayo@company.com",
    phone: "+234 804 567 8901",
    position: "Compliance Manager",
    department: "Compliance",
    location: "Lagos, Nigeria",
    status: "Active",
    joinDate: "2021-08-05",
    avatar: "DA",
    tasksAssigned: 8,
    tasksCompleted: 6,
    performanceRating: 4.3,
  },
  {
    id: "EMP-005",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+234 805 678 9012",
    position: "Documentation Specialist",
    department: "Documentation",
    location: "Lagos, Nigeria",
    status: "Active",
    joinDate: "2023-05-18",
    avatar: "SJ",
    tasksAssigned: 9,
    tasksCompleted: 9,
    performanceRating: 5.0,
  },
  {
    id: "EMP-006",
    name: "Emmanuel Okafor",
    email: "emmanuel.okafor@company.com",
    phone: "+234 806 789 0123",
    position: "Risk Analyst",
    department: "Risk Management",
    location: "Abuja, Nigeria",
    status: "On Leave",
    joinDate: "2022-06-12",
    avatar: "EO",
    tasksAssigned: 5,
    tasksCompleted: 3,
    performanceRating: 4.0,
  },
  {
    id: "EMP-007",
    name: "Grace Nwosu",
    email: "grace.nwosu@company.com",
    phone: "+234 807 890 1234",
    position: "Training Coordinator",
    department: "Training",
    location: "Port Harcourt, Nigeria",
    status: "Active",
    joinDate: "2023-09-22",
    avatar: "GN",
    tasksAssigned: 11,
    tasksCompleted: 8,
    performanceRating: 4.6,
  },
  {
    id: "EMP-008",
    name: "Ibrahim Musa",
    email: "ibrahim.musa@company.com",
    phone: "+234 808 901 2345",
    position: "Equipment Technician",
    department: "Maintenance",
    location: "Kano, Nigeria",
    status: "Inactive",
    joinDate: "2020-04-30",
    avatar: "IM",
    tasksAssigned: 3,
    tasksCompleted: 2,
    performanceRating: 3.8,
  },
];
