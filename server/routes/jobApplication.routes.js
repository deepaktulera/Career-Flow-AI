import express from 'express'
import { createApplication, deleteApplication, showApplication, updateApplication } from '../controllers/jobApplication.controller.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/" , verifyToken , showApplication)
router.post("/" , verifyToken ,  createApplication)
router.patch("/:id" , verifyToken, updateApplication)
router.delete("/:id" , verifyToken, deleteApplication)

export default router