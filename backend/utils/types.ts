import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    clerkUserId: string;
    email: string;
    role: "admin" | "user";
}