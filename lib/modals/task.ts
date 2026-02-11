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
      enum: [
        "Not Started",
        "In Progress",
        "Pending Review",
        "Overdue",
        "Completed",
      ],
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

// // ✨ MIDDLEWARE: Update user counts when task is created
// taskSchema.post("save", async function (doc) {
//   try {
//     // Import User model dynamically to avoid circular dependency
//     const User = models.User || model("User");

//     const assigneeIds = doc.assignedTo.map(
//       (assignee: { id: string }) => assignee.id,
//     );

//     await User.updateMany(
//       { _id: { $in: assigneeIds } },
//       { $inc: { tasksAssigned: 1 } },
//     );

//     console.log(
//       `✅ [Middleware] Incremented tasksAssigned for ${assigneeIds.length} users`,
//     );
//   } catch (error) {
//     console.error("❌ [Middleware] Error updating user counts on save:", error);
//   }
// });

// // ✨ MIDDLEWARE: Update user counts when task is deleted (single)
// taskSchema.pre("findOneAndDelete", async function () {
//   try {
//     const User = models.User || model("User");

//     // Get the task being deleted
//     const task = await this.model.findOne(this.getFilter());

//     if (task) {
//       const assigneeIds = task.assignedTo.map(
//         (assignee: { id: string }) => assignee.id,
//       );

//       // Decrement tasksAssigned
//       await User.updateMany(
//         { _id: { $in: assigneeIds } },
//         { $inc: { tasksAssigned: -1 } },
//       );

//       // If task was completed, also decrement tasksCompleted
//       if (task.status === "Completed") {
//         await User.updateMany(
//           { _id: { $in: assigneeIds } },
//           { $inc: { tasksCompleted: -1 } },
//         );
//       }

//       console.log(
//         `✅ [Middleware] Updated user counts for ${assigneeIds.length} users on delete`,
//       );
//     }
//   } catch (error) {
//     console.error(
//       "❌ [Middleware] Error updating user counts on delete:",
//       error,
//     );
//   }
// });

// // ✨ MIDDLEWARE: Update user counts when tasks are deleted in bulk
// taskSchema.pre("deleteMany", async function () {
//   try {
//     const User = models.User || model("User");

//     // Get all tasks being deleted
//     const tasks = await this.model.find(this.getFilter());

//     if (tasks && tasks.length > 0) {
//       // Process each task
//       for (const task of tasks) {
//         const assigneeIds = task.assignedTo.map(
//           (assignee: { id: string }) => assignee.id,
//         );

//         // Decrement tasksAssigned
//         await User.updateMany(
//           { _id: { $in: assigneeIds } },
//           { $inc: { tasksAssigned: -1 } },
//         );

//         // If task was completed, also decrement tasksCompleted
//         if (task.status === "Completed") {
//           await User.updateMany(
//             { _id: { $in: assigneeIds } },
//             { $inc: { tasksCompleted: -1 } },
//           );
//         }
//       }

//       console.log(
//         `✅ [Middleware] Updated user counts for ${tasks.length} deleted tasks`,
//       );
//     }
//   } catch (error) {
//     console.error(
//       "❌ [Middleware] Error updating user counts on bulk delete:",
//       error,
//     );
//   }
// });

// // ✨ MIDDLEWARE: Update user counts when task status changes
// taskSchema.pre("findOneAndUpdate", async function () {
//   try {
//     const User = models.User || model("User");

//     // Get the task before update
//     const oldTask = await this.model.findOne(this.getFilter());

//     if (oldTask) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const update = this.getUpdate() as any;
//       const newStatus = update.$set?.status || update.status;

//       // Only process if status is changing
//       if (newStatus && newStatus !== oldTask.status) {
//         const assigneeIds = oldTask.assignedTo.map(
//           (assignee: { id: string }) => assignee.id,
//         );

//         const wasCompleted = oldTask.status === "Completed";
//         const isNowCompleted = newStatus === "Completed";

//         // Status changed TO "Completed"
//         if (!wasCompleted && isNowCompleted) {
//           await User.updateMany(
//             { _id: { $in: assigneeIds } },
//             { $inc: { tasksCompleted: 1 } },
//           );
//           console.log(
//             `✅ [Middleware] Incremented tasksCompleted for ${assigneeIds.length} users`,
//           );
//         }

//         // Status changed FROM "Completed" to something else
//         if (wasCompleted && !isNowCompleted) {
//           await User.updateMany(
//             { _id: { $in: assigneeIds } },
//             { $inc: { tasksCompleted: -1 } },
//           );
//           console.log(
//             `✅ [Middleware] Decremented tasksCompleted for ${assigneeIds.length} users`,
//           );
//         }
//       }
//     }
//   } catch (error) {
//     console.error(
//       "❌ [Middleware] Error updating user counts on update:",
//       error,
//     );
//   }
// });

const Task = models.Task || model("Task", taskSchema);

export default Task;
