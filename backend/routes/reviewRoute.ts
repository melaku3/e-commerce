import express from "express";
import { getReviews, getReview, createReview, deleteReview, getReviewsByProductId } from "../controllers/reviewController";

const reviewRouter = express.Router();

reviewRouter.route('/')
    .get(getReviews)
    .post(createReview)

reviewRouter.route('/:id')
    .get(getReview)
    .delete(deleteReview)

reviewRouter.get('/product/:productId', getReviewsByProductId)

export default reviewRouter;

