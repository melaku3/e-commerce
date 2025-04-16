import express from 'express';
import { cancelOrder, createOrder, getOrders, getOrder } from '../controllers/orderController';
import { requireAuth } from '../middlewares/requireAuth';

const orderRouter = express.Router();

orderRouter.route('/')
    .get(requireAuth, getOrders)
    .post(requireAuth, createOrder)

orderRouter.route('/:id')
    .get(requireAuth, getOrder)

orderRouter.patch('/:id/cancel', requireAuth, cancelOrder)

export default orderRouter;
