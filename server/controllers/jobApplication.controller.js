
import JobApplication from "../models/JobApplicationModel.js";

export async function showApplication(req, res) {
    try {
        const application = await JobApplication.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Applications fetched successfully!",
            application,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!",
            error: error.message,
        });
    }
}

export async function createApplication(req, res) {
    try {
        const {
            company,
            jobTitle,
            jobUrl,
            location,
            status,
            appliedDate,
            followUpDate,
            notes,
        } = req.body;

        if (!company || !jobTitle || !jobUrl || !location) {
            return res.status(400).json({
                message: "Please provide all required details",
            });
        }

        const application = await JobApplication.create({
            user: req.user.id,
            company,
            jobTitle,
            jobUrl,
            location,
            status,
            appliedDate: appliedDate || new Date().toISOString().split("T")[0],
            followUpDate,
            notes,
        });

        return res.status(201).json({
            message: "Job application created successfully",
            application,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create job application",
            error: error.message,
        });
    }
}

export async function updateApplication(req, res) {
    try {
        const { id } = req.params;

        const allowedFields = [
            "company",
            "jobTitle",
            "jobUrl",
            "location",
            "status",
            "appliedDate",
            "followUpDate",
            "notes",
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "Please provide at least one field to update",
            });
        }

        const application = await JobApplication.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id,
            },
            { $set: updates },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!application) {
            return res.status(404).json({
                message: "Job application not found",
            });
        }

        return res.status(200).json({
            message: "Job application updated successfully",
            application,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update job application",
            error: error.message,
        });
    }
}

export async function deleteApplication(req, res) {
    try {
        const { id } = req.params;

        const application = await JobApplication.findOneAndDelete({
            _id: id,
            user: req.user.id,
        });

        if (!application) {
            return res.status(404).json({
                message: "Job application not found",
            });
        }

        return res.status(200).json({
            message: "Job application deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete job application",
            error: error.message,
        });
    }
}