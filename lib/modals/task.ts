import { Schema, model, models } from "mongoose";

const assigneeSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "" },
  },
  { _id: false },
);

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedBy: { type: String, required: true },
    assignedTo: {
      type: [assigneeSchema],
      required: true,
      validate: {
        validator: (arr: unknown[]) => arr.length > 0,
        message: "At least one assignee is required",
      },
    },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Pending Review", "Completed"],
      default: "Not Started",
      required: true,
    },
    category: { type: String, required: true },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    estimatedHours: { type: Number },
    hoursLogged: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    attachments: { type: [String], default: [] },
    notifyAssignees: { type: Boolean, default: true },
    recurring: { type: Boolean, default: false },
    recurringFrequency: {
      type: String,
      enum: ["", "daily", "weekly", "monthly"],
      default: "",
    },
    // Organization references
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    organizationName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Create indexes for better query performance
taskSchema.index({ organizationId: 1, status: 1 });
taskSchema.index({ organizationId: 1, dueDate: 1 });
taskSchema.index({ "assignedTo.id": 1 });

const Task = models.Task || model("Task", taskSchema);

export default Task;
