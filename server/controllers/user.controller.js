import User from "../models/User.model.js";

// Get User
export async function showUser(req, res) {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        return res.status(200).json({
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}

// Update User
export async function updateUser(req, res) {
    try {
        const { id } = req.params;

        // Check if logged-in user owns this account
        if (req.user.id !== id) {
            return res.status(403).json({
                message: "You are not authorized to update this user!"
            });
        }

        const { name, profilePic } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { name, profilePic },
            {
                new: true,
                runValidators: true
            }
        );

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
        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}


// Delete User
export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

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
        return res.status(500).json({
            message: "Internal server error!"
        });
    }
}