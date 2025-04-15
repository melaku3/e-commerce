import mongoose from "mongoose";
import { IShippingAddress } from "../../utils/types";

const shippingAddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
})

const shippingAddressModel = mongoose.models.ShippingAddress || mongoose.model<IShippingAddress>("shippingAddress", shippingAddressSchema);
export default shippingAddressModel;
