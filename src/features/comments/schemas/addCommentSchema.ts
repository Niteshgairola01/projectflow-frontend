import z from "zod";

export const createTaskSchema = z.object({
  content: z
    .string()
    .min(2, "Comment must be atleast 2 characters")
    .max(5000, "Comment is too long"),

  parentComment: z.string().optional(),
});

export type AddCommentPayload = z.infer<typeof createTaskSchema>;
