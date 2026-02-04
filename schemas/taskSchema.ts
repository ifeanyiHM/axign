import z from "zod";

export const taskSchema = z
  .object({
    title: z.string().min(1, "Task title is required"),
    description: z.string().min(1, "Task description is required"),
    assignedBy: z.string().min(1, "Assigner is required"),
    assignedTo: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          avatar: z.string(),
        }),
      )
      .min(1, "Please assign at least one employee"),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .refine(
        (date) => new Date(date) >= new Date(new Date().toDateString()),
        "Start date cannot be in the past",
      ),
    dueDate: z
      .string()
      .min(1, "Due date is required")
      .refine(
        (date) => new Date(date) >= new Date(new Date().toDateString()),
        "Due date cannot be in the past",
      ),
    priority: z.string().min(1, "Please select a Priority"),
    status: z.string().min(1, "Status is required"),
    progress: z
      .number()
      .min(0, "Progress cannot be less than 0%")
      .max(100, "Progress cannot be more than 100%"),

    category: z.string().min(1, "Please select or enter a category"),
    categoryMode: z.enum(["select", "custom"]),

    // 👇 FIXED
    tags: z.array(z.string()),
    estimatedHours: z.string().optional(),
    attachments: z.array(z.instanceof(File)),

    notifyAssignees: z.boolean(),
    recurring: z.boolean(),
    recurringFrequency: z
      .enum(["daily", "weekly", "monthly"])
      .or(z.literal("")),
  })
  .refine((data) => !data.recurring || data.recurringFrequency !== "", {
    path: ["recurringFrequency"],
    message: "Please select recurring frequency",
  });

export type TaskFormData = z.infer<typeof taskSchema>;
