import mongoose from "mongoose";
import { IReview } from "../utils/types";

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", index: true, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String },
}, { timestamps: true });

const reviewModel = mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);
export default reviewModel;
