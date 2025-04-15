import mongoose from "mongoose";
import { IOrderItem } from "../../utils/types";

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
})


const orderItemModel = mongoose.models.OrderItem || mongoose.model<IOrderItem>("orderItem", orderItemSchema);
export default orderItemModel;


