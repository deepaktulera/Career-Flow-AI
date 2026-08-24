import express from 'express'
import { deleteUser, showUser, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verify.middleware.js';

const router = express.Router();

router.get("/:id" , verifyToken , showUser)
router.patch("/:id" , verifyToken , updateUser)
router.delete("/:id" , verifyToken ,  deleteUser)

export default router