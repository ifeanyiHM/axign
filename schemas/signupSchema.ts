import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    userStatus: z.enum(["ceo", "employee"]),
    organizationName: z.string().optional(),
    organizationId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.userStatus === "ceo" && !data.organizationName) {
      ctx.addIssue({
        path: ["organizationName"],
        message: "Organization name is required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.userStatus === "employee" && !data.organizationId) {
      ctx.addIssue({
        path: ["organizationId"],
        message: "Organization is required",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
