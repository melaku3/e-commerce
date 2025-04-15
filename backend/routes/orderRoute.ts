import express from 'express';
import { createOrder } from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.route('/')
    .post(createOrder)

export default orderRouter;
