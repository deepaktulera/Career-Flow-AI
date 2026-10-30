import express from "express";
import connectDatabase from "./config/database.js";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import applicationRoutes from './routes/jobApplication.routes.js'
import jobRoutes from './routes/job.routes.js'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();
dotenv.config()
connectDatabase()

// Middleware and production-aware CORS configuration.
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        // Allow non-browser tools and configured frontend origins.
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", service: "CareerFlow AI API" });
});
app.use("/auth" , authRoutes)
app.use("/user" , userRoutes)
app.use("/resume" , resumeRoutes)
app.use("/application", applicationRoutes)
app.use("/jobs", jobRoutes)

export default app;