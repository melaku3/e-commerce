import express from "express";
import { registerUser, checkUser } from "../controllers/userController";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.get("/check-user/:clerkUserId", checkUser);

export default userRouter;
