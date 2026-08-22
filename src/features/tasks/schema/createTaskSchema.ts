import z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(200, "Task title cannot exceed 200 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),

  assignedTo: z.string().optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),

  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),

  dueDate: z.date().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskPayload = z.infer<typeof createTaskSchema>;

export type UpdateTaskPayload = z.infer<typeof updateTaskSchema>;
