import userModel from "../models/userModel";
import productModel from "../models/productModel";
import orderModel from "../models/order/orderModel";
import orderItemModel from "../models/order/orderItemModel";
import shippingAddressModel from "../models/order/ShippingAddressModel";
import expressAsyncHandler from "express-async-handler";
import { orderSchema } from "../utils/validation";

// @desc    Get all orders for a user
// @route   GET /api/v1/orders
// @access  Private
export const getOrders = expressAsyncHandler(async (req, res) => {
    const { userId } = req;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const orders = await orderModel.find({ userId }).populate('orderItems').populate('shippingAddress').sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
        res.status(404).json({ message: "No orders found" });
        return;
    }
    res.status(200).json(orders);
})


// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
export const getOrder = expressAsyncHandler(async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const order = await orderModel.findById(id).populate('orderItems').populate('shippingAddress');
    if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
    }
    res.status(200).json(order);
})

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
export const createOrder = expressAsyncHandler(async (req, res) => {
    const { userId } = req;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const body = req.body;
    body.userId = userId;
    const validate = orderSchema.safeParse(body);

    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    // check user before creating order
    const isUser = await userModel.findOne({ clerkUserId: validate.data.userId }).select('-password -__v');
    if (!isUser) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    // check upcoming orderItems with their productId 
    const validOrderItems = validate.data.orderItems.filter((item): item is NonNullable<typeof item> => item !== undefined);
    const isOrderItemsDup = validOrderItems.some((item, index) =>
        validOrderItems.findIndex(i => i.productId === item.productId) !== index
    );

    if (isOrderItemsDup) {
        res.status(400).json({ message: "Duplicate order items found" });
        return;
    }

    // check orderItems[i].productId is in productModel 
    const orderItems = await Promise.all(validate.data.orderItems.map(async (item) => {
        const product = await productModel.findById(item.productId);
        if (!product) {
            res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            return;
        }
        if (product.countInStock < item.quantity) {
            res.status(400).json({ message: `Product ${item.name} is out of stock` });
            return;
        }

        // create orderItems
        const orderItem = await orderItemModel.create(item)

        return orderItem._id;
    }))


    // create shippingAddress
    const shippingAddress = await shippingAddressModel.create(validate.data.shippingAddress)

    // check if shippingAddress is created successfully
    if (!shippingAddress) {
        res.status(400).json({ message: "Shipping address not created" });
        return;
    }

    // create order
    validate.data.shippingAddress = shippingAddress._id;
    validate.data.orderItems = orderItems;
    console.log(validate.data)

    const order = await orderModel.create(validate.data)

    res.status(201).json({ message: "Order created successfully", order: order._id, shippingAddress: shippingAddress._id, orderItems: orderItems });
})



