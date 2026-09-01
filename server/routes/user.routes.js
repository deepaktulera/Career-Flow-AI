import express from "express";

import { deleteUser, showUser, showUsers, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { changePassword } from "../controllers/auth.controller.js";

const router = express.Router();

// Get all users
router.get("/", verifyToken, showUsers);

// Change password
router.patch( "/change-password", verifyToken, changePassword );

// Get single user
router.get( "/:id", verifyToken, showUser );

// Update user profile
router.patch( "/:id", verifyToken, updateUser );

// Delete user
router.delete( "/:id", verifyToken, deleteUser );

export default router;