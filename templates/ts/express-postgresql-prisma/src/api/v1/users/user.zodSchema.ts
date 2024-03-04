import * as z from "zod";

// Zod schema for creating a user
export const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6),
});
