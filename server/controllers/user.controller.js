import User from "../models/UserModel.js";
import { fileTypeFromBuffer } from "file-type";
import cloudinary from "../config/cloudinary.js";


// Get All Users
export async function showUsers(req, res) {
    try {
        const users = await User.find({})
            .select("name , profilePic , -_id");

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
            title,
            profilePic,
            skills
        } = req.body;

        // Only update fields that are provided
        const updates = {};

        if (name !== undefined) {
            updates.name = name;
        }
        
        if (title !== undefined) {
            updates.title = title;
        }

        if (profilePic !== undefined) {
            updates.profilePic = profilePic;
        }

        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: updates
            },
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

export const updateProfilePicture = async (req, res) => {
  let uploadedPublicId = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a JPG or PNG image",
      });
    }

    // Check actual file type
    const fileType = await fileTypeFromBuffer(req.file.buffer);

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!fileType || !allowedTypes.includes(fileType.mime)) {
      return res.status(400).json({
        message: "Only valid JPG or PNG images are allowed",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "careerflow/profile-pictures",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    uploadedPublicId = result.public_id;

    // Save Cloudinary URL in database
    user.profilePic = result.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: result.secure_url,
    });

  } catch (error) {
    console.error("Profile Picture Error:", error);

    // Delete Cloudinary image if database update fails
    if (uploadedPublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedPublicId);
      } catch (deleteError) {
        console.error(
          "Cloudinary cleanup error:",
          deleteError
        );
      }
    }

    return res.status(500).json({
      message: "Profile picture upload failed",
    });
  }
};