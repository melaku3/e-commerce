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

export const orderSchema = z.object({
    orderItems: z.array(z.object({
        name: z.string().min(3, { message: "Product name must be at least 3 characters long." }).max(255, { message: "Product name must not exceed 255 characters." }),
        image: z.string().url({ message: "Invalid image URL format." }),
        price: z.number().min(0, { message: "Price must be a positive number." }),
        quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
        productId: z.string().length(24, { message: "Product ID must be exactly 24 characters long." })
    })),
    shippingAddress: z.object({
        fullName: z.string().min(3, { message: "Full name must be at least 3 characters long." }).max(255, { message: "Full name must not exceed 255 characters." }),
        street: z.string().min(3, { message: "Street address must be at least 3 characters long." }).max(255, { message: "Street address must not exceed 255 characters." }),
        city: z.string().min(3, { message: "City must be at least 3 characters long." }).max(255, { message: "City must not exceed 255 characters." }),
        region: z.string().min(3, { message: "Region must be at least 3 characters long." }).max(255, { message: "Region must not exceed 255 characters." }),
        postalCode: z.string().min(3, { message: "Postal code must be at least 3 characters long." }).max(255, { message: "Postal code must not exceed 255 characters." }),
        country: z.string().min(3, { message: "Country must be at least 3 characters long." }).max(255, { message: "Country must not exceed 255 characters." })
    }),
    userId: z.string().length(24, { message: "User ID must be exactly 24 characters long." }),
    paymentMethod: z.string().min(3, { message: "Payment method must be at least 3 characters long." }).max(255, { message: "Payment method must not exceed 255 characters." }),
    itemsPrice: z.number().min(0, { message: "Items price must be a positive number." }),
    shippingPrice: z.number().min(0, { message: "Shipping price must be a positive number." }),
    taxPrice: z.number().min(0, { message: "Tax price must be a positive number." }),
    totalPrice: z.number().min(0, { message: "Total price must be a positive number." }),
    isPaid: z.boolean().optional(),
    paidAt: z.date().optional(),
    isDelivered: z.boolean().optional(),
    deliveredAt: z.date().optional(),
    status: z.enum(["pending", "shipped", "delivered", "cancelled"], { message: "Status must be one of 'pending', 'shipped', 'delivered', or 'cancelled'." }).optional().default("pending")
})
    .refine(data => data.itemsPrice + data.taxPrice + data.shippingPrice === data.totalPrice, { message: "Total price must be equal to the sum of items price, tax price, and shipping price." })
    .refine(data => data.orderItems.length > 0, { message: "Order items cannot be empty." })
    .refine(data => data.shippingAddress.fullName.trim() !== "", { message: "Full name cannot be empty." })
    .refine(data => data.shippingAddress.street.trim() !== "", { message: "Street address cannot be empty." })
    .refine(data => data.shippingAddress.city.trim() !== "", { message: "City cannot be empty." })
    .refine(data => data.shippingAddress.region.trim() !== "", { message: "Region cannot be empty." })
    .refine(data => data.shippingAddress.postalCode.trim() !== "", { message: "Postal code cannot be empty." })
    .refine(data => data.shippingAddress.country.trim() !== "", { message: "Country cannot be empty." })
    .refine(data => data.paymentMethod.trim() !== "", { message: "Payment method cannot be empty." });
