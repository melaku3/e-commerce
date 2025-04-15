import mongoose from "mongoose";
import { IOrder } from "../../utils/types";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "orderItem", required: true }],
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "shippingAddress", required: true },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
}, { timestamps: true });

const orderModel = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
export default orderModel;
