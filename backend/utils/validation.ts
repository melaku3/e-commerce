import { z } from 'zod';

// user schema
export const userSchema = z.object({
    clerkUserId: z.string().min(3, { message: "Clerk User ID must be at least 3 characters long." }).max(255, { message: "Clerk User ID must not exceed 255 characters." }),
    email: z.string().email({ message: "Invalid email address format." }).trim(),
    role: z.enum(["admin", "user"], { message: "Role must be either 'admin' or 'user'" }).optional()
});

// category schema
export const categorySchema = z.object({
    id: z.string().length(24, { message: "ID must be exactly 24 characters long." }).optional(),
    name: z.string().min(3, { message: "Category name must be at least 3 characters long." }).max(255, { message: "Category name must not exceed 255 characters." }),
    description: z.string().min(3, { message: "Category description must be at least 3 characters long." }).max(255, { message: "Category description must not exceed 255 characters." }).trim()
});