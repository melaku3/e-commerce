import mongoose from "mongoose";
import { IReview } from "../utils/types";

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", index: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', index: true, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String },
}, { timestamps: true });

const reviewModel = mongoose.models.review || mongoose.model<IReview>("review", reviewSchema);
export default reviewModel;
