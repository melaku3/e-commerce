import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    clerkUserId: string;
    email: string;
    role: "admin" | "user";
}

export interface IReview extends mongoose.Document {
    productId: string;
    userId: string;
    rating: number;
    comment?: string;
}

export interface ICategory extends mongoose.Document {
    name: string;
    description: string;
}
export interface IProduct extends mongoose.Document {
    name: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    countInStock: number;
    rating: number;
    brand?: string;
    tags?: string[];
    size?: string[];
    color?: string[];
    discountPrice?: Number,
    discountStartDate?: Date,
    discountEndDate?: Date,
    reviews?: IReview[];
}