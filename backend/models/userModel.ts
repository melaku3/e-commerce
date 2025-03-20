import mongoose from "mongoose";
import { IUser } from "../utils/types";

const userSchema = new mongoose.Schema({
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model<IUser>("user", userSchema);
export default userModel;
