import express from "express";

import { deleteUser, showUser, showUsers, updateProfilePicture, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { changePassword } from "../controllers/auth.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Get all users
router.get("/", verifyToken, showUsers);

// Change password
router.patch( "/change-password", verifyToken, changePassword);

// update user profile pic
router.patch("/profile-picture", verifyToken, upload.single("profilePic"), updateProfilePicture);

// Get single user
router.get( "/:id", verifyToken, showUser );

// Update user profile
router.patch( "/:id", verifyToken, updateUser );


// Delete user
router.delete( "/:id", verifyToken, deleteUser );

export default router;