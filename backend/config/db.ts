import mongoose from "mongoose";

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
            .then(() => console.log("MongoDB connected"));
    } catch (error) {
        let errorMessage = "Error connecting to MongoDB";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log(errorMessage);
        process.exit(1);
    }
};

export default db;
