import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    // Optional to preserve compatibility with older manually tracked applications.
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null, index: true },
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume", default: null },
    company: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    jobUrl: { type: String, trim: true, default: "" },
    location: { type: String, required: true, trim: true },
    status: { type: String, enum: ["applied", "interview", "rejected", "selected", "offer"], default: "applied" },
    appliedDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    followUpDate: { type: String, default: "" },
    notes: { type: String, trim: true, default: "" }
}, { timestamps: true });

JobApplicationSchema.index({ user: 1, job: 1 }, { unique: true, partialFilterExpression: { job: { $type: "objectId" } } });
export default mongoose.model("JobApplication", JobApplicationSchema);
