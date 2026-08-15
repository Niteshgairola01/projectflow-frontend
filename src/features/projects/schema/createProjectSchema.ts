import z from "zod";

export const createProjectSchema = z
  .object({
    name: z
      .string()
      .min(3, "Project name must be at least 3 characters")
      .max(100, "Project name cannot exceed 100 characters"),

    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),

    color: z.string().optional(),

    startDate: z.string().min(1, "Start date is required"),

    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.endDate) return true;

      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
