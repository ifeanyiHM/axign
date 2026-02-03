import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { Filter, Search } from "lucide-react";

const statusColors: Record<string, string> = {
  "Not Started": "bg-slate-700/40 border border-slate-600/50",
  "In Progress": "bg-blue-700/40 border border-blue-600/50",
  Completed: "bg-emerald-700/40 border border-emerald-600/50",
  "Pending Review": "bg-purple-700/40 border border-purple-600/50",
};

export type TaskTableItem = {
  id: string;
  title: string;
  description: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  assignedBy: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Pending Review" | "Completed";
  category?:
    | "Audit"
    | "Documentation"
    | "Training"
    | "Reporting"
    | "Maintenance"
    | "Assessment"
    | "HR";
  progress: number;
  createdAt: string;
  tags?: string[];
  estimatedHours: number;
  hoursLogged: number;
  startDate: string;
};

interface taskTableProps {
  taskList?: TaskTableItem[];
  title: string;
}

export default function TaskTable({ taskList, title }: taskTableProps) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <section
      className={`custom-scrollbar ${colors.scrollbar} max-h-100 overflow-y-scroll lg:max-h-112.25 xl:col-span-2 ${colors.bgCard} rounded-xl py-5 sm:py-6 overflow-hidden`}
      style={{ boxShadow: colors.cardShadow }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 pl-5 pr-3 sm:pl-6 sm:pr-4">
        <h3 className="text-base font-semibold">
          {title} ({taskList?.length})
        </h3>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 ${colors.bgCard} ${colors.border} border rounded-lg text-xs sm:text-sm ${colors.hover}`}
          >
            <Search size={16} /> Search
          </button>
          <button
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 ${colors.bgCard} ${colors.border} border rounded-lg text-xs sm:text-sm ${colors.hover}`}
          >
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-150 text-xs sm:text-sm">
          <thead>
            <tr
              className={`border-b ${colors.border} pl-5 pr-3 sm:pl-6 sm:pr-4`}
            >
              <th className="pl-6 pr-2 sm:pl-7 py-3 text-left">ID</th>
              <th className="py-3 px-2 text-left">Title</th>
              <th className="py-3 px-2 text-left">
                {user?.userStatus === "ceo" ? "Assigned To" : "Category"}
              </th>
              <th className="py-3 px-2 text-left">Due</th>
              <th className="py-3 px-2 text-left">Pri</th>
              <th className="py-3 pl-2 pr-4 sm:pr-5 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {taskList?.map((task) => (
              <tr
                key={task.id}
                className={`border-b ${colors.border} ${colors.tableHover}`}
              >
                <td className="pl-6 pr-2 sm:pl-7 py-3 truncate">{task.id}</td>
                <td className="py-3 px-2 font-medium">
                  <div className="lg:min-w-40 xl:min-w-0">{task.title}</div>
                </td>
                <td className="py-3 px-2 truncate max-w-35 sm:max-w-none">
                  {user?.userStatus === "ceo"
                    ? task.assignedTo.name
                    : task.category}
                </td>
                <td className="py-3 px-2 truncate">{task.dueDate}</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      task.priority === "High"
                        ? "bg-red-600/50 shadow-[0_0_4px_rgba(239,68,68,0.5)]"
                        : task.priority === "Medium"
                          ? "bg-amber-600/50 shadow-[0_0_4px_rgba(245,158,11,0.5)]"
                          : "bg-emerald-600/50 shadow-[0_0_4px_rgba(16,185,129,0.5)]"
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
  );
}
