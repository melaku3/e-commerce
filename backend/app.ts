import express from 'express';
import errorHandler from './middlewares/errorHandler';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';

const app = express();

//  middlewares
app.use(clerkMiddleware());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.get('/', (req, res) => { res.json({ message: 'Hello World' }) });


// error handler
app.use(errorHandler);

export default app;
