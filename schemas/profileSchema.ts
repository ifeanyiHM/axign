import * as z from "zod";

// Profile Schema
export const profileSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  userActiveStatus: z.enum(["active", "inactive", "onleave"]),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  avatar: z.string().url("Invalid image URL").optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export interface FullProfile extends ProfileFormData {
  _id: string;
  createdAt?: string;
  companyName?: string;
  userStatus?: string;
  tasksAssigned?: number;
  tasksCompleted?: number;
  performanceRating?: number;
}
