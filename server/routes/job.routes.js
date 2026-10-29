import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import { applyToJob, createJob, deleteJob, getJob, jobApplicants, listJobs, myJobs, updateApplicantStatus, updateJob } from "../controllers/job.controller.js";

const router = express.Router();
router.get("/", listJobs);
router.get("/mine", verifyToken, requireRole("recruiter"), myJobs);
router.post("/", verifyToken, requireRole("recruiter"), createJob);
router.get("/:id/applicants", verifyToken, requireRole("recruiter"), jobApplicants);
router.patch("/applications/:applicationId/status", verifyToken, requireRole("recruiter"), updateApplicantStatus);
router.post("/:id/apply", verifyToken, requireRole("jobSeeker"), applyToJob);
router.get("/:id", getJob);
router.patch("/:id", verifyToken, requireRole("recruiter"), updateJob);
router.delete("/:id", verifyToken, requireRole("recruiter"), deleteJob);
export default router;
