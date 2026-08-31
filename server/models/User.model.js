import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: ''
        },
        skills: {
            type: [String],
            default: []
        },

        careerGoal: {
            type: String,
            default: ''
        },
        education: [
            {
                degree: String,
                institution: String,
                startYear: Number,
                endYear: Number
            }
        ],
        experience: [
            {
                company: String,
                position: String,
                startDate: Date,
                endDate: Date,
                description: String
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema)

export default User