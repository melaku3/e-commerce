import app from "./app";
import mongoose from "mongoose";
import db from "./config/db";

// Connect to MongoDB
db();

const PORT = parseInt(process.env.PORT || "3500", 10);

// Start the server
mongoose.connection.once('open', () => app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`)));
mongoose.connection.on('error', (err) => console.error(`MongoDB connection error: ${err}`));
    