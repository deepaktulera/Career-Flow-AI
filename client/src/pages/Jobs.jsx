import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { applyToJob, listJobs } from "../services/jobService";
import { showResumes } from "../services/resumeService";
import { useAuth } from "../context/AuthContext";

export default function Jobs() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const [workType, setWorkType] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [applyingId, setApplyingId] = useState("");
    const [resumeChoice, setResumeChoice] = useState({});

    async function loadJobs() {
        setLoading(true); setError("");
        try {
            const response = await listJobs({ search: query, location, workType });
            setJobs(response.data.jobs || []);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load jobs.");
        } finally { setLoading(false); }
    }

    useEffect(() => { loadJobs(); }, []);
    useEffect(() => {
        if (user?.role === "jobSeeker") {
            showResumes().then((result) => setResumes(result?.resumes || result?.data?.resumes || []));
        }
    }, [user?.role]);

    async function handleApply(job) {
        setNotice(""); setError(""); setApplyingId(job._id);
        try {
            await applyToJob(job._id, { resumeId: resumeChoice[job._id] || undefined });
            setNotice(`Application submitted for ${job.title} at ${job.company}.`);
        } catch (err) {
            setError(err.response?.data?.message || "Could not submit application.");
        } finally { setApplyingId(""); }
    }

    return <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div><p className="font-semibold text-blue-600">CareerFlow AI</p><h1 className="mt-1 text-3xl font-bold text-slate-900">Find your next opportunity</h1><p className="mt-2 text-slate-500">Explore live vacancies posted by recruiters.</p></div>
                <div className="flex flex-wrap gap-3"><Link to="/dashboard" className="rounded-lg border bg-white px-4 py-3 font-medium">Dashboard</Link>{user?.role === "recruiter" && <Link to="/recruiter" className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">Recruiter dashboard</Link>}{user?.role === "jobSeeker" && <Link to="/applications" className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">My applications</Link>}</div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); loadJobs(); }} className="mb-6 grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-[2fr_1fr_1fr_auto]">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Job title, company or skill" className="rounded-lg border px-4 py-3" />
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="rounded-lg border px-4 py-3" />
                <select value={workType} onChange={(e) => setWorkType(e.target.value)} className="rounded-lg border bg-white px-4 py-3"><option value="">All work modes</option><option value="remote">Remote</option><option value="hybrid">Hybrid</option><option value="onsite">On-site</option></select>
                <button className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">Search</button>
            </form>
            {notice && <p role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">{notice} <Link className="font-semibold underline" to="/applications">View applications</Link></p>}
            {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
            {loading ? <p className="py-16 text-center text-slate-500">Loading jobs...</p> : jobs.length === 0 ? <div className="rounded-2xl border bg-white py-16 text-center"><h2 className="text-xl font-semibold">No matching jobs yet</h2><p className="mt-2 text-slate-500">Try another search or check back later.</p></div> : <div className="grid gap-5 md:grid-cols-2">
                {jobs.map((job) => <article key={job._id} className="rounded-2xl border bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-3"><div><h2 className="text-xl font-bold text-slate-900">{job.title}</h2><p className="mt-1 font-medium text-blue-700">{job.company}</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">{job.workType}</span></div>
                    <p className="mt-3 text-sm text-slate-500">{job.location} · {job.employmentType} · Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                    {(job.salaryMin || job.salaryMax) && <p className="mt-2 text-sm font-semibold text-slate-700">Salary: {job.salaryMin ?? "—"} – {job.salaryMax ?? "—"}</p>}
                    <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">{job.description.length > 360 ? `${job.description.slice(0, 360)}…` : job.description}</p>
                    {!!job.skills?.length && <div className="mt-4 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{skill}</span>)}</div>}
                    {!!job.requirements?.length && <div className="mt-4"><p className="text-sm font-semibold">Requirements</p><ul className="mt-1 list-disc pl-5 text-sm text-slate-600">{job.requirements.slice(0, 5).map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}</ul></div>}
                    <div className="mt-5 flex flex-wrap items-center gap-3 border-t pt-4">
                        {user?.role === "jobSeeker" ? <>
                            {resumes.length > 0 && <select aria-label={`Resume for ${job.title}`} value={resumeChoice[job._id] || ""} onChange={(e) => setResumeChoice((old) => ({ ...old, [job._id]: e.target.value }))} className="min-w-0 flex-1 rounded-lg border bg-white px-3 py-2"><option value="">Apply without selecting a resume</option>{resumes.map((resume) => <option key={resume._id} value={resume._id}>{resume.title}</option>)}</select>}
                            <button onClick={() => handleApply(job)} disabled={applyingId === job._id} className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-50">{applyingId === job._id ? "Applying…" : "Apply now"}</button>
                        </> : user?.role === "recruiter" ? <span className="text-sm text-slate-500">Recruiter account: browse published jobs.</span> : <Link to="/login" className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white">Log in to apply</Link>}
                        {job.applicationUrl && <a href={job.applicationUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-700 underline">External application</a>}
                    </div>
                </article>)}
            </div>}
        </div>
    </main>;
}
