import z from "zod";
import { TASK_PRIORITIES, TASK_STATUSES } from "../constants/taskOptions";

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

  status: z.enum(Object.values(TASK_STATUSES)).optional(),

  priority: z.enum(Object.values(TASK_PRIORITIES)).optional(),

  dueDate: z.string().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskPayload = z.infer<typeof createTaskSchema>;

export type UpdateTaskPayload = z.infer<typeof updateTaskSchema>;
