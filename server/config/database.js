import mongoose from "mongoose";

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/CareerFlow");
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDatabase;