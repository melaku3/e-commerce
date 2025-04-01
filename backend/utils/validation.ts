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

// product schema
export const productSchema = z.object({
    id: z.string().length(24, { message: "ID must be exactly 24 characters long." }).optional(),
    name: z.string().min(3, { message: "Product name must be at least 3 characters long." }).max(255, { message: "Product name must not exceed 255 characters." }).trim().toLowerCase(),
    slug: z.string().min(3, { message: "Product slug must be at least 3 characters long." }).max(255, { message: "Product slug must not exceed 255 characters." }).trim().toLowerCase(),
    description: z.string().min(3, { message: "Product description must be at least 3 characters long." }).max(255, { message: "Product description must not exceed 255 characters." }).trim(),
    price: z.number().min(0, { message: "Price must be a positive number." }),
    category: z.string().length(24, { message: "Category ID must be exactly 24 characters long." }),
    images: z.array(z.string().url({ message: "Invalid image URL format." })),
    countInStock: z.number().min(0, { message: "Count in stock must be a positive number." }),
    rating: z.number().min(0, { message: "Rating must be a number between 0 and 5." }).max(5, { message: "Rating must be a number between 0 and 5." }),
    brand: z.string().min(3, { message: "Brand name must be at least 3 characters long." }).max(255, { message: "Brand name must not exceed 255 characters." }).optional(),
    tags: z.array(z.string().max(255, { message: "Tag must not exceed 255 characters." })).optional(),
    size: z.array(z.string().max(255, { message: "Size must not exceed 255 characters." })).optional(),
    color: z.array(z.string().min(3, { message: "Color must be at least 3 characters long." }).max(255, { message: "Color must not exceed 255 characters." })).optional(),
    discountPrice: z.number().min(0, { message: "Discount price must be a positive number." }).optional(),
    discountStartDate: z.date().optional(),
    discountEndDate: z.date().optional(),
    reviews: z.array(z.string().length(24, { message: "Review ID must be exactly 24 characters long." })).optional()

});

// review schema
export const reviewSchema = z.object({
    id: z.string().length(24, { message: "Review ID must be exactly 24 characters long." }).optional(),
    productId: z.string().length(24, { message: "Product ID must be exactly 24 characters long." }),
    userId: z.string().length(24, { message: "User ID must be exactly 24 characters long." }),
    rating: z.number().min(0, { message: "Rating must be at least 0." }).max(5, { message: "Rating must not exceed 5." }),
    comment: z.string().max(1000, { message: "Comment must not exceed 1000 characters." }).optional()
});
