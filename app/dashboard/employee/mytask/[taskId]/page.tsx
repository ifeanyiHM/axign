"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { useTask } from "@/context/TaskContext";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Tag,
  Paperclip,
  AlertCircle,
  CheckCircle2,
  Circle,
  PlayCircle,
  XCircle,
  TrendingUp,
  Edit2,
  Download,
  ImageIcon,
  FileText,
  File as FileIconLucide,
  ClosedCaptionIcon,
  Save,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { navItems } from "../../data";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/dashboard/Avatar";
import { InfoRow } from "./InfoRow";
import { priorityColors } from "@/utils/constant";

function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const colors = themes[theme];
  const { allTasks, updateTask } = useTask();

  const taskId = params.taskId as string;
  const task = allTasks.find((t) => t.id === taskId);

  const [isUpdating, setIsUpdating] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "files">(
    "overview",
  );

  // Edit states
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [editedProgress, setEditedProgress] = useState(0);

  useEffect(() => {
    if (task) {
      setEditedProgress(task.progress);
    }
  }, [task]);

  // Calculate if task is overdue
  const isOverdue =
    task && new Date(task.dueDate) < new Date() && task.status !== "Completed";

  const handleStatusChange = async (newStatus: string) => {
    if (!task) return;

    setIsUpdating(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateTask(task.id, { status: newStatus as any });
      setShowStatusMenu(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateProgress = async () => {
    if (!task) return;

    setIsUpdating(true);
    try {
      await updateTask(task.id, { progress: editedProgress });
      setIsEditingProgress(false);
    } catch (error) {
      console.error("Failed to update progress:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!task) {
    return (
      <DashboardLayout links={navItems}>
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

  // Employee can only change between these statuses
  const employeeStatusConfig = {
    "Not Started": {
      icon: Circle,
      bg: "bg-slate-800/30",
    },
    "In Progress": {
      icon: PlayCircle,
      bg: "bg-blue-900/30",
    },
    "Pending Review": {
      icon: Clock,
      bg: "bg-purple-900/30",
    },
  };

  // All status configs (for display only)
  const allStatusConfig = {
    ...employeeStatusConfig,
    Completed: {
      icon: CheckCircle2,
      bg: "bg-emerald-900/30",
    },
    Overdue: {
      icon: XCircle,
      bg: "bg-red-500/10",
    },
  };

  // Determine current status display
  let currentStatus;
  let StatusIcon;

  if (isOverdue) {
    // Show Overdue (read-only, set by CEO)
    currentStatus = {
      ...allStatusConfig.Overdue,
      label: "Overdue",
    };
    StatusIcon = XCircle;
  } else if (task.status === "Completed") {
    // Show Completed (read-only, set by CEO)
    currentStatus = {
      ...allStatusConfig.Completed,
      label: "Completed",
    };
    StatusIcon = CheckCircle2;
  } else {
    // Show employee-editable status
    currentStatus = {
      ...employeeStatusConfig[task.status as keyof typeof employeeStatusConfig],
      label: task.status,
    };
    StatusIcon = currentStatus.icon;
  }

  // Employee cannot change status if task is Overdue or Completed
  const canChangeStatus = !isOverdue && task.status !== "Completed";

  const daysUntilDue = Math.ceil(
    (new Date(task.dueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  // // Mock activity timeline
  // const activities = [
  //   {
  //     id: 1,
  //     type: "status_change",
  //     user: task.assignedBy,
  //     action: "changed status to",
  //     value: "In Progress",
  //     timestamp: "2 hours ago",
  //   },
  //   {
  //     id: 2,
  //     type: "comment",
  //     user: "Sarah Johnson",
  //     action: "added a comment",
  //     value: "Great progress on this! Let me know if you need any help.",
  //     timestamp: "5 hours ago",
  //   },
  //   {
  //     id: 3,
  //     type: "file",
  //     user: task.assignedBy,
  //     action: "uploaded",
  //     value: "requirements_v2.pdf",
  //     timestamp: "1 day ago",
  //   },
  //   {
  //     id: 4,
  //     type: "created",
  //     user: task.assignedBy,
  //     action: "created this task",
  //     value: "",
  //     timestamp: new Date(task.createdAt).toLocaleDateString(),
  //   },
  // ];

  return (
    <DashboardLayout links={navItems}>
      <div className={` ${colors.bg} ${colors.text}`}>
        {/* Header */}
        <div
          className={`sticky top-0 z-20 border-b ${colors.border} backdrop-blur-lg bg-opacity-95`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className={`flex items-center justify-between gap-4`}>
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <button
                  onClick={() => router.back()}
                  className={`p-2 ${colors.hover} rounded-lg shrink-0`}
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold truncate">{task.title}</h1>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}} shrink-0`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <p className={`text-sm ${colors.textMuted}`}>
                    Task ID: T-{task.id.slice(0, 8)}
                  </p>
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="relative shrink-0">
                <button
                  onClick={() =>
                    canChangeStatus && setShowStatusMenu(!showStatusMenu)
                  }
                  disabled={isUpdating || !canChangeStatus}
                  className={`
                  group relative flex items-center gap-3 px-4 py-2.5 rounded-full
                  backdrop-blur-md
                  ${currentStatus.bg}
                  border ${colors.border}
                  shadow-sm
                  transition-all duration-200
                  ${canChangeStatus ? "hover:scale-[1.02] hover:shadow-md cursor-pointer" : "opacity-70 cursor-not-allowed"}
                `}
                >
                  {/* Status Icon */}
                  <StatusIcon size={18} className="shrink-0" />

                  {/* Label */}
                  <span className="text-sm font-semibold tracking-tight">
                    {currentStatus.label}
                  </span>

                  {/* Spinner */}
                  {isUpdating && (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  )}

                  {/* CEO only badge */}
                  {!canChangeStatus && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">
                      CEO
                    </span>
                  )}

                  {/* Animated caret */}
                  {canChangeStatus && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        showStatusMenu ? "rotate-180" : ""
                      }`}
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
                  )}
                </button>

                {/* Dropdown */}
                {showStatusMenu && canChangeStatus && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setShowStatusMenu(false)}
                    />

                    <div
                      className={`
                      absolute right-0 top-full mt-3 w-60
                      ${colors.bgCard}
                      border
                      rounded-2xl
                      shadow-2xl
                      z-40
                      p-2
                      backdrop-blur-xl
                    `}
                    >
                      {Object.entries(employeeStatusConfig).map(
                        ([status, config]) => {
                          const Icon = config.icon;
                          const isActive = task.status === status;

                          return (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(status)}
                              className={`
                              w-full flex items-center gap-3 px-4 py-3 rounded-xl
                              transition-all duration-150
                              ${isActive ? "bg-white/5" : "hover:bg-white/5"}
                            `}
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
          </div>{" "}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 px-4 sm:px-6">
          {[
            { id: "overview", label: "Overview" },
            // { id: "activity", label: "Activity" },
            { id: "files", label: "Files" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id as "overview" | "activity" | "files")
              }
              className={`
        relative px-4 py-2 text-sm font-medium transition-colors
        rounded-t-lg
        ${
          activeTab === tab.id
            ? `${colors.text} bg-[rgba(255,255,255,0.05)]`
            : `${colors.textMuted} hover:${colors.text}`
        }
      `}
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
                      className={`p-6 border-b border-dashed ${colors.border} flex items-center gap-2`}
                    >
                      <Edit2 size={20} className="opacity-80" />
                      <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                        Description
                      </h2>
                    </div>
                    <div className="p-6">
                      <p className={`${colors.textMuted} leading-relaxed`}>
                        {task.description || "No description provided."}
                      </p>
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
                      {!isEditingProgress ? (
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            {task.progress}%
                          </span>
                          <Button
                            variant="secondary"
                            onClick={() => setIsEditingProgress(true)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2`}
                          >
                            <Edit2 size={14} />
                            Edit
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={editedProgress}
                            onChange={(e) =>
                              setEditedProgress(Number(e.target.value))
                            }
                            className={`w-20 px-3 py-1.5 ${colors.input} rounded-lg text-center`}
                          />
                          <span className="text-sm">%</span>
                          <Button
                            variant="secondary"
                            onClick={handleUpdateProgress}
                            disabled={isUpdating}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium`}
                          >
                            <Save size={14} />
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setIsEditingProgress(false);
                              setEditedProgress(task.progress);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm`}
                          >
                            <ClosedCaptionIcon size={14} />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-slate-500 rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>

                    {/* {task.estimatedHours && (
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                          <p className={`text-sm ${colors.textMuted} mb-1`}>
                            Estimated Hours
                          </p>
                          <p className="text-xl font-semibold">
                            {task.estimatedHours}h
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${colors.textMuted} mb-1`}>
                            Hours Logged
                          </p>
                          <p className="text-xl font-semibold">
                            {task.hoursLogged}h
                          </p>
                        </div>
                      </div>
                    )} */}
                  </div>

                  {/* Assigned Team */}
                  <div
                    className={`${colors.bgCard} rounded-xl border ${colors.border}`}
                  >
                    <div
                      className={`p-6 border-b border-dashed ${colors.border} flex items-center gap-2`}
                    >
                      <Users size={20} className="opacity-80" />
                      <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                        Assigned Team ({task.assignedTo.length})
                      </h2>
                    </div>

                    <div className="p-6 space-y-3">
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
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className={`text-xs ${colors.textMuted}`}>
                              Team Member
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* {activeTab === "activity" && (
                <div
                  className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
                >
                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <MessageSquare size={20} className="text-blue-400" />
                    Activity Timeline
                  </h2>

                  <div className="space-y-6">
                    {activities.map((activity, index) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full ${colors.bgSidebar} border-2 ${colors.border} flex items-center justify-center shrink-0`}
                          >
                            {activity.type === "status_change" && (
                              <PlayCircle size={16} className="text-blue-400" />
                            )}
                            {activity.type === "comment" && (
                              <MessageSquare
                                size={16}
                                className="text-purple-400"
                              />
                            )}
                            {activity.type === "file" && (
                              <Paperclip
                                size={16}
                                className="text-emerald-400"
                              />
                            )}
                            {activity.type === "created" && (
                              <CheckCircle2
                                size={16}
                                className="text-yellow-400"
                              />
                            )}
                          </div>
                          {index < activities.length - 1 && (
                            <div
                              className={`w-0.5 flex-1 ${colors.border} mt-2`}
                            />
                          )}
                        </div>

                        <div className="flex-1 pb-6">
                          <p className={colors.text}>
                            <span className="font-semibold">
                              {activity.user}
                            </span>{" "}
                            <span className={colors.textMuted}>
                              {activity.action}
                            </span>
                            {activity.value && (
                              <span className="font-semibold">
                                {" "}
                                {activity.value}
                              </span>
                            )}
                          </p>
                          <p className={`text-sm ${colors.textMuted} mt-1`}>
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                 
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <textarea
                      placeholder="Add a comment..."
                      rows={3}
                      className={`w-full px-4 py-3 ${colors.input} rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <button
                      className={`mt-3 px-6 py-2.5 ${colors.button} rounded-lg font-medium`}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              )} */}

              {activeTab === "files" && (
                <div
                  className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
                >
                  <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Paperclip size={20} className="" />
                    Attachments ({task.attachments.length})
                  </h2>

                  {task.attachments.length > 0 ? (
                    <div className="space-y-4">
                      {task.attachments.map((file, index) => {
                        // ✨ Check if file is base64 string (starts with "data:")
                        const isBase64 = file.startsWith("data:");
                        const fileType = isBase64
                          ? file.split(";")[0].split(":")[1] // e.g., "image/png"
                          : "";
                        const isImage = fileType.startsWith("image/");
                        const isPDF = fileType === "application/pdf";

                        // Extract filename if available, or generate one
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
                            className={`group p-4 rounded-lg border ${colors.border} ${colors.hover} transition-all`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`p-3 rounded-lg ${colors.bgSidebar}`}
                              >
                                <FileIcon size={24} className="" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate mb-1">
                                  {fileName}
                                </p>
                                <p className={`text-sm ${colors.textMuted}`}>
                                  {isImage
                                    ? "Image"
                                    : isPDF
                                      ? "PDF"
                                      : "Document"}{" "}
                                  • Uploaded{" "}
                                  {new Date(
                                    task.createdAt,
                                  ).toLocaleDateString()}
                                </p>
                              </div>

                              {/* ✨ Download button - actually downloads the file */}
                              <Button
                                variant={"secondary"}
                                className={`px-4 py-2 rounded-lg`}
                              >
                                <a
                                  href={file}
                                  download={fileName}
                                  className={`flex items-center gap-2 shrink-0`}
                                >
                                  <Download size={16} />
                                  Download
                                </a>
                              </Button>
                            </div>

                            {/* ✨ Preview for images - shows actual image */}
                            {isImage && (
                              <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={file}
                                  alt={fileName}
                                  className="w-full h-auto max-h-96 object-contain bg-gray-900"
                                />
                              </div>
                            )}

                            {/* ✨ Preview for PDFs */}
                            {isPDF && (
                              <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
                                <iframe
                                  src={file}
                                  className="w-full h-96"
                                  title={fileName}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Paperclip
                        size={48}
                        className={`${colors.textMuted} mx-auto mb-4`}
                      />
                      <p className={`${colors.textMuted} mb-4`}>
                        No files attached to this task
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Task Overview */}
              <div
                className={`${colors.bgCard} rounded-xl border ${colors.border}`}
              >
                <div className={`p-6 border-b border-dashed ${colors.border}`}>
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Task Overview
                  </h2>
                </div>

                <div className="p-6 space-y-5">
                  <InfoRow icon={Tag} label="Category" value={task.category} />

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
                        className={`ml-8 mt-1 text-xs ${
                          daysUntilDue <= 3 ? "text-red-400" : colors.textMuted
                        }`}
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
              {task.tags?.length > 0 && (
                <div
                  className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
                >
                  <h2 className="text-sm font-semibold tracking-wide uppercase mb-4 text-muted-foreground">
                    Tags
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium border border-dashed ${colors.border}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recurring */}
              {task.recurring && (
                <div
                  className={`${colors.bgCard} rounded-xl border ${colors.border} p-6`}
                >
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="" />
                    <div>
                      <p className="text-sm font-medium">Recurring task</p>
                      <p className={`text-xs ${colors.textMuted} capitalize`}>
                        {task.recurringFrequency}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(TaskDetailsPage, { role: "employee" });
