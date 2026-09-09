import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user , logout} = useAuth();
    const navigate = useNavigate()

    function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete your profile? This action cannot be undone."
        );

        if (confirmed) {
            console.log("Profile deleted");
        }
    }

    function handleLogout(){
        logout()
        navigate("/")
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 px-4 py-8 sm:px-6">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">

                {/* Sidebar */}
                <aside className="h-fit rounded-2xl bg-slate-800 p-5 text-white shadow-xl">
                    <div className="flex flex-col items-center">

                        {/* Profile Picture */}
                        {user.profilePic ? (
                            <img
                                src={user.profilePic}
                                alt={`${user.name} profile`}
                                className="h-24 w-24 rounded-full border-4 border-slate-600 object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-600 text-3xl font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <h2 className="mt-4 text-lg font-semibold">
                            {user.name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            CareerFlow User
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="mt-8 flex flex-col gap-2">
                        <Link
                            to="/profile"
                            className="rounded-lg bg-slate-700 px-4 py-3 text-sm font-medium transition hover:bg-slate-600 active:scale-95"
                        >
                            Profile
                        </Link>

                        <Link
                            to="/profile/edit"
                            className="rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-slate-700 active:scale-95"
                        >
                            Edit Profile
                        </Link>

                        <button
                            onClick={handleLogout}
                            type="button"
                            className="rounded-lg px-4 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10 active:scale-95"
                        >
                            Log Out
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="rounded-2xl bg-white p-5 shadow-xl sm:p-8">

                    {/* Header */}
                    <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-sm font-medium text-blue-600">
                                CareerFlow AI
                            </p>

                            <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                                My Profile
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your CareerFlow AI account information.
                            </p>
                        </div>

                        <Link
                            to="/profile/edit"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                        >
                            Edit Profile
                        </Link>
                    </div>

                    {/* Profile Information */}
                    <section className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Personal Details
                        </h2>

                        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Full Name
                                </label>

                                <p className="mt-1 rounded-lg border bg-gray-50 px-4 py-3 text-gray-900">
                                    {user.name || "Not provided"}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Email
                                </label>

                                <p className="mt-1 rounded-lg border bg-gray-50 px-4 py-3 text-gray-900">
                                    {user.email || "Not provided"}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Profile Picture */}
                    <section className="mt-10 border-t pt-8">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Profile Picture
                        </h2>

                        <div className="mt-4 flex items-center gap-5">
                            {user.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    alt={`${user.name} profile`}
                                    className="h-20 w-20 rounded-full border object-cover"
                                />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div>
                                <p className="font-medium text-gray-900">
                                    Profile photo
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {user.profilePic
                                        ? "Profile picture is set."
                                        : "No profile picture added."}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Account Information */}
                    <section className="mt-10 border-t pt-8">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Account Information
                        </h2>

                        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">

                            {/* Account ID */}
                            {user._id && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Account ID
                                    </label>

                                    <p className="mt-1 truncate rounded-lg border bg-gray-50 px-4 py-3 text-sm text-gray-700">
                                        {user._id}
                                    </p>
                                </div>
                            )}

                            {/* Created At */}
                            {user.createdAt && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Member Since
                                    </label>

                                    <p className="mt-1 rounded-lg border bg-gray-50 px-4 py-3 text-gray-900">
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Account Actions */}
                    <section className="mt-10 border-t pt-8">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Account Actions
                        </h2>

                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-5">
                            <h3 className="font-semibold text-red-700">
                                Delete Profile
                            </h3>

                            <p className="mt-1 text-sm text-red-600">
                                This will permanently remove your CareerFlow
                                account and its associated data.
                            </p>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="mt-4 rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white active:scale-95"
                            >
                                Delete Profile
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Profile;