import { Clock, CheckCircle2, AlertCircle } from "lucide-react";

export const SITE_NAME = "Axign";
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const statusColors: Record<string, string> = {
  "Not Started": "bg-slate-800/30 border-slate-700/50",
  "In Progress": "bg-blue-900/30 border-blue-800/50",
  Completed: "bg-emerald-900/30 border-emerald-800/50",
  "Pending Review": "bg-purple-900/30 border-purple-800/50",
};

export const priorityColors: Record<string, string> = {
  High: "bg-red-600/50 shadow-[0_0_0_1px_rgba(239,68,68,0.7)]",
  Medium: "bg-amber-600/50 shadow-[0_0_0_1px_rgba(245,158,11,0.7)]",
  Low: "bg-emerald-600/50 shadow-[0_0_0_1px_rgba(16,185,129,0.7)]",
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle2 size={16} />;
    case "In Progress":
      return <Clock size={16} />;
    case "Pending Review":
      return <AlertCircle size={16} />;
    default:
      return <Clock size={16} />;
  }
};
