// src/schemas/userSchema.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "title must be at least 2 characters"),
  description: z.string().min(10, "title must be at least 2 characters"),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status selected",
  }),
});

export const updateSchema = z.object({
  title: z.string().min(5, "title must be at least 2 characters"),
  description: z.string().min(10, "title must be at least 2 characters"),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status selected",
  }),
});

export const updateCompletedSchema = z.object({
  completed: z.boolean()
})

export type postFormData = z.infer<typeof postSchema>;
export type updateFormData = z.infer<typeof postSchema>;
export type updateCompletedFormData = z.infer<typeof updateCompletedSchema>;
