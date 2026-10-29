import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import JobApplication from "../models/JobApplicationModel.js";
import Resume from "../models/ResumeModel.js";

const allowedJobFields = ["company", "title", "description", "requirements", "skills", "location", "workType", "employmentType", "salaryMin", "salaryMax", "applicationUrl", "status", "expiresAt"];

export async function listJobs(req, res) {
    try {
        const { search = "", location = "", workType = "", employmentType = "" } = req.query;
        const filter = { status: "published" };
        if (location.trim()) filter.location = { $regex: location.trim(), $options: "i" };
        if (["onsite", "hybrid", "remote"].includes(workType)) filter.workType = workType;
        if (["full-time", "part-time", "contract", "internship"].includes(employmentType)) filter.employmentType = employmentType;
        if (search.trim()) {
            const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filter.$or = [
                { title: { $regex: safeSearch, $options: "i" } },
                { company: { $regex: safeSearch, $options: "i" } },
                { description: { $regex: safeSearch, $options: "i" } },
                { skills: { $regex: safeSearch, $options: "i" } }
            ];
        }
        const jobs = await Job.find(filter).populate("recruiter", "name").sort({ createdAt: -1 }).limit(100);
        return res.status(200).json({ jobs });
    } catch (error) {
        console.error("listJobs:", error);
        return res.status(500).json({ message: "Failed to fetch jobs." });
    }
}

export async function getJob(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid job ID." });
        const job = await Job.findOne({ _id: req.params.id, status: "published" }).populate("recruiter", "name");
        if (!job) return res.status(404).json({ message: "Job not found or no longer available." });
        return res.json({ job });
    } catch (error) {
        console.error("getJob:", error);
        return res.status(500).json({ message: "Failed to fetch job." });
    }
}

export async function createJob(req, res) {
    try {
        const { company, title, description, location } = req.body;
        if (![company, title, description, location].every((v) => typeof v === "string" && v.trim())) {
            return res.status(400).json({ message: "Company, job title, description, and location are required." });
        }
        const data = { recruiter: req.user.id };
        for (const field of allowedJobFields) if (req.body[field] !== undefined) data[field] = req.body[field];
        data.company = company.trim(); data.title = title.trim(); data.description = description.trim(); data.location = location.trim();
        if (Number(data.salaryMin || 0) > Number(data.salaryMax || 0) && data.salaryMax !== undefined) {
            return res.status(400).json({ message: "Maximum salary must be greater than or equal to minimum salary." });
        }
        const job = await Job.create(data);
        return res.status(201).json({ message: "Job published successfully.", job });
    } catch (error) {
        console.error("createJob:", error);
        return res.status(400).json({ message: error.message || "Failed to publish job." });
    }
}

export async function myJobs(req, res) {
    try {
        const jobs = await Job.find({ recruiter: req.user.id }).sort({ createdAt: -1 });
        return res.json({ jobs });
    } catch (error) {
        console.error("myJobs:", error);
        return res.status(500).json({ message: "Failed to fetch your jobs." });
    }
}

export async function updateJob(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid job ID." });
        const updates = {};
        for (const field of allowedJobFields) if (req.body[field] !== undefined) updates[field] = req.body[field];
        if (!Object.keys(updates).length) return res.status(400).json({ message: "No changes provided." });
        const job = await Job.findOneAndUpdate({ _id: req.params.id, recruiter: req.user.id }, { $set: updates }, { new: true, runValidators: true });
        if (!job) return res.status(404).json({ message: "Job not found or you do not own it." });
        return res.json({ message: "Job updated successfully.", job });
    } catch (error) {
        console.error("updateJob:", error);
        return res.status(400).json({ message: error.message || "Failed to update job." });
    }
}

export async function deleteJob(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid job ID." });
        const job = await Job.findOneAndUpdate({ _id: req.params.id, recruiter: req.user.id }, { status: "closed" }, { new: true });
        if (!job) return res.status(404).json({ message: "Job not found or you do not own it." });
        return res.json({ message: "Job closed successfully.", job });
    } catch (error) {
        console.error("deleteJob:", error);
        return res.status(500).json({ message: "Failed to close job." });
    }
}

export async function jobApplicants(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid job ID." });
        const job = await Job.findOne({ _id: req.params.id, recruiter: req.user.id });
        if (!job) return res.status(404).json({ message: "Job not found or you do not own it." });
        const applications = await JobApplication.find({ job: job._id }).populate("user", "name email profilePic").populate("resume", "title template personalInfo careerGoal skills education experience projects").sort({ createdAt: -1 });
        return res.json({ job, applications });
    } catch (error) {
        console.error("jobApplicants:", error);
        return res.status(500).json({ message: "Failed to fetch applicants." });
    }
}

export async function updateApplicantStatus(req, res) {
    try {
        const { status } = req.body;
        if (!["applied", "interview", "rejected", "selected", "offer"].includes(status)) return res.status(400).json({ message: "Invalid application status." });
        const application = await JobApplication.findById(req.params.applicationId).populate("job");
        if (!application || !application.job || String(application.job.recruiter) !== String(req.user.id)) {
            return res.status(404).json({ message: "Application not found for your job." });
        }
        application.status = status;
        await application.save();
        return res.json({ message: "Applicant status updated.", application });
    } catch (error) {
        console.error("updateApplicantStatus:", error);
        return res.status(500).json({ message: "Failed to update applicant status." });
    }
}

export async function applyToJob(req, res) {
    try {
        const { resumeId, notes = "" } = req.body;
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid job ID." });
        const job = await Job.findOne({ _id: req.params.id, status: "published" });
        if (!job) return res.status(404).json({ message: "This job is no longer available." });
        const existing = await JobApplication.findOne({ user: req.user.id, job: job._id });
        if (existing) return res.status(409).json({ message: "You have already applied to this job." });
        let resume = null;
        if (resumeId) {
            if (!mongoose.isValidObjectId(resumeId)) return res.status(400).json({ message: "Invalid resume ID." });
            resume = await Resume.findOne({ _id: resumeId, user: req.user.id });
            if (!resume) return res.status(404).json({ message: "Resume not found in your account." });
        }
        const application = await JobApplication.create({
            user: req.user.id, job: job._id, resume: resume?._id || null,
            company: job.company, jobTitle: job.title, jobUrl: job.applicationUrl || "", location: job.location,
            status: "applied", notes: String(notes).slice(0, 2000)
        });
        return res.status(201).json({ message: "Application submitted successfully.", application });
    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: "You have already applied to this job." });
        console.error("applyToJob:", error);
        return res.status(500).json({ message: "Failed to submit application." });
    }
}
