import z from "zod";

export const taskSchema = z
  .object({
    title: z.string().min(1, "Task title is required"),
    description: z.string().min(1, "Task description is required"),
    assignedTo: z
      .array(z.string())
      .min(1, "Please assign at least one employee"),
    dueDate: z
      .string()
      .min(1, "Due date is required")
      .refine(
        (date) => new Date(date) >= new Date(new Date().toDateString()),
        "Due date cannot be in the past",
      ),
    priority: z.string().min(1, "Please select a Priority"),
    category: z.string().min(1, "Please select a Category"),

    // 👇 FIXED
    tags: z.array(z.string()),
    estimatedHours: z.string().optional(),
    attachments: z.array(z.instanceof(File)),

    notifyAssignees: z.boolean(),
    recurring: z.boolean(),
    // recurringFrequency: z.enum(["daily", "weekly", "monthly"]).optional(),
    recurringFrequency: z
      .enum(["daily", "weekly", "monthly"])
      .or(z.literal("")),
  })

  // .refine((data) => !data.recurring || !!data.recurringFrequency, {
  //   path: ["recurringFrequency"],
  //   message: "Please select recurring frequency",
  // });
  .refine((data) => !data.recurring || data.recurringFrequency !== "", {
    path: ["recurringFrequency"],
    message: "Please select recurring frequency",
  });

export type TaskFormData = z.infer<typeof taskSchema>;

// import { z } from "zod";

// export const taskSchema = z
//   .object({
//     title: z.string().min(1, "Task title is required"),
//     description: z.string().min(1, "Task description is required"),
//     assignedTo: z
//       .array(z.string())
//       .min(1, "Please assign at least one employee"),
//     dueDate: z
//       .string()
//       .min(1, "Due date is required")
//       .refine(
//         (date) => new Date(date) >= new Date(new Date().toDateString()),
//         "Due date cannot be in the past",
//       ),
//     priority: z.string().min(1, "Priority is required"),
//     category: z.string().min(1, "Category is required"),
//     tags: z.array(z.string()).optional(),
//     estimatedHours: z.string().optional(),
//     attachments: z.array(z.instanceof(File)).optional(),
//     notifyAssignees: z.boolean(),
//     recurring: z.boolean(),
//     recurringFrequency: z.string().optional(),
//   })
//   .refine(
//     (data) => !data.recurring || (data.recurring && data.recurringFrequency),
//     {
//       path: ["recurringFrequency"],
//       message: "Please select recurring frequency",
//     },
//   );

// export type TaskFormData = z.infer<typeof taskSchema>;
