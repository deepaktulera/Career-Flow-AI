import express from "express";

import { createResume, deleteResume, showMyResumes, showResume, updateResume } from "../controllers/resume.controller.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createResume);
router.get("/" , verifyToken , showMyResumes)
router.get("/:id" , verifyToken , showResume);
router.patch("/:id" , verifyToken , updateResume);
router.delete("/:id" , verifyToken , deleteResume);

export default router;