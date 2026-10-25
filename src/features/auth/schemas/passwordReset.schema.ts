import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long")
      .refine(
        (value) => new TextEncoder().encode(value).length <= 72,
        "Password must be no more than 72 bytes",
      ),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
