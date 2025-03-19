import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({ errorHandler: true, message: err.message });
}

export default errorHandler;
