import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import expressAsyncHandler from "express-async-handler";


export const requireRole = (requiredRole: string) => expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req);

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return undefined;
    }

    const user = await clerkClient.users.getUser(userId);
    const role = user.publicMetadata.role;
    if (role !== requiredRole) {
        res.status(403).json({ message: "Forbidden: Insufficient role" });
        return undefined;
    }
    next();
});
