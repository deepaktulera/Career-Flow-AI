import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showApplication } from "../services/jobApplicationService";

const statusStyle = {
    applied: "bg-blue-50 text-blue-700",
    interview: "bg-purple-50 text-purple-700",
    rejected: "bg-red-50 text-red-700",
    selected: "bg-green-50 text-green-700",
    offer: "bg-emerald-50 text-emerald-700",
};

export default function Application() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchApplications() {
        try {
            setLoading(true);
            setError("");
            const response = await showApplication();
            setJobs(response.data.application || []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch applications.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchApplications(); }, []);

    const totalInterviews = jobs.filter((job) => job.status === "interview").length;
    const totalOffers = jobs.filter((job) => ["offer", "selected"].includes(job.status)).length;
    const totalRejected = jobs.filter((job) => job.status === "rejected").length;

    return <main className="min-h-screen bg-gray-50 p-6 md:p-10"><div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-3xl font-bold text-gray-800">My Applications</h1><p className="mt-2 text-gray-500">Track the jobs you applied to on CareerFlow AI.</p></div><div className="flex flex-wrap gap-3"><Link to="/dashboard" className="rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 hover:bg-gray-100">← Dashboard</Link><Link to="/jobs" className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">Find Jobs</Link></div></header>
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"><Summary label="Total Applications" value={jobs.length} color="text-gray-800"/><Summary label="Interviews" value={totalInterviews} color="text-purple-600"/><Summary label="Offers / Selected" value={totalOffers} color="text-green-600"/><Summary label="Rejected" value={totalRejected} color="text-red-600"/></div>
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="mb-5 text-xl font-semibold text-gray-800">Application history</h2>
            {loading ? <p className="py-8 text-center text-gray-500">Loading applications...</p> : error ? <div className="py-8 text-center"><p role="alert" className="text-red-600">{error}</p><button onClick={fetchApplications} className="mt-3 font-medium text-blue-600 hover:underline">Try again</button></div> : jobs.length === 0 ? <div className="py-10 text-center"><h3 className="font-semibold text-gray-700">You haven't applied to any jobs yet.</h3><p className="mt-2 text-sm text-gray-500">Browse vacancies and apply directly from their job cards.</p><Link to="/jobs" className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white">Explore jobs</Link></div> : <div className="divide-y divide-gray-100">{jobs.map((job) => <article key={job._id} className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center"><div><h3 className="font-semibold text-gray-800">{job.jobTitle}</h3><p className="mt-1 text-sm text-gray-600">{job.company}</p><p className="mt-1 text-xs text-gray-400">{job.location} · Applied {job.appliedDate || new Date(job.createdAt).toLocaleDateString()}</p>{job.jobUrl && <a href={job.jobUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-blue-600 hover:underline">External job link ↗</a>}</div><span className={`w-fit rounded-full px-3 py-1 text-sm font-medium capitalize ${statusStyle[job.status] || "bg-gray-100 text-gray-700"}`}>{job.status}</span></article>)}</div>}
        </section>
    </div></main>;
}

function Summary({ label, value, color }) {
    return <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">{label}</p><h2 className={`mt-3 text-3xl font-bold ${color}`}>{value}</h2></div>;
}
