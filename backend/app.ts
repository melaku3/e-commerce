import express from 'express';
import errorHandler from './middlewares/errorHandler';
import morgan from 'morgan';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';

// routes
import userRouter from './routes/userRoute';
import categoryRouter from './routes/categoryRoute';

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

// error handler
app.use(errorHandler);

export default app;
