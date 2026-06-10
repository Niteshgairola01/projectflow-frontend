import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be atleast 2 characters")
    .max(50, "Name exceeds characters limit"),

  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z.string().trim().min(8, "Password must be atleast 8 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
