import express from "express";
import { registerUser, checkUser, getUserByClerkId } from "../controllers/userController";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.get("/check-user/:clerkUserId", checkUser);
userRouter.get("/user/:clerkUserId", getUserByClerkId);

export default userRouter;
