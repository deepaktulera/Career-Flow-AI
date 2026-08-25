import express from "express";
import connectDatabase from "./config/database.js";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.routes.js'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();
dotenv.config()
connectDatabase()

//middlewares
app.use(cors())
app.use(express.json());
app.use("/auth" , authRoutes)
app.use("/" , userRoutes)

export default app;