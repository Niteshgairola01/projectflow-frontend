import z from "zod";

export const editComentSchema = z.object({
  content: z
    .string()
    .min(2, "Comment must be atleast 2 characters")
    .max(5000, "Comment is too long"),
});

export type EditCommentPayload = z.infer<typeof editComentSchema>;
