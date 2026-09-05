import z from "zod";

export const updateWorkspaceMemberRoleSchema = z.object({
  role: z.enum(["ADMIN", "MEMBER"], "Select a valid role"),
});

export type UpdateWorkspaceMemberRolePayload = z.infer<
  typeof updateWorkspaceMemberRoleSchema
>;
