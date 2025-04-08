import reviewModel from "../models/ReviewModel";
import userModel from "../models/userModel";
import productModel from "../models/productModel";
import expressAsyncHandler from "express-async-handler";
import { reviewSchema } from "../utils/validation";

// @desc    Fetch all reviews
// @route   GET /api/v1/reviews
// @access  Public
export const getReviews = expressAsyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const reviews = await reviewModel.find().skip(skip).limit(limitNumber).populate("productId", "name slug price rating").select('-createdAt -updatedAt -__v');
    const totalReviews = await reviewModel.countDocuments();
    res.json({ page: pageNumber, totalPages: Math.ceil(totalReviews / limitNumber), totalReviews, reviews });
});

// @desc    Fetch single review
// @route   GET /api/v1/reviews/:id
// @access  Public
export const getReview = expressAsyncHandler(async (req, res) => {
    const validate = reviewSchema.partial().safeParse(req.params);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const review = await reviewModel.findById(validate.data.id).populate("productId", "name slug price rating").select('-createdAt -updatedAt -__v');
    if (!review) {
        res.status(404).json({ message: "Review not found" });
        return;
    }

    res.json(review)
})

// @docs Fetch reviews by productId
// @route GET /api/v1/reviews/product/:productId
// @access Public
export const getReviewsByProductId = expressAsyncHandler(async (req, res) => {
    const validate = reviewSchema.partial().safeParse(req.params);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const reviews = await reviewModel.find({ productId: validate.data.productId }).populate("productId", "_id name slug price rating").populate("userId", "_id name email").select('-__v');
    if (!reviews) {
        res.status(404).json({ message: "Reviews not found" });
        return;
    }

    res.json(reviews)
})

// @desc    Create review
// @route   POST /api/v1/reviews
// @access  Public
export const createReview = expressAsyncHandler(async (req, res) => {
    const validate = reviewSchema.safeParse(req.body);

    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const useExists = await userModel.findById(validate.data.userId);
    if (!useExists) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const productExits = await productModel.findById(validate.data.productId);
    if (!productExits) {
        res.status(404).json({ message: "Product not found" });
        return;
    }

    const reviewExists = await reviewModel.find({ userId: validate.data.userId });
    if (reviewExists.length > 0) {
        for (let review of reviewExists) {
            if (review.productId.toString() === validate.data.productId) {
                res.status(400).json({ message: "You have already reviewed this product" });
                return;
            }
        }
    }

    await reviewModel.create(validate.data);
    res.status(201).json({ message: "Review created" });

})

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Public
export const deleteReview = expressAsyncHandler(async (req, res) => {
    const validate = reviewSchema.partial().safeParse(req.params);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const product = await reviewModel.findById(validate.data.id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }

    await reviewModel.findByIdAndDelete(validate.data.id);
    res.json({ message: "Product deleted" });
})