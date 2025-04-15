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

export interface IOrderItem {
    productId: mongoose.Schema.Types.ObjectId;
    name: string;
    quantity: number;
    image: string;
    price: number;
}

export interface IShippingAddress {
    fullName: string;
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
}

export interface IOrder extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    orderItems: mongoose.Schema.Types.ObjectId[];
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
    createdAt?: Date;
    updatedAt?: Date;
}
