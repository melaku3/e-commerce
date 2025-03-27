import app from "./app";
import mongoose from "mongoose";
import db from "./config/db";

// Connect to MongoDB
db();

const PORT = process.env.PORT || 3500;

// Start the server
mongoose.connection.once('open', () => app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`)));
