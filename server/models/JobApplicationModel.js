import mongoose from "mongoose";

const JobSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },

        jobUrl: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["applied", "interview", "rejected", "selected", "offer"],
            default: "applied",
        },

        appliedDate: {
            type: String,
        },

        followUpDate: {
            type: String,
        },

        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const JobApplication = mongoose.model("JobApplication", JobSchema);

export default JobApplication;