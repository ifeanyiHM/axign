"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { useTask } from "@/context/TaskContext";
import { useUser } from "@/context/UserContext";
import {
  Calendar,
  Clock,
  Users,
  Tag,
  Paperclip,
  AlertCircle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Edit2,
  Download,
  ImageIcon,
  FileText,
  File as FileIconLucide,
  Save,
  X as CloseIcon,
  Plus,
  MoveLeft,
  StickyNote,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "../../data";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/dashboard/Avatar";
import { priorityColors } from "@/utils/constants";
import InputField from "@/components/primitives/form/InputField";
import SelectField from "@/components/primitives/form/SelectField";
import { InfoRow } from "@/components/dashboard/taskId/InfoRow";
import TaskDetailsSkeleton from "@/components/skeletons/TaskDetailsSkeleton";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { CheckboxField } from "@/components/primitives/form/CheckboxField";
import Link from "next/link";

const categories = [
  "Audit",
  "Documentation",
  "Training",
  "Reporting",
  "Maintenance",
  "Assessment",
  "HR",
  "Compliance",
  "Quality Control",
  "Safety",
];

const predefinedTags = [
  "ISO",
  "QHSE",
  "Banking",
  "Compliance",
  "Safety",
  "Training",
  "Environment",
  "Risk Management",
  "Equipment",
  "Performance",
];

function CEOTaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const colors = themes[theme];
  const { allTasks, updateTask, loading } = useTask();
  const { organizationStaffs } = useUser();

  const taskId = params.taskId as string;
  const task = allTasks.find((t) => t.id === taskId);

  const [isUpdating, setIsUpdating] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "files">("overview");

  // Edit states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [editedPriority, setEditedPriority] = useState("");
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const [isEditingDates, setIsEditingDates] = useState(false);
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [editedTags, setEditedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [isEditingAssignees, setIsEditingAssignees] = useState(false);
  const [editedAssignees, setEditedAssignees] = useState<
    Array<{ id: string; name: string; avatar: string }>
  >([]);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [isEditingRecurring, setIsEditingRecurring] = useState(false);
  const [editedRecurring, setEditedRecurring] = useState(false);
  const [editedRecurringFrequency, setEditedRecurringFrequency] = useState("");

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      setEditedPriority(task.priority);
      setEditedCategory(task.category);
      setEditedStartDate(new Date(task.startDate).toISOString().split("T")[0]);
      setEditedDueDate(new Date(task.dueDate).toISOString().split("T")[0]);
      setEditedTags(task.tags || []);
      setEditedAssignees(task.assignedTo);
      setEditedRecurring(task.recurring);
      setEditedRecurringFrequency(task.recurringFrequency || "");
    }
  }, [task]);

  const isOverdue =
    task && new Date(task.dueDate) < new Date() && task.status !== "Completed";

  const handleStatusChange = async (newStatus: string) => {
    if (!task) return;

    setIsUpdating(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateTask(task.id, { status: newStatus as any });
      setShowStatusMenu(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateTitle = async () => {
    if (!task) return;
    setIsUpdating(true);
    try {
      await updateTask(task.id, { title: editedTitle });
      setIsEditingTitle(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update title:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateDescription = async () => {
    if (!task) return;
    setIsUpdating(true);
    try {
      await updateTask(task.id, { description: editedDescription });
      setIsEditingDescription(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update description:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePriority = async () => {
    if (!task) return;
    setIsUpdating(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateTask(task.id, { priority: editedPriority as any });
      setIsEditingPriority(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update priority:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!task) return;
    setIsUpdating(true);
    try {
      await updateTask(task.id, { category: editedCategory });
      setIsEditingCategory(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update category:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateDates = async () => {
    if (!task) return;
    setIsUpdating(true);
    try {
      await updateTask(task.id, {
        startDate: editedStartDate,
        dueDate: editedDueDate,
      });
      setIsEditingDates(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update dates:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateTags = async () => {
    if (!task) return;
    setIsUpdating(true);
    try {
      await updateTask(task.id, { tags: editedTags });
      setIsEditingTags(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update tags:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateAssignees = async () => {
    if (!task) return;
    setIsUpdating(true);
    try {
      await updateTask(task.id, { assignedTo: editedAssignees });
      setIsEditingAssignees(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update assignees:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateRecurring = async () => {
    if (!task) return;
    setIsUpdating(true);
    try {
      await updateTask(task.id, {
        recurring: editedRecurring,
        recurringFrequency: editedRecurring
          ? (editedRecurringFrequency as "" | "daily" | "weekly" | "monthly")
          : "",
      });
      setIsEditingRecurring(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Failed to update recurring settings:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTagToggle = (tag: string) => {
    if (editedTags.includes(tag)) {
      setEditedTags(editedTags.filter((t) => t !== tag));
    } else {
      setEditedTags([...editedTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !editedTags.includes(customTag.trim())) {
      setEditedTags([...editedTags, customTag.trim()]);
      setCustomTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEditedTags(editedTags.filter((t) => t !== tag));
  };

  const handleAssigneeToggle = (employee: {
    id: string;
    name: string;
    avatar: string;
  }) => {
    const exists = editedAssignees.some((a) => a.id === employee.id);
    if (exists) {
      setEditedAssignees(editedAssignees.filter((a) => a.id !== employee.id));
    } else {
      setEditedAssignees([...editedAssignees, employee]);
    }
  };

  if (loading) {
    return (
      <DashboardLayout links={links}>
        <TaskDetailsSkeleton />
      </DashboardLayout>
    );
  }

  if (!task) {
    return (
      <DashboardLayout links={links}>
        <div
          className={`min-h-screen ${colors.bg} ${colors.text} flex items-center justify-center p-6`}
        >
          <div className="text-center">
            <AlertCircle
              size={48}
              className={`${colors.textMuted} mx-auto mb-4`}
            />
            <h2 className="text-2xl font-bold mb-2">Task Not Found</h2>
            <p className={`${colors.textMuted} mb-6`}>
              The task you&apos;re looking for doesn&apos;t exist or has been
              deleted.
            </p>
            <button
              onClick={() => router.back()}
              className={`px-6 py-3 ${colors.button} rounded-lg font-medium`}
            >
              Go Back
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // CEO status configs
  const ceoStatusConfig = {
    Overdue: {
      icon: XCircle,
      bg: "bg-red-700",
    },
    Completed: {
      icon: CheckCircle2,
      bg: "bg-emerald-900/30",
    },
  };

  const currentStatus = isOverdue
    ? { ...ceoStatusConfig.Overdue, label: "Overdue" }
    : task.status === "Completed"
      ? { ...ceoStatusConfig.Completed, label: "Completed" }
      : { icon: Clock, bg: "bg-purple-900/30", label: task.status };

  const StatusIcon = currentStatus.icon;
  const daysUntilDue = Math.ceil(
    (new Date(task.dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <DashboardLayout links={links}>
      <div className={`${colors.bg} ${colors.text}`}>
        {/* Header */}
        <div
          className={`sticky top-0 z-20 border-b ${colors.border} backdrop-blur-lg bg-opacity-95`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex items-center gap-1 mb-1">
              {/* mobile back button */}
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className={`md:hidden p-2 ${colors.hover} rounded-lg shrink-0`}
              >
                <MoveLeft size={20} />
              </Button>
              <span
                className={`md:hidden px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]} shrink-0`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex items-start md:items-center justify-between gap-4">
              {/* Title */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* desktop back button */}
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className={`hidden md:inline p-2 ${colors.hover} rounded-lg shrink-0`}
                >
                  <MoveLeft size={20} />
                </Button>

                <div className="flex-1 min-w-0">
                  {!isEditingTitle ? (
                    <>
                      <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold truncate">
                          {task.title}
                        </h1>
                        <button
                          onClick={() => setIsEditingTitle(true)}
                          className={`p-1.5 ${colors.hover} rounded-lg shrink-0`}
                        >
                          <Edit2 size={14} />
                        </button>
                        <span
                          className={`hidden md:inline px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]} shrink-0`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <p className={`text-sm ${colors.textMuted}`}>
                        Task ID: T-{task.id.slice(0, 8)}
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                      <InputField
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className={`py-1 md:py-2 font-bold ${colors.input}`}
                        containerClassName="flex-1"
                      />
                      <div className="flex justist items-center gap-2">
                        <Button
                          variant={theme === "light" ? "secondary" : "ghost"}
                          onClick={handleUpdateTitle}
                          disabled={isUpdating}
                          className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`}
                        >
                          <Save size={14} />
                        </Button>
                        <Button
                          variant={theme === "light" ? "secondary" : "ghost"}
                          onClick={() => {
                            setIsEditingTitle(false);
                            setEditedTitle(task.title);
                          }}
                          className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`}
                        >
                          <CloseIcon size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Dropdown - CEO can only set Overdue or Completed */}
              <div className="relative shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  disabled={isUpdating}
                  className={`group relative flex items-center gap-1.5 md:gap-3 px-2 md:px-4 py-1.5 md:py-2.5 rounded-full backdrop-blur-md ${currentStatus.label === "Overdue" ? "text-gray-100" : ""} ${currentStatus.bg} border ${colors.border} shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer`}
                >
                  <StatusIcon size={18} className="shrink-0" />
                  <span className="text-sm font-semibold tracking-tight">
                    {currentStatus.label}
                  </span>
                  {isUpdating && (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${showStatusMenu ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>

                {showStatusMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setShowStatusMenu(false)}
                    />
                    <div
                      className={`absolute right-0 top-full mt-3 w-60 ${colors.bgCard} border rounded-2xl shadow-2xl z-40 p-2 backdrop-blur-xl`}
                    >
                      {Object.entries(ceoStatusConfig).map(
                        ([status, config]) => {
                          const Icon = config.icon;
                          const isActive =
                            task.status === status ||
                            (status === "Overdue" && isOverdue);
                          return (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(status)}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${isActive ? "bg-white/5" : "hover:bg-white/5"}`}
                            >
                              <Icon size={18} />
                              <span className="font-medium text-sm">
                                {status}
                              </span>
                              {isActive && (
                                <CheckCircle2
                                  size={16}
                                  className="ml-auto opacity-80"
                                />
                              )}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 px-4 sm:px-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "files", label: "Files" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "overview" | "files")}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
                activeTab === tab.id
                  ? `${colors.text} bg-[rgba(255,255,255,0.05)]`
                  : `${colors.textMuted} hover:${colors.text}`
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute -bottom-px left-0 right-0 h-1 bg-slate-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === "overview" && (
                <>
                  {/* Description */}
                  <div
                    className={`${colors.bgCard} rounded-xl border ${colors.border}`}
                  >
                    <div
                      className={`p-6 border-b border-dashed ${colors.border} flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-2">
                        <StickyNote size={20} className="opacity-80" />

                        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                          Description
                        </h2>
                      </div>
                      {!isEditingDescription ? (
                        <Button
                          variant={theme === "light" ? "secondary" : "ghost"}
                          onClick={() => setIsEditingDescription(true)}
                          className={cn(
                            `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                            ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                          )}
                        >
                          <Edit2 size={14} /> Edit
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant={theme === "light" ? "secondary" : "ghost"}
                            onClick={handleUpdateDescription}
                            disabled={isUpdating}
                            className={cn(
                              `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                            )}
                          >
                            <Save size={14} /> Save
                          </Button>
                          <Button
                            variant={theme === "light" ? "secondary" : "ghost"}
                            onClick={() => {
                              setIsEditingDescription(false);
                              setEditedDescription(task.description);
                            }}
                            className={cn(
                              `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                            )}
                          >
                            <CloseIcon size={14} />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {isEditingDescription ? (
                        <Textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          rows={6}
                          className={`w-full px-4 py-3 ${colors.input} rounded-lg resize-none`}
                        />
                      ) : (
                        <p className={`${colors.text} leading-relaxed`}>
                          {task.description || "No description provided."}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div
                    className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={20} className="opacity-80" />
                        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                          Progress
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-slate-500 rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Assigned Team */}
                  <div
                    className={`${colors.bgCard} rounded-xl border ${colors.border}`}
                  >
                    <div
                      className={`p-6 border-b border-dashed ${colors.border} flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-2">
                        <Users size={20} className="opacity-80" />
                        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                          Assigned Team ({task.assignedTo.length})
                        </h2>
                      </div>
                      {!isEditingAssignees ? (
                        <Button
                          variant={theme === "light" ? "secondary" : "ghost"}
                          onClick={() => setIsEditingAssignees(true)}
                          className={cn(
                            `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                          )}
                        >
                          <Edit2 size={14} /> Edit
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant={theme === "light" ? "secondary" : "ghost"}
                            onClick={handleUpdateAssignees}
                            disabled={isUpdating}
                            className={cn(
                              `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                            )}
                          >
                            <Save size={14} /> Save
                          </Button>
                          <Button
                            variant={theme === "light" ? "secondary" : "ghost"}
                            onClick={() => {
                              setIsEditingAssignees(false);
                              setEditedAssignees(task.assignedTo);
                            }}
                            className={cn(
                              `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                            )}
                          >
                            <CloseIcon size={14} />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      {isEditingAssignees ? (
                        <>
                          <div className="relative">
                            <Button
                              type="button"
                              onClick={() =>
                                setShowEmployeeDropdown(!showEmployeeDropdown)
                              }
                              className={`w-full px-4 py-2.5 text-sm ${colors.input} rounded-lg text-left flex items-center justify-between`}
                            >
                              <span>
                                Select employees ({editedAssignees.length}{" "}
                                selected)
                              </span>
                              <Users size={18} />
                            </Button>

                            {showEmployeeDropdown && (
                              <>
                                <div
                                  className="fixed inset-0 z-40"
                                  onClick={() => setShowEmployeeDropdown(false)}
                                />
                                <div
                                  className={`absolute left-0 right-0 top-full mt-2 ${colors.bgCard} border ${colors.border} rounded-lg shadow-lg max-h-80 overflow-y-auto z-50`}
                                >
                                  {organizationStaffs.map((employee) => (
                                    <label
                                      key={employee._id}
                                      className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 ${colors.hover} cursor-pointer`}
                                    >
                                      <CheckboxField
                                        id={employee._id}
                                        checked={editedAssignees.some(
                                          (a) => a.id === employee._id,
                                        )}
                                        onCheckedChange={() =>
                                          handleAssigneeToggle({
                                            id: employee._id,
                                            name: employee.username,
                                            avatar: employee.avatar || "",
                                          })
                                        }
                                      />

                                      <div className="flex items-center gap-2 sm:gap-3">
                                        <Avatar
                                          avatar={employee.avatar}
                                          name={employee?.username}
                                          className="w-7 h-7 sm:w-8 sm:h-8"
                                        />

                                        <div className="flex-1 min-w-0">
                                          <div className="font-medium text-sm truncate">
                                            {employee.username}
                                          </div>
                                          <div
                                            className={`text-xs ${colors.textMuted} truncate`}
                                          >
                                            {employee.email}
                                          </div>
                                        </div>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>

                          {editedAssignees.map((member) => (
                            <div
                              key={member.id}
                              className={`flex items-center justify-between p-3 rounded-lg ${colors.hover}`}
                            >
                              <div className="flex items-center gap-3">
                                <Avatar
                                  avatar={member.avatar}
                                  name={member.name}
                                  className="w-10 h-10"
                                />
                                <div>
                                  <p className="text-sm font-medium">
                                    {member.name}
                                  </p>
                                  <p className={`text-xs ${colors.textMuted}`}>
                                    Team Member
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant={"ghost"}
                                size="icon"
                                onClick={() => handleAssigneeToggle(member)}
                                className="p-1 hover:bg-red-500/10 rounded"
                              >
                                <CloseIcon size={16} className="" />
                              </Button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {task.assignedTo.map((member) => (
                            <div
                              key={member.id}
                              className={`flex items-center gap-3 p-3 rounded-lg ${colors.hover}`}
                            >
                              <Avatar
                                avatar={member.avatar}
                                name={member.name}
                                className="w-10 h-10"
                              />
                              <div>
                                <p className="text-sm font-medium">
                                  {member.name}
                                </p>
                                <p className={`text-xs ${colors.textMuted}`}>
                                  Team Member
                                </p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "files" && (
                <div
                  className={`${colors.bgCard} rounded-2xl border ${colors.border} p-6`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Paperclip size={18} className="opacity-70" />
                      Attachments
                    </h2>

                    <span className={`text-sm ${colors.textMuted}`}>
                      {task.attachments.length} file
                      {task.attachments.length !== 1 && "s"}
                    </span>
                  </div>

                  {task.attachments.length > 0 ? (
                    <div className="space-y-3">
                      {task.attachments.map((file, index) => {
                        const isBase64 = file.startsWith("data:");
                        const fileType = isBase64
                          ? file.split(";")[0].split(":")[1]
                          : "";
                        const isImage = fileType.startsWith("image/");
                        const isPDF = fileType === "application/pdf";
                        const fileName = isBase64
                          ? `file_${index + 1}.${fileType.split("/")[1] || "file"}`
                          : file;

                        const FileIcon = isImage
                          ? ImageIcon
                          : isPDF
                            ? FileText
                            : FileIconLucide;

                        return (
                          <div
                            key={index}
                            className={`group rounded-xl border ${colors.border} p-4 transition-all hover:shadow-md`}
                          >
                            <div className="flex items-center gap-4">
                              {/* Icon */}
                              <div
                                className={`p-3 rounded-xl ${colors.bgSidebar}`}
                              >
                                <FileIcon size={20} className="opacity-80" />
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {fileName}
                                </p>

                                <p
                                  className={`text-xs ${colors.textMuted} mt-1`}
                                >
                                  {isImage
                                    ? "Image"
                                    : isPDF
                                      ? "PDF Document"
                                      : "Document"}{" "}
                                  • Uploaded{" "}
                                  {new Date(
                                    task.createdAt,
                                  ).toLocaleDateString()}
                                </p>
                              </div>

                              {/* Download */}
                              <Link
                                href={file}
                                download={fileName}
                                className="shrink-0"
                              >
                                <Button
                                  variant={
                                    theme === "light" ? "outline" : "ghost"
                                  }
                                  size="sm"
                                  className={cn(
                                    `flex items-center gap-2
                                    ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                                  )}
                                >
                                  <Download size={14} />
                                  Download
                                </Button>
                              </Link>
                            </div>

                            {/* Preview Section */}
                            {isImage && (
                              <div className="mt-4 rounded-xl overflow-hidden border border-black/5 dark:border-white/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={file}
                                  alt={fileName}
                                  className="w-full h-auto max-h-80 object-contain bg-black/5 dark:bg-white/5"
                                />
                              </div>
                            )}

                            {isPDF && (
                              <div className="mt-4 rounded-xl overflow-hidden border border-black/5 dark:border-white/5">
                                <iframe
                                  src={file}
                                  className="w-full h-80"
                                  title={fileName}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div
                        className={`p-4 rounded-full ${colors.bgSidebar} mb-4`}
                      >
                        <Paperclip size={28} className="opacity-60" />
                      </div>
                      <p className="font-medium">No attachments yet</p>
                      <p className={`text-sm mt-1 ${colors.textMuted}`}>
                        Files uploaded to this task will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Task Details */}
              <div
                className={`${colors.bgCard} rounded-xl border ${colors.border}`}
              >
                <div
                  className={`p-6 border-b border-dashed ${colors.border} flex items-center justify-between`}
                >
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Task Details
                  </h2>
                  {!isEditingPriority &&
                    !isEditingCategory &&
                    !isEditingDates && (
                      <Button
                        variant={theme === "light" ? "secondary" : "ghost"}
                        onClick={() => {
                          setIsEditingPriority(true);
                          setIsEditingCategory(true);
                          setIsEditingDates(true);
                        }}
                        className={cn(
                          `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                        )}
                      >
                        <Edit2 size={14} /> Edit
                      </Button>
                    )}
                  {(isEditingPriority ||
                    isEditingCategory ||
                    isEditingDates) && (
                    <div className="flex gap-2">
                      <Button
                        variant={theme === "light" ? "secondary" : "ghost"}
                        onClick={async () => {
                          await handleUpdatePriority();
                          await handleUpdateCategory();
                          await handleUpdateDates();
                        }}
                        disabled={isUpdating}
                        className={cn(
                          `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                        )}
                      >
                        <Save size={14} /> Save
                      </Button>
                      <Button
                        variant={theme === "light" ? "secondary" : "ghost"}
                        onClick={() => {
                          setIsEditingPriority(false);
                          setIsEditingCategory(false);
                          setIsEditingDates(false);
                          setEditedPriority(task.priority);
                          setEditedCategory(task.category);
                          setEditedStartDate(
                            new Date(task.startDate)
                              .toISOString()
                              .split("T")[0],
                          );
                          setEditedDueDate(
                            new Date(task.dueDate).toISOString().split("T")[0],
                          );
                        }}
                        className={cn(
                          `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                        )}
                      >
                        <CloseIcon size={14} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-5">
                  {/* Priority */}
                  {isEditingPriority ? (
                    <SelectField
                      label="Priority"
                      value={editedPriority}
                      onValueChange={(value) => setEditedPriority(value)}
                      options={[
                        { label: "Low", value: "Low" },
                        { label: "Medium", value: "Medium" },
                        { label: "High", value: "High" },
                      ]}
                      selectClassName={cn(
                        colors.input,
                        colors.textMuted,
                        "text-sm",
                      )}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${colors.textMuted}`}
                      >
                        PRIORITY
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  )}

                  {/* Category */}
                  {isEditingCategory ? (
                    <SelectField
                      label="Category"
                      value={editedCategory}
                      onValueChange={(value) => setEditedCategory(value)}
                      options={categories.map((cat) => ({
                        label: cat,
                        value: cat,
                      }))}
                      selectClassName={cn(
                        colors.input,
                        colors.textMuted,
                        "text-sm",
                      )}
                    />
                  ) : (
                    <InfoRow
                      icon={Tag}
                      label="Category"
                      value={task.category}
                    />
                  )}

                  {/* Dates */}
                  {isEditingDates ? (
                    <>
                      <InputField
                        label="Start Date"
                        type="date"
                        value={editedStartDate}
                        onChange={(e) => setEditedStartDate(e.target.value)}
                        className={cn(
                          colors.input,
                          colors.textMuted,
                          "text-sm",
                        )}
                        labelClassName={colors.text}
                      />
                      <InputField
                        label="Due Date"
                        type="date"
                        value={editedDueDate}
                        onChange={(e) => setEditedDueDate(e.target.value)}
                        className={cn(
                          colors.input,
                          colors.textMuted,
                          "text-sm",
                        )}
                        labelClassName={colors.text}
                      />
                    </>
                  ) : (
                    <>
                      <InfoRow
                        icon={Calendar}
                        label="Start date"
                        value={new Date(task.startDate).toLocaleDateString()}
                      />
                      <div>
                        <InfoRow
                          icon={Calendar}
                          label="Due date"
                          value={new Date(task.dueDate).toLocaleDateString()}
                          valueClassName={isOverdue ? "text-red-400" : ""}
                        />
                        {!isOverdue && daysUntilDue >= 0 && (
                          <p
                            className={`ml-8 mt-1 text-xs ${daysUntilDue <= 3 ? "text-red-400" : colors.textMuted}`}
                          >
                            {daysUntilDue === 0
                              ? "Due today"
                              : `${daysUntilDue} day${daysUntilDue > 1 ? "s" : ""} remaining`}
                          </p>
                        )}
                        {isOverdue && (
                          <p className="ml-8 mt-1 text-xs font-medium text-red-400">
                            {Math.abs(daysUntilDue)} day
                            {Math.abs(daysUntilDue) > 1 ? "s" : ""} overdue
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Ownership */}
              <div
                className={`${colors.bgCard} rounded-xl border ${colors.border}`}
              >
                <div className={`p-6 border-b border-dashed ${colors.border}`}>
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Ownership
                  </h2>
                </div>
                <div className="p-6 space-y-5">
                  <InfoRow
                    icon={Users}
                    label="Created by"
                    value={task.assignedBy}
                  />
                  <InfoRow
                    icon={Clock}
                    label="Created on"
                    value={new Date(task.createdAt).toLocaleDateString()}
                  />
                </div>
              </div>

              {/* Tags */}
              <div
                className={`${colors.bgCard} rounded-xl border ${colors.border}`}
              >
                <div
                  className={`p-6 border-b border-dashed ${colors.border} flex items-center justify-between`}
                >
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Tags
                  </h2>
                  {!isEditingTags ? (
                    <Button
                      variant={theme === "light" ? "secondary" : "ghost"}
                      onClick={() => setIsEditingTags(true)}
                      className={cn(
                        `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                      )}
                    >
                      <Edit2 size={14} /> Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant={theme === "light" ? "secondary" : "ghost"}
                        onClick={handleUpdateTags}
                        disabled={isUpdating}
                        className={cn(
                          `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                        )}
                      >
                        <Save size={14} /> Save
                      </Button>
                      <Button
                        variant={theme === "light" ? "secondary" : "ghost"}
                        onClick={() => {
                          setIsEditingTags(false);
                          setEditedTags(task.tags || []);
                        }}
                        className={cn(
                          `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                        )}
                      >
                        <CloseIcon size={14} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {isEditingTags ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {predefinedTags.map((tag) => (
                          <Button
                            variant={
                              editedTags.includes(tag) ? "default" : "ghost"
                            }
                            key={tag}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                              editedTags.includes(tag)
                                ? "bg-slate-700 border-slate-600 text-white"
                                : `${colors.bgSidebar} ${colors.border} ${colors.hover}`
                            }`}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <InputField
                          type="text"
                          placeholder="Add custom tag"
                          value={customTag}
                          onChange={(e) => setCustomTag(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddCustomTag();
                            }
                          }}
                          className={`${colors.input} text-sm`}
                          containerClassName="flex-1"
                        />
                        <Button type="button" onClick={handleAddCustomTag}>
                          <Plus size={18} />
                        </Button>
                      </div>
                      {editedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {editedTags.map((tag) => (
                            <div
                              key={tag}
                              className="flex items-center gap-2 px-3 py-1 bg-gray-700/20 border border-gray-600/30 rounded-full"
                            >
                              <span className="text-xs">{tag}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="text-gray-400"
                              >
                                <CloseIcon size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {task.tags && task.tags.length > 0 ? (
                        task.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 rounded-full text-xs font-medium border border-dashed ${colors.border}`}
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <p className={colors.textMuted}>No tags added</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Recurring */}
              {task.recurring && (
                <div
                  className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
                >
                  <div className="flex items-center gap-3">
                    <Clock size={16} />
                    <div>
                      <p className="text-sm font-medium">Recurring task</p>
                      <p className={`text-xs ${colors.textMuted} capitalize`}>
                        {task.recurringFrequency}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Recurring */}
              <div
                className={`${colors.bgCard} rounded-xl border ${colors.border}`}
              >
                <div
                  className={`p-6 border-b border-dashed ${colors.border} flex items-center justify-between`}
                >
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Recurring Task
                  </h2>
                  {!isEditingRecurring ? (
                    <Button
                      variant={theme === "light" ? "secondary" : "ghost"}
                      onClick={() => setIsEditingRecurring(true)}
                      className={cn(
                        `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                      )}
                    >
                      <Edit2 size={14} /> Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant={theme === "light" ? "secondary" : "ghost"}
                        onClick={handleUpdateRecurring}
                        disabled={isUpdating}
                        className={cn(
                          `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                        )}
                      >
                        <Save size={14} /> Save
                      </Button>
                      <Button
                        variant={theme === "light" ? "secondary" : "ghost"}
                        onClick={() => {
                          setIsEditingRecurring(false);
                          setEditedRecurring(task.recurring);
                          setEditedRecurringFrequency(
                            task.recurringFrequency || "",
                          );
                        }}
                        className={cn(
                          `px-3 py-1.5 rounded text-sm flex items-center gap-2 
                              ${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`}`,
                        )}
                      >
                        <CloseIcon size={14} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {isEditingRecurring ? (
                    <div className="space-y-4">
                      {/* Recurring Toggle */}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <CheckboxField
                          id="recurring"
                          checked={editedRecurring}
                          onCheckedChange={(value) =>
                            setEditedRecurring(!!value)
                          }
                        />
                        <div>
                          <div className="font-medium text-sm">
                            Enable Recurring
                          </div>
                          <div className={`text-xs ${colors.textMuted}`}>
                            Repeat this task automatically
                          </div>
                        </div>
                      </label>

                      {/* Frequency Selector */}
                      {editedRecurring && (
                        <SelectField
                          label="Frequency"
                          value={editedRecurringFrequency}
                          onValueChange={(value) =>
                            setEditedRecurringFrequency(value)
                          }
                          options={[
                            { label: "Daily", value: "daily" },
                            { label: "Weekly", value: "weekly" },
                            { label: "Monthly", value: "monthly" },
                          ]}
                          selectClassName={cn(
                            colors.input,
                            colors.textMuted,
                            "text-sm",
                          )}
                          placeholder="Select frequency"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Clock size={16} />
                      <div>
                        {task.recurring ? (
                          <>
                            <p className="text-sm font-medium">Enabled</p>
                            <p
                              className={`text-xs ${colors.textMuted} capitalize`}
                            >
                              {task.recurringFrequency || "Not set"}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-medium">Not recurring</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(CEOTaskDetailsPage, { role: "ceo" });
