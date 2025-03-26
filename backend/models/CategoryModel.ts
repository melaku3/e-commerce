import mongoose from "mongoose";
import { ICategory } from "../utils/types";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
}, { timestamps: true });

const categoryModel = mongoose.models.category || mongoose.model<ICategory>("category", categorySchema);
export default categoryModel;
