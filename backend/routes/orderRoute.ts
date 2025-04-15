import express from 'express';
import { createOrder, getOrders, getOrder } from '../controllers/orderController';
import { requireAuth } from '../middlewares/requireAuth';

const orderRouter = express.Router();

orderRouter.route('/')
    .get(requireAuth, getOrders)
    .post(requireAuth, createOrder)

orderRouter.route('/:id')
    .get(requireAuth, getOrder)


export default orderRouter;
