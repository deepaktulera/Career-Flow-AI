import User from "../models/User.model.js";

// Get All Users
export async function showUsers(req, res) {
    try {
        const users = await User.find({})
            .select("-password");

        return res.status(200).json({
            message: "Fetched all users!",
            users
        });

    } catch (error) {
        console.error("Show Users Error:", error);

        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}


// Get Single User
export async function showUser(req, res) {
    try {
        const { id } = req.params;

        // Check if logged-in user owns this account
        if (req.user.id !== id) {
            return res.status(403).json({
                message: "You are not authorized to view this user!"
            });
        }

        const user = await User.findById(id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        return res.status(200).json({
            message: "User fetched successfully!",
            user
        });

    } catch (error) {
        console.error("Show User Error:", error);

        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}


// Update User Profile
export async function updateUser(req, res) {
    try {
        const { id } = req.params;

        // Check if logged-in user owns this account
        if (req.user.id !== id) {
            return res.status(403).json({
                message: "You are not authorized to update this user!"
            });
        }

        const {
            name,
            profilePic,
            skills,
            careerGoal,
            education,
            experience
        } = req.body;

        // Only update fields that are provided
        const updates = {};

        if (name !== undefined) {
            updates.name = name;
        }

        if (profilePic !== undefined) {
            updates.profilePic = profilePic;
        }

        if (skills !== undefined) {
            updates.skills = skills;
        }

        if (careerGoal !== undefined) {
            updates.careerGoal = careerGoal;
        }

        if (education !== undefined) {
            updates.education = education;
        }

        if (experience !== undefined) {
            updates.experience = experience;
        }

        const user = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        return res.status(200).json({
            message: "User updated successfully!",
            user
        });

    } catch (error) {
        console.error("Update User Error:", error);

        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}


// Delete User
export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        // Check if logged-in user owns this account
        if (req.user.id !== id) {
            return res.status(403).json({
                message: "You are not authorized to delete this user!"
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully!"
        });

    } catch (error) {
        console.error("Delete User Error:", error);

        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}