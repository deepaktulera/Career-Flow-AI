import React, { useState } from "react";
import {
    updatePassword,
    updateUser,
    updatePicture,
} from "../services/userServices";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { user } = useAuth();

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: user?.name || "",
        photo: user?.profilePic || null,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    function handleChange(e) {
        const { name, value, files } = e.target;

        // File input
        if (files) {
            const file = files[0];

            if (!file) return;

            // JPG and PNG validation
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
            ];

            if (!allowedTypes.includes(file.type)) {
                alert("Only JPG and PNG images are allowed.");
                return;
            }

            // 5MB validation
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size must be less than 5MB.");
                return;
            }

            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));

            return;
        }

        // Normal input
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handlePasswordChange(e) {
        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // Update name only if changed
            if (formData.name !== user?.name) {
                await updateUser(user?.id, {
                    name: formData.name,
                });
            }

            // Upload profile picture only if a new file is selected
            if (formData.photo instanceof File) {
                const imageData = new FormData();

                imageData.append(
                    "profilePic",
                    formData.photo
                );

                console.log("Selected file:", formData.photo);
                console.log("File name:", formData.photo.name);
                console.log("File type:", formData.photo.type);
                console.log("File size:", formData.photo.size);

                for (const [key, value] of imageData.entries()) {
                    console.log("FormData:", key, value);
                }

                await updatePicture(imageData);
            }

            // Change password only if both fields are filled
            if (
                passwordData.currentPassword &&
                passwordData.newPassword
            ) {
                await updatePassword(
                    passwordData.currentPassword,
                    passwordData.newPassword
                );
            }

            alert("Profile updated successfully.");
            navigate("/profile")

        } catch (error) {
            console.error(
                "Profile update error:",
                error.response?.data?.message ||
                error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update profile."
            );
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Edit Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Update your profile information and account password.
                    </p>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

                    <form onSubmit={handleSubmit}>

                        {/* Profile Section */}
                        <div className="border-b border-gray-200 p-6 sm:p-8">

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Profile Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Keep your personal information up to date.
                                </p>
                            </div>

                            {/* Profile Photo */}
                            <div className="mb-8 flex flex-col items-center sm:flex-row sm:items-center">

                                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-100">

                                    {formData.photo ? (

                                        typeof formData.photo === "string" ? (

                                            <img
                                                src={formData.photo}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />

                                        ) : (

                                            <img
                                                src={URL.createObjectURL(
                                                    formData.photo
                                                )}
                                                alt="Profile preview"
                                                className="h-full w-full object-cover"
                                            />

                                        )

                                    ) : (

                                        <span className="text-3xl font-bold text-blue-600">
                                            {formData.name
                                                ? formData.name
                                                    .charAt(0)
                                                    .toUpperCase()
                                                : "U"}
                                        </span>

                                    )}

                                </div>

                                <div className="mt-4 sm:ml-6 sm:mt-0">

                                    <label
                                        htmlFor="photo"
                                        className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Choose Photo
                                    </label>

                                    <input
                                        id="photo"
                                        name="photo"
                                        type="file"
                                        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                                        className="hidden"
                                        onChange={handleChange}
                                    />

                                    <p className="mt-2 text-xs text-gray-400">
                                        JPG or PNG only. Max size 5MB.
                                    </p>

                                </div>

                            </div>

                            {/* Name */}
                            <div>

                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        {/* Password Section */}
                        <div className="p-6 sm:p-8">

                            <div className="mb-6">

                                <h2 className="text-xl font-semibold text-gray-900">
                                    Change Password
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Use a strong password to keep your account secure.
                                </p>

                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">

                                {/* Current Password */}
                                <div>

                                    <label
                                        htmlFor="currentPassword"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Current Password
                                    </label>

                                    <input
                                        id="currentPassword"
                                        name="currentPassword"
                                        type="password"
                                        placeholder="Enter current password"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                                {/* New Password */}
                                <div>

                                    <label
                                        htmlFor="newPassword"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        New Password
                                    </label>

                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        placeholder="Enter new password"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

                            <Link
                                to="/profile"
                                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditProfile;