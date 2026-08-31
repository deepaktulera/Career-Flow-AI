import express from 'express'
import { deleteUser, showUser, showUsers, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { changePassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/" , showUsers)
router.get("/:id" , verifyToken , showUser)
router.patch("/:id" , verifyToken , updateUser)
router.patch("/change-password", verifyToken, changePassword);
router.delete("/:id" , verifyToken ,  deleteUser)

export default router