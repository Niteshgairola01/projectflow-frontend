import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(2, "Name must be atleast 2 character"),
  color: z.string().optional(),
});

export type CreateWorkspacePayload = z.infer<typeof createWorkspaceSchema>;
