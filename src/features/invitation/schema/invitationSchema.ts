import { z } from "zod";

export const createInvitationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export type CreateInvitationPayload = z.infer<typeof createInvitationSchema>;
