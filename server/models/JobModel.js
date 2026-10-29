import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    company: { type: String, required: true, trim: true, maxlength: 150 },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 12000 },
    requirements: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    location: { type: String, required: true, trim: true, maxlength: 150 },
    workType: { type: String, enum: ["onsite", "hybrid", "remote"], default: "onsite" },
    employmentType: { type: String, enum: ["full-time", "part-time", "contract", "internship"], default: "full-time" },
    salaryMin: { type: Number, min: 0 },
    salaryMax: { type: Number, min: 0 },
    applicationUrl: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["published", "closed"], default: "published", index: true },
    expiresAt: { type: Date }
}, { timestamps: true });

JobSchema.index({ title: "text", company: "text", description: "text", skills: "text" });
export default mongoose.model("Job", JobSchema);
