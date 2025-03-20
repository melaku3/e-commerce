import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel";
import { userSchema } from "../utils/validation";

// @docs: Register a new user
// @route POST /api/v1/auth/register
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    body.role = body?.role?.toLowerCase();
    const validate = userSchema.safeParse(body);

    if (!validate.success) {
        const errMsg = validate.error.issues[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const userExists = await userModel.findOne({ $or: [{ clerkUserId: validate.data.clerkUserId }, { email: validate.data.email }] });
    if (userExists) {
        res.status(400).json({ message: "User already exists." });
        return;
    }


    await userModel.create(validate.data);
    res.status(201).json({ message: 'User registered successfully.' });
});

