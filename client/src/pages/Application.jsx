
import React, { useEffect, useState } from "react";
import { showApplication } from "../services/jobApplicationService";
import { Link } from "react-router-dom";

const Application = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchApplications() {
        try {
            setLoading(true);
            setError("");

            const response = await showApplication();
            console.log(response);

            setJobs(response.data.application || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch applications"
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, []);

    const totalApplications = jobs.length;

    const totalInterviews = jobs.filter(
        (job) => job.status === "interview"
    ).length;

    const totalOffers = jobs.filter(
        (job) => job.status === "offer"
    ).length;

    const totalRejected = jobs.filter(
        (job) => job.status === "rejected"
    ).length;

    return (
        <section className="min-h-screen bg-gray-50 p-6 md:p-10">
            {/* Header */}
            <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Job Applications
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Track your job search in one place.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/dashboard"
                        className="rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        ← Back to Dashboard
                    </Link>

                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        + Add Job
                    </button>
                </div>
            </header>

            {/* Summary Cards */}
            <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Applications
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-gray-800">
                        {totalApplications}
                    </h2>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Interviews</p>
                    <h2 className="mt-3 text-3xl font-bold text-purple-600">
                        {totalInterviews}
                    </h2>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Offers</p>
                    <h2 className="mt-3 text-3xl font-bold text-green-600">
                        {totalOffers}
                    </h2>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Rejected</p>
                    <h2 className="mt-3 text-3xl font-bold text-red-600">
                        {totalRejected}
                    </h2>
                </div>
            </div>

            {/* Recent Applications */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Recent Applications
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Your latest job applications.
                    </p>
                </div>

                {loading ? (
                    <p className="py-8 text-center text-gray-500">
                        Loading applications...
                    </p>
                ) : error ? (
                    <div className="py-8 text-center">
                        <p className="text-red-600">{error}</p>

                        <button
                            type="button"
                            onClick={fetchApplications}
                            className="mt-3 font-medium text-blue-600 hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="py-10 text-center">
                        <h3 className="font-semibold text-gray-700">
                            No applications yet
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Add your first job application to get started.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-center"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {job.company}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {job.jobTitle}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        {job.location}
                                    </p>
                                </div>

                                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-medium capitalize text-blue-700">
                                    {job.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </section>
    );
};

export default Application;