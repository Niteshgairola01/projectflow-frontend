import z from "zod";

export const addProjectMemberSchema = z.object({
  userId: z.string().min(1, "Select a valid user"),
  role: z.enum(["PROJECT_ADMIN", "MEMBER"]),
});

export type AddProjectMemberPayload = z.infer<typeof addProjectMemberSchema>;
