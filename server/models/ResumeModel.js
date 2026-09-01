import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        personalInfo: {
            name: {
                type: String,
                required: true,
                trim: true
            },

            email: {
                type: String,
                required: true,
                lowercase: true,
                trim: true
            },

            phone: {
                type: String,
                default: ""
            },

            location: {
                type: String,
                default: ""
            },

            profilePic: {
                type: String,
                default: ""
            }
        },

        careerGoal: {
            type: String,
            default: ""
        },

        skills: {
            type: [String],
            default: []
        },

        education: [
            {
                degree: {
                    type: String,
                    trim: true
                },

                institution: {
                    type: String,
                    trim: true
                },

                startYear: {
                    type: Number
                },

                endYear: {
                    type: Number
                }
            }
        ],

        experience: [
            {
                company: {
                    type: String,
                    trim: true
                },

                position: {
                    type: String,
                    trim: true
                },

                startDate: {
                    type: Date
                },

                endDate: {
                    type: Date
                },

                description: {
                    type: String,
                    trim: true
                }
            }
        ],

        projects: [
            {
                name: {
                    type: String,
                    trim: true
                },

                description: {
                    type: String,
                    trim: true
                },

                technologies: {
                    type: [String],
                    default: []
                },

                projectUrl: {
                    type: String,
                    default: ""
                },

                githubUrl: {
                    type: String,
                    default: ""
                }
            }
        ],

        certifications: [
            {
                name: {
                    type: String,
                    trim: true
                },

                organization: {
                    type: String,
                    trim: true
                },

                issueDate: {
                    type: Date
                },

                credentialUrl: {
                    type: String,
                    default: ""
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;