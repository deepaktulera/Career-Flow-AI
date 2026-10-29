import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { closeJob, createJob, getJobApplicants, getMyJobs, updateApplicantStatus, updateJob } from "../services/jobService";

const blankJob = { company: "", title: "", description: "", requirementsText: "", skillsText: "", location: "", workType: "onsite", employmentType: "full-time", salaryMin: "", salaryMax: "", applicationUrl: "" };
const statuses = ["applied", "interview", "rejected", "selected", "offer"];

export default function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
    const [form, setForm] = useState(blankJob);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    async function loadJobs() {
        setLoading(true); setError("");
        try { const response = await getMyJobs(); setJobs(response.data.jobs || []); }
        catch (err) { setError(err.response?.data?.message || "Could not load your jobs."); }
        finally { setLoading(false); }
    }
    useEffect(() => { loadJobs(); }, []);

    function startCreate() { setEditingId(null); setForm(blankJob); setShowForm(true); setError(""); setNotice(""); }
    function startEdit(job) {
        setEditingId(job._id);
        setForm({ company: job.company || "", title: job.title || "", description: job.description || "", requirementsText: (job.requirements || []).join("\n"), skillsText: (job.skills || []).join(", "), location: job.location || "", workType: job.workType || "onsite", employmentType: job.employmentType || "full-time", salaryMin: job.salaryMin ?? "", salaryMax: job.salaryMax ?? "", applicationUrl: job.applicationUrl || "" });
        setShowForm(true); setError(""); setNotice("");
    }
    function change(e) { setForm((old) => ({ ...old, [e.target.name]: e.target.value })); }

    async function submit(e) {
        e.preventDefault(); setSaving(true); setError(""); setNotice("");
        const data = { company: form.company.trim(), title: form.title.trim(), description: form.description.trim(), requirements: form.requirementsText.split("\n").map((x) => x.trim()).filter(Boolean), skills: form.skillsText.split(",").map((x) => x.trim()).filter(Boolean), location: form.location.trim(), workType: form.workType, employmentType: form.employmentType, applicationUrl: form.applicationUrl.trim(), salaryMin: form.salaryMin === "" ? undefined : Number(form.salaryMin), salaryMax: form.salaryMax === "" ? undefined : Number(form.salaryMax) };
        try {
            if (editingId) await updateJob(editingId, data); else await createJob(data);
            setNotice(editingId ? "Job updated." : "Job published successfully."); setShowForm(false); setForm(blankJob); setEditingId(null); await loadJobs();
        } catch (err) { setError(err.response?.data?.message || "Could not save job."); }
        finally { setSaving(false); }
    }
    async function handleClose(job) {
        if (!window.confirm(`Close the listing for ${job.title}?`)) return;
        try { await closeJob(job._id); setNotice("Job listing closed."); await loadJobs(); if (selectedJob?._id === job._id) { setSelectedJob(null); setApplicants([]); } }
        catch (err) { setError(err.response?.data?.message || "Could not close job."); }
    }
    async function viewApplicants(job) {
        setError(""); setNotice(""); setSelectedJob(job); setApplicants([]);
        try { const response = await getJobApplicants(job._id); setApplicants(response.data.applications || []); }
        catch (err) { setError(err.response?.data?.message || "Could not load applicants."); }
    }
    async function changeStatus(applicationId, status) {
        try { await updateApplicantStatus(applicationId, status); setApplicants((old) => old.map((app) => app._id === applicationId ? { ...app, status } : app)); setNotice("Applicant status updated."); }
        catch (err) { setError(err.response?.data?.message || "Could not update applicant status."); }
    }

    return <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8"><div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><p className="font-semibold text-blue-600">CareerFlow AI · Recruiter</p><h1 className="mt-1 text-3xl font-bold text-slate-900">Recruiter dashboard</h1><p className="mt-2 text-slate-500">Publish vacancies and manage candidates.</p></div><div className="flex gap-3"><Link to="/jobs" className="rounded-lg border bg-white px-4 py-3 font-medium">Browse jobs</Link><button onClick={startCreate} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white">+ Post a job</button></div></header>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}{notice && <p role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">{notice}</p>}
        {showForm && <form onSubmit={submit} className="mb-8 rounded-2xl border bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">{editingId ? "Edit job listing" : "Publish a job"}</h2><button type="button" onClick={() => setShowForm(false)} className="text-sm text-slate-500 underline">Cancel</button></div>
            <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium">Company name *<input name="company" value={form.company} onChange={change} required maxLength={150} className="mt-1 w-full rounded-lg border p-3" /></label>
                <label className="text-sm font-medium">Job title *<input name="title" value={form.title} onChange={change} required maxLength={150} className="mt-1 w-full rounded-lg border p-3" /></label>
                <label className="text-sm font-medium md:col-span-2">Description *<textarea name="description" value={form.description} onChange={change} required rows={5} maxLength={12000} className="mt-1 w-full rounded-lg border p-3" placeholder="Describe responsibilities, team and role..." /></label>
                <label className="text-sm font-medium">Location *<input name="location" value={form.location} onChange={change} required className="mt-1 w-full rounded-lg border p-3" placeholder="Delhi / Remote" /></label>
                <label className="text-sm font-medium">Work mode<select name="workType" value={form.workType} onChange={change} className="mt-1 w-full rounded-lg border bg-white p-3"><option value="onsite">On-site</option><option value="hybrid">Hybrid</option><option value="remote">Remote</option></select></label>
                <label className="text-sm font-medium">Employment type<select name="employmentType" value={form.employmentType} onChange={change} className="mt-1 w-full rounded-lg border bg-white p-3"><option value="full-time">Full-time</option><option value="part-time">Part-time</option><option value="contract">Contract</option><option value="internship">Internship</option></select></label>
                <label className="text-sm font-medium">Minimum salary (optional)<input type="number" min="0" name="salaryMin" value={form.salaryMin} onChange={change} className="mt-1 w-full rounded-lg border p-3" /></label>
                <label className="text-sm font-medium">Maximum salary (optional)<input type="number" min="0" name="salaryMax" value={form.salaryMax} onChange={change} className="mt-1 w-full rounded-lg border p-3" /></label>
                <label className="text-sm font-medium">Skills (comma separated)<input name="skillsText" value={form.skillsText} onChange={change} className="mt-1 w-full rounded-lg border p-3" placeholder="React, JavaScript, Node.js" /></label>
                <label className="text-sm font-medium">Requirements (one per line)<textarea name="requirementsText" value={form.requirementsText} onChange={change} rows={3} className="mt-1 w-full rounded-lg border p-3" placeholder="Experience with React\nGood communication" /></label>
                <label className="text-sm font-medium md:col-span-2">External application URL (optional)<input type="url" name="applicationUrl" value={form.applicationUrl} onChange={change} className="mt-1 w-full rounded-lg border p-3" placeholder="https://company.example/careers/job" /><span className="mt-1 block text-xs text-slate-500">Candidates can also apply directly inside CareerFlow AI.</span></label>
            </div>
            <button disabled={saving} className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white disabled:opacity-50">{saving ? "Saving..." : editingId ? "Save changes" : "Publish job"}</button>
        </form>}
        <section className="rounded-2xl border bg-white p-6 shadow-sm"><h2 className="mb-5 text-xl font-bold">Your job listings</h2>{loading ? <p className="py-8 text-center text-slate-500">Loading your jobs...</p> : jobs.length === 0 ? <div className="py-10 text-center"><p className="font-semibold">You have not posted any jobs yet.</p><button onClick={startCreate} className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white">Post your first job</button></div> : <div className="divide-y">{jobs.map((job) => <div key={job._id} className="flex flex-col justify-between gap-4 py-5 md:flex-row md:items-center"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{job.title}</h3><span className={`rounded-full px-2 py-1 text-xs capitalize ${job.status === "published" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>{job.status}</span></div><p className="mt-1 text-sm text-slate-500">{job.company} · {job.location} · {new Date(job.createdAt).toLocaleDateString()}</p></div><div className="flex flex-wrap gap-2"><button onClick={() => viewApplicants(job)} className="rounded-lg border px-3 py-2 text-sm font-semibold">Applicants</button><button onClick={() => startEdit(job)} className="rounded-lg border px-3 py-2 text-sm font-semibold">Edit</button>{job.status === "published" && <button onClick={() => handleClose(job)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600">Close job</button>}</div></div>)}</div>}</section>
        {selectedJob && <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Applicants</h2><p className="text-sm text-slate-500">{selectedJob.title} · {applicants.length} applicants</p></div><button onClick={() => { setSelectedJob(null); setApplicants([]); }} className="text-sm underline">Close</button></div>{applicants.length === 0 ? <p className="py-6 text-center text-slate-500">No applications for this job yet.</p> : <div className="divide-y">{applicants.map((app) => <div key={app._id} className="flex flex-col justify-between gap-3 py-4 md:flex-row md:items-center"><div><h3 className="font-semibold">{app.user?.name || "Applicant"}</h3><p className="text-sm text-slate-500">{app.user?.email || ""} · Applied {new Date(app.createdAt).toLocaleDateString()}</p>{app.resume && <div className="mt-2 rounded-lg bg-slate-50 p-3 text-sm"><p className="font-semibold text-slate-800">Resume: {app.resume.title}</p>{app.resume.personalInfo?.email && <p className="text-slate-600">{app.resume.personalInfo.email}</p>}{app.resume.careerGoal && <p className="mt-1 text-slate-600">{app.resume.careerGoal}</p>}{app.resume.skills?.length > 0 && <p className="mt-1 text-slate-600">Skills: {app.resume.skills.join(", ")}</p>}{app.resume.education?.length > 0 && <p className="mt-1 text-slate-600">Education: {app.resume.education.map((edu) => `${edu.degree || ""} ${edu.institution ? `at ${edu.institution}` : ""}`.trim()).filter(Boolean).join("; ")}</p>}{app.resume.experience?.length > 0 && <p className="mt-1 text-slate-600">Experience: {app.resume.experience.map((exp) => `${exp.position || ""}${exp.company ? ` at ${exp.company}` : ""}`).join("; ")}</p>}</div>}{app.notes && <p className="mt-1 text-sm text-slate-600">{app.notes}</p>}</div><select aria-label={`Application status for ${app.user?.name || "applicant"}`} value={app.status} onChange={(e) => changeStatus(app._id, e.target.value)} className="rounded-lg border bg-white p-2 capitalize">{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></div>)}</div>}</section>}
    </div></main>;
}
