import z from "zod";

export const updateProjectMemberRoleSchema = z.object({
  role: z.enum(["PROJECT_ADMIN", "MEMBER"]),
});

export type UpdateProjectMemberRolePayload = z.infer<
  typeof updateProjectMemberRoleSchema
>;
