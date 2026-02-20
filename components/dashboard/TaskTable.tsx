// import { useAuth } from "@/context/AuthContext";
// import { Task } from "@/context/TaskContext";
// import { useTheme } from "@/context/ThemeContext";
// import { themes } from "@/lib/themes";
// import { Calendar, Filter, Search } from "lucide-react";

// const statusColors: Record<string, string> = {
//   "Not Started": "bg-slate-700/40 border border-slate-600/50",
//   "In Progress": "bg-blue-700/40 border border-blue-600/50",
//   Completed: "bg-emerald-700/40 border border-emerald-600/50",
//   "Pending Review": "bg-purple-700/40 border border-purple-600/50",
// };

// interface taskTableProps {
//   taskList?: Task[];
//   title: string;
// }

// export default function TaskTable({ taskList, title }: taskTableProps) {
//   const { user } = useAuth();
//   const { theme } = useTheme();
//   const colors = themes[theme];

//   return (
//     <section
//       className={`custom-scrollbar ${colors.scrollbar} max-h-100 overflow-y-scroll lg:max-h-112.25 xl:col-span-2 ${colors.bgCard} rounded-xl py-5 sm:py-6 overflow-hidden`}
//       style={{ boxShadow: colors.cardShadow }}
//     >
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 pl-5 pr-3 sm:pl-6 sm:pr-4">
//         <h3 className="text-base font-semibold">
//           {title} ({taskList?.length})
//         </h3>
//         <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
//           <button
//             className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 ${colors.bgCard} ${colors.border} border rounded-lg text-xs sm:text-sm ${colors.hover}`}
//           >
//             <Search size={16} /> Search
//           </button>
//           <button
//             className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 ${colors.bgCard} ${colors.border} border rounded-lg text-xs sm:text-sm ${colors.hover}`}
//           >
//             <Filter size={16} /> Filter
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-150 text-xs sm:text-sm">
//           <thead>
//             <tr
//               className={`border-b ${colors.border} pl-5 pr-3 sm:pl-6 sm:pr-4`}
//             >
//               <th className="pl-6 pr-2 sm:pl-7 py-3 text-left">ID</th>
//               <th className="py-3 px-2 text-left">Title</th>
//               <th className="py-3 px-2 text-left">
//                 {user?.userStatus === "ceo" ? "Assigned To" : "Category"}
//               </th>
//               <th className="py-3 px-2 text-left">Due</th>
//               <th className="py-3 px-2 text-left">Pri</th>
//               <th className="py-3 pl-2 pr-4 sm:pr-5 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {taskList?.map((task, index) => (
//               <tr
//                 key={index}
//                 className={`border-b ${colors.border} ${colors.tableHover}`}
//               >
//                 <td className="pl-6 pr-2 sm:pl-7 py-3 truncate">{`T-${task.id.slice(0, 4)}`}</td>
//                 <td className="py-3 px-2 font-medium">
//                   <div className="lg:min-w-40 xl:min-w-0" title={task.title}>
//                     {task.title.length > 40
//                       ? `${task.title.slice(0, 40)}...`
//                       : task.title}
//                   </div>
//                 </td>
//                 <td className="py-3 px-2 truncate max-w-35 sm:max-w-none">
//                   {user?.userStatus === "ceo"
//                     ? task.assignedTo.map((assignee, index) => (
//                         <div className="space-y-1" key={index}>
//                           • <span>{assignee.name}</span>
//                         </div>
//                       ))
//                     : task.category}
//                 </td>
//                 <td className="py-3 px-2 truncate">
//                   <div className="flex items-center gap-1 sm:gap-2">
//                     <Calendar
//                       size={14}
//                       className={`${colors.textMuted} shrink-0 sm:w-4 sm:h-4`}
//                     />
//                     <span className="text-xs sm:text-sm whitespace-nowrap">
//                       {new Date(task.dueDate).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="py-3 px-2">
//                   <span
//                     className={`px-2 py-0.5 rounded-full text-xs ${
//                       task.priority === "High"
//                         ? "bg-red-600/50 shadow-[0_0_4px_rgba(239,68,68,0.5)]"
//                         : task.priority === "Medium"
//                           ? "bg-amber-600/50 shadow-[0_0_4px_rgba(245,158,11,0.5)]"
//                           : "bg-emerald-600/50 shadow-[0_0_4px_rgba(16,185,129,0.5)]"
//                     }`}
//                   >
//                     {task.priority}
//                   </span>
//                 </td>
//                 <td className="py-3 pl-2 pr-4 sm:pr-5">
//                   <span
//                     className={`px-2 sm:px-3 truncate py-0.5 sm:py-1 rounded-full text-xs ${statusColors[task.status] || "bg-gray-600"}`}
//                   >
//                     {task.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }

import { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { Task } from "@/context/TaskContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { Calendar, Search } from "lucide-react";
import InputField from "../primitives/form/InputField";
import SelectField from "../primitives/form/SelectField";

const statusColors: Record<string, string> = {
  "Not Started": "bg-slate-700/40 border border-slate-600/50",
  "In Progress": "bg-blue-700/40 border border-blue-600/50",
  Completed: "bg-emerald-700/40 border border-emerald-600/50",
  "Pending Review": "bg-purple-700/40 border border-purple-600/50",
};

interface taskTableProps {
  taskList?: Task[];
  title: string;
}

export default function TaskTable({ taskList, title }: taskTableProps) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = themes[theme];

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  // Filtered tasks derived state
  const filteredTasks = useMemo(() => {
    if (!taskList) return [];
    return taskList.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" ? true : task.status === selectedStatus;
      const matchesPriority =
        selectedPriority === "all" ? true : task.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [taskList, searchTerm, selectedStatus, selectedPriority]);

  return (
    <section
      className={`custom-scrollbar ${colors.scrollbar} max-h-100 overflow-y-scroll lg:max-h-112.25 xl:col-span-2 ${colors.bgCard} rounded-xl py-5 sm:py-6 overflow-hidden`}
      style={{ boxShadow: colors.cardShadow }}
    >
      {/* Header with search & filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 pl-5 pr-3 sm:pl-6 sm:pr-4">
        <h3 className="text-base font-semibold">
          {title} ({filteredTasks.length})
        </h3>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={16}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.textMuted}`}
            />
            <InputField
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-sm pl-8 py-2 w-full"
            />
          </div>
          {/* Proiority Filter */}
          <SelectField
            placeholder="Select Priority"
            value={selectedPriority}
            onValueChange={setSelectedPriority}
            containerClassName="sm:gap-2"
            selectClassName={`w-full text-sm py-2 ${colors.textMuted}`}
            options={[
              { label: "All Priority", value: "all" },
              { label: "High", value: "High" },
              { label: "Medium", value: "Medium" },
              { label: "Low", value: "Low" },
            ]}
          />
          {/* Status Filter */}
          <SelectField
            placeholder="Select Status"
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            containerClassName="sm:gap-2"
            selectClassName={`w-full text-sm py-2 ${colors.textMuted}`}
            options={[
              { label: "All Status", value: "all" },
              { label: "Not Started", value: "Not Started" },
              { label: "In Progress", value: "In Progress" },
              { label: "Completed", value: "Completed" },
              { label: "Pending Review", value: "Pending Review" },
              { label: "Overdue", value: "Overdue" },
            ]}
          />
        </div>
      </div>

      {/* Table */}
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
            {filteredTasks.map((task, index) => (
              <tr
                key={index}
                className={`border-b ${colors.border} ${colors.tableHover}`}
              >
                <td className="pl-6 pr-2 sm:pl-7 py-3 truncate">{`T-${task.id.slice(0, 4)}`}</td>
                <td className="py-3 px-2 font-medium" title={task.title}>
                  {task.title.length > 40
                    ? `${task.title.slice(0, 40)}...`
                    : task.title}
                </td>
                <td className="py-3 px-2 truncate max-w-35 sm:max-w-none">
                  {user?.userStatus === "ceo"
                    ? task.assignedTo.map((assignee, idx) => (
                        <div className="space-y-1" key={idx}>
                          • <span>{assignee.name}</span>
                        </div>
                      ))
                    : task.category}
                </td>
                <td className="py-3 px-2 truncate">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Calendar
                      size={14}
                      className={`${colors.textMuted} shrink-0 sm:w-4 sm:h-4`}
                    />
                    <span className="text-xs sm:text-sm whitespace-nowrap">
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </td>
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
