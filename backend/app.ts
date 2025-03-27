import express from 'express';
import errorHandler from './middlewares/errorHandler';
import morgan from 'morgan';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import dotenv from 'dotenv';

// load environment variables
dotenv.config();

// routes
import userRouter from './routes/userRoute';
import categoryRouter from './routes/categoryRoute';
import productRouter from './routes/productRoute';

const app = express();

//  middlewares
app.use(clerkMiddleware());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

// api endpoints
app.get('/', (_req, res) => { res.json({ message: 'Hello World' }) });
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);

// error handler
app.use(errorHandler);

export default app;
