"use client";

import { useState } from "react";
import { withAuth } from "@/utils/withAuth";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ArrowLeft,
  Users,
  Tag,
  FileText,
  AlertCircle,
  CheckCircle2,
  Plus,
  X,
  Upload,
  Paperclip,
} from "lucide-react";
import { TaskFormData, taskSchema } from "@/schemas/taskSchema";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { links } from "../data";
import { Button } from "@/components/ui/button";
import InputField from "@/components/primitives/form/InputField";
import Header from "@/components/dashboard/Header";
import SelectField from "@/components/primitives/form/SelectField";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useTask } from "@/context/TaskContext";
import { Alert } from "@/components/ui/alert";
import Avatar from "@/components/dashboard/Avatar";
import { CheckboxField } from "@/components/primitives/form/CheckboxField";
import TextareaField from "@/components/primitives/form/TextareaField";

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

function CreateTaskPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = themes[theme];
  const router = useRouter();

  const { createTask } = useTask();

  // React Hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      assignedBy: user?.username,
      assignedTo: [],
      startDate: "",
      priority: "",
      status: "Not Started",
      dueDate: "",
      category: "",
      categoryMode: "select",
      progress: 0,
      tags: [],
      estimatedHours: "",
      attachments: [],
      notifyAssignees: true,
      recurring: false,
      recurringFrequency: "",
    },
  });
  const { organizationStaffs } = useUser();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Watch form values
  const assignedTo = useWatch({ control, name: "assignedTo" });
  const tags = useWatch({ control, name: "tags" });
  const recurring = useWatch({ control, name: "recurring" });
  const priority = useWatch({ control, name: "priority" });
  const category = useWatch({ control, name: "category" });
  const attachments = useWatch({ control, name: "attachments" }) || [];

  const handleAssigneeToggle = (employee: {
    id: string;
    name: string;
    avatar: string;
  }) => {
    const currentAssignees = assignedTo || [];

    const exists = currentAssignees.some((a) => a.id === employee.id);

    if (exists) {
      setValue(
        "assignedTo",
        currentAssignees.filter((a) => a.id !== employee.id),
      );
    } else {
      setValue("assignedTo", [...currentAssignees, employee]);
    }
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = tags || [];
    if (currentTags.includes(tag)) {
      setValue(
        "tags",
        currentTags.filter((t) => t !== tag),
      );
    } else {
      setValue("tags", [...currentTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !(tags || []).includes(customTag.trim())) {
      setValue("tags", [...(tags || []), customTag.trim()]);
      setCustomTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      "tags",
      (tags || []).filter((t) => t !== tag),
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const currentAttachments = getValues("attachments") || [];
      setValue("attachments", [...currentAttachments, ...newFiles]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const currentAttachments = getValues("attachments") || [];
    setValue(
      "attachments",
      currentAttachments.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      setSubmitError("");

      // Convert files to base64 strings
      const attachmentPromises = (data.attachments || []).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const attachmentBase64Strings = await Promise.all(attachmentPromises);

      const taskData = {
        title: data.title,
        description: data.description,
        assignedBy: data.assignedBy,
        assignedTo: data.assignedTo,
        startDate: data.startDate,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status,
        category: data.category,
        progress: data.progress,
        tags: data.tags,
        estimatedHours: data.estimatedHours,
        notifyAssignees: data.notifyAssignees,
        recurring: data.recurring,
        recurringFrequency: data.recurringFrequency,
        attachments: attachmentBase64Strings,
      };

      // Create task using context
      await createTask(taskData);

      setShowSuccessMessage(true);

      reset();

      // Redirect after 2 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        router.push("/dashboard/ceo/tasks");
      }, 2000);
    } catch (error) {
      // console.error("Error creating task:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to create task. Please try again.",
      );
    }
  };

  const handleSaveDraft = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const currentData = getValues();
    // console.log("Saving draft:", { ...currentData, attachments });
  };

  return (
    <DashboardLayout links={links}>
      <div className={`${colors.bg} ${colors.text} pt-4 px-4 sm:p-6`}>
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className={`${colors.textMuted} hover:${colors.text}`}
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            Back
          </Button>

          <Header
            title="Create New Task"
            subtitle="Fill in the details below to create a new task for your team"
            className="py-2 sm:py-2"
          />
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-4 sm:mb-6 bg-emerald-900/30 border border-emerald-800/50 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <CheckCircle2
              size={20}
              className="text-emerald-400 shrink-0 mt-0.5 sm:w-6 sm:h-6"
            />
            <div>
              <h3 className="font-semibold text-emerald-400 text-sm sm:text-base">
                Task Created Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300">
                Redirecting to tasks page...
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div
                className={`${colors.bgCard} rounded-lg p-4 sm:p-6`}
                style={{ boxShadow: colors.cardShadow }}
              >
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <FileText size={18} className="sm:w-5 sm:h-5" />
                  Basic Information
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {/* Task Title */}
                  <InputField
                    label="Task Title *"
                    type="text"
                    placeholder="Enter task title"
                    {...register("title")}
                    error={errors.title?.message}
                    className={`w-full text-sm border-0 ${colors.input} ${colors.bg}`}
                    labelClassName={`${colors.text}`}
                  />
                  {/* Description */}
                  <TextareaField
                    label="Description *"
                    placeholder="Provide a detailed description of the task"
                    {...register("description")}
                    error={errors.description?.message}
                    rows={4}
                    className={`w-full border-0 text-sm resize-none ${colors.input} ${colors.bg}`}
                    labelClassName={`${colors.text}`}
                  />
                  {/* Category */}
                  <Controller
                    name="categoryMode"
                    control={control}
                    render={({ field: modeField }) => (
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-6">
                            <SelectField
                              label="Category *"
                              placeholder="Select a category"
                              containerClassName={`sm:gap-2`}
                              selectClassName={`w-full border-0 text-sm ${colors.input} ${colors.bg}`}
                              options={[
                                ...categories.map((cat) => ({
                                  label: cat,
                                  value: cat,
                                })),
                                { label: "Other", value: "__other__" },
                              ]}
                              value={
                                modeField.value === "custom"
                                  ? "__other__"
                                  : field.value
                              }
                              onValueChange={(value) => {
                                if (value === "__other__") {
                                  modeField.onChange("custom");
                                  field.onChange("");
                                } else {
                                  modeField.onChange("select");
                                  field.onChange(value);
                                }
                              }}
                              error={errors.category?.message}
                            />

                            {modeField.value === "custom" && (
                              <InputField
                                type="text"
                                placeholder="Enter custom category"
                                className={`w-full text-sm border-0 ${colors.input} ${colors.bg}`}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                autoFocus
                              />
                            )}
                          </div>
                        )}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Assignment & Timeline */}
              <div
                className={`${colors.bgCard} rounded-lg p-4 sm:p-6`}
                style={{ boxShadow: colors.cardShadow }}
              >
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <Users size={18} className="sm:w-5 sm:h-5" />
                  Assignment & Timeline
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {/* Assign To */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Assign To <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Button
                        variant={"ghost"}
                        type="button"
                        onClick={() =>
                          setShowEmployeeDropdown(!showEmployeeDropdown)
                        }
                        className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm ${colors.input} ${colors.bg} ${theme === "light" ? "" : `border ${colors.hover}`} rounded-lg text-left flex items-center justify-between ${
                          errors.assignedTo ? "ring-2 ring-red-500" : ""
                        }`}
                      >
                        <span className="truncate">
                          {!assignedTo || assignedTo.length === 0
                            ? "Select employees"
                            : `${assignedTo.length} employee(s) selected`}
                        </span>
                        <Users size={18} className="shrink-0 sm:w-5 sm:h-5" />
                      </Button>

                      {showEmployeeDropdown && (
                        <>
                          <div
                            className="fixed inset-0 z-40 lg:hidden"
                            onClick={() => setShowEmployeeDropdown(false)}
                          />

                          <div
                            className={`fixed bottom-0 left-0 right-0 lg:relative z-50 lg:z-10 w-full mt-0 lg:mt-2 ${colors.bgCard} border ${colors.border} rounded-t-xl lg:rounded-lg shadow-lg max-h-80 overflow-y-auto`}
                          >
                            <div
                              className={`sticky top-0 lg:hidden flex items-center justify-between p-4 border-b ${colors.border} ${colors.bg}`}
                            >
                              <h3 className="font-semibold">
                                Select Employees
                              </h3>
                              <Button
                                size={"icon-xs"}
                                variant={"ghost"}
                                onClick={() => setShowEmployeeDropdown(false)}
                                className="p-1"
                              >
                                <X size={20} />
                              </Button>
                            </div>

                            {organizationStaffs.map((employee) => (
                              <label
                                key={employee._id}
                                className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 ${colors.hover} cursor-pointer`}
                              >
                                <CheckboxField
                                  id={employee._id}
                                  checked={assignedTo?.some(
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
                    {errors.assignedTo && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} className="sm:w-3 sm:h-3" />
                        {errors.assignedTo.message}
                      </p>
                    )}

                    {/* Selected Employees */}
                    {assignedTo && assignedTo.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        {assignedTo.map((employee) => (
                          <div
                            key={employee.id}
                            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 ${colors.bgSidebar} rounded-full`}
                            style={{ boxShadow: colors.cardShadow }}
                          >
                            <Avatar
                              avatar={employee.avatar}
                              name={employee?.name}
                              className="w-5 h-5 sm:w-6 sm:h-6 p-1"
                            />

                            <span className="text-xs sm:text-sm truncate max-w-24 sm:max-w-none">
                              {employee.name}
                            </span>

                            <Button
                              size="icon-xs"
                              variant={"ghost"}
                              type="button"
                              onClick={() => handleAssigneeToggle(employee)}
                              className="text-gray-400 shrink-0"
                            >
                              <X size={12} className="sm:w-3.5 sm:h-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Start Date */}
                    <InputField
                      label="Start Date *"
                      type="date"
                      {...register("startDate")}
                      error={errors.startDate?.message}
                      className={`w-full text-sm border-0 ${colors.input} ${colors.bg}`}
                      containerClassName="sm:gap-2"
                      labelClassName={`${colors.text}`}
                    />
                    {/* Due Date */}
                    <InputField
                      label="Due Date *"
                      type="date"
                      {...register("dueDate")}
                      error={errors.dueDate?.message}
                      className={`w-full text-sm border-0 ${colors.input} ${colors.bg}`}
                      containerClassName="sm:gap-2"
                      labelClassName={`${colors.text}`}
                    />{" "}
                  </div>

                  {/* Priority */}
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        label="Priority *"
                        containerClassName="sm:gap-2"
                        placeholder="Select priority"
                        selectClassName={`w-full border-0 text-sm ${colors.input} ${colors.bg}`}
                        options={[
                          // { label: "Select Priority", value: "Not set" },
                          { label: "Low", value: "Low" },
                          { label: "Medium", value: "Medium" },
                          { label: "High", value: "High" },
                        ]}
                        error={errors.priority?.message}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />

                  {/* Estimated Hours */}
                  {/* <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Estimated Hours (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        {...register("estimatedHours")}
                        placeholder="e.g., 8"
                        min="0"
                        step="0.5"
                        className={`w-full ${colors.bg} px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base ${colors.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <Clock
                        size={16}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${colors.textMuted} pointer-events-none sm:w-5 sm:h-5`}
                      />
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Tags & Attachments */}
              <div
                className={`${colors.bgCard} rounded-lg p-4 sm:p-6`}
                style={{ boxShadow: colors.cardShadow }}
              >
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                  <Tag size={18} className="sm:w-5 sm:h-5" />
                  Tags & Attachments
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {/* Tags */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      {predefinedTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border transition-colors ${
                            tags?.includes(tag)
                              ? "bg-blue-600 border-blue-500 text-white"
                              : `${colors.bgSidebar} ${colors.border}`
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Custom Tag Input */}
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
                        className={`text-sm border-0 ${colors.input} ${colors.bg}`}
                        containerClassName="flex-1"
                      />
                      <Button
                        variant={theme === "light" ? "default" : "ghost"}
                        type="button"
                        onClick={handleAddCustomTag}
                        className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`} shrink-0`}
                      >
                        <Plus size={18} className="sm:w-5 sm:h-5" />
                      </Button>
                    </div>

                    {/* Selected Tags */}
                    {tags && tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        {tags.map((tag) => (
                          <div
                            key={tag}
                            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 bg-blue-600/20 border border-blue-500/30 rounded-full`}
                          >
                            <span className="text-xs sm:text-sm">{tag}</span>
                            <Button
                              variant="ghost"
                              size="xs"
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="text-gray-400 shrink-0 py-0"
                            >
                              <X size={12} className="sm:w-3.5 sm:h-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Attachments */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Attachments
                    </label>
                    <div
                      className={`border-2 border-dashed ${colors.border} rounded-lg p-4 sm:p-6 text-center ${colors.hover} transition-colors`}
                    >
                      <InputField
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2"
                      >
                        <Upload
                          size={24}
                          className={`${colors.textMuted} sm:w-8 sm:h-8`}
                        />
                        <div>
                          <p className="font-medium text-sm sm:text-base">
                            Click to upload files
                          </p>
                          <p
                            className={`text-xs sm:text-sm ${colors.textMuted}`}
                          >
                            or drag and drop
                          </p>
                        </div>
                        <p className={`text-xs ${colors.textMuted}`}>
                          PDF, DOC, XLS, PNG, JPG (max 10MB)
                        </p>
                      </label>
                    </div>

                    {/* Uploaded Files */}
                    {attachments.length > 0 && (
                      <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                        {attachments.map((file, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between px-3 sm:px-4 py-2 ${colors.bgSidebar} border ${colors.border} rounded-lg`}
                          >
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                              <Paperclip
                                size={14}
                                className={`${colors.textMuted} shrink-0 sm:w-4 sm:h-4`}
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-medium truncate">
                                  {file.name}
                                </p>
                                <p className={`text-xs ${colors.textMuted}`}>
                                  {(file.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() => handleRemoveAttachment(index)}
                              className="text-gray-400 shrink-0 ml-2"
                            >
                              <X size={14} className="sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div
                className={`lg:hidden space-y-2 sm:space-y-3 sticky bottom-0 p-4 -mx-4 border-t ${colors.border} ${colors.bg} z-10`}
              >
                <Button
                  variant={theme === "light" ? "default" : "ghost"}
                  type="submit"
                  disabled={isSubmitting}
                  className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`} w-full px-4 py-2.5 sm:py-3`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} className="sm:w-5 sm:h-5" />
                      Create Task
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "ghost"}
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                    className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`} w-full px-4 py-2.5 sm:py-3`}
                  >
                    Save Draft
                  </Button>

                  <Button
                    variant={theme === "light" ? "default" : "ghost"}
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`} w-full px-4 py-2.5 sm:py-3`}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block space-y-6 sticky top-6 self-start">
              {/* Additional Options */}
              <div
                className={`${colors.bgCard} rounded-lg p-6`}
                style={{ boxShadow: colors.cardShadow }}
              >
                <h2 className="text-lg font-semibold mb-4">Options</h2>

                <div className="space-y-4">
                  {/* Notify Assignees */}
                  <Controller
                    name="notifyAssignees"
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        id="notifyAssignees"
                        label="Notify Assignees"
                        subLabel="Send email notification to assigned employees"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />

                  {/* Recurring Task */}
                  <Controller
                    name="recurring"
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        id="recurring"
                        label="Recurring Task"
                        subLabel="Repeat this task automatically"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />

                  {/* Recurring Frequency */}
                  {recurring && (
                    <Controller
                      control={control}
                      name="recurringFrequency"
                      render={({ field }) => (
                        <SelectField
                          label="Frequency *"
                          placeholder="Select Frequency"
                          value={field.value}
                          onValueChange={field.onChange}
                          containerClassName="sm:gap-2"
                          selectClassName={`w-full border-0 text-sm ${colors.input}`}
                          options={[
                            { label: "Daily", value: "daily" },
                            { label: "Weekly", value: "weekly" },
                            { label: "Monthly", value: "monthly" },
                          ]}
                          error={errors.recurringFrequency?.message}
                        />
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Preview Summary */}
              <div
                className={`${colors.bgCard} rounded-lg p-6`}
                style={{ boxShadow: colors.cardShadow }}
              >
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className={colors.textMuted}>Assignees:</span>
                    <span className="font-medium">
                      {assignedTo?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textMuted}>Tags:</span>
                    <span className="font-medium">{tags?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textMuted}>Attachments:</span>
                    <span className="font-medium">
                      {attachments.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textMuted}>Priority:</span>
                    {/* <span className="font-medium">
                      {watch("priority") || "Not set"}
                    </span> */}
                    <span className="font-medium">{priority || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textMuted}>Category:</span>
                    {/* <span className="font-medium">
                      {watch("category") || "Not set"}
                    </span> */}
                    <span className="font-medium">{category || "Not set"}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant={theme === "light" ? "default" : "ghost"}
                  type="submit"
                  disabled={isSubmitting}
                  className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`} w-full px-4 py-3`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      Create Task
                    </>
                  )}
                </Button>

                <Button
                  variant={theme === "light" ? "default" : "ghost"}
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`} w-full px-4 py-3`}
                >
                  Save as Draft
                </Button>

                <Button
                  variant={theme === "light" ? "default" : "ghost"}
                  type="button"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className={`${theme === "light" ? "" : `border ${colors.border} ${colors.hover}`} w-full px-4 py-3`}
                >
                  Cancel
                </Button>
              </div>

              {/* Error Message */}
              {submitError && (
                <Alert
                  variant="danger"
                  title="Something went wrong"
                  description="We couldn’t complete your request right now. Please try again in a moment."
                  dismissible={false}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
export default withAuth(CreateTaskPage, { role: "ceo" });
