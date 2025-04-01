import express from "express";
import { getReviews, getReview, createReview, deleteReview } from "../controllers/reviewController";

const reviewRouter = express.Router();

reviewRouter.route('/')
    .get(getReviews)
    .post(createReview)

reviewRouter.route('/:id')
    .get(getReview)
    .delete(deleteReview)


export default reviewRouter;

