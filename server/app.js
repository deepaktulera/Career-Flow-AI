import express from "express";
import connectDatabase from "./config/database.js";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.routes.js'

const app = express();
connectDatabase()

//middlewares
app.use(express.json());
app.use("/auth" , authRoutes)
app.use("/" , userRoutes)

export default app;