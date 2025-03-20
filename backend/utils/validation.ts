import { z } from 'zod';

// user schema
export const userSchema = z.object({
    clerkUserId: z.string().min(3, { message: "Clerk User ID must be at least 3 characters long." }).max(255, { message: "Clerk User ID must not exceed 255 characters." }),
    email: z.string().email({ message: "Invalid email address format." }),
    role: z.enum(["admin", "user"], { message: "Role must be either 'admin' or 'user'" }).optional()
});
