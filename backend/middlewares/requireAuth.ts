import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include userId
declare global {
    namespace Express {
        interface Request { userId?: string }
    }
}
import expressAsyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";

export const requireAuth = expressAsyncHandler((req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    req.userId = userId;
    next();
});
