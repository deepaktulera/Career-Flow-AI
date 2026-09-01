import Resume from "../models/ResumeModel.js";

export async function createResume(req, res) {
    try {
        const { title, personalInfo, careerGoal, skills, education, experience, projects, certifications } = req.body;

        if (!title || !personalInfo || !careerGoal || !skills || !education) {
            return res.status(400).json({
                message: "Input field is missing!"
            })
        }

        const newResume = await Resume.create({
            user: req.user.id,
            title,
            personalInfo,
            careerGoal,
            skills,
            education,
            experience,
            projects,
            certifications
        })

        return res.status(201).json({
            message: "Resume created successfully!",
            newResume
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}


export async function showResume(req, res) {
    try {
        const { id } = req.params

        const resume = await Resume.findOne({
            _id: id,
            user: req.user.id
        })

        if (!resume) {
            return res.status(404).json({
                message: "No Resume Found!"
            })
        }

        return res.status(200).json({
            message: "Resume fetch Successfully!",
            resume
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}


export async function showMyResumes(req, res) {
    try {
        const resumes = await Resume.find({
            user: req.user.id
        })

        if (resumes.length === 0) {
            return res.status(404).json({
                message: "No resume Found!"
            })
        }

        return res.status(200).json({
            message: "Resumes fetch successfully!",
            resumes
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}


export async function updateResume(req, res) {
    try {
        const { id } = req.params

        const { title, personalInfo, careerGoal, skills, education, experience, projects, certifications } = req.body;

        const update = {}

        if (title != undefined) {
            update.title = title
        }

        if (personalInfo != undefined) {
            update.personalInfo = personalInfo
        }

        if (careerGoal != undefined) {
            update.careerGoal = careerGoal
        }

        if (skills !== undefined) {
            update.skills = skills
        }

        if (education != undefined) {
            update.education = education
        }

        if (experience != undefined) {
            update.experience = experience
        }

        if (projects != undefined) {
            update.projects = projects
        }

        if (certifications != undefined) {
            update.certifications = certifications
        }

        const resume = await Resume.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id
            },
            {
                $set: update
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found!"
            });
        }

        return res.status(200).json({
            message: "Resume Updated Successfully!",
            resume
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}


export async function deleteResume(req, res) {
    try {
        const { id } = req.params;

        const resume = await Resume.findOneAndDelete({
            _id: id,
            user: req.user.id
        })

        if (!resume) {
            return res.status(404).json({
                message: "Resume Not found"
            })
        }

        return res.status(200).json({
            message: "Resume Deleted successfully!",
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}