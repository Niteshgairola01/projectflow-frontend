import z from "zod";

export const createWorkspaceSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Name must be atleast 2 character")
})