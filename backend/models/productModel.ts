import mongoose from "mongoose";
import { IProduct } from "../utils/types";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true, index: true },
    images: [{ type: String, required: true }],
    countInStock: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
    brand: { type: String },
    tags: [{ type: String }],
    size: [{ type: String }],
    color: [{ type: String }],
    discountPrice: { type: Number },
    discountStartDate: { type: Date },
    discountEndDate: { type: Date },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review", index: true }],
}, { timestamps: true });

productSchema.path("discountPrice").validate(function (value: number) {
    if (value && value >= this.price) {
        throw new Error('Discount price must be less than the regular price');
    }
    return true;
});

productSchema.methods.isDiscounted = function () {
    const currentDate = new Date();
    return this.discountPrice && this.discountStartDate && this.discountEndDate && this.discountPrice < this.price && this.discountStartDate <= currentDate && this.discountEndDate >= currentDate;
};

productSchema.index({ name: 1, category: 1 });

const productModel = mongoose.models.product || mongoose.model<IProduct>("product", productSchema);
export default productModel;