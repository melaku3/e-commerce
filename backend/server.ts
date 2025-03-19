import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
import db from "./config/db";

// Load environment variables 
dotenv.config();

// Connect to MongoDB
db();

const PORT = process.env.PORT || 3500;

// Start the server
mongoose.connection.once('open', () => app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`)));
