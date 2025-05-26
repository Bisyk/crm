import { z } from "zod";

export const signupSchema = z.object({
  shopName: z.string().min(2, "Shop name must be at least 2 characters long"),
  firstName: z.string().min(2, "Name must be at least 2 characters long"),
  lastName: z.string().min(2, "Surname must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters long"),
});

export type SignupFormInputs = z.infer<typeof signupSchema>;
