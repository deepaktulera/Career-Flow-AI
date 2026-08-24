import express from "express";
import connectDatabase from "./config/database.js";
import authRoutes from './routes/auth.route.js'

const app = express();
connectDatabase()

//middlewares
app.use(express.json());
app.use("/auth" , authRoutes)

export default app;